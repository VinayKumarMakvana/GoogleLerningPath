const fs = require('fs');
const path = require('path');

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

      // Replace standard 500 response with P2023 check
      const replacement = `if (error.code === 'P2023') {
        return res.status(400).json({ error: 'Invalid ID format' });
      }
      res.status(500).json`;

      content = content.replace(/res\.status\(500\)\.json/g, replacement);

      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content);
        console.log('Fixed errors in', fullPath);
      }
    }
  }
}

traverse(modulesDir);
console.log('Error fix complete.');
