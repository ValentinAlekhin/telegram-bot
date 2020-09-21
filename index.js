const fs = require('fs-extra')
const path = require('path')
const https = require('https')

const { Telegraf } = require('telegraf')
const speech = require('@google-cloud/speech')

const speechClient = new speech.SpeechClient()

const TOKEN = 'lol'

const voiceToText = async voice => {
  const file = await fs.readFile(voice)
  const audioBytes = file.toString('base64')

  const audio = {
    content: audioBytes,
  }

  const config = {
    encoding: 'LINEAR16',
    sampleRateHertz: 16000,
    languageCode: 'ru-RU',
  }

  const request = {
    audio: audio,
    config: config,
  }

  const [ response ] = await client.recognize(request)

  return response.results
}

const bot = new Telegraf(TOKEN)

bot.start(ctx => {
  ctx.reply('Welcome')
})

bot.on('voice', async ctx => {
  try {
    const file_id = ctx.update.message.voice.file_id
    const url = await ctx.telegram.getFileLink(file_id)
    const fileName = path.join(__dirname, 'data', `${file_id}.oga`)
  
    const file = fs.createWriteStream(fileName)
    const request = https.get(url, res => res.pipe(file))

    // const text = await voiceToText(fileName)
  
    ctx.reply('voice resived') 
  } catch (err) {
    console.log(err)
    ctx.reply(err)
  }
})

bot.launch()