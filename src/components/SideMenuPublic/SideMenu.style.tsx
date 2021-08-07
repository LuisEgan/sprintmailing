import styled from "styled-components";

export const SidebarWrapper = styled.div`
  height: 100vh;
  padding-bottom: 3rem;
  scrollbar-width: none;
  overflow: auto;
  -ms-overflow-style: none; /* IE 11 */
  scrollbar-width: none; /* Firefox 64 */
`;

export const AvatarContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const AvatarImage = styled.div`
  width: 3.5rem;
  height: 3.5rem;
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

export const UserInfo = styled.div``;
