import { useState } from "react";
import Input from "../../components/Input";
import {
  MapContainer,
  Container,
  Form,
  FormTitle,
  Section,
  ButtonContainer,
  Button,
} from "./styles";
import { Marker, TileLayer, useMapEvents } from "react-leaflet";
import { LatLngExpression, LeafletMouseEvent } from "leaflet";
import useGetLocation from "../../hooks/useGetLocation";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { error } from "console";
import { useAuth } from "../../contexts/auth";
import { useToastMessage } from "../../hooks/useToast";

export default function New() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formValues, setFormValues] = useState({
    name: "",
    description: "",
    contact: "",
    category: "",
    coords: [0, 0],
  });
  const { setToastMessage } = useToastMessage();

  const { coords } = useGetLocation();

  if (!coords) {
    return <h1>Obtendo localização...</h1>;
  }

  async function onSubmit() {
    const newStore = {
      name: formValues.name,
      description: formValues.description,
      category: formValues.category,
      contact: formValues.contact,
      latitude: formValues.coords[0],
      longitude: formValues.coords[1],
    };

    console.log(newStore);

    await api
      .post("/store/create", newStore)
      .then((res) => {
        setToastMessage(res.data.message, "success");
        navigate("/everybarber");
      })
      .catch((error) => setToastMessage(error.data.message, "error"));
  }

  function MyComponent() {
    const map = useMapEvents({
      click: (event: LeafletMouseEvent) => {
        setFormValues((prev) => ({
          ...prev,
          coords: [event.latlng.lat, event.latlng.lng],
        }));
      },
      locationfound: (location) => {
        console.log("location found:", location);
      },
    });

    return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Container>
      <Form
        onSubmit={(ev) => {
          ev.preventDefault();
          onSubmit();
        }}
      >
        <FormTitle>Cadastro da barbearia</FormTitle>

        <Input
          label="Nome do local"
          name="name"
          value={formValues.name}
          onChange={handleInputChange}
        />

        <Input
          label="Descrição"
          name="description"
          value={formValues.description}
          onChange={handleInputChange}
        />

        <Input
          label="Contato"
          name="contact"
          value={formValues.contact}
          onChange={handleInputChange}
        />

        <Input
          label="Categoria"
          name="category"
          value={formValues.category}
          onChange={handleInputChange}
        />

        <section>Endereço</section>

        <MapContainer
          center={
            {
              lat: coords[0],
              lng: coords[1],
            } as LatLngExpression
          }
          zoom={13}
        >
          <MyComponent />

          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Marker
            position={
              [formValues.coords[0], formValues.coords[1]] as LatLngExpression
            }
          />
        </MapContainer>

        <ButtonContainer>
          <Button
            onClick={() => {
              navigate("/");
            }}
          >
            Voltar
          </Button>
          <Button type="submit">Salvar</Button>
        </ButtonContainer>
      </Form>
    </Container>
  );
}
