import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { RedisSingleton } from "@/lib/redis";

const USERS_KEY = "users_list";

export async function POST(req: NextRequest) {
    try {
        const newUser = await req.json();
        const redisClient = await RedisSingleton.getInstance();
        // await redisClient.del("users_list");
        // return NextResponse.json({},{status:200})
        //1. Read list from Redis (string → JSON)
        const storedUsers = await redisClient.get(USERS_KEY);
        const users: any[] = storedUsers ? JSON.parse(storedUsers) : [];

        // 2. Check if user exists
        const exists = users.some((u) => {
            return JSON.stringify(u.credentials) === JSON.stringify(newUser.credentials);
        });

        let user_id: any;

        if (!exists) {
            // 3. Generate unique ID
            const id = crypto.randomUUID();

            const userToStore = {
                id,
                ...newUser,
            };

            // 4. Save updated array
            await redisClient.set(USERS_KEY, JSON.stringify([...users, userToStore]));
            user_id = id;
        }
        else {
            console.log(users)
            const found_user = users.find((elmnt) => {
                const value = elmnt.credentials;
                const user = newUser.credentials;
                return (
                    value.first_name === user.first_name &&
                    value.last_name === user.last_name &&
                    value.filiere === user.filiere
                );
            });
            console.log(found_user)
            user_id = found_user.id;
        }

        const res = NextResponse.json({
            id: user_id
        }, { status: 201 })

        res.cookies.set({
            name: "session_token",
            value: user_id,
            httpOnly: true,
            secure: true,
            path: "/",
            maxAge: 60 * 60 * 24, // 1 day
        });

        return res;

    } catch (err: any) {
        console.error("POST /api/users error:", err);
        return NextResponse.json(
            { error: "Server error or invalid data" },
            { status: 400 }
        );
    }
}




export async function GET(req: NextRequest) {
    try {
        const redisClient = await RedisSingleton.getInstance();
        const storedUsers = await redisClient.get(USERS_KEY);
        const users: any[] = storedUsers ? JSON.parse(storedUsers) : [];
        return NextResponse.json({
            users
        }, { status: 200 });
    }
    catch (err: any) {
        console.error("GET /api/user error:", err);
        return NextResponse.json(
            { error: "Server error or invalid data" },
            { status: 400 }
        );
    }
}




export async function PATCH(req: NextRequest) {
    try {
        const cookies = req.cookies;
        const session_token = cookies.get("session_token")?.value;
        const redisClient = await RedisSingleton.getInstance();
        if (session_token) {
            const storedUsers = await redisClient.get(USERS_KEY);
            const users: any[] = storedUsers ? JSON.parse(storedUsers) : [];
            const length = users.length;
            const user = users.find((u) => {
                return u.id == session_token;
            });
            const newUsers = users.filter((u) => {
                return u.id != session_token;
            });

            if (newUsers.length < length) {
                const data = await req.json();
                user.score = data.score;
                user.time = data.time;
                user.total = data.total;
                user.percentage = Math.round((data.score / data.total) * 100);
                await redisClient.set(USERS_KEY,JSON.stringify([...newUsers , user]));
                return NextResponse.json({
                    user
                },{status : 201});
            }

            else {
                return NextResponse.json({
                    message: "an authorized request"
                }, { status: 403 })
            }
        }
    }
    catch (err: any) {
        console.error("GET /api/user error:", err);
        return NextResponse.json(
            { error: "Server error or invalid data" },
            { status: 400 }
        );
    }
}




export async function DELETE(req: NextRequest) {
    try {
        // const cookies = req.cookies;
        // const session_token = cookies.get("session_token")?.value;
        const redisClient = await RedisSingleton.getInstance();
        // if (session_token) {
        //     redisClient.del(USERS_KEY);
        // }
        // else {
        //         return NextResponse.json({
        //             message: "an authorized request"
        //         }, { status: 403 })
        //     }
      redisClient.del(USERS_KEY);

      return NextResponse.json({
        good : true
      },{status : 201})
    } 
    catch (err: any) {
        console.error("GET /api/user error:", err);
        return NextResponse.json(
            { error: "Server error or invalid data" },
            { status: 400 }
        );
    }
}