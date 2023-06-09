import { useParams } from "react-router-dom";
import * as C from './styles';
import { useEffect, useState } from "react";

interface Dados {
    id: string,
    name: string,
    description: string,
    category: string,
    contact: string,
    latitude: string,
    longitude: string,
}

function BarberDetail(){

    const { item }  = useParams();
    const [address, setAddres] = useState<any>();

    useEffect(() => {
        PegarEndereco();
    }, []);

      if (typeof item === 'undefined') {
        return null;
      }

    var itemJSON:Dados = JSON.parse(item)  
    
    console.log(itemJSON);

    function PegarEndereco() {
        fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${itemJSON.latitude}&lon=${itemJSON.longitude}&format=json`
          ).then(async (request) => {
            const data = await request.json();
             console.log(data.address)
            setAddres(data.address);
           
          });
    }
    
    return(
        <C.container>
            <C.title>{itemJSON?.name}</C.title>
            <C.subTitle>{itemJSON?.description}</C.subTitle>
            
            <C.sections>Endereço</C.sections>
            <C.text>{address?.road} Bairro: {address?.suburb}</C.text>
            <C.text>Cidade {address?.city}</C.text>
            <C.text>Cep {address?.postcode}</C.text>
            <C.text>Estado {address?.state}</C.text>

            <C.sections>Contato</C.sections>
            <C.text>{itemJSON?.contact}</C.text>
        </C.container>
    )
    
}

export default BarberDetail; 