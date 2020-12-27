import { Avatar, Layout, Button, Tooltip, Typography } from "antd";
import { signout, useSession } from "next-auth/client";
import { Gists } from "../utils/getGists";
import { LogoutOutlined } from "@ant-design/icons";
import React from "react";

require("../styles/header.less");

const { Title } = Typography;
const { Header, Content } = Layout;

export default function GitList(gists: Gists) {
  const [session, loading] = useSession();
  //console.log(pages, current, oauth, gists);
  return (
    <Layout style={{ alignItems: "center", minHeight: "100vh" }}>
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
      <Content style={{ paddingTop: 72 }}>
        <Title>Here you would see your gists</Title>
      </Content>
    </Layout>
  );
}
