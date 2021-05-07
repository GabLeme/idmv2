import { LoadByEmailRepository } from "@/data/protocols/db/user/load-by-email.repository";
import { AddUserRepository } from "../../data/protocols/db/user/add-user-repository";
import { User } from "../../domain/user";
import { MongoHelper } from './mongo-helper'
import { ObjectId } from 'mongodb'
import { UpdateUserRepository } from "@/data/protocols/db/user/update-user-repository";

export class UserRepository implements AddUserRepository, 
                                       LoadByEmailRepository,
                                       UpdateUserRepository
{
    
    async add(data: User) {
        const userCollection = await MongoHelper.getCollection("usuarios")
        await userCollection.insertOne({
            data
        })
    }

    async find(email: String) {
        const userCollection = await MongoHelper.getCollection("usuarios")
        const user = await userCollection.findOne({
            "data.email": email
        })
        return user &&  MongoHelper.map(user)
    }

    async update(user: User) {
        const userCollection = await MongoHelper.getCollection("usuarios")
        const userId = user['_id'];
        const data = mapToMongo(user)
        await userCollection.updateOne({
            _id: new ObjectId(userId),
        }, {
            $set: { 
                data    
             }
        })
    }
}


const mapToMongo = (u: User) => {
    delete u['_id']
    const data = u;
    return data;
}