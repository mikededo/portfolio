import { sveltekit } from '@sveltejs/kit/vite'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
    sveltekit(),
    {
      handleHotUpdate({ file, server }) {
        if (file.includes('/blog/') && file.endsWith('.mdx')) {
          console.log(file)
          server.ws.send({ path: '*', type: 'full-reload' })

          return []
        }
      },
      name: 'update-mdx'
    }
  ]
})
