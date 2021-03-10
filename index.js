const readdirp = require('readdirp')
const isImage = require('is-image')
const { extname, basename, dirname, join } = require('path')
const sharp = require('sharp')

async function dirmages(
  dir,
  { width = null, heigth = null, options = {}, suffix = '-alt' } = {}
) {
  try {
    for await (const { fullPath } of readdirp(dir)) {
      if (isImage(fullPath)) {
        const ext = extname(fullPath)
        const dir = dirname(fullPath)
        const name = basename(fullPath, ext)
        const dest = join(dir, `${name}${suffix}${ext}`)
        await sharp(fullPath).resize(width, heigth, options).toFile(dest)
      }
    }
  } catch (err) {
    console.log(err)
  }
}

module.exports = { dirmages }
