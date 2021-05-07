import { Password } from "@/domain";

export interface AddPasswordRepository {
    add(pass: Password): Promise<void>
}