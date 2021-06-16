import { HSL2RGB, RGB2HSL, RGB2HSV, RGB2Lab } from '../../src/units/color'

describe('color.js', () => {
  it('RGB2Lab', () => {
    expect(RGB2Lab(0, 154, 97).map(i => i.toFixed(2)).join(',')).toMatch('56.06,-48.37,20.46')
  })
  it('RGB2HSV', () => {
    expect(RGB2HSV(127, 207, 112).map(i => i.toFixed(2)).join(',')).toMatch('110.53,0.46,0.81')
  })
  it('RGB2HSL', () => {
    expect(RGB2HSL(127, 207, 112).map(i => i.toFixed(2)).join(',')).toMatch('110.53,0.50,0.63')
  })
  it('SWITCH-RGB', () => {
    expect(HSL2RGB(...RGB2HSL(127, 207, 112)).join(',')).toMatch('127,207,112')
  })
})
