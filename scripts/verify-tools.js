const fs = require('fs');

// Read the aiToolsData.ts file
const filePath = './src/data/aiToolsData.ts';
const fileContent = fs.readFileSync(filePath, 'utf8');

// Extract tool IDs using regex
const toolIds = [...fileContent.matchAll(/id: '([^']+)'/g)].map(match => match[1]);

console.log('=== AI TOOLS VERIFICATION ===');
console.log('Total AI Tools Found:', toolIds.length);
console.log('\n=== Tool IDs List ===');
toolIds.forEach((id, index) => {
  console.log(`${index + 1}. ${id}`);
});

console.log('\n=== Tool URLs (localhost:3001) ===');
toolIds.forEach(id => {
  console.log(`http://localhost:3001/ai-tools/${id}`);
});
