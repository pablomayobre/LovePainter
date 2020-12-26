import NextAuth, { Session } from "next-auth";
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
  NextAuth(req, res, {
    jwt: {
      secret: process.env.JWT_SECRET ?? "",
      encryption: true,
    },
    callbacks: {
      session: async (session, token: any) => {
        const newSession: Session & { oauth: string } = {
          ...session,
          oauth: token.oauth,
        };
        return Promise.resolve(newSession);
      },
      jwt: async (token, _user, account, _profile, _isNewUser) => {
        if (account) {
          token.oauth = account.accessToken;
        }

        return Promise.resolve(token);
      },
    },
    providers,
  });
