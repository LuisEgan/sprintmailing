import styled from "styled-components";

export const LogoWrapper = styled.div`
  align-items: stretch;
  background-color: #363840;
  display: flex;
  justify-content: center;

  & > div {
    width: 60%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 30px;
    color: #99a2bc;

    & > div {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    & p {
      font-weight: bold;
      font-size: 18px;
      margin-bottom: 30px;
      text-align: center;
    }

    & span {
      font-size: 16px;
    }
  }
`;

export const Copyright = styled.div`
  background-color: #2a2c34;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  bottom: 0px;

  & p {
    color: #99a2bc;
  }
`;
