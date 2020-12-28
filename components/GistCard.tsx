import { Gist } from "../utils/getGists";
import { Badge, Typography, Card, Space, Popover } from "antd";
import TimeAgo from "react-timeago";
import Link from "next/link";
import { FileOutlined, GithubOutlined } from "@ant-design/icons";
import Wall from "./Wall";

const { Text } = Typography;
const { Ribbon } = Badge;

const Files = ({ files }: { files: string[] }) => {
  return (
    <Space direction="vertical" size="small">
      {files.map((name, index) => {
        return <Text key={index}>{name}</Text>;
      })}
    </Space>
  );
};

const GithubLink = ({ url }: { url: string }) => {
  return (
    <Typography.Link href={url} target="_blank">
      <Wall>
        <Space>
          <GithubOutlined />
          <Text>Open in Github</Text>
        </Space>
      </Wall>
    </Typography.Link>
  );
};

const FilePopup = ({ files }: { files: string[] }) => {
  return (
    <Popover content={<Files files={files} />} trigger="click">
      <Wall>
        <Space>
          <FileOutlined />
          <Text>
            {files.length} file
            {files.length !== 1 ? "s" : ""}
          </Text>
        </Space>
      </Wall>
    </Popover>
  );
};

const TimePopup = ({date, title}: {date: string, title: string}) => {
  return <Popover content={<Text>{title}</Text>} trigger="click">
  <Wall>
    <Text>
      <TimeAgo date={date} />
    </Text>
  </Wall>
</Popover>
}

const GistCard = ({ gist }: { gist: Gist }) => {
  return (
    <Ribbon
      text={gist.public ? "Public" : "Secret"}
      color={gist.public ? "green" : "blue"}
    >
      <Link href={`/gist/${gist.id}`}>
        <Card
          hoverable
          title={gist.name}
          style={{ width: "100%" }}
          actions={[
            <GithubLink url={gist.url} />,
            <FilePopup files={gist.files}/>,
            <TimePopup date={gist.createdAt} title="Created"/>,
          ]}
        >
          <Text>{gist.description}</Text>
        </Card>
      </Link>
    </Ribbon>
  );
};

export default GistCard;
