const svgCaptcha = require('svg-captcha')

export let svgBorn = () => {
  let captcha = svgCaptcha.create({
    size: 4,
    ignoreChars: '0ol1iILO',
    noise: 2,
    background: '#b0c4de',
    width: 100,
    height: 40
  })

  return captcha
}