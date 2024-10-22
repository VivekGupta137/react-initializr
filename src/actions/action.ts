"use server";

import { templateFormSchema } from "@/lib/formType";
import { z } from "zod";
import prisma from "../../prisma";
import { DBConnect } from "@/lib/dbutils";
import { revalidatePath } from "next/cache";
import { metadata } from "@/app/layout";
import {
  load_metadata,
  processGitHubUrl,
  upsertTemplateMetadata,
} from "@/lib/dataUtils";

export async function actionAddTemplate(
  data: z.infer<typeof templateFormSchema>
) {
  // test if the url is valid
  templateFormSchema.parse(data);

  const packageJsonResp = await fetch(data.url, {
    method: "GET",
  });
  const packageJson = await packageJsonResp.json();
  const dependencies = packageJson.dependencies || {};
  const devDependencies = packageJson.devDependencies || {};

  const templateDoc = {
    name: packageJson.name,
    description: packageJson.description || null,
    url: data.url,
    dependencies: {
      create: [
        // Step 4: Insert dependencies into Dependency collection
        ...Object.entries(dependencies).map(([depName, version]) => ({
          name: depName,
          version: version as string,
        })),
        // Step 5: Insert devDependencies into Dependency collection
        ...Object.entries(devDependencies).map(([depName, version]) => ({
          name: depName,
          version: version as string,
        })),
      ],
    },
  };

  await DBConnect();

  const template = await prisma.template.create({
    data: templateDoc,
  });

  const templateMetadata = await processGitHubUrl(data.url, [template]);
  await upsertTemplateMetadata(templateMetadata, template.id);

  await prisma.$disconnect();
  revalidatePath("/");
  return { success: true };
}

export const getClaps = async () => {
  const clap = await prisma.claps.findFirst();
  return {
    clap: clap?.count ?? 0,
  };
}

export const addClap = async () => {
  const clap = await prisma.claps.findFirst();

  if (clap) {
    await prisma.claps.update({
      where: {
        id: clap.id,
      },
      data: {
        count: clap.count + 1,
      },
    });
  } else {
    await prisma.claps.create({
      data: {
        count: 1,
      },
    });
  }
  return {
    clap: (clap?.count ?? 0) + 1,
    success: true,
  };
};
