import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { readFileSync } from "fs";
import { join } from "path";

export async function getStaticPaths() {
    const posts = await getCollection(
        "blog",
        ({ data }) => data.publishedAt !== null,
    );
    return posts.map((post) => ({
        params: { slug: post.slug },
        props: { id: post.id },
    }));
}

export const GET: APIRoute = ({ props }) => {
    const filePath = join(process.cwd(), "src/content/blog", props.id);
    const content = readFileSync(filePath, "utf-8");
    return new Response(content, {
        headers: { "Content-Type": "text/markdown; charset=utf-8" },
    });
};
