export const listenMeows = meows => {
  meows = meows.split(' ')
  let sounds = []
  for (let meow of meows) {
    let s = meow.length
    if (meow[s - 1] === ',') {
      --s
      sounds.push(`ny${s > 4 ? 'a'.repeat(s - 4) + 'u' : 'a'.repeat(s - 3)}, `)
    } else {
      sounds.push(`ny${s > 4 ? 'a'.repeat(s - 4) + 'u' : 'a'.repeat(s - 3)} `)
    }
  }
  return sounds.join('')
}
