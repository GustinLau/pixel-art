import { RGB2Lab } from '../../src/units/color'

describe('color.js', () => {
  it('RGB2Lab', () => {
    expect(RGB2Lab(0, 154, 97).join(',')).toMatch('56.062023317699214,-48.367699537048395,20.45989063961422')
  })
})
