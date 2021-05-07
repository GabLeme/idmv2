import { LoadByEmailRepository } from "@/data/protocols/db/user/load-by-email.repository";
import { UpdateUserRepository } from "@/data/protocols/db/user/update-user-repository";
import { User } from "@/domain";
import { UseCase } from "../use-case-executor";

export class UpdateUserUseCase implements UseCase<User, void> {

    constructor(
        private readonly updateUserRepository: UpdateUserRepository,
        private readonly loadByEmailRepository: LoadByEmailRepository
        ) { }


    async execute(params: User): Promise<void> {
        const userFound = await this.loadByEmailRepository.find(params['email'])
        if(!userFound) throw new Error("User not found")
        const userToBeUpdated: User = {
            celular: params['celular'] || userFound['celular'] || null,
            codigoDdi: params['codigoDdi'] || userFound['codigoDdi'] || null,
            dataCriacao: userFound['dataCriacao'] || null,
            dataNascimento: userFound['dataNascimento'] || null,
            documentoIdentificador: userFound['documentoIdentificador'] || null,
            email: userFound['email'] || null,
            usuarioAd: params['usuarioAd'] || userFound['usuarioAd'] || null,
            tipoUsuario: params['tipoUsuario'] || userFound['tipoUsuario'] || null,
            nome: params['nome'] || userFound['nome'] || null,
            perfis: params['perfis'] || userFound['perfis'] || null,
            rg: userFound['rg'] || null,
            telefone: params['telefone'] || userFound['telefone'] || null,
            termoAceite: userFound['termoAceite'] || null,
            usuarioAtivo: params['usuarioAtivo'] || userFound['usuarioAtivo'] || null,
            senha: userFound['senha'],
            _id: params['_id']
        }
        await this.updateUserRepository.update(userToBeUpdated)
    }

}