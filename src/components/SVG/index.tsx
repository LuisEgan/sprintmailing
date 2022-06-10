import { CSSProperties } from "react";
import { ReactSVG } from "react-svg";

interface ISVG {
  src: string;
  className?: string;
  width?: number | string;
  height?: number | string;
  size?: number;
  style?: CSSProperties;
  onClick?: () => void;
  fill?: string;
  stroke?: string;
}

const SVG = (props: ISVG) => {
  const {
    src,
    height,
    size,
    width,
    style,
    fill,
    stroke = "white",
    className = "",
    onClick: onClickProp,
  } = props;

  const onClick = () => {
    if (onClickProp) onClickProp();
  };

  let newStyle = `width: ${
    typeof width === "string" ? width : `${width || size || 30}px`
  }; height: ${
    typeof height === "string" ? height : `${height || size || 30}px`
  };`;

  if (fill) {
    newStyle += ` fill: ${fill};`;
  }

  if (stroke) {
    newStyle += ` stroke: ${stroke};`;
  }

  return (
    <ReactSVG
      {...{ style, src, onClick }}
      className={`${onClickProp ? "cursor-pointer" : ""} ${className}`}
      beforeInjection={(svg) => {
        svg.setAttribute("style", newStyle);
      }}
    />
  );
};

export default SVG;
