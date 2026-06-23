#!/usr/bin/env node
import { spawnSync } from 'node:child_process'
import { existsSync, readdirSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import process from 'node:process'

import { ask, choose, color, confirm, createInterface } from '../src/prompts.mjs'
import { applyBrandColor, copyTemplate, writePackageJson } from '../src/scaffold.mjs'
import {
  PACKAGE_MANAGERS,
  devCommand,
  installCommand,
  isValidHexColor,
  toPackageName,
  validateProjectName,
} from '../src/utils.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const TEMPLATE_DIR = path.resolve(__dirname, '..', 'template')
const DEFAULT_BRAND = '#f97316'

/**
 * Tiny flag parser. Recognizes `--no-install`, `--install`, `--pm <name>`,
 * `--color <hex>` (and `--pm=npm` / `--color=#fff` forms). Everything else that
 * doesn't start with `-` is collected as a positional in `_`.
 */
function parseFlags(argv) {
  const flags = { _: [], install: undefined, pm: undefined, color: undefined }
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i]
    if (arg === '--no-install') flags.install = false
    else if (arg === '--install') flags.install = true
    else if (arg === '--pm' || arg === '--color') {
      flags[arg === '--pm' ? 'pm' : 'color'] = argv[++i]
    } else if (arg.startsWith('--pm=')) flags.pm = arg.slice(5)
    else if (arg.startsWith('--color=')) flags.color = arg.slice(8)
    else if (!arg.startsWith('-')) flags._.push(arg)
  }
  return flags
}

function detectPackageManager() {
  const ua = process.env.npm_config_user_agent ?? ''
  for (const pm of PACKAGE_MANAGERS) if (ua.startsWith(pm)) return pm
  return 'pnpm'
}

async function main() {
  console.log(`\n${color('bold', '◆ create-open-docs')} — scaffold a new documentation site\n`)

  if (!existsSync(TEMPLATE_DIR)) {
    console.error(color('red', `✗ Template not found at ${TEMPLATE_DIR}`))
    process.exit(1)
  }

  const flags = parseFlags(process.argv.slice(2))
  const argName = flags._[0]
  const rl = createInterface()

  try {
    // 1. Project name
    const projectName = await ask(rl, {
      message: 'Project name?',
      defaultValue: argName || 'my-docs',
      validate: (v) => {
        const { valid, problem } = validateProjectName(v)
        return valid || problem
      },
    })

    const dirName = toPackageName(projectName)
    const targetDir = path.resolve(process.cwd(), dirName)

    if (existsSync(targetDir) && readdirSync(targetDir).length > 0) {
      const proceed = await confirm(rl, {
        message: `Directory "${dirName}" exists and is not empty. Continue?`,
        defaultValue: false,
      })
      if (!proceed) {
        console.log(color('dim', '\nAborted.'))
        process.exit(0)
      }
    }

    // 2. Brand color
    const brandColor = await ask(rl, {
      message: 'Brand accent color (hex)?',
      defaultValue: flags.color && isValidHexColor(flags.color) ? flags.color : DEFAULT_BRAND,
      validate: (v) => isValidHexColor(v) || 'Enter a hex color like #f97316 or #f70.',
    })

    // 3. Package manager
    const pm = await choose(rl, {
      message: 'Package manager?',
      choices: PACKAGE_MANAGERS,
      defaultValue: PACKAGE_MANAGERS.includes(flags.pm) ? flags.pm : detectPackageManager(),
    })

    // 4. Install now?
    const doInstall = flags.install === false
      ? false
      : await confirm(rl, {
          message: `Install dependencies with ${pm} now?`,
          defaultValue: true,
        })

    rl.close()

    // Scaffold
    console.log(`\n${color('cyan', '›')} Creating project in ${color('bold', targetDir)}`)
    await copyTemplate(TEMPLATE_DIR, targetDir)
    const pkg = await writePackageJson(targetDir, { projectName })
    const themed = await applyBrandColor(targetDir, brandColor)
    console.log(`${color('green', '✓')} Files copied (${pkg.name})`)
    if (themed) console.log(`${color('green', '✓')} Brand color set to ${brandColor}`)

    if (doInstall) {
      console.log(`\n${color('cyan', '›')} ${installCommand(pm)}\n`)
      const [cmd, ...args] = installCommand(pm).split(' ')
      const result = spawnSync(cmd, args, { cwd: targetDir, stdio: 'inherit', shell: true })
      if (result.status !== 0) {
        console.error(color('red', '\n✗ Dependency installation failed. You can run it manually.'))
      }
    }

    // Next steps
    console.log(`\n${color('green', '✔ Done!')} Next steps:\n`)
    console.log(`  cd ${dirName}`)
    if (!doInstall) console.log(`  ${installCommand(pm)}`)
    console.log(`  ${devCommand(pm)}\n`)
    console.log(color('dim', 'Happy documenting! → https://github.com/shahnawaz-pabon/open-docs\n'))
  } finally {
    rl.close()
  }
}

main().catch((err) => {
  console.error(color('red', `\n✗ ${err?.message ?? err}`))
  process.exit(1)
})
