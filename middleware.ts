import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value;

    if (!token) return NextResponse.redirect(new URL('/admin/login', request.url));

    try {
        const response = await fetch(new URL('/api/verifyToken', request.url), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token }),
        });

        const { isValid, isAdmin } = await response.json();

        if (!isValid || !isAdmin) {
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }
    } catch (error) {
        console.error('Error verifying token:', error);
        return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/admin/dashboard',
}