import { adminFirestore } from "@/lib/firebase-admin";
import { Job } from "@/types/dashboard";
import { NextResponse } from "next/server";

export async function GET(){
    try{
        const snapshot = await adminFirestore.collection('jobs').get()
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
