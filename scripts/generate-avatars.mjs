import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const avatarsDir = path.join(__dirname, '../avatars');
const outputFile = path.join(__dirname, '../public/avatars.json');

if (!fs.existsSync(avatarsDir)) {
  fs.mkdirSync(avatarsDir, { recursive: true });
}

const files = fs.readdirSync(avatarsDir).filter(file => file.endsWith('.svg'));

const avatars = files.map(file => {
  const name = path.basename(file, '.svg');
  const content = fs.readFileSync(path.join(avatarsDir, file), 'utf-8');
  
  const innerMatch = content.match(/<svg[^>]*>([\s\S]*?)<\/svg>/i);
  const innerContent = innerMatch ? innerMatch[1].trim() : '';
  
  const viewBoxMatch = content.match(/viewBox="([^"]+)"/i);
  const viewBox = viewBoxMatch ? viewBoxMatch[1] : '0 0 24 24';

  const isSolid = content.includes('fill="currentColor"') && !content.includes('fill="none"');

  return {
    name,
    path: innerContent,
    viewBox,
    isSolid
  };
});

if (!fs.existsSync(path.dirname(outputFile))) {
  fs.mkdirSync(path.dirname(outputFile), { recursive: true });
}

fs.writeFileSync(outputFile, JSON.stringify(avatars, null, 2));
console.log(`Generated ${outputFile} with ${avatars.length} avatars.`);
