// temporary disable because it takes too long time.
// to enable e2e test, you may need to try:
// yarn add puppeteer --dev

import puppeteer from 'puppeteer'
import { resolve } from 'path'
import { Nuxt, Builder } from 'nuxt'
import test from 'ava'
import os from 'os'

let nuxtConfig = require('../../nuxt.config.js')
let puppeteerConfig = {
  args: ['--no-sandbox']
}
let port = 3000
let nuxt = null
let browser = null

nuxtConfig.dev = true
nuxtConfig.rootDir = resolve(__dirname, '..', '..')
nuxtConfig.mode = 'universal'

const url = route => 'http://localhost:' + port + route

test.before(async () => {
  let isWSL = {}
  if (os.release().includes('Microsoft')) {
    // in WSL environment, will use Chrome installed on the Windows
    isWSL = {
      executablePath: '/mnt/c/Program Files (x86)/Google/Chrome/Application/chrome.exe'
      // , headless: false
    }
  }

  nuxt = new Nuxt(nuxtConfig)
  await new Builder(nuxt).build()
  await nuxt.listen(port, 'localhost')
  browser = await puppeteer.launch(Object.assign(isWSL, puppeteerConfig))
}, 120 * 1000)

test('Rendering page', async t => {
  const page = await browser.newPage()
  await page.goto(url('/AAECAZICBrQDxQTCzgKZ0wKb6AL1/AIMQF/pAdMD5AigzQKHzgKY0gKe0gLb0wK/8gLi+AIA?locale=ko'))
  t.is(await page.evaluate(() => document.querySelector('#img-hero-class').src), 'https://hs.static.sena.kr/icon/class/druid.png')
})

test('Navigation from frontpage to single', async t => {
  const page = await browser.newPage()
  await page.goto(url('/'))
  t.not(await page.$('#deckcode'), null)

  // type and go
  await page.type('#deckcode', 'I want to see the following code AAECAZICBrQDxQTCzgKZ0wKb6AL1/AIMQF/pAdMD5AigzQKHzgKY0gKe0gLb0wK/8gLi+AIA :)')
  // I don't know why 'click' method does not work. Anyway, this is a workaround.
  // await page.click('#btnSubmit')
  await page.evaluate(() => {
    document.querySelector('#btnSubmit').click()
  })
  await page.waitForSelector('#img-hero-class')
  t.is(await page.evaluate(() => document.querySelector('#img-hero-class').src), 'https://hs.static.sena.kr/icon/class/druid.png')
})

test('Navigate from frontpage to multiple', async t => {
  const page = await browser.newPage()
  await page.goto(url('/'))
  t.not(await page.$('#deckcode'), null)

  // type and go
  await page.type('#deckcode', 'AAECAaIHBIbCAoDTAs/hAsPqAg3EAZwC7QKfA4gFmwWGCZfBAvzBAsfTAtvjAvbsAuL4AgA=' +
  ')body.d: AAECAf0ECLQE7QW/wQKrBHHDAe72AqLTAguVA7n/AsHBApYFmMQC5gT77AKP0wLsBZX/ArsCAA==llowing code AAECAZICB' +
  'rQDxQTCzgKZ0wKb6AL1/AIMQF/pAdMD5AigzQKHzgKY0gKe0gLb0wK/8gLi+AIA :) AAECAf0')

  // await page.click('#btnSubmit')
  await page.evaluate(() => {
    document.querySelector('#btnSubmit').click()
  })
  await page.waitForSelector('#cardsContainer')
  t.is(await page.evaluate(() => document.querySelectorAll('.list-hero-class-icon').length), 3)
})

test.after('clean up', t => {
  nuxt.close()
  browser.close()
})
