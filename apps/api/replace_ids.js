const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const modulesDir = path.join(__dirname, 'src/modules');

function traverse(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      traverse(fullPath);
    } else if (fullPath.endsWith('.controller.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let originalContent = content;

      // Pattern 1: const userId = req.query.userId as string || '660000000000000000000001';
      // Pattern 2: const userId = req.body.userId || '660000000000000000000001';
      content = content.replace(/const userId = [^;]+'660000000000000000000001';/g, 'const userId = req.user!.id;');
      
      // Pattern 3: userId: '660000000000000000000001',
      content = content.replace(/userId:\s*'660000000000000000000001',/g, 'userId: req.user!.id,');

      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content);
        console.log('Updated', fullPath);
      }
    }
  }
}

traverse(modulesDir);
console.log('Replacement complete.');
