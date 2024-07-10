import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";
import { Service } from "typedi";
import { Repository } from "typeorm";
import { ToDo } from "../entity/Todo";

@Service()
export class UserController {
  private userRepository = AppDataSource.getRepository(User);
  private todoRepository = AppDataSource.getRepository(ToDo);
  async getAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getOne(id: number): Promise<User | string> {
    const user = await this.userRepository.findOne({
      where: { id },
      select: ["username"],
    });

    if (!user) {
      return "unregistered user";
    }
    return user;
  }

  async save(req: Request, res: Response): Promise<User> {
    const { username, password } = req.body;

    const user = new User();
    user.username = username;
    user.password = password;

    try {
      const savedUser = await this.userRepository.save(user);
      return savedUser;
    } catch (error) {
      console.error("Error saving user:", error);
      throw new Error("Failed to save user");
    }
  }

  async remove(request: Request, response: Response) {
    const id = parseInt(request.params.id);

    let userToRemove = await this.userRepository.findOneBy({ id });

    if (!userToRemove) {
      return "this user not exist";
    }

    await this.userRepository.remove(userToRemove);

    return `User ${id} has been removed`;
  }

  async getAllTodo(): Promise<ToDo[]> {
    return this.todoRepository.find({
      select: ["user_id", "task", "completed"],
    });
  }
}
