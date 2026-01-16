import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

export const runtime = "nodejs"; 

export async function middleware(req: NextRequest){
    const res = NextResponse.next();
    const supabaseMiddleware = createMiddlewareClient({req, res});

    const { data: {session },} = await supabaseMiddleware.auth.getSession();

    if(!session){
        return NextResponse.redirect(new URL('/usuario/usuarioLogin', req.url))
    }
    return res;
}

export const config ={
    matcher: [
        '/dashboard/:path*',
        '/task/createTask/:path*',
        '/task/readTask/:path*',
        '/task/updateTask/:path*',
        '/task/deleteTask/:path*'
       
    ],
   
}