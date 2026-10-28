import { cwd } from 'node:process'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  if (command === 'build') {
    const env = loadEnv(mode, cwd(), 'VITE_')
    const missing = ['VITE_SUPABASE_URL', 'VITE_SUPABASE_ANON_KEY'].filter(
      (name) => !env[name]?.trim(),
    )

    if (missing.length) {
      throw new Error(
        `Crittr signup configuration is missing: ${missing.join(', ')}. ` +
          'Set these public Supabase values in your hosting project’s build environment, then redeploy. ' +
          'The local .env.local file is not uploaded by Git. See docs/signup-handoff.md.',
      )
    }
  }

  return { plugins: [react()] }
})
