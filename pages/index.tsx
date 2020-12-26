import dynamic from "next/dynamic";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getProviders, getSession } from "next-auth/client";
import { getGists, Gists } from "../utils/getGists";
import { Providers } from "../screens/Login";

const Login = dynamic(() => import("../screens/Login"));
const GistList = dynamic(() => import("../screens/GistList"));

export const getServerSideProps: GetServerSideProps<Gists & Providers> = async (
  context
) => {
  const session = await getSession(context);

  return {
    props: {
      providers: await getProviders(),
      ...(await getGists({ session })),
    },
  };
};

export default function Page({
  providers,
  ...gists
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (!gists.oauth) return <Login providers={providers} />;
  else return <GistList {...gists} />;
}
