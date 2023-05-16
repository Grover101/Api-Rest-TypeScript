import app from '@app'
import supertest from 'supertest'
import { connect, close } from '@config/mongo'

import { authUser, usersInit } from '@testHelper/index'
import { tweetInit } from '@testHelper/tweet'
import { TOKEN } from '@testHelper/auth'

import AuthModel from '@models/auth'
import TweetModel from '@models/tweet'
import UserModel from '@models/user'

jest.setTimeout(20000)

beforeAll(async () => {
    global.api = supertest(app)

    await connect()
    await AuthModel.deleteMany({})
    await usersInit()
    await TweetModel.deleteMany({})
    for (const tweet of tweetInit) {
        const user = await UserModel.findOne({ username: 'Tester' }).select(
            'id'
        )
        const tweetAux = new TweetModel({
            message: tweet.message,
            user: user?.id
        })

        await TweetModel.create(tweetAux)
    }
    await authUser(api)
    global.token = await TOKEN()
})

afterAll(async () => {
    await close()
})
