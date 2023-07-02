import { Link } from "react-router-dom";
import {
  Container,
  Title,
  Button,
  Image,
  LeftContainer,
  RightContainer,
  SubTitle,
  ButtonBox,
  ContainerLink,
} from "./styles";

import { useAuth } from "../../contexts/auth";

export default function Home() {
  const { user } = useAuth();
  return (
    <Container>
      <LeftContainer>
        <Title>O mapa local de sua cidade</Title>
        <SubTitle>Encontre no comércio local as melhores barbearias</SubTitle>

        <ContainerLink>
          <Link to={user ? "/new" : "/login"}>
            <Button>
              <ButtonBox>{">"}</ButtonBox>
              Cadastre uma barbearia
            </Button>
          </Link>

          <Link to="/everybarber">
            <Button>
              <ButtonBox>{">"}</ButtonBox>
              Localize uma barbearia
            </Button>
          </Link>
        </ContainerLink>
      </LeftContainer>

      <RightContainer>
        <Image />
      </RightContainer>
    </Container>
  );
}
