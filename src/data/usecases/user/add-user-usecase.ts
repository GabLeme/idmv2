import { Hasher } from "@/data/protocols/cryptography/hasher";
import { AddUserRepository } from "../../protocols/db/user/add-user-repository";
import { AddPasswordRepository } from "../../protocols/db/password/add-password-repository";
import { User } from "../../../domain/user";
import { UseCase } from "../use-case-executor";
import { LoadByEmailRepository } from "@/data/protocols/db/user/load-by-email.repository";

export class AddUserUseCase implements UseCase<User, void> {

    constructor(
        private readonly addUserRepo: AddUserRepository,
        private readonly hasher: Hasher,
        private readonly loadByEmailRepo: LoadByEmailRepository
    ) { }


    async execute(params: User): Promise<void> {
        const user = await this.loadByEmailRepo.find(params['email'])
        if (user) throw new Error("user already exists")
        if (!params['usuarioAd']) {
            const hashedPassword = await this.hasher.hash(params.senha)
            params['senha'] = hashedPassword;    
        }
        await this.addUserRepo.add(params);
    }

}