"use server";

import { templateFormSchema } from "@/lib/formType";
import { z } from "zod";
import prisma from "../../prisma";
import { DBConnect } from "@/lib/dbutils";
import { revalidatePath } from "next/cache";
import { metadata } from "@/app/layout";
import { load_metadata } from "@/lib/dataUtils";

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
      create : [
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
      ]
    },
    metadata: {
      create: await load_metadata(data.url)
    }
  };

  await DBConnect();
  
  const template = await prisma.template.create({
    data: templateDoc,
  })

  await prisma.$disconnect();
  revalidatePath("/");
  return { template };
}
