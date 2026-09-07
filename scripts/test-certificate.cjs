const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'C:/Users/kylen/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const ts = require('typescript');
const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const base = process.env.TEST_BASE_URL || 'http://localhost:3001';
const moduleScope={exports:{}};
vm.runInNewContext(ts.transpileModule(fs.readFileSync('lib/certificate.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText,{exports:moduleScope.exports,Date,Intl,Number});
const {certificateRecord}=moduleScope.exports;
const profile={firstName:'Jaedan',lastName:'Doughlin',currentEquity:1500,equityUpdatedAt:'2026-08-25T12:00:00Z',equityEffectiveDate:'2026-08-25',equityPeriod:'August 2026',employmentStatus:'active',equityUnit:'ordinary_shares'};
const normal=certificateRecord(profile,'TEST-ONLY');
normal.startDate=certificateRecord({...profile,startDate:'2024-09-10'},'TEST').startDate;
assert.equal(normal.startDate,'2024-09-10T00:00:00.000Z');
assert.equal(certificateRecord(profile,'TEST').startDate,null);
assert.equal(normal.holdingValue,'1,500 Ordinary Shares');
assert.equal(certificateRecord({...profile,equityUnit:'percentage',currentEquity:2.5},'TEST').holdingValue,'2.50%');
assert.equal(certificateRecord({...profile,equityUnit:undefined},'TEST').holdingValue,'1,500');
assert.equal(certificateRecord({...profile,currentEquity:2000},'TEST').holdingValue,'2,000 Ordinary Shares');
assert.equal(certificateRecord({...profile,address:'Private'},'TEST').address,null);
assert.equal(certificateRecord({...profile,address:'Approved',showAddressOnCertificate:true},'TEST').address,'Approved');
for(const change of [{employmentStatus:'inactive'},{employmentStatus:'terminated'},{equityStatus:'revoked'},{accountStatus:'disabled'},{currentEquity:NaN}])assert.equal(certificateRecord({...profile,...change},'TEST').active,false);
console.log('PASS record formatting, fresh values, private address, inactive/revoked states');
(async()=>{
 let session={uid:'staff-a',role:'staff',mustChangePassword:false},readIds=[];
 const endpoint={exports:{}};
 vm.runInNewContext(ts.transpileModule(fs.readFileSync('app/api/staff/certificate/route.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText,{
   exports:endpoint.exports,
   require(name){
     if(name==='next/server')return {NextResponse:{json:(data,options={})=>({data,status:options.status||200,headers:options.headers})}};
     if(name==='@/lib/server-auth')return {requireRole:async()=>session};
     if(name==='@/lib/firebase-admin')return {adminFirestore:{collection:()=>({doc:id=>{readIds.push(id);return {get:async()=>({exists:true,data:()=>({...profile,accountStatus:'active'})})}}})}};
     if(name==='@/lib/certificate')return {certificateRecord};
     return require(name);
   }
 });
 const request=query=>({nextUrl:new URL(`${base}/api/staff/certificate${query}`)});
 assert.equal((await endpoint.exports.GET(request('?staffId=staff-b'))).status,403);
 assert.equal(readIds.length,0);
 assert.equal((await endpoint.exports.GET(request(''))).status,200);
 assert.deepEqual(readIds,['staff-a','staff-a']);
 session={uid:'admin',role:'super_admin',mustChangePassword:false};readIds=[];
 assert.equal((await endpoint.exports.GET(request('?staffId=staff-b'))).status,200);
 assert.deepEqual(readIds,['staff-b','staff-b']);
 session={uid:'staff-a',role:'staff',mustChangePassword:true};
 assert.equal((await endpoint.exports.GET(request(''))).status,403);
 console.log('PASS endpoint authorization: own UID, cross-staff denial, admin preview, password-change gate');
 const browser=await chromium.launch({channel:'msedge',headless:true});
 try{
 const page=await browser.newPage();
 const response=await page.request.get(`${base}/api/staff/certificate?staffId=someone-else`,{timeout:120000});
 assert.equal(response.status(),403);
 console.log('PASS real endpoint denies unauthenticated access');
 let record=normal, unavailable=false;
 await page.route('**/api/auth/me',route=>route.fulfill({json:{role:'staff',mustChangePassword:false}}));
 await page.route('**/api/staff/me',route=>route.fulfill({json:{profile:{...profile,employeeId:'TEST',jobTitle:'Test fixture'},history:[]}}));
 await page.route('**/api/staff/certificate',route=>route.fulfill({status:unavailable?409:200,json:unavailable?{message:'This equity record is no longer active.'}:{certificate:record}}));
 await page.goto(`${base}/staff/dashboard`,{timeout:120000});
 await page.getByRole('button',{name:'View Certificate',exact:true}).click();
 await page.locator('.certificate-name').waitFor();
 await page.getByLabel('Start date: September 10, 2024',{exact:true}).waitFor();
 await page.getByLabel('Last date updated: August 25, 2026',{exact:true}).waitFor();
 await page.getByText('for the period',{exact:true}).waitFor();
 assert.equal(await page.getByText('for the recorded period',{exact:true}).count(),0);
 for(const width of [320,375,390,430,768,1366,1920]){
   await page.setViewportSize({width,height:1000});await page.waitForTimeout(100);
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,`overflow at ${width}`);
   assert.equal(await page.locator('.certificate-document').evaluate(el=>el.scrollHeight<=el.clientHeight),true,'document overflow');
 }
 console.log('PASS seven responsive widths');
 await page.setViewportSize({width:1280,height:1200});
 fs.mkdirSync('tmp/pdfs',{recursive:true});
 await page.screenshot({path:'tmp/pdfs/certificate-desktop.png'});
 await page.evaluate(()=>{window.print=()=>{throw new Error('Download must not invoke print')}});
 const downloadPromise=page.waitForEvent('download',{timeout:60000});
 await page.getByRole('button',{name:'Download PDF',exact:true}).click();
 const download=await downloadPromise;
 assert.match(download.suggestedFilename(),/^UpTech-UNOFF-.*\.pdf$/);
 await download.saveAs('tmp/pdfs/certificate-download.pdf');
 console.log('PASS direct PDF download without print dialog');
 await page.pdf({path:'tmp/pdfs/certificate-print.pdf',preferCSSPageSize:true,printBackground:false});
 for(const specimen of [certificateRecord({...profile,firstName:'Alexandra Catherine Elizabeth Montgomery-Wellington'.repeat(3),lastName:'Testing',currentEquity:999999999999999},'TEST-LONG'),certificateRecord({...profile,equityUnit:'percentage',currentEquity:2.5},'TEST-PERCENT')]){
   await page.getByRole('button',{name:'Close',exact:true}).click();record=specimen;
   await page.getByRole('button',{name:'View Certificate',exact:true}).click();await page.locator('.certificate-name').waitFor();
   assert.equal(await page.locator('.certificate-document').evaluate(el=>el.scrollHeight<=el.clientHeight),true,'long content overflow');
 }
 await page.screenshot({path:'tmp/pdfs/certificate-percentage.png'});
 await page.getByRole('button',{name:'Close',exact:true}).click();unavailable=true;
 await page.getByRole('button',{name:'View Certificate',exact:true}).click();await page.getByRole('alert').waitFor();assert.equal(await page.locator('.certificate-document').count(),0);
 console.log('PASS long names, large values, percentages, refreshed opens and inactive UI');
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
