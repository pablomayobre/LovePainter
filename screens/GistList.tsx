import { Layout, Button, Typography, Space } from "antd";
import { Gists } from "../utils/getGists";
import { PlusOutlined } from "@ant-design/icons";
import Header from "../components/Header";
import GistCard from "../components/GistCard";
import Paginator from "../components/Paginator";
import MainButton from "../components/MainButton";

const { Text } = Typography;
const { Content } = Layout;

export default function GitList(gists: Gists) {
  return (
    <>
      <Header user={gists} title="Gists" />
      <Content
        style={{ padding: "82px 10px 24px", width: "100%", maxWidth: 820 }}
      >
        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
          <MainButton icon={<PlusOutlined />} text="New Gist" />
          {gists.gists.map((gist, index) => (
            <GistCard gist={gist} key={index} />
          ))}
          <Paginator currentPage={gists.current} pages={gists.pages} />
        </Space>
      </Content>
    </>
  );
}
