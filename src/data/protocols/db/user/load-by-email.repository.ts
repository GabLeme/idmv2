import { User } from "../../../../domain";

export interface LoadByEmailRepository {
    find(email: String) : Promise<User>
}