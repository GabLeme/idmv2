import { Profile } from "./profile";

export interface User {
    _id?: string,
    nome: string,
    email: string,
    senha: string,
    perfis: Profile[],
    codigoDdi: string,
    celular: string,
    telefone: string,
    rg: string,
    documentoIdentificador: string,
    dataNascimento: Date,
    termoAceite: Boolean,
    usuarioAd: Boolean,
    usuarioAtivo: Boolean,
    tipoUsuario: string,
    dataCriacao: Date,
}