import styled from "styled-components";

export const Main = styled.div`
  display: flex;
  flex-direction: column;
	align-items: stretch;
  background-color: #424242;
  height: 100vh;
`;

export const Top = styled.div`
  background-color: #424242;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  
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
  
  & input, textarea {
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
      flex-direction column;
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

export const Footer = styled.div`
  background-color: #2a2c34;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;	
  bottom: 0px;
  
  & p {
    color: #99a2bc;
  }
`;
