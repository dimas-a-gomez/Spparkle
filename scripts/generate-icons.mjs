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

fs.writeFileSync(outputFile, JSON.stringify(icons, null, 2));
console.log(`Generated ${outputFile} with ${icons.length} icons.`);
