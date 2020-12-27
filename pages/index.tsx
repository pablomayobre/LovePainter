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
  const {query, res} = context;

  let page = 1

  if (query.page) {
    if (typeof query.page === "string")
      page = +query.page;
    else
      page = +query.page[query.page.length - 1]
  }

  page = isNaN(page) ? 1 : (page <= 0 ? 1 : page)

  const gists = await getGists({ session, page });

  if (!gists)
    return {
      props: { type: "providers", providers: await getProviders() },
    };
  else {
    if (gists.current !== page) {
      context.res.setHeader("location", `/?page=${gists.current}`);
      context.res.statusCode = 302;
      context.res.end();
    }

    return {
      props: gists,
    };
  }
};

export default function Page(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  if (props.type === "providers") return <Login {...props} />;
  else return <GistList {...props} />;
}
