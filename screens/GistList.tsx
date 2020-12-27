import {
  Badge,
  Avatar,
  Layout,
  Button,
  Tooltip,
  Typography,
  Col,
  Card,
  Space,
} from "antd";
import Link from "next/link";
import { signout, useSession } from "next-auth/client";
import { Gists } from "../utils/getGists";
import { LogoutOutlined } from "@ant-design/icons";
import React from "react";

require("../styles/header.less");

const { Title, Paragraph, Text } = Typography;
const { Header, Content } = Layout;
const { Ribbon } = Badge;

export default function GitList(gists: Gists) {
  const [session, loading] = useSession();
  //console.log(pages, current, oauth, gists);
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
      <Content style={{ padding: "72px 10px", width: "100%", maxWidth: 820 }}>
        <Space direction="vertical" size="middle" style={{width: "100%"}}>
          <Button
            style={{ width: "100%" }}
            type="primary"
            block
            size="large"

            onClick={() => console.log("Create New Gist")}
          >
            <Text strong>New Gist</Text>
          </Button>
          {gists.gists.map((gist, index) => {
            return (
              <Ribbon
                key={index}
                text={gist.public ? "Public" : "Secret"}
                color={gist.public ? "green" : "blue"}
              >
                <Link href={`/#${gist.id}`}>
                  <Card
                    title={gist.name}
                    key={index}
                    hoverable
                    style={{ width: "100%" }}
                  >
                    <Paragraph>{gist.description}</Paragraph>
                  </Card>
                </Link>
              </Ribbon>
            );
          })}
        </Space>
      </Content>
    </Layout>
  );
}
