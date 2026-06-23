import readline from 'node:readline/promises'
import { stdin, stdout } from 'node:process'

/**
 * Minimal prompt helpers over node:readline. Each accepts a validator and
 * re-asks until valid. A non-interactive stdin (piped/CI) falls back to the
 * provided default.
 */

const c = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  red: '\x1b[31m',
}

export function color(name, text) {
  return `${c[name] ?? ''}${text}${c.reset}`
}

export function createInterface() {
  return readline.createInterface({ input: stdin, output: stdout })
}

/** True when stdin is a real terminal we can prompt against. */
export function isInteractive() {
  return Boolean(stdin.isTTY)
}

/** Free-text prompt with optional default and validator. */
export async function ask(rl, { message, defaultValue, validate }) {
  if (!isInteractive()) return defaultValue ?? ''
  const suffix = defaultValue ? color('dim', ` (${defaultValue})`) : ''
  for (;;) {
    const answer = (await rl.question(`${color('cyan', '?')} ${message}${suffix} `)).trim()
    const value = answer || defaultValue || ''
    if (!validate) return value
    const result = validate(value)
    if (result === true) return value
    stdout.write(`${color('red', '✗')} ${result}\n`)
  }
}

/** Single-choice list prompt; returns the chosen option string. */
export async function choose(rl, { message, choices, defaultValue }) {
  const def = defaultValue ?? choices[0]
  if (!isInteractive()) return def
  const list = choices.map((ch) => (ch === def ? color('bold', ch) : ch)).join(' / ')
  for (;;) {
    const answer = (await rl.question(`${color('cyan', '?')} ${message} [${list}] `))
      .trim()
      .toLowerCase()
    const value = answer || def
    if (choices.includes(value)) return value
    stdout.write(`${color('red', '✗')} Please choose one of: ${choices.join(', ')}\n`)
  }
}

/** Yes/no prompt. */
export async function confirm(rl, { message, defaultValue = true }) {
  if (!isInteractive()) return defaultValue
  const hint = defaultValue ? 'Y/n' : 'y/N'
  const answer = (await rl.question(`${color('cyan', '?')} ${message} (${hint}) `))
    .trim()
    .toLowerCase()
  if (!answer) return defaultValue
  return answer === 'y' || answer === 'yes'
}
