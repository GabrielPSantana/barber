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

export default function New() {
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    name: "",
    description: "",
    contact: "",
    category: "",
    coords: [0, 0],
  });

  const { coords } = useGetLocation();

  if (!coords) {
    return <h1>Obtendo localização...</h1>;
  }

  async function onSubmit() {
    const request = await fetch("http://localhost:3000/store", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formValues,
        latitude: formValues.coords[0],
        longitude: formValues.coords[1],
      }),
    });

    if (request.ok) {
      toast("Estabelecimento gravado com sucesso!", {
        type: "success",
        autoClose: 2000,
        onClose: () => navigate("/"),
      });
    }
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

        <Section>Dados</Section>

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
          <Button type="submit">Salvar</Button>
        </ButtonContainer>
      </Form>
    </Container>
  );
}
