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
  
  // Clean up Figma exports safely
  innerContent = innerContent
    .replace(/<rect[^>]*fill="none"[^>]*\/>/gi, '') // Remove transparent bounding boxes
    .replace(/(fill|stroke)="(#000000|#000|black|#111111|#111|#222222|#222|#333333|#333|#D9D9D9)"/gi, '$1="currentColor"')
    .replace(/(fill|stroke)="(#ffffff|#fff|white)"/gi, '$1="none"');
  
  const viewBoxMatch = content.match(/viewBox="([^"]+)"/i);
  const viewBox = viewBoxMatch ? viewBoxMatch[1] : '0 0 24 24';

  const svgTagMatch = content.match(/<svg([^>]*)>/i);
  const svgAttrs = svgTagMatch ? svgTagMatch[1] : '';
  
  const getAttr = (attr) => {
    const match = svgAttrs.match(new RegExp(`${attr}="([^"]+)"`, 'i'));
    return match ? match[1] : undefined;
  };

  let fill = getAttr('fill');
  if (fill && /^(#000000|#000|black|#111111|#111|#222222|#222|#333333|#333|#D9D9D9)$/i.test(fill)) fill = 'currentColor';
  if (fill && /^(#ffffff|#fff|white)$/i.test(fill)) fill = 'none';

  let stroke = getAttr('stroke');
  if (stroke && /^(#000000|#000|black|#111111|#111|#222222|#222|#333333|#333|#D9D9D9)$/i.test(stroke)) stroke = 'currentColor';
  if (stroke && /^(#ffffff|#fff|white)$/i.test(stroke)) stroke = 'none';

  const strokeWidth = getAttr('stroke-width') || getAttr('strokeWidth');
  const strokeLinecap = getAttr('stroke-linecap') || getAttr('strokeLinecap');
  const strokeLinejoin = getAttr('stroke-linejoin') || getAttr('strokeLinejoin');
  const width = getAttr('width');
  const height = getAttr('height');
  const xmlns = getAttr('xmlns');

  return {
    name,
    path: innerContent,
    viewBox,
    fill,
    stroke,
    strokeWidth,
    strokeLinecap,
    strokeLinejoin,
    width,
    height,
    xmlns
  };
});

if (!fs.existsSync(path.dirname(outputFile))) {
  fs.mkdirSync(path.dirname(outputFile), { recursive: true });
}

fs.writeFileSync(outputFile, JSON.stringify(icons, null, 2));
console.log(`Generated ${outputFile} with ${icons.length} icons.`);
