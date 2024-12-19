const { exec } = require('child_process');
const fs = require('fs');
const https = require('https');

const CHROMIUM_URL = 'https://storage.googleapis.com/chromium-browser-snapshots/Linux_x64/818858/chrome-linux.zip';
const CHROMIUM_ZIP = 'chrome-linux.zip';

function downloadChromium(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest);
      reject(err.message);
    });
  });
}

async function installChromium() {
  try {
    await downloadChromium(CHROMIUM_URL, CHROMIUM_ZIP);
    exec('unzip -o chrome-linux.zip', (err, stdout, stderr) => {
      if (err) {
        console.error(`Error installing Chromium: ${err}`);
        return;
      }
      console.log(stdout);
    });
  } catch (error) {
    console.error(`Error downloading Chromium: ${error}`);
  }
}

installChromium();
