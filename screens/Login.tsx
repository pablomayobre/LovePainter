import { getProviders, signIn } from "next-auth/client";
import { Card, Row, Typography } from "antd";
import { GithubOutlined } from "@ant-design/icons";
import MainButton from "../components/MainButton";

const { Title, Paragraph, Link } = Typography;

export type Providers = {
  type: "providers";
  providers: ReturnType<typeof getProviders> extends Promise<infer T>
    ? T
    : never;
};

export default function SignIn({ providers }: Providers) {
  return (
    <Row justify="center" style={{margin: "24px 8px", maxWidth: 500}}>
      <Card
        style={{ width: "100%" }}
        cover={<img alt="LovePainter Logo" src="/heart.svg" />}
      >
        <div style={{ textAlign: "center" }}>
          <Title>LovePainter</Title>
          <Title level={5}>Write directly to your LoveBox.</Title>
          <Paragraph>
            This tool helps you modify your{" "}
            <Link href="https://gist.github.com" target="_blank">
              Gists
            </Link>{" "}
            to update the message in your{" "}
            <Link href="https://lisaih.de/Lovebox/" target="_blank">
              LoveBox
            </Link>{" "}
            device.
          </Paragraph>
        </div>
        {providers ? (
          Object.values(providers).map((provider) => (
            <MainButton
              onClick={() => signIn(provider.id)}
              icon={<GithubOutlined />}
              text={`Sign in with ${provider.name}`}
            />
          ))
        ) : (
          <Title level={2}>Error: Github sign in is not configured</Title>
        )}
      </Card>
    </Row>
  );
}
