import { expect } from 'chai'
import { generateKey, checkKey } from '../src/helpers/generate/ApiKey'
import { createToken } from './helpers/genereateAPIKey'

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
})