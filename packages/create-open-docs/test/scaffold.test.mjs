import assert from 'node:assert/strict'
import { mkdtemp, mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { test } from 'node:test'

import { applyBrandColor, copyTemplate, writePackageJson } from '../src/scaffold.mjs'

async function makeTemplate() {
  const dir = await mkdtemp(path.join(tmpdir(), 'cod-tpl-'))
  await mkdir(path.join(dir, 'styles'), { recursive: true })
  await mkdir(path.join(dir, 'node_modules'), { recursive: true })
  await writeFile(path.join(dir, 'node_modules', 'junk.txt'), 'should not copy')
  await writeFile(path.join(dir, 'gitignore'), 'node_modules\n')
  await writeFile(
    path.join(dir, 'package.json'),
    JSON.stringify({ name: 'open-docs', version: '9.9.9', author: 'x', homepage: 'y' }),
  )
  await writeFile(
    path.join(dir, 'styles', 'globals.css'),
    ':root { --color-brand-500: oklch(0.7 0.17 55); }\n',
  )
  return dir
}

test('copyTemplate copies files, skips artifacts, restores dotfiles', async () => {
  const tpl = await makeTemplate()
  const out = await mkdtemp(path.join(tmpdir(), 'cod-out-'))
  try {
    await copyTemplate(tpl, out)
    assert.ok(existsSync(path.join(out, 'package.json')))
    assert.ok(existsSync(path.join(out, 'styles', 'globals.css')))
    assert.ok(existsSync(path.join(out, '.gitignore')), 'gitignore restored to .gitignore')
    assert.ok(!existsSync(path.join(out, 'gitignore')), 'temp gitignore name removed')
    assert.ok(!existsSync(path.join(out, 'node_modules')), 'node_modules skipped')
  } finally {
    await rm(tpl, { recursive: true, force: true })
    await rm(out, { recursive: true, force: true })
  }
})

test('writePackageJson sets name and strips template metadata', async () => {
  const tpl = await makeTemplate()
  const out = await mkdtemp(path.join(tmpdir(), 'cod-out-'))
  try {
    await copyTemplate(tpl, out)
    const pkg = await writePackageJson(out, { projectName: 'My New Docs' })
    assert.equal(pkg.name, 'my-new-docs')
    assert.equal(pkg.version, '0.1.0')
    assert.equal(pkg.private, true)
    assert.equal(pkg.author, undefined)
    assert.equal(pkg.homepage, undefined)
    const written = JSON.parse(await readFile(path.join(out, 'package.json'), 'utf8'))
    assert.equal(written.name, 'my-new-docs')
  } finally {
    await rm(tpl, { recursive: true, force: true })
    await rm(out, { recursive: true, force: true })
  }
})

test('applyBrandColor rewrites the brand-500 token', async () => {
  const tpl = await makeTemplate()
  const out = await mkdtemp(path.join(tmpdir(), 'cod-out-'))
  try {
    await copyTemplate(tpl, out)
    const changed = await applyBrandColor(out, '#1d4ed8')
    assert.equal(changed, true)
    const css = await readFile(path.join(out, 'styles', 'globals.css'), 'utf8')
    assert.match(css, /--color-brand-500:\s*#1d4ed8;/)
  } finally {
    await rm(tpl, { recursive: true, force: true })
    await rm(out, { recursive: true, force: true })
  }
})
