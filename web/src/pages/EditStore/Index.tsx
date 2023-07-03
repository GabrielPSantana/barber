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
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import { error } from "console";
import { useToastMessage } from "../../hooks/useToast";

export default function EditStore() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { setToastMessage } = useToastMessage();

  const [formValues, setFormValues] = useState({
    name: "",
    description: "",
    contact: "",
    category: "",
    coords: [0, 0],
  });

  const getStore = async (id: string) => {
    await api
      .get(`/store/${id}`)
      .then((res) => {
        const store = res.data.store;

        const updateStore = {
          name: store.name,
          description: store.description,
          contact: store.contact,
          category: store.category,
          coords: [store.latitude, store.longitude],
        };

        setFormValues(updateStore);
      })
      .catch((error) => {
        setToastMessage(error.data.message, "error");
      });
  };

  useEffect(() => {
    if (id) {
      getStore(id);
    }
  }, []);

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
      .patch(`/store/${id}`, newStore)
      .then((res) => {
        console.log(res.data.Message);
        setToastMessage(res.data.message, "success");
        navigate("/dashboard");
      })
      .catch((error) => {
        setToastMessage(error.data.message, "error");
      });
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
        <FormTitle>Editar Barbearia</FormTitle>

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
