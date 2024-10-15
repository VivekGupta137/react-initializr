import { DBConnect } from "@/lib/dbutils";
import { NextResponse } from "next/server";
import prisma from "../../../../prisma";
import {
  processGitHubUrl,
  updateTemplateDependencies,
  upsertTemplateMetadata,
} from "@/lib/dataUtils";

export const dynamic = "force-dynamic"; // static by default, unless reading the request

export async function GET(request: Request) {
  try {
    await DBConnect();
    const templates = await prisma.template.findMany({
        where: {
            updatedAt: {
                lt: new Date(new Date().getTime() - 1000 * 60 * 60 )
            }
        },
        take: 10
    });
    const ghUrls = templates.map(({ url }) => url);

    const templateData = await Promise.all(
      ghUrls.map((url) => processGitHubUrl(url, templates))
    );

    // update the metadata
    await Promise.all(
      templates.map(async (template) => {
        const foundTemplate = templateData.find((t) => t.url === template.url);
        if (foundTemplate) {
          await upsertTemplateMetadata(foundTemplate, template.id);
        }
      })
    );

    await updateTemplateDependencies(templates, templateData);
    return NextResponse.json(
      {
        update: "success",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
    console.log("Disconnected from DB");
  }
}
