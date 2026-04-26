import { UserService } from "./user.service";

const userService = new UserService();

export class UserController {
   async create(req, res) {
      const user = await userService.create(req.body);
      return res.json(user);
   }

   async login(req, res) {
      const result = await userService.login(req.body);
      return res.json(result);
   }

   async me(req, res) {
      const user = await userService.me(req.user.id);
      return res.json(user);
   }
}
