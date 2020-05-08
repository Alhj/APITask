import { expect } from 'chai'
import { generateKey, checkKey } from '../src/helpers/generate/ApiKey'
import { createToken, createTokenSecreate } from './helpers/genereateAPIKey'

describe('token', () => {
  it('token valid', () => {
    const result = checkKey(generateKey())

    expect(result).equals(true);
  })

  it('token invalida diffrent data', () => {
    const data: string = 'hello world'

    const result: boolean = checkKey(createToken(data))

    expect(result).equals(false)
  })

  it('token invalida diffrent secreate', () => {
    const secret: string = 'hereAretheTestSecret123'

    const result: boolean = checkKey(createTokenSecreate(secret))

    expect(result).equals(false)
  })
})