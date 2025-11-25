import { NextRequest, NextResponse } from "next/server";
import { RedisSingleton } from "@/lib/redis";

const USERS_KEY = "users_list";
export async function GET(req: NextRequest) {
     const params = req.nextUrl.searchParams;
     const cookies = req.cookies;
     const isAdminRequest = params.get('admin')
     if(isAdminRequest){
         const admin_token = cookies.get("admin_token")?.value;
         if (admin_token && admin_token == process.env.ADMI_TOKEN)
              return NextResponse.json({
              adminConnection : true
            },{status : 200})     ;         
     }
    const redis = await RedisSingleton.getInstance();
    const session_token = cookies.get("session_token")?.value;
    let connected = false;
    if (session_token) {
        const storedUsers = await redis.get(USERS_KEY);
        const users: any[] = storedUsers ? JSON.parse(storedUsers) : [];
        console.log(session_token)
        const exists = users.some((u) => {
            return  u.id == session_token;
        });
        connected = exists;
    }
    return NextResponse.json({
        connected
    } ,{status : 200});
}