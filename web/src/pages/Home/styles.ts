import styled from "styled-components";

export const Container = styled.div`
  width: 90vw;
  height: 100vh;
  background: url("./home-background.svg") no-repeat 700px bottom;
  background-color: ${(props) => props.theme.background};
  display: flex;
  align-items: center;
  margin: 0 auto;
  @media (max-width: 1000px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

export const Title = styled.h1`
  font-size: 54px;
  color: ${(props) => props.theme.primary};
  padding-bottom: 50px;
  text-align: center;
  max-width: 500px;

  @media screen and (max-width: 600px) {
    max-width: 300px;
  }
`;

export const SubTitle = styled.p`
  font-size: 24px;
  padding-bottom: 50px;
  text-align: center;
  max-width: 500px;

  @media screen and (max-width: 600px) {
    width: 80%;
  }
`;

export const ButtonBox = styled.div`
  background-color: ${(props) => props.theme.secondary};
  color: ${(props) => props.theme.white};
  height: 50px;
  width: 40px;
  font-size: 30px;
  position: absolute;
  left: 0;
  top: 0;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 600px) {
    flex-direction: column;
  }
`;

export const Button = styled.button`
  background-color: ${(props) => props.theme.primary};
  color: ${(props) => props.theme.white};
  height: 50px;
  border: none;
  border-radius: 5px;
  position: relative;
  padding-left: 50px;
  &:hover {
    filter: opacity(0.9);
    cursor: pointer;
  }
`;

export const LeftContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const ContainerLink = styled.div`
  display: flex;
  justify-content: space-around;
  width: 80%;
  gap: 20px;

  @media screen and (max-width: 600px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const RightContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 600px) {
    max-height: 40%;
  }
`;

export const Image = styled.img.attrs(() => ({
  src: "home-image.svg",
}))`
  width: 70%;
  
`;
