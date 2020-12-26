import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import type { NextApiRequest, NextApiResponse } from "next";

const providers: ReturnType<typeof Providers.GitHub>[] = [];

if (process.env.GITHUB_ID && process.env.GITHUB_SECRET)
  providers.push(
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      scope: "read:user user:email gist",
    })
  );

export default (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, { providers });
