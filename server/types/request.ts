//import type { UserType } from "../model/user";
declare global {
  namespace Express {
    interface Request {
      user?: string;
    }
  }
}
