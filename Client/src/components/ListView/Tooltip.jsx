import { Button } from "react-bootstrap";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

const TooltipComponent = (props) => {
  const icon = props.icon;
  const tooltipText = props.text;

  return (
    <OverlayTrigger
      key="top"
      placement="top"
      overlay={<Tooltip id="tooltip-top">{tooltipText}</Tooltip>}
    >
      <Button variant="none" className="btnIcon">
        {icon}
      </Button>
    </OverlayTrigger>
  );
};

export default TooltipComponent;
