import { z } from "zod/mini";

const githubResponseSchema = z.object({
  total_count: z.number(),
  incomplete_results: z.boolean(),
  items: z.array(
    z.object({
      url: z.url(),
      repository_url: z.url(),
      html_url: z.url(),
      id: z.number(),
      title: z.string(),
      state: z.string(),
      created_at: z.string(),
      updated_at: z.string(),
      closed_at: z.nullable(z.string()),
    }),
  ),
});

export const getGithubPullRequests = async () => {
  const response = await fetch(
    "https://api.github.com/search/issues?q=author:gotamm+type:pr&sort=asc",
  );
  const responseData = await response.json();

  const pullRequestsData = githubResponseSchema.parse(responseData);

  return pullRequestsData.items;
};
