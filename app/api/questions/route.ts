import { NextRequest, NextResponse } from "next/server";
import { RedisSingleton } from "@/lib/redis";
import crypto from "crypto";

const KEY = "Questions";

export async function POST(req: NextRequest) {
    try {
        const newQuestion = await req.json();
        const redisClient = await RedisSingleton.getInstance();
        const storedUsers = await redisClient.get(KEY);
        const questions: any[] = storedUsers ? JSON.parse(storedUsers) : [];
        await redisClient.set(KEY, JSON.stringify([...questions, newQuestion]));
        return NextResponse.json({
            newQuestion
        }, { status: 201 });
    }
    catch (err: any) {
        console.error("POST /api/admin/questions error:", err);
        return NextResponse.json(
            { error: "Server error or invalid data" },
            { status: 400 }
        );
    }
}


export async function GET(req: NextRequest) {
    try {
        const redisClient = await RedisSingleton.getInstance();
        const storedUsers = await redisClient.get(KEY);
        const questions: any[] = storedUsers ? JSON.parse(storedUsers) : [];
        return NextResponse.json({
            questions
        }, { status: 200 });
    }
    catch (err: any) {
        console.error("GET /api/admin/questions error:", err);
        return NextResponse.json(
            { error: "Server error or invalid data" },
            { status: 400 }
        );
    }
}




export async function PATCH(req: NextRequest) {
    try {
        const newQuestion = await req.json();
        console.log(newQuestion)
        const redisClient = await RedisSingleton.getInstance();
        const storedUsers = await redisClient.get(KEY);
        const questions: any[] = storedUsers ? JSON.parse(storedUsers) : [];
        const new_questions = questions.filter(value => value.id != newQuestion?.id);
        await redisClient.set(KEY, JSON.stringify([...new_questions, newQuestion]));
        return NextResponse.json({
            newQuestion
        }, { status: 201 });
    }
    catch (err: any) {
        console.error("PATCH /api/admin/questions error:", err);
        return NextResponse.json(
            { error: "Server error or invalid data" },
            { status: 400 }
        );
    }
}





export async function DELETE(req: NextRequest) {
    try {
        const params = req.nextUrl.searchParams;
        const newQuestion = {id : params.get('id')}
        const redisClient = await RedisSingleton.getInstance();
        const storedUsers = await redisClient.get(KEY);
        const questions: any[] = storedUsers ? JSON.parse(storedUsers) : [];
        const new_questions = questions.filter(value => value.id != newQuestion?.id);
        await redisClient.set(KEY, JSON.stringify([...new_questions]));
        return NextResponse.json({
            newQuestion
        }, { status: 201 });
    }
    catch (err: any) {
        console.error("POST /api/admin/questions error:", err);
        return NextResponse.json(
            { error: "Server error or invalid data" },
            { status: 400 }
        );
    }
}
