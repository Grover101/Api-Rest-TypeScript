import { Auth } from '@models/auth'

/**
 * @Update 2023 - This has logic has been update to support newer Node.js versions
 * that don't have NodeJS as a global type
 */
declare global {
    // eslint-disable-next-line no-var
    var api: import('supertest').SuperTest<import('supertest').Test>
    // eslint-disable-next-line no-var
    var token: Auth | null
}

export {}
