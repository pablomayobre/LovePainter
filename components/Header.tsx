import { Avatar, Layout, Button, Tooltip, Typography } from "antd";
import { signout } from "next-auth/client";
import { LogoutOutlined, HomeOutlined } from "@ant-design/icons";
import Link from "next/link";

require("../styles/header.less");

const { Title } = Typography;

type User = { link: string; avatar: string; name: string };

const GithubAvatar = ({ user }: { user: User }) => {
  return (
    <Tooltip title="GitHub" placement="bottomLeft">
      <a href={user.link} target="_blank">
        <Avatar
          src={user.avatar}
          alt={`${user.name}'s GitHub Profile`}
          size="large"
        />
      </a>
    </Tooltip>
  );
};

const HomeButton = () => {
  return (
    <Tooltip title="Gists" placement="bottomLeft">
      <Link href="/" passHref>
        <Button size="large" shape="circle" icon={<HomeOutlined />} />
      </Link>
    </Tooltip>
  );
};

const SignOutButton = () => {
  return (
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
  );
};

const Header = ({ user, title }: { user?: User, title: string }) => {
  return (
    <Layout.Header>
      {user ? <GithubAvatar user={user} /> : <HomeButton />}
      <Title level={2}>{title}</Title>
      <SignOutButton/>
    </Layout.Header>
  );
};

export default Header;