import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getSession } from "next-auth/client";
import { FullGist, getGistById } from "../../utils/getGistById";

export const getServerSideProps: GetServerSideProps<{
  gist?: FullGist;
}> = async (context) => {
  const { query, res } = context;

  const session = await getSession(context);

  if (!session || !query.id) {
    res.setHeader("location", `/`);
    res.statusCode = 302;
    res.end();

    return { props: {} };
  }

  let id: string | undefined;
  if (typeof query.id !== "string") {
    id = query.id[query.id.length - 1];
  } else {
    id = query.id;
  }

  const gist = await getGistById({ session, id });

  return {
    props: { gist },
  };
};

const Gist = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  return null
};

export default Gist;
