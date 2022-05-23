import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";

library.add(fab);
library.add(fas);

interface IIconProps extends FontAwesomeIconProps {}

const Icon = (props: IIconProps) => {
  const { icon, ...rest } = props;
  return <FontAwesomeIcon icon={icon} {...rest} />;
};

export default Icon;
