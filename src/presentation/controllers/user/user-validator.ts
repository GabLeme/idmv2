import { User } from "../../../domain/user";
import { ObjectId } from 'mongodb'
export const validator = {
    isRequestAddUserValid: (payload: User): Boolean => {
        if (
            isStringEmptyOrNull(payload['email']) ||
            isStringEmptyOrNull(payload['senha']) && !payload['usuarioAd'] ||
            isStringEmptyOrNull(payload['nome'])
        ) {
            return false;
        }
        return true;
    },

    isRequestUpdateUserValid: (payload: User): Boolean => {
        try {
            const id = new ObjectId(payload['_id'])
            return true;
        } catch(ex) {
            return false;
        }
    }
}

const isStringEmptyOrNull = (value: string): Boolean => {
    if (!value) return true;
    else return false;
}