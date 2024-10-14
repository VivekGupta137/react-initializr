import { Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

export const load_metadata = async (url: string) => {
    const fullName = extract_full_name(url);
    const metadataUrl = `https://api.github.com/repos/${fullName}`;
    const metadata = await fetch(metadataUrl, {
        method: "GET",
    });

    const metadataJson = await metadata.json();

    const requiredFields = {
        license: metadataJson.license.key,
        language: metadataJson.language ?? null,
        starsCount: metadataJson.stargazers_count ?? null,
        forksCount: metadataJson.forks_count ?? null,
        watchersCount: metadataJson.watchers_count ?? null,
        htmlUrl: metadataJson.html_url,
        cloneUrl: metadataJson.clone_url,
        homepage: metadataJson.homepage ?? null,
        orgName: metadataJson.owner.login,
        orgAvatarUrl: metadataJson.owner.avatar_url,
        repoName: metadataJson.name,
    }

    return requiredFields;
}

export const extract_full_name = (url: string) => {
    const parts = url.split('/').filter(Boolean);  // Filter out empty parts
    const fullName = `${parts[2]}/${parts[3]}`;

    return fullName;
}