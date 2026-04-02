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
  let innerContent = innerMatch ? innerMatch[1].trim() : '';
  
  // Clean up Figma exports automatically
  innerContent = innerContent
    // Remove transparent bounding boxes often exported by Figma
    .replace(/<rect[^>]*fill="none"[^>]*\/>/gi, '')
    // Replace any hardcoded fill color (except 'none') with 'currentColor'
    .replace(/fill="(?!(?:none|currentColor))[^"]+"/gi, 'fill="currentColor"')
    // Replace any hardcoded stroke color (except 'none') with 'currentColor'
    .replace(/stroke="(?!(?:none|currentColor))[^"]+"/gi, 'stroke="currentColor"');
  
  const viewBoxMatch = content.match(/viewBox="([^"]+)"/i);
  const viewBox = viewBoxMatch ? viewBoxMatch[1] : '0 0 24 24';

  // Determine if solid based on the original content
  const isSolid = !content.includes('stroke=') && content.includes('fill=') && !content.includes('fill="none"');

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
