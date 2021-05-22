import styled from "styled-components";

export const ProfileWrapper = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;
`;

export const ProfileFormItem = styled.div`
  margin-bottom: 0.5rem;
  display: block;
`;

export const ProfileImage = styled.div`
  display: flex;
  flex-flow: column;
  width: 8rem;
  height: 8rem;
`;

export const ProfileImageContent = styled.div`
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  background-position: center;
  background-size: cover;
`;

export const ProfileInfo = styled.div`
  display: flex;
  flex-flow: column;
  width: 8rem;
  height: 8rem;
  margin-top: -7em;
  margin-left: 11rem;
  h3 {
    font-weight: bold;
  }
  small {
  }
`;

export default {};
