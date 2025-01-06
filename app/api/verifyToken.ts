import { adminAuth } from "@/firebase/firebase-admin";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { token } = req.body;
    console.log('your token', token)
    try {
        const decodedToken = await adminAuth.verifyIdToken(token);
        res.status(200).json({ isValid: true, isAdmin: decodedToken.isAdmin });
    } catch (error) {
        res.status(401).json({ isValid: false });
    }
} 