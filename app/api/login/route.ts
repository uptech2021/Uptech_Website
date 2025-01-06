import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    try{
        const { token } = await req.json()

        if(!token)
            return NextResponse.json({message: 'No token provided'}, {status: 400})

        const response = NextResponse.json({message: 'Login successful'})
        response.cookies.set('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            path: '/',
            sameSite: 'strict'
        })

        return response
    } catch(error: any){
        console.error('Login API error:', error)
        return NextResponse.json({message: 'Internal server error'}, {status: 500})
    }
}