import { NextResponse } from "next/server";
import prisma from "../../../../prisma";
import bcrypt from "bcrypt";
import { DBConnect } from "@/lib/dbutils";

export const POST = async (req: Request) => {
    try{
        const {email, name, password} = await req.json();
        if(!email || !name || !password){
            throw new Error("Invalid input")
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await DBConnect();
        const user = await prisma.user.create({
            data: {
                email,
                name,
                hashedPassword
            }
        })
        return NextResponse.json({user}, {status: 201})
    }
    catch(error){
        return NextResponse.json({error: "Server Error"}, {status: 500})
    }
    finally{
        await prisma.$disconnect();
    }
};
