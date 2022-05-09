import * as fs from 'fs';
import * as https from 'https';
import { dir, files, githubUrl, proxyUrl, tag } from './giteeConfig';

async function download(url: string, file: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const fileStream = fs.createWriteStream(file);
    https
      .get(url, response => {
        response.pipe(fileStream);
        fileStream.on('finish', () => {
          resolve();
        });
      })
      .on('error', error => {
        reject(error);
      });
  });
}

(async function () {
  const requests = files.map(file => {
    return download(`${proxyUrl}${githubUrl}${tag}/${file}`, `./${dir}/${file}`);
  });
  await Promise.all(requests);
  console.log('download success');
})();
