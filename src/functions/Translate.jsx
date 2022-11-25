import unidecode from 'unidecode'
import spanishWords from '../media/spanish.csv?raw'
import meows from '../media/meows.csv?raw'

let spanish = spanishWords.split(',')
// Fix the comma readed from ,,, as [..., '.', '', '', '?', ...]
const wrongIndex = spanish.indexOf('')
spanish[wrongIndex] = ','
spanish.splice(wrongIndex + 1, 1)

const meowish = meows.split(',')

const M = 'm M mm mM Mm MM mmm mmM mMm mMM Mmm MmM MMm MMM n N'.split(' ')
const E = 'e E ee eE Ee EE eee eeE eEe eEE Eee EeE EEe EEE i I'.split(' ')
const O = 'o O oo oO Oo OO ooo ooO oOo oOO Ooo OoO OOo OOO a A'.split(' ')
const W = 'w W ww wW Ww WW www wwW wWw wWW Www WwW WWw WWW u U'.split(' ')

export function translateHumanToCat(input) {
  const inp = unidecode(input)
  let out = new Array()
  let i = 0
  let s = inp.length
  let j = 0
  while (i < s) {
    if (inp[i] === ' ') {
      out.push(' ')
      ++i
      continue
    }
    j = 26
    while (j > 0) {
      let pos = spanish.indexOf(inp.slice(i, i + j))
      if (pos !== -1) {
        out.push(meowish[pos])
        i += j
        j = -1
      } else {
        j--
      }
    }
    // Skip character not in language (weird and specific case where the character is not unidecoded)
    // that is, if the character is not on language, i++ (if not, would create an infinite loop)
    if (j !== -1) ++i
  }

  // Convert from character to meow
  let meow = out.map((el, idx, arr) => {
    if (el === ' ') return el
    return (
      M[el.charCodeAt(0) - 65] +
      E[el.charCodeAt(1) - 65] +
      O[el.charCodeAt(2) - 65] +
      W[el.charCodeAt(3) - 65]
    )
  })

  // If there are no spaces between meows, add a comma
  // and then a space (like a regular language)
  let separatedMeow = new Array()
  s = meow.length
  separatedMeow.push(meow[0])

  for (let i = 1; i < s; ++i)
    separatedMeow.push(
      meow[i] !== ' ' && meow[i - 1] !== ' ' ? `, ${meow[i]}` : meow[i]
    )

  return separatedMeow.join('')
}
