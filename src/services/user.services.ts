import UserModel, { type User } from '@models/user'
import { type DocumentType } from '@typegoose/typegoose'

const insertUser = async (user: DocumentType<User>): Promise<User> => {
    const response = await UserModel.create(user)
    return response
}

const getUsers = async (): Promise<User[]> => {
    const response = await UserModel.find({})
    return response
}

const getUserId = async (id: string): Promise<User | null> => {
    const response = await UserModel.findById(id).lean()
    return response
}

const updateUser = async (id: string, data: User): Promise<User | null> => {
    const response = await UserModel.findOneAndUpdate({ _id: id }, data, {
        new: true
    })
    return response
}

const deleteUser = async (id: string): Promise<boolean> => {
    const response = await UserModel.deleteOne({ _id: id })
    return !(response.deletedCount === 0)
}

export { insertUser, getUsers, getUserId, updateUser, deleteUser }
