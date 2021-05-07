import { badRequest, noContent, serverError, unprocessable } from "../../../presentation/helpers/http-helper";
import { AddUserUseCase } from "../../../data/usecases/user/add-user-usecase";
import { User } from "../../../domain/user";
import { UserRepository } from "../../../infra/db/user-repository";
import { IController } from "../../../presentation/protocols/controller";
import { HttpResponse } from "../../../presentation/protocols/http-response";
import { BcryptAdapter } from "../../../infra";
import { validator } from "./user-validator";

export class AddUserController implements IController {
    
    async handle(request): Promise<HttpResponse> {
        const isValidRequest = validator.isRequestAddUserValid(request)
        if(!isValidRequest) return badRequest(new Error("Empty fields not allowed"))
        const repo = new UserRepository()
        const hasherAdapter = new BcryptAdapter(10)
        const useCase = 
            new AddUserUseCase(
                repo, 
                hasherAdapter, 
                repo
            )
        try {
            await useCase.execute(request)
            return noContent()
        } catch(ex) {
            return unprocessable(new Error(ex.message))
        }
    }
    
}