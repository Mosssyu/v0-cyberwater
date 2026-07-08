import { readdir, stat, rename, unlink } from "node:fs/promises"
import { join, extname } from "node:path"
import sharp from "sharp"

const ROOT = new URL("../public", import.meta.url).pathname
const MAX_WIDTH = 1600
const MIN_BYTES = 300 * 1024 // only touch files larger than 300KB

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = []
  for (const e of entries) {
    const p = join(dir, e.name)
    if (e.isDirectory()) files.push(...(await walk(p)))
    else if (e.isFile() && extname(e.name).toLowerCase() === ".png") files.push(p)
  }
  return files
}

let savedTotal = 0
const files = await walk(ROOT)
for (const file of files) {
  const before = (await stat(file)).size
  if (before < MIN_BYTES) continue

  const img = sharp(file, { failOn: "none" })
  const meta = await img.metadata()
  const pipeline = img.rotate()
  if (meta.width && meta.width > MAX_WIDTH) {
    pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true })
  }
  const tmp = file + ".tmp"
  await pipeline
    .png({ compressionLevel: 9, effort: 9, palette: true, quality: 82 })
    .toFile(tmp)

  const after = (await stat(tmp)).size
  if (after < before) {
    await rename(tmp, file)
    savedTotal += before - after
    console.log(
      `${file.replace(ROOT, "")}  ${(before / 1024).toFixed(0)}KB -> ${(after / 1024).toFixed(0)}KB`,
    )
  } else {
    await unlink(tmp)
  }
}
console.log(`\nTotal saved: ${(savedTotal / 1024 / 1024).toFixed(1)} MB`)
