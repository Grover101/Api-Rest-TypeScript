import UserModel, { User } from '@models/user'

const insertUser = async (body: User): Promise<User> => {
    const user = new UserModel(body)
    await user.encryptPassword(user.password)
    return await user.save()
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
