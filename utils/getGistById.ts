import { Octokit } from "@octokit/rest";
import { ModifiedSession } from "./getGists";

export type FullGist = ReturnType<typeof getGistById> extends Promise<infer T> ? T : never

export const getGistById = async ({
  session,
  id
}: {
  session?: ModifiedSession;
  id: string
}) => {
  if (!session || !session.oauth || !session.user.name)
    return;

  const octo = new Octokit({
    auth: session.oauth,
  })
  
  const [user, req] = await Promise.all([octo.users.getAuthenticated(), octo.gists.get({ gist_id: id })])
  
  if (!req.data.owner || req.data.owner.id !== user.data.id) {
    return
  }
  
  return req.data;
};