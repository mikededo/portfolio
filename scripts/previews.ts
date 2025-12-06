#! /env/bun
import fs from 'node:fs'
import path from 'node:path'
import { chromium } from 'playwright'

const projects = [
  { slug: 'advent-ui', url: 'https://advent-ui.mikededo.com' },
  { slug: 'squared-ci', url: 'https://squared-ci.mikededo.com' }
]

// eslint-disable-next-line node/prefer-global/process
const outputDir = path.join(process.cwd(), 'static', 'previews')

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true })
}

(async () => {
  console.log('Opening browser')
  const browser = await chromium.launch()
  const page = await browser.newPage()

  await page.setViewportSize({ height: 800, width: 1200 })

  for (const project of projects) {
    console.log(`Snapping ${project.slug}...`)

    try {
      await page.goto(project.url, { waitUntil: 'networkidle' })
      await page.waitForTimeout(1000)
      await page.screenshot({
        path: path.join(outputDir, `${project.slug}.jpg`),
        quality: 80,
        type: 'jpeg'
      })
    } catch (e) {
      console.error(`Failed to capture ${project.slug}`, e)
    }
  }

  await browser.close()
  console.log('All previews generated!')
})()
