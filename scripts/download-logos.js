const https = require('https');
const fs = require('fs');
const path = require('path');

const logos = {
  gmail: 'https://www.google.com/gmail/about/static/images/logo-gmail.png',
  outlook: 'https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE1Mu3b?ver=5c31',
  instagram: 'https://static.cdninstagram.com/rsrc.php/v3/yt/r/30PrGfR3xhB.png',
  twitter: 'https://abs.twimg.com/responsive-web/client-web/icon-ios.b1fc727a.png',
  facebook: 'https://static.xx.fbcdn.net/rsrc.php/yD/r/d4ZIVX-5C-b.ico',
  discord: 'https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0a6a49cf127bf92de1e2_icon_clyde_blurple_RGB.png',
  chatgpt: 'https://chat.openai.com/apple-touch-icon.png',
  yahoo: 'https://s.yimg.com/cv/apiv2/default/20201027/logo.png',
  tiktok: 'https://sf16-scmcdn-sg.ibytedtos.com/goofy/tiktok/web/node/_next/static/images/logo-whole-c555aa707602e714ec956ac96e9db366.svg',
  gmx: 'https://www.gmx.com/images/gmx-logo.png',
  aol: 'https://www.aol.com/favicon.ico',
  protonmail: 'https://proton.me/images/shared/protonmail-logo.png',
  yandex: 'https://yastatic.net/s3/home-static/_/37/37a02b5dc7a51abac55d8a5b6c865f0e.png',
  mail: 'https://www.google.com/gmail/about/static/images/logo-gmail.png',
  naver: 'https://www.naver.com/favicon.ico',
  rambler: 'https://mail.rambler.ru/public/rambler-mail/static/favicons/favicon-196x196.png',
  german: 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Flag_of_Germany.svg',
  default: 'https://www.google.com/gmail/about/static/images/logo-gmail.png'
};

const downloadLogo = (url, filename) => {
  const targetPath = path.join(__dirname, '../public/images/brands', filename);
  
  if (!fs.existsSync(path.dirname(targetPath))) {
    fs.mkdirSync(path.dirname(targetPath), { recursive: true });
  }

  https.get(url, (response) => {
    if (response.statusCode === 302 || response.statusCode === 301) {
      // 处理重定向
      downloadLogo(response.headers.location, filename);
      return;
    }
    
    const file = fs.createWriteStream(targetPath);
    response.pipe(file);
    file.on('finish', () => {
      file.close();
      console.log(`Downloaded: ${filename}`);
    });
  }).on('error', (err) => {
    console.error(`Error downloading ${filename}: ${err.message}`);
  });
};

// 确保目录存在
const brandsDir = path.join(__dirname, '../public/images/brands');
if (!fs.existsSync(brandsDir)) {
  fs.mkdirSync(brandsDir, { recursive: true });
}

Object.entries(logos).forEach(([name, url]) => {
  downloadLogo(url, `${name}.png`);
}); 