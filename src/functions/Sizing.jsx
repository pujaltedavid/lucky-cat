export function getSize(
  text,
  max = 2,
  min = 1,
  slices = 12,
  minSize = 70,
  maxSize = 200
) {
  if (text === '') return `${max}em`
  let s = text.length
  let avg =
    text
      .split(' ')
      .map(el => el.length)
      .reduce((a, b) => a + b) / s
  s += Math.max(0, avg - 0.8) * 300

  if (s < minSize) return `${max}em`
  if (s > maxSize) return `${min}em`

  for (let i = slices; i >= 0; --i) {
    if (s >= ((maxSize - minSize) / slices) * i + minSize) {
      return `${Number(max - ((max - min) / slices) * i).toFixed(2)}em`
    }
  }
}
