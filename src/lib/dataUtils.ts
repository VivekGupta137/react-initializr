import "server-only"
import { Prisma } from "@prisma/client";
import prisma from "../../prisma";
import { TemplateType } from "@/app/route/update/route";

export const load_pkg_json = async (url: string) => {
  const packageJsonResp = await fetch(url, {
    method: "GET",
  });

  const packageJson = await packageJsonResp.json();
  const dependencies = packageJson.dependencies ?? {};
  const devDependencies = packageJson.devDependencies ?? {};

  const allDependencies = [
    // Insert dependencies into Dependency collection
    ...Object.entries(dependencies).map(([depName, version]) => ({
      name: depName,
      version: version as string,
    })),
    // Insert devDependencies into Dependency collection
    ...Object.entries(devDependencies).map(([depName, version]) => ({
      name: depName,
      version: version as string,
    })),
  ];

  return  {
    name: packageJson.name,
    description: packageJson.description ?? null,
    url,
    dependencies: allDependencies,
  };
};

export const load_metadata = async (metadataUrl: string) => {
  const metadata = await fetch(metadataUrl, {
    method: "GET",
  });

  const metadataJson = await metadata.json();

  const requiredFields = {
    license: metadataJson.license?.key ?? null,
    language: metadataJson.language ?? null,
    starsCount: metadataJson.stargazers_count ?? null,
    forksCount: metadataJson.forks_count ?? null,
    watchersCount: metadataJson.watchers_count ?? null,
    orgName: metadataJson.owner.login,
    orgAvatarUrl: metadataJson.owner.avatar_url,
    repoName: metadataJson.name,
    htmlUrl: metadataJson.html_url,
    cloneUrl: metadataJson.clone_url,
    homepage: metadataJson.homepage ?? null,
    templateLastUpdatedAt: metadataJson.updated_at,
    full_name: metadataJson.full_name ?? null,
  } as Prisma.TemplateMetadataCreateInput;

  return requiredFields;
};

export const extract_full_name = (url: string) => {
  const parts = url.split("/").filter(Boolean); // Filter out empty parts
  const fullName = `${parts[2]}/${parts[3]}`;

  return fullName;
};

type ProcessGitHubUrlReturnType = Awaited<ReturnType<typeof processGitHubUrl>>

export async function updateTemplateDependencies(templates: TemplateType, templateData: ProcessGitHubUrlReturnType[]) {
    
    // Remove dependencies
    await Promise.all(templates.map(async (template) => {
        if(!template.id)
            await prisma.dependency.deleteMany({
                where: { templateId: template.id }
            });
    }));

    // Add new dependencies
    await Promise.all(templates.map(async (template) => {
        const dependencies = templateData.find(t => t.url === template.url.toString())?.dependencyData ?? [];
        await prisma.dependency.createMany({
            data: dependencies
        });
    }));
}

export async function upsertTemplateMetadata(template: ProcessGitHubUrlReturnType, id: string) {
    const metadataUpdate = template.templateDoc.metadata as Prisma.TemplateMetadataUpdateInput;
    const metadataCreate = {
        ...metadataUpdate,
        templateId: id
    } as Prisma.TemplateMetadataCreateInput;

    await prisma.$transaction([
        prisma.templateMetadata.upsert({
            where: { templateId: id },
            update: metadataUpdate,
            create: metadataCreate
        }),
        prisma.template.update({
            where: { id: id },
            data: { updatedAt: new Date() } // Update the Template table's updatedAt field
        })
    ]);
}

export async function processGitHubUrl(url: string, templates: TemplateType) {
    const fullName = extract_full_name(url);
    const { name, description, dependencies } = await load_pkg_json(url);
    const metadataUrl = `https://api.github.com/repos/${fullName}`;
    const metadata = await load_metadata(metadataUrl);

    // Prepare the dependencies data
    const dependencyData: Prisma.DependencyCreateManyInput[] = dependencies
        .map(dep => ({
            name: dep.name,
            version: dep.version,
            templateId: templates.find(t => t.url === url)?.id
        }))
        .filter(dep => dep.templateId !== undefined) as Prisma.DependencyCreateManyInput[];

    const templateDoc = {
        name,
        description,
        metadata
    };

    return { url, templateDoc, dependencyData };
}
