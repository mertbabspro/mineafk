const mineflayer = require('mineflayer')
const readline = require('readline')

const bot = mineflayer.createBot({
  host: 'zurnacraft.net',
  username: 'ytufgeasx',
  version: false
})

// Konsoldan komut almak için
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

bot.once('spawn', async () => {
  console.log('Sunucuya girildi.'),
  await sleep(2000)
  bot.chat('/login allahuekber ')
  console.log('Login atıldı')

  // Itemlerin gelmesini bekle
  await sleep(7000)

  // 5. slotu seç (klavyede 5 = index 4)
  bot.setQuickBarSlot(4)
  console.log('5. slot seçildi.')

  // Sağ tık
  bot.activateItem()
  console.log('5. slota sağ tık atıldı.')

  // Sol tık (kol sallama gibi düşün)
  bot.swingArm('right')
  console.log('5. slota sol tık atıldı.')

  // 3 saniye bekle
  await sleep(3000)

  // Direkt 24. slota tıkla (index 23)
  try {
    bot.clickWindow(23, 0, 0)
    console.log('24. slota tıklandı.')
  } catch (e) {
    console.log('Pencere yokken tıklamaya çalışıldı, olabilir:', e.message)
  }

  console.log('Artık konsola ne yazarsan bot oyunda yazacak 👇')
})

// Konsoldan yazdığını chate gönder
rl.on('line', (line) => {
  if (!line) return
  bot.chat(line)
  console.log('[SEN -> OYUN]:', line)
})

// Sunucu chat loglarını yazdır
bot.on('chat', (username, message) => {
  console.log(`[CHAT] ${username}: ${message}`)
})

// Sistem mesajlarını da görmek istersen:
bot.on('message', (jsonMsg) => {
  console.log('[MSG]', jsonMsg.toString())
})

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

bot.on('error', err => console.log('Hata:', err))
bot.on('end', () => console.log('Bot bağlantısı kesildi.'))

