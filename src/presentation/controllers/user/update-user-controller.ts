import { UpdateUserUseCase } from "../../../data";
import { UserRepository } from "../../../infra";
import { badRequest, noContent, unprocessable } from "../../helpers/http-helper";
import { IController } from "../../../presentation/protocols/controller";
import { HttpResponse } from "../../../presentation/protocols/http-response";
import { validator } from "./user-validator";

export class UpdateUserController implements IController {

    async handle(request: any): Promise<HttpResponse> {
        const isValidRequest = validator.isRequestUpdateUserValid(request)
        if(!isValidRequest) return badRequest(new Error("invalid _id"))
        const repo = new UserRepository()
        const useCase = new UpdateUserUseCase(repo, repo)
        try {
            await useCase.execute(request)
            return noContent()
        } catch(ex) {
            return unprocessable(new Error(ex.message))
        }
    }

}