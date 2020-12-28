import { Provider } from "next-auth/client";
import { AppProps } from "next/dist/next-server/lib/router/router";
import { Layout } from "antd";

require("../styles/globals.less");

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider session={pageProps.session}>
      <Layout className="lp-layout">
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
};

export default MyApp;
