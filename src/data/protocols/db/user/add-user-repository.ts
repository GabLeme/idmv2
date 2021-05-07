import { User } from "../../../../domain/user";

export interface AddUserRepository {
    add: (data: User) => Promise<void>
  }

  
