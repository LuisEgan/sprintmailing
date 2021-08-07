import styled from "styled-components";

export const AvatarContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const AvatarImage = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 100%;
  background-size: cover;
  background-position: center center;
`;

export const UserInfoContainer = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  padding-left: 1rem;
`;

export const UserInfo = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 64px;
`;
