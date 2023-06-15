import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Store } from "../entity/Store";
import { User } from "../entity/User";
import { getToken } from "../helpers/getToken";
import getUserByToken from "../helpers/getUserByToken";

class StoreController {
  async save(req: Request, res: Response) {
    const { category, contact, description, latitude, longitude, name } =
      req.body as Store;

    const token = getToken(req);

    if (!token) {
      return res.status(401).json({ message: "Token não fornecido" });
    }

    const user = (await getUserByToken(token)) as User;

    console.log(user);
    const storeRepository = getRepository(Store);

    try {
      const savedStore = await storeRepository.save({
        category,
        contact,
        description,
        latitude,
        longitude,
        name,
        user,
      });

      res.status(201).json({
        message: "Loja criada com sucesso",
        loja: {
          id: savedStore.id,
          nome: savedStore.name,
          contact: savedStore.contact,
          description: savedStore.description,
          latitude: savedStore.latitude,
          longitude: savedStore.longitude,
        },
      });
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }

  async getAll(req: Request, res: Response) {
    const storeRepository = getRepository(Store);

    const allStores = await storeRepository.find();

    return res.json(allStores);
  }

  async getStoreById(req: Request, res: Response) {
    const id = req.params.id;

    const storeRepository = getRepository(Store);

    const store = await storeRepository.findOneBy({
      id: id,
    });

    if (!store) {
      res.status(404).json({ message: "Loja não encontrada!" });
      return;
    }

    return res.status(200).json({
      store,
    });
  }
}
export default StoreController;
