export const listenMeows = meows => {
  meows = meows.split(' ')
  let sounds = []
  for (let meow of meows) {
    let s = meow.length
    let sound = [1, 1, 1, 0, ' ']
    if (meow[s - 1] === ',') {
      --s
      sound[4] = ', '
    }
    if (s > 7) {
      sound[3] = Math.floor((s - 3) / 2)
      sound[2] = s - sound[3] - 3 + 1
    } else if (s > 5) {
      sound[2] = s - 5
      sound[3] = 1
    } else {
      sound[2] = s - 3
    }
    sounds.push(
      'n' +
        'y'.repeat(sound[1]) +
        'a'.repeat(sound[2]) +
        'u'.repeat(sound[3]) +
        sound[4]
    )
  }
  return sounds.join('')
}
