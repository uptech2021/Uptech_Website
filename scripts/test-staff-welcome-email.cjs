const fs=require('node:fs'),vm=require('node:vm'),ts=require('typescript'),assert=require('node:assert/strict');
const moduleScope={exports:{}};
vm.runInNewContext(ts.transpileModule(fs.readFileSync('lib/staff-welcome-email.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText,{exports:moduleScope.exports});
const result=moduleScope.exports.staffWelcomeEmail({name:'Kyle <Admin>',email:'kyle@example.com',employeeId:'UPT-0001',temporaryPassword:'Test<&123!',loginUrl:'https://uptech.example/staff/login'});
assert.match(result.text,/UPT-0001/);assert.match(result.text,/Test<&123!/);assert.match(result.html,/Hi Kyle/);assert.doesNotMatch(result.html,/<Admin>/);assert.match(result.html,/Test&lt;&amp;123!/);assert.match(result.html,/Sign in to the staff portal/);
console.log('PASS branded welcome template, required login details and HTML escaping');
