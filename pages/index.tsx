import dynamic from "next/dynamic";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getProviders, getSession } from "next-auth/client";
import { getGists, Gists } from "../utils/getGists";
import { Providers } from "../screens/Login";

const Login = dynamic(() => import("../screens/Login"));
const GistList = dynamic(() => import("../screens/GistList"));

export const getServerSideProps: GetServerSideProps<Gists | Providers> = async (
  context
) => {
  const session = await getSession(context);

  const gists = await getGists({ session });

  if (!gists)
    return {
      props: { type: "providers", providers: await getProviders() },
    };
  else
    return {
      props: gists,
    };
};

export default function Page(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  if (props.type === "providers") return <Login {...props} />;
  else return <GistList {...props} />;
}
