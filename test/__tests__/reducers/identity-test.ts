import { expect } from 'chai'
import reducer from '../../../src/reducers/identity'
import * as selectors from '../../../src/reducers/identity'
import * as actions from '../../../src/actions/identity'
import { Either } from 'tsmonad'
import { JWT } from 'bss-hw-api'

const token = "ZXlKMGVYQWlPaUpLVjFRaUxDSmhiR2NpT2lKSVV6STFOaUo5LmV5SjNiM0pyWm14dmQwTnZiblJsZUhRaU9pSTFPVGxrTWprMk15MDRZek5sTFRSalpEWXRZakUyWkMweE1HWTNOR0V4T0daa01USTdPekJQTkdGdU5ERjVjazFyZEVkMlVEVTVXazUxTWk5alVUTjZaWFJFY1dNeFQwdzNObVJhVVdoTWExSnVNekZ2WW10dlZ5dG1NM0kyVVRGRFFUSnFiMDlMY2t0RVRIaFVTRzh2Ym0xemRsbG5iRkYzV25GVUwwMTNXa1pPTTNoS1RXVnZMeXRJZEhaUlRXaEdZMk5UYkZkd1Qwd3JUakZFYVM5WFJtOWFaV0Z0WkhGeUswMUtSR1YzZG5CbGNWRkpXbWhwVTB0c2NVcHFSelJrVGpaYWJXTnhkVGhaTTFwalUxQkdPRlIxUm01UlkwaFdjbXhwWXpaUmRqbDBWRmN5T1U4MlRtcDVlV1pPWjA1S2VETTFNRE13TlZkSFVWaEVSR2h3VTFBclptVmxVSEI1T1hwR2JVODBNR1JTVGpOcU5reFZLekVyZEdWaVNtTXJiRXBhVHpFaUxDSmhZMk5sYzNOTVpYWmxiQ0k2TVN3aWJHOWpZV3hsSWpvaVpXNGlMQ0p3Y205bWFXeGxJanA3SW1ScGMzQnNZWGxPWVcxbElqb2lTbUZ0WlhNZ1RHOXVaRzl1SW4wc0luTjFZaUk2SW1wc2IyNWtiMjRpTENKbGVIQWlPakUwTmprM01UQTVNamNzSW1saGRDSTZNVFEyT1Rjd056TXlOU3dpWVhCd2N5STZleUpEVGtRaU9uc2liM1VpT2xzaVFWVlRWRkpKUVY5UVNDSmRmWDE5LnBtNUcxaS1pQ1ctUGdvaUk2ZUtmSFJYR2xreUN3bXp5TUY3ODdvUWhmNWM="

describe('Reducers: Identity', () => {

    describe('reducer:', () => {
        it('should handle setToken action', () => {
            delete localStorage["auth.token"]
            let nextState = reducer(null as any, actions.setToken(token))
            expect(nextState.token).equal(token)
            nextState.tokenInfo.do({
                right: v => expect(v.sub).equals("jlondon"),
                left: v => { throw Error('Bad TokenInfo decode') }
            })
            expect(localStorage["auth.token"]).equals(token)
        })

        it('should handle removeToken action', () => {
            localStorage["auth.token"] = token

            let nextState = reducer({ token, tokenInfo: {hello: "world"} as any}, actions.removeToken())
            expect(nextState.token).equal(null)
            expect(nextState.tokenInfo).equal(null)
            expect(localStorage["auth.token"]).equals(undefined)
        })
    })

    describe('selectors:', () => {

        let state = reducer(null as any, actions.setToken(token))

        it('getJWT', () => {
            let jwt: JWT = selectors.getJWT(state).valueOr(null as any)
            expect(jwt.sub).equal('jlondon')
        })

        it('getLoggedUser', () => {
            let user = selectors.getLoggedUser(state).valueOr(null as any)
            expect(user).equal('jlondon')
        })

        it('getWorkflowContext', () => {
            let wf = selectors.getWorkflowContext(state).valueOr(null as any)
            expect(wf).be.a("string")
        })

        it('getLoggedUserDisplayName', () => {
            let name = selectors.getLoggedUserDisplayName(state).valueOr(null as any)
            expect(name).equal("James London")
        })

        it('getUserLanguage', () => {
            let lang = selectors.getUserLanguage(state).valueOr(null as any)
            expect(lang).equal("en")
        })

        it('getProfile', () => {
            let profile = selectors.getProfile(state).valueOr(null as any)
            expect(profile.displayName).equal("James London")
        })

        it('getApps', () => {
            let apps = selectors.getApps(state).valueOr(null as any)
            expect(apps.CND.ou[0]).equal("AUSTRIA_PH")
        })
    })
})
