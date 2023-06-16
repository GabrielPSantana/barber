import { useParams } from "react-router-dom";
import * as C from "./styles";
import { useEffect, useState } from "react";
import api from "../../services/api";
import axios from "axios";

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

  async function getAddress(addressData: Dados) {
    if (addressData) {
      axios
        .get(
          `https://nominatim.openstreetmap.org/reverse?lat=${JSON.parse(
            addressData.latitude
          )}&lon=${JSON.parse(addressData.longitude)}&format=json`
        )
        .then((res) => {
          setAddress(res.data.address);
        })
        .catch((error) => console.log(error.message));
    }
  }
  
  async function getStore() {
    await api
      .get(`/store/${id}`)
      .then((resp) => {
        const data = resp.data.store;
        setData(data);
        getAddress(data);
      })
      .catch((error) => console.log(error.message));
  }

  useEffect(() => {
    getStore();
  }, []);

  return (
    <C.container>
      {data && address && (
        <>
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
        </>
      )}
    </C.container>
  );
}

export default BarberDetail;
