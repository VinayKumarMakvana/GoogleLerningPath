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
      
      // We know there's a block like:
      // } catch (e: any) {
      //   console.error(e);
      //   if (error.code === 'P2023') {
      
      // Let's globally replace `if (error.code === 'P2023')` based on the catch variable.
      // Actually, since some use `error` and some use `e`, let's just replace `error.code === 'P2023'`
      // with `(error?.code === 'P2023' || e?.code === 'P2023')`. But wait, if `error` is undeclared, `error?.code` throws ReferenceError!
      
      // Better way: Replace `error.code === 'P2023'` with `(typeof error !== 'undefined' ? error : (typeof e !== 'undefined' ? e : err)).code === 'P2023'`
      // Even better, let's just do a regex replace based on the nearest catch block.
      
      let lines = content.split('\n');
      let currentCatchVar = 'error';
      for (let i = 0; i < lines.length; i++) {
        const catchMatch = lines[i].match(/catch\s*\(\s*(\w+)/);
        if (catchMatch) {
          currentCatchVar = catchMatch[1];
        }
        if (lines[i].includes("if (error.code === 'P2023') {")) {
          lines[i] = lines[i].replace("error.code", `${currentCatchVar}.code`);
        }
      }
      
      const newContent = lines.join('\n');
      if (content !== newContent) {
        fs.writeFileSync(fullPath, newContent);
        console.log('Fixed catch in', fullPath);
      }
    }
  }
}

traverse(modulesDir);
console.log('Catch fix complete.');
