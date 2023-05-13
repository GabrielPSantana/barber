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
  } from "./styles";

export default function Home () {
    return (
        <Container>
            <LeftContainer>
                <Title>O mapa local de sua cidade</Title>
                <SubTitle>Encontre no comércio local  as melhores barbearias</SubTitle>

                <Link to="/new">
                    <Button>
                        <ButtonBox>{'>'}</ButtonBox>
                        Cadastre uma barbearia
                    </Button>                
                </Link>

            </LeftContainer>

            <RightContainer>
                <Image />
            </RightContainer>
        </Container>
    );
}