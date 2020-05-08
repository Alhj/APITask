import { expect } from 'chai'
import { validatePassword } from '../src/helpers/validation/checkUser'


describe('password', function () {
  it('password correct length', function () {
    const pass: string = 'hereAreThePassword'

    const result: Boolean = validatePassword(pass);

    expect(result).equals(true);
  })

  it('password correct length second', function () {
    const pass: string = 'hereArePass'

    const result: Boolean = validatePassword(pass);

    expect(result).equals(true)
  })

  it('password wrong length', function () {
    const pass: string = '123'

    const result: Boolean = validatePassword(pass);

    expect(result).equals(false);
  })

  it('password wrong lengt second', function () {
    const pass: string = '14561'

    const result: Boolean = validatePassword(pass)

    expect(result).equals(false)
  })
})