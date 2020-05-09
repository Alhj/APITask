import { expect } from 'chai'
import { validateProjectName } from '../src/helpers/validation/checkCollection'

describe('testing of collection name', function () {
  it('collection name correct', function () {
    const name: string = 'workTest1'

    const result: Boolean = validateProjectName(name)

    expect(result).equals(true)
  })

  it('collection name to short', function () {

    const name: string = '2'

    const result: Boolean = validateProjectName(name)

    expect(result).equals(false)
  })
})