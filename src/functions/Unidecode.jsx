import { decompressFromUint8Array } from 'lz-string'
import { getLanguage } from '../firebase'

var tr = {}

// Slightly different from other languages on Translate.jsx as unidecode data is not intended to be used outside this file
getLanguage('unidecode', binaryArray => {
  let arr = new Uint8Array(binaryArray)
  tr = JSON.parse(decompressFromUint8Array(arr))
})

var utf8_rx =
  /(?![\x00-\x7F]|[\xC0-\xDF][\x80-\xBF]|[\xE0-\xEF][\x80-\xBF]{2}|[\xF0-\xF7][\x80-\xBF]{3})./g

/*
switch dec2hex
tr[h] = [...] (the array on the file)
*/

export default function unidecode(str) {
  return str.replace(utf8_rx, unidecode_internal_replace)
}

function unidecode_internal_replace(match) {
  if (Object.keys(tr).length === 0) return ''
  var utf16 = utf8_to_utf16(match)

  if (utf16 > 0xffff) {
    return '_'
  } else {
    var h = utf16 >> 8
    var l = utf16 & 0xff

    // (18) 18 > h < 1e (30)
    if (h > 24 && h < 30) return ''

    //(d7) 215 > h < 249 (f9) no supported
    if (h > 215 && h < 249) return ''

    return tr[h][l]
  }
}
/*
function dec2hex(i) {
  return (i + 0x100).toString(16).substr(-2)
}
*/

function utf8_to_utf16(raw) {
  var b1, b2, b3, b4, x, y, z

  while (Array.isArray(raw)) raw = raw[0]

  switch (raw.length) {
    case 1:
      return ord(raw)

    // http://en.wikipedia.org/wiki/UTF-8
    case 2:
      b1 = ord(raw.substr(0, 1))
      b2 = ord(raw.substr(1, 1))

      x = ((b1 & 0x03) << 6) | (b2 & 0x3f)
      y = (b1 & 0x1c) >> 2

      return (y << 8) | x

    case 3:
      b1 = ord(raw.substr(0, 1))
      b2 = ord(raw.substr(1, 1))
      b3 = ord(raw.substr(2, 1))

      x = ((b2 & 0x03) << 6) | (b3 & 0x3f)
      y = ((b1 & 0x0f) << 4) | ((b2 & 0x3c) >> 2)

      return (y << 8) | x

    default:
      b1 = ord(raw.substr(0, 1))
      b2 = ord(raw.substr(1, 1))
      b3 = ord(raw.substr(2, 1))
      b4 = ord(raw.substr(3, 1))

      x = ((b3 & 0x03) << 6) | (b4 & 0x3f)
      y = ((b2 & 0x0f) << 4) | ((b3 & 0x3c) >> 2)
      z = ((b1 & 0x07) << 5) | ((b2 & 0x30) >> 4)

      return (z << 16) | (y << 8) | x
  }
}

/* From php.js */

function ord(string) {
  // Returns the codepoint value of a character
  //
  // version: 1109.2015
  // discuss at: http://phpjs.org/functions/ord
  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   bugfixed by: Onno Marsman
  // +   improved by: Brett Zamir (http://brett-zamir.me)
  // +   input by: incidence
  // *     example 1: ord('K');
  // *     returns 1: 75
  // *     example 2: ord('\uD800\uDC00'); // surrogate pair to create a single Unicode character
  // *     returns 2: 65536
  var str = string + '',
    code = str.charCodeAt(0)
  if (0xd800 <= code && code <= 0xdbff) {
    // High surrogate (could change last hex to 0xDB7F to treat high private surrogates as single characters)
    var hi = code
    if (str.length === 1) {
      return code // This is just a high surrogate with no following low surrogate, so we return its value;
      // we could also throw an error as it is not a complete character, but someone may want to know
    }
    var low = str.charCodeAt(1)
    return (hi - 0xd800) * 0x400 + (low - 0xdc00) + 0x10000
  }
  if (0xdc00 <= code && code <= 0xdfff) {
    // Low surrogate
    return code // This is just a low surrogate with no preceding high surrogate, so we return its value;
    // we could also throw an error as it is not a complete character, but someone may want to know
  }
  return code
}
