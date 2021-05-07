import { System } from "typescript";
import { Role } from "./role";

export interface Profile {
    sistema: System,
    nome: String,
    descricao: String,
    ativo: Boolean,
    funcionalidades: Role[],
    dataCriacao: Date
}