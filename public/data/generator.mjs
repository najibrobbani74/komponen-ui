// Import Puppeteer menggunakan ES Modules
import puppeteer from "puppeteer";
import data from './data.json' assert { type: 'json' };
import fs from 'fs';
const filePath = 'data.json';
const folderPath = './src/data/' ;

(async () => {
  // Meluncurkan browser headless
  const browser = await puppeteer.launch({
    headless: true, // Ensure the browser is not headless so that you can see the window
    defaultViewport: null, // Disable the default viewport
    args: ['--start-fullscreen'] // Open in fullscreen mode
  });
  const page = await browser.newPage();
  const { width, height } = await page.evaluate(() => {
    return {
      width: window.screen.width,
      height: window.screen.height
    };
  });

  // Set the viewport to be fullscreen (match screen size)
  
  // akses tiap children data
  // foreach data
  for (let item in data) {
    const itemValue = data[item]
    const child = itemValue.children;
    for (let component in child) {
      await page.setViewport({
        width: width,
        height: height,
      });
      const componentValue = child[component];
      let syntax = `
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body class='w-full max-h-max'>
        `+ componentValue.syntax + `
        </body>
      </html>
      `;
      await page.setContent(syntax, { waitUntil: 'networkidle2', });
      const { contentWidth, contentHeight } = await page.evaluate(() => {
        return {
          contentWidth: document.body.children[0].clientWidth,
          contentHeight: document.body.children[0].clientHeight,
        };
      });
      
      await page.setViewport({
        width: contentWidth,
        height: contentHeight,        
      });
      await page.screenshot({ path: folderPath+ 'images/'+itemValue.key + '_' + componentValue.key + '.jpg', fullPage: true });
      console.log('Screenshot saved as ' + itemValue.key + '_' + componentValue.key + '.jpg');
      data[item].children[component].image = itemValue.key + '_' + componentValue.key + '.jpg';
      console.log(data[item].children);
    }
  }
  
  fs.writeFile(folderPath+filePath, JSON.stringify(data, null, 2), (err) => {
    if (err) {
      console.error('Error writing the file:', err);
    } else {
      console.log('File successfully updated!');
    }
  });
  await browser.close();

})();
