import { User } from "./../../../web/src/models/User";
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Store } from "../entity/Store";
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
        loja: savedStore,
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

  //  POST
  async getStoreByUserId(req: Request, res: Response) {
    const userId = req.params.userId;

    const storeRepository = getRepository(Store);

    const stores = await storeRepository.findBy({
      user: { id: userId },
    });

    console.log(stores);

    if (!stores) {
      res.status(404).json({ message: "O usuário não tem loja cadastrada!" });
      return;
    }

    return res.status(200).json({
      stores,
    });
  }

  // DELETE
  async removePetById(req: Request, res: Response) {
    const id = req.params.id;

    const storeRepository = getRepository(Store);

    const store = await storeRepository.findOneBy({
      id,
    });

    console.log(store);

    if (!store) {
      res.status(404).json({ message: "Loja não encontrada!" });
      return;
    }
    // check if logged in user registered the pet
    const token = getToken(req);

    if (!token) {
      res.status(404).json({ message: "Efetue o login!" });
      return;
    }

    const user = await getUserByToken(token);

    console.log(user);

    // if (store.id !== user.id) {
    //   res.status(422).json({ message: "Loja não pertence ao usuário" });
    //   return;
    // }

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
    try {
      const storeRepository = getRepository(Store);

      const store = await storeRepository.findOneBy({
        id,
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

      // if (store.user.id !== user.id) {
      //   res.status(422).json({ message: "Loja não pertence ao usuário" });
      //   return;
      // }

      await storeRepository.update(store, {
        name,
        category,
        contact,
        description,
        latitude,
        longitude,
      });

      return res.status(200).json({ Message: "Loja Atualizada com sucesso" });
    } catch (error) {
      return res.status(400).json({ Message: error });
    }
  }
}
export default StoreController;
