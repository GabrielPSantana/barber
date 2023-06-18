import { Login } from "./../models/User";
import { Request, Response, json } from "express";
import { getRepository } from "typeorm";
import bcrypt from "bcrypt";
import { User } from "../entity/User";
import createUserToken from "../helpers/createUserToken";

class UserController {
  // GET
  async getAll(req: Request, res: Response) {
    const storeRepository = getRepository(User);

    const allStores = await storeRepository.find();

    return res.json(allStores);
  }

  // POST
  async register(req: Request, res: Response) {
    let { body } = req;

    const userRepository = getRepository(User); // Renomeado para 'userRepository'

    const userExists = await userRepository.findOne({
      where: { email: body.email },
    });

    if (userExists) {
      res.status(422).json({ message: "Este e-mail já está cadastrado!" });
      return;
    }

    // create a password
    const salt = await bcrypt.genSalt(12);
    const passwordHast = await bcrypt.hash(body.password, salt);

    body.password = passwordHast;

    console.log(body.password);

    try {
      const createUser = await userRepository.save(body);

      const token = await createUserToken(createUser);

      res.status(201).json({
        message: "Usuário criado com sucesso",
        user: createUser,
        token: token,
      });
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }

  // POST
  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const userRepository = getRepository(User); // Renomeado para 'userRepository'

    const user = await userRepository.findOne({
      where: { email: email },
    });

    if (!user) {
      res
        .status(422)
        .json({ message: "Não há usuário cadastrado com este e-mail" });
      return;
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      res.status(422).json({ message: "Senha inválida" });
      return;
    }

    try {
      const token = await createUserToken(user);
      return res.status(201).json({
        message: "Você está logado!",
        token: token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          stores: user.stores,
        },
      });
    } catch (error) {
      return res.status(400).send("Ocorreu um erro ao tentar logar!");
    }
  }

  // GET
  async getUserById(req: Request, res: Response) {
    try {
      const id = req.params.id;

      const user = await getRepository(User);
      const getUser = await user.findOneBy({ id });

      if (!getUser) {
        res.status(422).json({ message: "Usuário não encontrado!" });
        return;
      }

      return res.status(201).json(getUser);
    } catch (error) {
      return res.status(400).send("Ocorreu um erro ao tentar obter usuário!");
    }
  }
}

export default UserController;
