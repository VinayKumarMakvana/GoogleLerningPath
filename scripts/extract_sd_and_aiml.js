const fs = require('fs');
const path = require('path');

function inspectFolder(folder) {
  console.log(`\n=== INSPECTING ${folder} ===`);
  const fullPath = path.join(__dirname, '..', 'apps', 'api', 'prisma', 'content', folder);
  if (!fs.existsSync(fullPath)) {
    console.log('Folder does not exist:', fullPath);
    return;
  }
  const files = fs.readdirSync(fullPath);
  for (const f of files) {
    if (!f.endsWith('.ts')) continue;
    const content = fs.readFileSync(path.join(fullPath, f), 'utf8');
    const titleMatch = content.match(/title:\s*['"]([^'"]+)['"]/);
    const diffMatch = content.match(/difficulty:\s*['"]([^'"]+)['"]/);
    const estMatch = content.match(/estimatedLearnTime:\s*(\d+)/);
    console.log(`- ${f.padEnd(25)}: ${titleMatch ? titleMatch[1] : 'Unknown'} [${diffMatch ? diffMatch[1] : 'N/A'}] (${estMatch ? estMatch[1] : 60}m)`);
  }
}

inspectFolder('system_design');
inspectFolder('aiml');
