import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Rutas (Asegúrate de que tu carpeta de 1000 iconos se llame 'icons' en la raíz)
const iconsDir = path.join(__dirname, '../icons');
const outputFile = path.join(__dirname, '../public/icons.json');

if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

const files = fs.readdirSync(iconsDir).filter(file => file.endsWith('.svg'));

const icons = files.map(file => {
  // 1. LIMPIEZA DE NOMBRE: Quita el "-m 1", espacios y añade el prefijo "spkr-"
  const rawName = path.basename(file, '.svg');
  const cleanName = 'spkr-' + rawName.replace(/-m\s*\d*|-m/gi, '').trim();
  
  const content = fs.readFileSync(path.join(iconsDir, file), 'utf-8');
  
  // 2. EXTRAER CONTENIDO: Quita las etiquetas <svg> y limpia clases extrañas (como las de lucide)
  const innerMatch = content.match(/<svg[^>]*>([\s\S]*?)<\/svg>/i);
  let innerContent = innerMatch ? innerMatch[1].trim() : '';
  
  // Limpieza extra: Quita clases de CSS que puedan venir en el SVG original
  innerContent = innerContent.replace(/\sclass="[^"]*"/g, '');

  const viewBoxMatch = content.match(/viewBox="([^"]+)"/i);
  const viewBox = viewBoxMatch ? viewBoxMatch[1] : '0 0 24 24';

  // 3. RECONSTRUIR EL SVG: Creamos un SVG estándar y limpio para el campo "content"
  const cleanFullContent = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="${viewBox}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${innerContent}</svg>`;

  return {
    name: cleanName,
    content: cleanFullContent,
    innerContent,
    viewBox
  };
});

if (!fs.existsSync(path.dirname(outputFile))) {
  fs.mkdirSync(path.dirname(outputFile), { recursive: true });
}

fs.writeFileSync(outputFile, JSON.stringify(icons, null, 2));
console.log(`✅ ¡Éxito! Generado ${outputFile} con ${icons.length} iconos de Sparkkle Remix.`);
