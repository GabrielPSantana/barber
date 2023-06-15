import { useParams } from "react-router-dom";
import * as C from "./styles";
import { useEffect, useState } from "react";
import api from "../../services/api";

interface Dados {
  id: string;
  name: string;
  description: string;
  category: string;
  contact: string;
  latitude: string;
  longitude: string;
  user: object;
}

function BarberDetail() {
  const { id } = useParams();
  console.log(id);
  const [data, setData] = useState<Dados>({
    id: "",
    name: "",
    description: "",
    category: "",
    contact: "",
    latitude: "",
    longitude: "",
    user: {},
  });
  const [address, setAddress] = useState<any>();

  useEffect(() => {
    PegarEndereco();
  }, []);

  async function PegarEndereco() {
    await api
      .get(`/store/${id}`)
      .then((resp) => {
        const data = resp.data;
        console.log(data);
        setData(data);

        fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${data.latitude}&lon=${data.longitude}&format=json`
        )
          .then(async (request) => {
            const responseData = await request.json();
            console.log(responseData);
            setAddress(responseData);
          })
          .catch((error) => console.log(error.message));
      })
      .catch((error) => console.log(error.message));
  }

  return (
    <C.container>
      <C.title>{data?.name}</C.title>
      <C.subTitle>{data?.description}</C.subTitle>

      <C.sections>Endereço</C.sections>
      <C.text>
        {address?.road} Bairro: {address?.suburb}
      </C.text>
      <C.text>Cidade {address?.city}</C.text>
      <C.text>Cep {address?.postcode}</C.text>
      <C.text>Estado {address?.state}</C.text>

      <C.sections>Contato</C.sections>
      <C.text>{data?.contact}</C.text>
    </C.container>
  );
}

export default BarberDetail;
