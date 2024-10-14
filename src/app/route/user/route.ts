import { DBConnect } from "@/lib/dbutils";
import { NextResponse } from "next/server"
import prisma from "../../../../prisma";

export const GET = async () => {
    try {
        await DBConnect();
        const users = await prisma.user.findMany();
        return NextResponse.json({users}, {status: 200})
    }
    catch(e){
        return NextResponse.json({error: "Server Error"}, {status: 500})
    }
    finally{
        await prisma.$disconnect();
    }
}