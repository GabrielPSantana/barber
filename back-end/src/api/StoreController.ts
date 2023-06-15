import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Store } from "../entity/Store";
import { User } from "../entity/User";
import { getToken } from "../helpers/getToken";
import getUserByToken from "../helpers/getUserByToken";

class StoreController {
  // POST
  async save(req: Request, res: Response) {
    const { category, contact, description, latitude, longitude, name } =
      req.body as Store;

    const token = getToken(req);

    if (!token) {
      return res.status(401).json({ message: "Token não fornecido" });
    }

    const user = (await getUserByToken(token)) as User;

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

  // GET
  async getAll(req: Request, res: Response) {
    const storeRepository = getRepository(Store);

    const allStores = await storeRepository.find();

    return res.json(allStores);
  }

  // GET
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

  // DELETE
  async removePetById(req: Request, res: Response) {
    const id = req.params.id;

    const storeRepository = getRepository(Store);

    const store = await storeRepository.findOneBy({
      id: id,
    });

    console.log(store);

    if (!store) {
      res.status(404).json({ message: "Loja não encontrada!" });
      return;
    }
    // check if logged in user registered the pet
    const token = getToken(req);

    if (!token) {
      res.status(404).json({ message: "Loja não encontrada!" });
      return;
    }

    const user = await getUserByToken(token);

    if (store.user.id !== user.id) {
      res.status(422).json({ message: "Loja não pertence ao usuário" });
      return;
    }

    await storeRepository.remove(store);

    return res.status(200).json({
      store,
    });
  }

  // PATCH
  async updateStore(req: Request, res: Response) {
    const id = req.params.id;

    const { category, contact, description, latitude, longitude, name } =
      req.body as Store;

    const storeRepository = getRepository(Store);

    const store = await storeRepository.findOneBy({
      id: id,
    });

    if (!store) {
      res.status(404).json({ message: "Loja não encontrada!" });
      return;
    }
    // check if logged in user registered the pet
    const token = getToken(req);

    if (!token) {
      res.status(404).json({ message: "Loja não encontrada!" });
      return;
    }

    const user = await getUserByToken(token);

    if (store.user.id !== user.id) {
      res.status(422).json({ message: "Loja não pertence ao usuário" });
      return;
    }

    await storeRepository.update(store, {
      category,
      contact,
      description,
      latitude,
      longitude,
      name,
    });

    return res.status(200).json({ Message: "Loja Atualizada com sucesso" });
  }
}
export default StoreController;
