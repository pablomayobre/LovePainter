import {Button, Typography} from "antd"
import { ButtonProps } from "antd/lib/button";

require("../styles/mainButton.less")

const MainButton: React.FC<ButtonProps & {text: string}> = ({text, icon, ...props}) => {
  return (
    <Button
      className="lp-mainButton"
      block
      type="primary"
      size="large"
      {...props}
    >
      {icon}
      <Typography.Text strong>
        {text}
      </Typography.Text>
    </Button>
  );
};

export default MainButton
