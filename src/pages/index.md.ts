import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { formatDate } from "../utils/date";
import { getGithubPullRequests } from "../api/github";
import { extractRepositoryName } from "../utils/github";
import { getTalks } from "../api/talks";

export const GET: APIRoute = async () => {
    const blogEntries = await getCollection("blog");
    const publishedBlogPosts = blogEntries
        .filter((a) => a.data.publishedAt !== null)
        .sort((a, b) => {
            const dateA = new Date(a.data.publishedAt!).getTime();
            const dateB = new Date(b.data.publishedAt!).getTime();
            return dateB - dateA;
        });

    const ossContributions = await getGithubPullRequests();
    const talks = getTalks();

    const lines: string[] = [
        "# Matteo Gobbo",
        "",
        "Senior Front-End Developer at [Kleecks](https://www.kleecks.com/), a SaaS company specialized in performance marketing and helping businesses optimize their websites across SEO, UX, performance, and content.",
        "Previously at [Conio](https://www.conio.com/), where I developed a passion for product thinking and learned how to build, iterate on, and maintain a frontend product with long-term quality in mind.",
        "",
        "## Writings",
        "",
    ];

    if (publishedBlogPosts.length === 0) {
        lines.push("No posts yet.");
    } else {
        for (const post of publishedBlogPosts) {
            lines.push(
                `- [${post.data.title}](/writings/${post.slug}) — ${formatDate(post.data.publishedAt!)}`,
            );
        }
    }

    lines.push(
        "",
        "## Contributions",
        "",
        ...ossContributions.map(
            (c) =>
                `- [${c.title}](${c.html_url}) — ${extractRepositoryName(c.repository_url)} — ${formatDate(c.created_at)}`,
        ),
        "",
        "## Talks",
        "",
        ...talks.map(
            (t) =>
                `- [${t.title}: ${t.subTitle}](${t.link}) — ${t.event} — ${formatDate(t.date)}`,
        ),
        "",
        "## Contacts",
        "",
        "- [LinkedIn](https://www.linkedin.com/in/matteo-gobbo/)",
        "- [X / Twitter](https://twitter.com/matteogobbo_)",
        "- [GitHub](https://github.com/matteo-gobbo)",
    );

    return new Response(lines.join("\n"), {
        headers: { "Content-Type": "text/markdown; charset=utf-8" },
    });
};
