import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const iconsDir = path.join(__dirname, '../icons');
const outputFile = path.join(__dirname, '../public/icons.json');

if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

const files = fs.readdirSync(iconsDir).filter(file => file.endsWith('.svg'));

const icons = files.map(file => {
  const name = path.basename(file, '.svg');
  const content = fs.readFileSync(path.join(iconsDir, file), 'utf-8');
  
  const innerMatch = content.match(/<svg[^>]*>([\s\S]*?)<\/svg>/i);
  const innerContent = innerMatch ? innerMatch[1].trim() : '';
  
  const viewBoxMatch = content.match(/viewBox="([^"]+)"/i);
  const viewBox = viewBoxMatch ? viewBoxMatch[1] : '0 0 24 24';

  return {
    name,
    content,
    innerContent,
    viewBox
  };
});

if (!fs.existsSync(path.dirname(outputFile))) {
  fs.mkdirSync(path.dirname(outputFile), { recursive: true });
}

fs.writeFileSync(outputFile, JSON.stringify(icons, null, 2));
console.log(`Generated ${outputFile} with ${icons.length} icons.`);
