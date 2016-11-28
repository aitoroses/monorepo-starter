import { expect } from 'chai'

import { createStateful, cloneWithState, StatefulGeneratorConstructor } from '../../../src/helpers/statefulGenerator'

describe('Helpers: Stateful Generator', () => {

    let myGen: StatefulGeneratorConstructor

    beforeEach(() => {
        myGen = createStateful(function* () {
            yield 1
            yield 2
            yield 3
        })
    })

    it('should work as a generator', () => {

        let g = myGen()

        let r1 = g.next()
        let r2 = g.next()

        expect(r1.value).to.equal(1)
        expect(r2.value).to.equal(2)

    })

    it('should be able to start with initial state', () => {

        let g = myGen()

        let r1 = g.next()

        let middleState = g.getState()

        let r2 = g.next()
        let r3 = g.next()

        expect(r1.value).to.equal(1)
        expect(r2.value).to.equal(2)
        expect(r3.value).to.equal(3)

        // Clone
        let g1 = cloneWithState(myGen, middleState)

        let r4 = g1.next()
        expect(r4.value).to.equal(r2.value)
    })

    it('should be able to rehydrate state', async () => {

        function getUserProfile() {
            return Promise.resolve('james')
        }

        function getUserFriendList(user) {
            if (user != "james") {
                throw Error("User has no friends! :(")
            } else {
                return Promise.resolve([
                    "jcooper", "jlondon"
                ])
            }
        }

        async function processLoginFlowPartial(instance): Promise<any> {
            let user = await instance.next().value
            let userFriendList = await instance.next(user).value
            return userFriendList
        }

        const Login = createStateful(function* Login(): any {
            const user = yield getUserProfile()
            const friends = yield getUserFriendList(user)
            yield { user, friends }
        })

        let instance = Login()
        await processLoginFlowPartial(instance)

        // Save state
        let state = instance.getState()

        // Create a new instance with state
        let instance1 = cloneWithState(Login, state)

        // Last output should be friendList
        let lastOutput = await instance1.getLastOutput()
        expect(lastOutput).to.deep.equal(['jcooper', 'jlondon'])

        // Now we should obtain the entire profile [name, friendList]
        let profile = instance1.next(lastOutput).value

        // Expect profile to be the 3th iteration of the generation
        expect(profile).to.deep.equal({ user: 'james', friends: ['jcooper', 'jlondon'] })

    })
})
