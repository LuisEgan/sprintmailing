import styled from "styled-components";

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  background-color: #424242;
`;

export const Top = styled.div`
  background-color: #424242;
  display: flex;
  flex-direction: column;
  align-items: center;

  & h1 {
    color: #99a2bc;
    font-size: 33px;
  }

  & p {
    font-size: 20px;
  }

  & button {
    background-color: #686868;
    border-width: 1px;
    border-color: #b3b3b3;
    border-radius: 0.25rem;
  }
`;

export const FormWrapper = styled.div`
  display: flex;

  & input,
  textarea {
    background-color: #d9d9d9;
    border-radius: 3px;
    color: black;
    padding: 4px;
  }

  & textarea {
    height: 100%;
  }

  & label {
    margin-top: 15px;
    margin-bottom: 10px;
  }
`;
