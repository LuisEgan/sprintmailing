import React from "react";
import { Button } from "rsuite";
import NoResultSvg from "./astronaut.svg";
import { NoResultWrapper, ImageWrapper, ButtonWrapper } from "./NoResult.style";
// import { ArrowPrev } from '../AllSvgIcon';

type NoResultProps = {
  id?: string;
  onClick?: () => void;
  hideButton?: boolean;
  style?: any;
};

const NoResult: React.FC<NoResultProps> = ({
  id,
  onClick,
  hideButton = false,
  style,
}) => {
  return (
    <NoResultWrapper id={id} style={style}>
      <ImageWrapper>
        <img src={NoResultSvg} alt="No Result" width="230px" />
      </ImageWrapper>
      <h6>No se encuentran datos</h6>

      {hideButton ? (
        <ButtonWrapper>
          <div onClick={onClick}>
            <Button>
              Try Again Later
              {/* <ArrowPrev /> Go Back */}
            </Button>
          </div>
        </ButtonWrapper>
      ) : null}
    </NoResultWrapper>
  );
};

export default NoResult;
