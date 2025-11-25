import { NextRequest, NextResponse } from "next/server";
import { RedisSingleton } from "@/lib/redis";

const KEY = "config";
export async function POST(req: NextRequest) {
    const cookies = req.cookies;
    const redis = await RedisSingleton.getInstance();
    const session_token = cookies.get("admin_token")?.value;
    if(session_token != process.env.ADMI_TOKEN)
          return NextResponse.json({
            message : "Access denied"
        },{status : 401});

    const configData = await req.json();
    await redis.set(KEY,JSON.stringify(configData));    
    return NextResponse.json({
        configData
    },{status : 201});
}


export async function GET(req: NextRequest) {
    const redis = await RedisSingleton.getInstance();
    const sotredConfigs = await redis.get(KEY);
    const configData = sotredConfigs ?  JSON.parse(sotredConfigs) : {};
    return NextResponse.json({
        configData
    },{status : 201});
}