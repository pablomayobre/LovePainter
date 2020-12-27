import {
  Badge,
  Avatar,
  Layout,
  Button,
  Row,
  Tooltip,
  Typography,
  Card,
  Space,
  Popover,
  Pagination,
} from "antd";
import TimeAgo from "react-timeago";
import Link from "next/link";
import { signout } from "next-auth/client";
import { useRouter } from "next/router";
import { Gists } from "../utils/getGists";
import {
  FileOutlined,
  GithubOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { forwardRef, HTMLProps, useEffect } from "react";

require("../styles/header.less");

const { Title, Paragraph, Text } = Typography;
const { Header, Content } = Layout;
const { Ribbon } = Badge;

const Wall = forwardRef<HTMLDivElement, HTMLProps<HTMLDivElement>>(
  ({ children, onClick, ...props }, ref) => {
    return (
      <div
        ref={ref}
        {...props}
        onClick={(event) => {
          onClick?.(event);
          event.stopPropagation();
        }}
      >
        {children}
      </div>
    );
  }
);

export default function GitList(gists: Gists) {
  const router = useRouter();

  useEffect(() => {
    if (router.query.page !== `${gists.current}`)
      router.replace(`/?page=${gists.current}`, undefined, { shallow: true });
  }, [])

  return (
    <Layout style={{ alignItems: "center", minHeight: "100vh", width: "100%" }}>
      <Header>
        <Tooltip title="GitHub" placement="bottomLeft">
          <a href={gists.link} target="_blank">
            <Avatar
              src={gists.avatar}
              alt={`${gists.name}'s GitHub Profile`}
              size="large"
            />
          </a>
        </Tooltip>
        <Title level={2}>Gists</Title>
        <Tooltip title="Sign out" placement="bottomRight">
          <Button
            size="large"
            shape="circle"
            icon={<LogoutOutlined />}
            onClick={() =>
              signout({ callbackUrl: "https://lovepainter.vercel.app/" })
            }
          />
        </Tooltip>
      </Header>
      <Content
        style={{ padding: "82px 10px 12px", width: "100%", maxWidth: 820 }}
      >
        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
          <Button
            style={{ width: "100%", borderRadius: 10 }}
            type="default"
            block
            size="large"
            onClick={() => console.log("Create New Gist")}
          >
            <Text strong>New Gist</Text>
          </Button>
          {gists.gists.map((gist, index) => {
            const files = (
              <Space direction="vertical" size="small">
                {gist.files.map((name, fileIndex) => {
                  return <Text key={`${index}-${fileIndex}`}>{name}</Text>;
                })}
              </Space>
            );

            return (
              <Ribbon
                key={index}
                text={gist.public ? "Public" : "Secret"}
                color={gist.public ? "green" : "blue"}
              >
                <Link href={`${router.asPath}#${gist.id}`}>
                  <Card
                    hoverable
                    title={gist.name}
                    key={index}
                    style={{ width: "100%" }}
                    actions={[
                      <Typography.Link href={gist.url} target="_blank">
                        <Wall>
                          <Space>
                            <GithubOutlined />
                            <Text>Open in Github</Text>
                          </Space>
                        </Wall>
                      </Typography.Link>,
                      <Popover content={files} trigger="click">
                        <Wall>
                          <Space>
                            <FileOutlined />
                            <Text>
                              {gist.files.length} file
                              {gist.files.length !== 1 ? "s" : ""}
                            </Text>
                          </Space>
                        </Wall>
                      </Popover>,
                      <Popover content={<Text>Created</Text>} trigger="click">
                        <Wall>
                          <Text>
                            <TimeAgo date={gist.createdAt} />
                          </Text>
                        </Wall>
                      </Popover>,
                    ]}
                  >
                    <Paragraph>{gist.description}</Paragraph>
                  </Card>
                </Link>
              </Ribbon>
            );
          })}
          <Row justify="center">
            <Pagination
              simple
              hideOnSinglePage
              defaultPageSize={1}
              total={gists.pages}
              current={gists.current}
              onChange={(page: number) => {
                router.push(`/?page=${page}`);
              }}
            />
          </Row>
        </Space>
      </Content>
    </Layout>
  );
}
