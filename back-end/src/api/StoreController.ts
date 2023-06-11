import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Store } from "../entity/Store";

export async function save(request: Request, response: Response) {
  const { category, contact, description, latitude, longitude, name, user } =
    request.body as Store;

  const storeRepository = getRepository(Store);

  try {
    const savedStore = await storeRepository.save({
      category,
      contact,
      description,
      latitude,
      longitude,
      name,
      user
    });

    return response.status(201).json(savedStore);
  } catch (error) {}
}

export async function getAll(request: Request, response: Response) {
  const storeRepository = getRepository(Store);

  const allStores = await storeRepository.find();

  return response.json(allStores);
}
