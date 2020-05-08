import { expect } from 'chai'
import { validateEmail } from '../src/helpers/validation/checkUser'

describe('testing of email validation', function () {
  it('email correct', function () {
    const email: string = 'testEmail@testEmail.com'

    const result: Boolean = validateEmail(email)

    expect(result).equals(true)
  })

  it('email to short', function () {
    const email: string = 't@t.se'

    const result: Boolean = validateEmail(email)

    expect(result).equals(false)
  })

  it('email have no @', function () {
    const email: string = "helloWorlds.com"

    const result: Boolean = validateEmail(email);

    expect(result).equals(false)
  })
})