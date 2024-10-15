import { NextResponse } from "next/server";
import prisma from "../../../../prisma";
import { DBConnect } from "@/lib/dbutils";

export async function GET(request: Request) {
    await DBConnect();
    const templates = await prisma.template.findMany({
        where: {
            updatedAt: {
                lt: new Date(new Date().getTime() - 1000 * 60 * 60 )
            }
        },
        take: 10
    });
    await prisma.$disconnect();
    return NextResponse.json(
        {
            pending: templates,
        },
        { status: 200 }
      );
}