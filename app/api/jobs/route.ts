import { db } from "@/firebase/firebase";
import { Job } from "@/types/dashboard";
import { collection, getDocs } from "firebase/firestore";
import { NextResponse } from "next/server";

const jobsCollection = collection(db, 'jobs')
export async function GET(){
    try{
        const snapshot = await getDocs(jobsCollection)
        const jobs: Job[] = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })) as Job[]
    return NextResponse.json({success: true, data: jobs}, { status: 200 })
    }catch(error){
        console.error("Error fetching jobs", error)
        return NextResponse.json({ success: false, message: "Failed to fetch posts" }, { status: 500 })
    }

}