import { Octokit } from "@octokit/rest";
import { Session } from "next-auth/client";

const getPageCount = (link: string) => {
  const lastPage = /\?page=(\d+)&.+?rel="last"/gi.exec(link);

  return lastPage !== null ? +lastPage : 1;
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
  url: string;
};

type Gist = {
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
    url: value.url,
  };
};

export type Gists = {
  pages: number;
  oauth?: string;
  current: number;
  gists: Gist[];
};

type ModifiedSession = null | (Session & { oauth?: string });

export const getGists = async ({
  session,
  perPage = 50,
  page = 1,
}: {
  session?: ModifiedSession;
  perPage?: number;
  page?: number;
}): Promise<Gists> => {
  if (!session || !session.oauth)
    return { oauth: undefined, pages: 1, current: 1, gists: [] };

  const req = await new Octokit({
    auth: session.oauth,
  }).gists.list({ per_page: perPage, page: page });

  const pages = getPageCount(req.headers.link ? req.headers.link : "");

  return {
    pages,
    oauth: session.oauth,
    current: Math.max(page, pages),
    gists: req.data.map(dataToGist),
  };
};
