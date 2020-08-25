import { expect } from 'chai'
import { generateKey, checkKey } from '../src/helpers/generate'
import { createToken, createTokenSecreate } from './helpers/genereateAPIKey'

describe('token', function () {
  it('token valid', function () {
    const result = checkKey(generateKey())

    expect(result).equals(true);
  })

  it('token invalida diffrent data', function () {
    const data: string = 'hello world'

    const result: boolean = checkKey(createToken(data))

    expect(result).equals(false)
  })

  it('token invalida diffrent sec', function() {
    const secret: string = '123helloWorld'

    const result: boolean = checkKey(createTokenSecreate(secret))

    expect(result).equals(false)

  })
})