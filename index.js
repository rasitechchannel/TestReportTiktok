const axios = require('axios');
const Chance = require('chance');
const randomUseragent = require('random-useragent');
const { v4: uuidv4 } = require('uuid');

const chance = new Chance();

let counter = 0;
async function sendTikTokRequest() {
  // Menghasilkan UUID secara acak untuk device id dan token
  const randomDeviceId = uuidv4();
  const randomToken = uuidv4();

  // Menggunakan library chance.js untuk menghasilkan nilai acak lainnya
  const randomLanguageId = chance.locale();
  const randomRegion = chance.country();
  const randomWebIdLastTime = chance.integer({ min: 1, max: 999999999 });

  // Menggunakan random-useragent untuk mendapatkan user agent secara acak
  const randomUserAgent = randomUseragent.getRandom();

  const headers = {
    'authority': 'www.tiktok.com',
    'accept': '*/*',
    'accept-language': 'en-US,en;q=0.9',
    'cookie': 'tt_csrf_token=05ZC8lvb-Tv2Obs1Hvsc1Ck0zolyhj9rq8DY; tt_chain_token=3' + randomToken, // Ganti dengan cookie yang sesuai
    'referer': 'https://www.tiktok.com/@amudhatrala',
    'sec-ch-ua': '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': 'Windows',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
    'user-agent': randomUserAgent,
  };

  const url = `https://www.tiktok.com/aweme/v2/aweme/feedback/?WebIdLastTime=${randomWebIdLastTime}&aid=1988&app_language=${randomLanguageId}&app_name=tiktok_web&browser_language=en-US&browser_name=Mozilla&browser_online=true&browser_platform=Win32&browser_version=5.0%20%28Windows%20NT%2010.0%3B%20Win64%3B%20x64%29%20AppleWebKit%2F537.36%20%28KHTML%2C%20like%20Gecko%29%20Chrome%2F120.0.0.0%20Safari%2F537.36&channel=tiktok_web&cookie_enabled=true&current_region=${randomRegion}&device_id=7311742755389359634&device_platform=web_pc&focus_state=true&from_page=user&history_len=2&is_fullscreen=false&is_page_visible=true&lang=en&nickname=zionist%20woman%20%F0%9F%87%AE%F0%9F%87%B1%F0%9F%A9%B7&object_id=6849978771639616517&os=windows&owner_id=6849978771639616517&priority_region=&reason=910121&referer=&region=${randomRegion}&report_type=user&screen_height=1080&screen_width=1920&secUid=MS4wLjABAAAAA13Z9fttVi0Kjmy68YaZ3YajEPQqE2B3ZOGQu6lzAIlYp52TFsvYChfxFiYy8Bw-&target=6849978771639616517&tz_name=Asia%2FJakarta&webcast_language=en&msToken=XLMtZ-1QQ-qWkAngoiUb1uVRBcQook6aJA1xXuQQIJFuFjsfXFHnBal5XEjBjczQg5CpGH-cV0IjmhMlsNCgWxQYEzkdWpl6dVQGlW5jbJRzdePUmw4h8QFmAXJ8KBkWOw42p-s30rOXQRg=&X-Bogus=DFSzswVuAybAN9oEtuJpc09WcBJy&_signature=_02B4Z6wo00001wt6rNwAAIDDC3qs3KSlK-cLeqhAAKew0c`
  try {
    const response = await axios.get(url, { headers });
    // console.log(response.data);
    
    if (response.data.status_message) {
        
        console.log(`${counter}. ${response.data.status_message}`);
    } else {
        
        console.log(response.data);
        console.log(`${counter}. Gagal Request Report!`);
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Panggil fungsi untuk mengirim permintaan TikTok

// Fungsi untuk menjalankan sendTikTokRequest setiap 500ms
async function runEvery500ms() {
  
    setInterval(() => {
      sendTikTokRequest();
      counter++;
    }, 1000);
  }
  
  // Panggil fungsi untuk menjalankan sendTikTokRequest setiap 500ms
  runEvery500ms();