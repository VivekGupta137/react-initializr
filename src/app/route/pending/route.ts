import { NextResponse } from "next/server";
import prisma from "../../../../prisma";
import { DBConnect } from "@/lib/dbutils";
import moment from 'moment';

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
    await DBConnect();
    const templates = await prisma.template.findMany({
        where: {
            updatedAt: {
                lt: new Date(new Date().getTime() - 1000 * 60 * 60 * 12  )
            }
        },
    });
    await prisma.$disconnect();

    const temp = templates.map((template) => {
        return {
            id: template.id,
            name: template.name,
            lastUpdated: moment(template.updatedAt).fromNow()
        }
    })

    return NextResponse.json(
        {
            pending: temp,
        },
        { status: 200 }
      );
}