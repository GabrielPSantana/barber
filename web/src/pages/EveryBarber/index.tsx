import { useEffect, useState } from "react";
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

export interface IMarker {
  category: string;
  contact: string;
  description: string;
  id: string;
  latitude: number;
  longitude: number;
  name: string;
}

export default function EveryBarber() {
  const navigate = useNavigate();

  const [markers, setMarkers] = useState<IMarker[]>([]);

  const getAll = async () => {
    await api
      .get("/store")
      .then((resp) => {
        const data = resp.data;
        console.log(data);
        setMarkers(data);
      })
      .catch((error) => console.log(error.message));
  };

  useEffect(() => {
    getAll();
  }, []);

  const { coords } = useGetLocation();

  if (!coords) {
    return <h1>Obtendo localização... </h1>;
  }

  const location: IMarker = {
    category: "",
    contact: "",
    description: "Minha localização",
    id: "0",
    latitude: coords[0],
    longitude: coords[1],
    name: "Eu",
  };

  return (
    <Container>
      <Form>
        <FormTitle>Bem vindo</FormTitle>

        <Section>Encontre no mapa uma barbearia local</Section>

        <MapContainer
          center={
            {
              lat: coords[0],
              lng: coords[1],
            } as LatLngExpression
          }
          zoom={13}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {markers.map((item) => {
            return (
              <Marker
                key={item.id}
                position={[item.latitude, item.longitude] as LatLngExpression}
                eventHandlers={{
                  click: () => {
                    navigate(`/barberdetail/${item.id}`);
                  },
                }}
              />
            );
          })}
        </MapContainer>
      </Form>
    </Container>
  );
}
