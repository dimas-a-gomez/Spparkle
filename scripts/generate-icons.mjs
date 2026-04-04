import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const iconsDir = path.join(__dirname, '../icons');
const avatarsDir = path.join(__dirname, '../avatars');
const iconsOutputFile = path.join(__dirname, '../public/icons.json');
const avatarsOutputFile = path.join(__dirname, '../public/avatars.json');
const bloggerOutputFile = path.join(__dirname, '../public/blogger-setup.txt');

function processDirectory(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    return [];
  }

  const files = fs.readdirSync(dirPath).filter(file => file.endsWith('.svg'));

  return files.map(file => {
    const name = path.basename(file, '.svg');
    const content = fs.readFileSync(path.join(dirPath, file), 'utf-8');
    
    const innerMatch = content.match(/<svg[^>]*>([\s\S]*?)<\/svg>/i);
    let innerContent = innerMatch ? innerMatch[1].trim() : '';
    
    // Clean up Figma exports safely
    innerContent = innerContent
      .replace(/<rect[^>]*fill="none"[^>]*\/>/gi, '') // Remove transparent bounding boxes
      .replace(/(fill|stroke)="([^"]+)"/gi, (match, attr, val) => {
        if (/^(#ffffff|#fff|white|none)$/i.test(val)) return `${attr}="none"`;
        return `${attr}="currentColor"`;
      });
    
    const viewBoxMatch = content.match(/viewBox="([^"]+)"/i);
    const viewBox = '0 0 24 24'; // Force viewBox to 0 0 24 24 as requested

    const svgTagMatch = content.match(/<svg([^>]*)>/i);
    const svgAttrs = svgTagMatch ? svgTagMatch[1] : '';
    
    const getAttr = (attr) => {
      const match = svgAttrs.match(new RegExp(`${attr}="([^"]+)"`, 'i'));
      return match ? match[1] : undefined;
    };

    let fill = getAttr('fill');
    if (fill && /^(#ffffff|#fff|white|none)$/i.test(fill)) fill = 'none';
    else if (fill) fill = 'currentColor';

    let stroke = getAttr('stroke');
    if (stroke && /^(#ffffff|#fff|white|none)$/i.test(stroke)) stroke = 'none';
    else if (stroke) stroke = 'currentColor';

    const strokeWidth = getAttr('stroke-width') || getAttr('strokeWidth');

    // Generate clean SVG for Blogger
    // Remove width, height, xmlns, and fill="none"
    const cleanSvg = `<svg class='spkr' viewBox="${viewBox}"${fill && fill !== 'none' ? ` fill="${fill}"` : ''}${stroke ? ` stroke="${stroke}"` : ''}${strokeWidth ? ` stroke-width="${strokeWidth}"` : ''}>${innerContent}</svg>`;

    return {
      name,
      path: innerContent,
      viewBox,
      fill,
      stroke,
      strokeWidth,
      cleanSvg
    };
  });
}

const icons = processDirectory(iconsDir);
const avatars = processDirectory(avatarsDir);

if (!fs.existsSync(path.dirname(iconsOutputFile))) {
  fs.mkdirSync(path.dirname(iconsOutputFile), { recursive: true });
}

fs.writeFileSync(iconsOutputFile, JSON.stringify(icons, null, 2));
fs.writeFileSync(avatarsOutputFile, JSON.stringify(avatars, null, 2));
console.log(`Generated JSON files with ${icons.length} icons and ${avatars.length} avatars.`);

// Generate Blogger Library
let bloggerContent = '';
const allItems = [...icons, ...avatars];

allItems.forEach(item => {
  bloggerContent += `<b:includable id='icon-${item.name}'>\n  ${item.cleanSvg}\n</b:includable>\n\n`;
});

fs.writeFileSync(bloggerOutputFile, bloggerContent.trim());
console.log(`Generated ${bloggerOutputFile} with ${allItems.length} items.`);
