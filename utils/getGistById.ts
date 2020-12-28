import { Octokit } from "@octokit/rest";
import { ModifiedSession } from "./getGists";

export type FullGist = ReturnType<typeof getGistById> extends Promise<infer T> ? T : never

const getGistSafely = async (octokit: Octokit, id: string) => {
  try {
    return await octokit.gists.get({ gist_id: id })
  } catch (e) {
    return undefined
  }
}

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
  
  const [user, req] = await Promise.all([octo.users.getAuthenticated(), getGistSafely(octo, id)])
  
  if (!req || !req.data.owner || req.data.owner.id !== user.data.id) {
    return
  }
  
  return req.data;
};