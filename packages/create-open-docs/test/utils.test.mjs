import assert from 'node:assert/strict'
import { test } from 'node:test'

import {
  PACKAGE_MANAGERS,
  devCommand,
  installCommand,
  isValidHexColor,
  normalizeHex,
  toPackageName,
  validateProjectName,
} from '../src/utils.mjs'

test('toPackageName normalizes to a valid npm name', () => {
  assert.equal(toPackageName('My Cool Docs'), 'my-cool-docs')
  assert.equal(toPackageName('  Spaces  '), 'spaces')
  assert.equal(toPackageName('weird@@chars!!'), 'weird-chars')
  assert.equal(toPackageName('--leading-and-trailing--'), 'leading-and-trailing')
  assert.equal(toPackageName('a___b'), 'a___b')
})

test('validateProjectName accepts good names', () => {
  assert.equal(validateProjectName('docs').valid, true)
  assert.equal(validateProjectName('My Docs').valid, true)
})

test('validateProjectName rejects bad names', () => {
  assert.equal(validateProjectName('').valid, false)
  assert.equal(validateProjectName('   ').valid, false)
  assert.equal(validateProjectName('.').valid, false)
  assert.equal(validateProjectName('..').valid, false)
  assert.equal(validateProjectName('a/b').valid, false)
  assert.equal(validateProjectName('a\\b').valid, false)
  assert.equal(validateProjectName('!!!').valid, false)
})

test('isValidHexColor handles 3- and 6-digit, with/without #', () => {
  assert.equal(isValidHexColor('#f97316'), true)
  assert.equal(isValidHexColor('f97316'), true)
  assert.equal(isValidHexColor('#f70'), true)
  assert.equal(isValidHexColor('abc'), true)
  assert.equal(isValidHexColor('#xyz'), false)
  assert.equal(isValidHexColor('#ff'), false)
  assert.equal(isValidHexColor('red'), false)
})

test('normalizeHex expands shorthand and lowercases', () => {
  assert.equal(normalizeHex('#F70'), '#ff7700')
  assert.equal(normalizeHex('F97316'), '#f97316')
  assert.equal(normalizeHex('#ABCDEF'), '#abcdef')
})

test('install/dev commands per package manager', () => {
  assert.equal(installCommand('npm'), 'npm install')
  assert.equal(installCommand('pnpm'), 'pnpm install')
  assert.equal(installCommand('yarn'), 'yarn install')
  assert.equal(devCommand('npm'), 'npm run dev')
  assert.equal(devCommand('pnpm'), 'pnpm dev')
  assert.deepEqual(PACKAGE_MANAGERS, ['pnpm', 'npm', 'yarn'])
})
