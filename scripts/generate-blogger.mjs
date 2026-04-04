import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const iconsFile = path.join(__dirname, '../public/icons.json');
const avatarsFile = path.join(__dirname, '../public/avatars.json');
const outputFile = path.join(__dirname, '../public/blogger-setup.txt');

const icons = JSON.parse(fs.readFileSync(iconsFile, 'utf-8'));
const avatars = JSON.parse(fs.readFileSync(avatarsFile, 'utf-8'));

let output = '';

const processItems = (items, prefix) => {
  items.forEach(item => {
    const attrs = [];
    if (item.xmlns) attrs.push(`xmlns="${item.xmlns}"`);
    if (item.width) attrs.push(`width="${item.width}"`);
    if (item.height) attrs.push(`height="${item.height}"`);
    if (item.viewBox) attrs.push(`viewBox="${item.viewBox}"`);
    if (item.fill) attrs.push(`fill="${item.fill}"`);
    if (item.stroke) attrs.push(`stroke="${item.stroke}"`);
    if (item.strokeWidth) attrs.push(`stroke-width="${item.strokeWidth}"`);
    if (item.strokeLinecap) attrs.push(`stroke-linecap="${item.strokeLinecap}"`);
    if (item.strokeLinejoin) attrs.push(`stroke-linejoin="${item.strokeLinejoin}"`);
    
    const svgContent = `<svg ${attrs.join(' ')}>\n  ${item.path}\n</svg>`;
    output += `<b:includable id='${prefix}${item.name}'>\n${svgContent}\n</b:includable>\n\n`;
  });
};

processItems(icons, 'icon-');
processItems(avatars, 'avatar-');

fs.writeFileSync(outputFile, output.trim());
console.log(`Generated ${outputFile}`);
