import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value;

     // Exclude the login page from middleware checks
    const excludedPaths = ['/admin/login'];
    if (excludedPaths.includes(request.nextUrl.pathname)) {
        return NextResponse.next();
    }

    if (!token) {
        console.error('User not logged in');
        return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    try {
        console.log('Making verifyToken api call')
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/verifyToken`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token }),
        });

        const { isValid, isAdmin } = await response.json();

        if (!isValid || !isAdmin) {
            console.error('Invalid token or not an admin');
            if (request.nextUrl.pathname !== '/admin/login') {
                return NextResponse.redirect(new URL('/admin/login', request.url));
            }
        }
    } catch (error) {
        console.error('Error verifying token:', error);
        if (request.nextUrl.pathname !== '/admin/login') {
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'], // Applies middleware to all /admin routes
};
