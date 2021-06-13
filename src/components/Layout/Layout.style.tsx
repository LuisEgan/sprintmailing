import styled from "styled-components";

export const LayoutWrapper = styled.div`
  width: 100vw;
  height: 100vh;
`;

export const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  background-color: #fff;
`;

export const ContentInnerWrapper = styled.div`
  width: 100%;
  height: auto;
  padding: 45px 30px;

  overflow-y: auto;

  @media only screen and (max-width: 767px) {
    padding: 45px 15px;
  } ;
`;

export const LayoutMainContent = styled.div`
  flex: 1;
`;

export const SideMenuWrapper = styled.div`
  position: fixed;
`;
