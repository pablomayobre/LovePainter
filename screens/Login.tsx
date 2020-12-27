import { getProviders, signIn } from "next-auth/client";
import { Button, Card, Row, Col, Typography, Space } from "antd";
import { GithubOutlined } from "@ant-design/icons";

const { Title, Paragraph, Link } = Typography;

export type Providers = {
  providers: ReturnType<typeof getProviders> extends Promise<infer T>
    ? T
    : never;
};

export default function SignIn({ providers }: Providers) {
  if (!providers) return <h1>Error: No configured providers</h1>;

  return (
    <Row justify="center" align="middle" style={{ minHeight: "100vh", padding: 20 }}>
        <Card
          style={{ width: "100%", maxWidth: 500, margin: "0 auto" }}
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
                <Button
                  style={{ backgroundColor: "black", borderColor: "#333333" }}
                  key={provider.id}
                  block
                  type="primary"
                  size="large"
                  onClick={() => signIn(provider.id)}
                >
                  <GithubOutlined />
                  Sign in with {provider.name}
                </Button>
              ))
            ) : (
              <Title level={2}>Error: Github sign in is not configured</Title>
            )}
        </Card>
    </Row>
  );
}
