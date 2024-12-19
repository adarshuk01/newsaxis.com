const { execSync } = require('child_process');

const dependencies = [
  'libnss3',
  'libatk1.0-0',
  'libatk-bridge2.0-0',
  'libcups2',
  'libxcomposite1',
  'libxrandr2',
  'libxdamage1',
  'libx11-xcb1',
  'libxcb-dri3-0',
  'libdrm2',
  'libdbus-glib-1-2',
];

try {
  console.log('Installing Puppeteer dependencies...');
  execSync(`apt-get update && apt-get install -y ${dependencies.join(' ')}`);
  console.log('Dependencies installed successfully.');
} catch (error) {
  console.error('Failed to install dependencies:', error);
  process.exit(1);
}
