import { expect } from 'chai'
import { validateUsername } from '../src/helpers/validation/checkUser'

describe('validate username', function () {
  it('username right', function () {
    const name: string = 'testName'

    const result: Boolean = validateUsername(name)

    expect(result).equals(true)
  })

  it('usename short', function() {

    const name: string = 'tt'

    const result: Boolean = validateUsername(name)

    expect(result).equals(false)
  })
})