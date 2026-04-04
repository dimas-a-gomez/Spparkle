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

function processDirectory(dir, outputFile) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const files = fs.readdirSync(dir).filter(file => file.endsWith('.svg'));
  let bloggerContent = '';

  const items = files.map(file => {
    const name = path.basename(file, '.svg');
    let content = fs.readFileSync(path.join(dir, file), 'utf-8');
    
    const innerMatch = content.match(/<svg[^>]*>([\s\S]*?)<\/svg>/i);
    let innerContent = innerMatch ? innerMatch[1].trim() : '';
    
    // Clean up Figma exports safely
    innerContent = innerContent
      .replace(/<rect[^>]*fill="none"[^>]*\/>/gi, '') // Remove transparent bounding boxes
      .replace(/(fill|stroke)="([^"]+)"/gi, (match, attr, value) => {
        if (value.toLowerCase() === 'none') return match;
        if (value.toLowerCase() === 'currentcolor') return match;
        return `${attr}="currentColor"`;
      });
    
    const cleanSvg = `<svg class="spkr" viewBox="0 0 24 24">\n  ${innerContent}\n</svg>`;
    
    bloggerContent += `<b:includable id='icon-${name}'>\n  ${cleanSvg}\n</b:includable>\n\n`;

    return {
      name,
      path: innerContent,
      viewBox: '0 0 24 24',
      cleanSvg
    };
  });

  if (!fs.existsSync(path.dirname(outputFile))) {
    fs.mkdirSync(path.dirname(outputFile), { recursive: true });
  }

  fs.writeFileSync(outputFile, JSON.stringify(items, null, 2));
  console.log(`Generated ${outputFile} with ${items.length} items.`);
  
  return { items, bloggerContent };
}

const iconsResult = processDirectory(iconsDir, iconsOutputFile);
const avatarsResult = processDirectory(avatarsDir, avatarsOutputFile);

const fullBloggerContent = iconsResult.bloggerContent + avatarsResult.bloggerContent;
fs.writeFileSync(bloggerOutputFile, fullBloggerContent.trim());
console.log(`Generated ${bloggerOutputFile}`);
