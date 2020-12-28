import { Octokit } from "@octokit/rest";
import { Session } from "next-auth/client";

const getPageCount = (link: string, current: number) => {
  const lastPage = /[^_]page=(\d+)[^"]+?rel="last"/gi.exec(link);

  return lastPage !== null ? +lastPage[1] : current;
};

type Files = Record<
  string,
  {
    filename?: string;
  }
>;

type Data = {
  description: string | null;
  id: string;
  files: Files;
  public: boolean;
  node_id: string;
  created_at: string;
  html_url: string;
};

export type Gist = {
  description: string;
  id: string;
  name: string;
  files: string[];
  public: boolean;
  nodeId: string;
  createdAt: string;
  url: string;
};

const dataToGist = (value: Data): Gist => {
  const files = Object.values(value.files).map((file) => file.filename ?? "");

  return {
    description: value.description ?? "",
    id: value.id,
    name: files.find((name) => name !== "") ?? "",
    files: files,
    public: value.public,
    nodeId: value.node_id,
    createdAt: value.created_at,
    url: value.html_url
  };
};

export type Gists = {
  type: "gists";
  link: string;
  avatar: string;
  name: string;
  pages: number;
  oauth: string;
  current: number;
  gists: Gist[];
};

export type ModifiedSession = null | (Session & { oauth?: string });

export const getGists = async ({
  session,
  perPage = 50,
  page = 1,
}: {
  session?: ModifiedSession;
  perPage?: number;
  page?: number;
}): Promise<Gists | null> => {
  if (!session || !session.oauth || !session.user.image || !session.user.name)
    return null;

  const octo = new Octokit({
    auth: session.oauth,
  })
  
  const [user, req] = await Promise.all([
    octo.users.getAuthenticated(),
    octo.gists.list({ per_page: perPage, page: page })
  ])

  const pages = getPageCount(req.headers.link ? req.headers.link : "", page);

  return {
    type: "gists",
    avatar: session.user.image,
    link: user.data.html_url,
    name: session.user.name,
    pages,
    oauth: session.oauth,
    current: Math.min(page, pages),
    gists: req.data.map(dataToGist),
  };
};
