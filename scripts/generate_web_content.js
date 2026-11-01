const fs = require('fs');
const path = require('path');

function parseTsFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Extract fields using regex
  const title = (content.match(/title:\s*['"]([^'"]+)['"]/) || [])[1] || '';
  const description = (content.match(/description:\s*['"]([^'"]+)['"]/) || [])[1] || '';
  const difficulty = (content.match(/difficulty:\s*['"]([^'"]+)['"]/) || [])[1] || 'INTERMEDIATE';
  const estimatedLearnTime = parseInt((content.match(/estimatedLearnTime:\s*(\d+)/) || [])[1] || '60', 10);
  
  // Extract backtick blocks
  const extractBacktick = (key) => {
    const regex = new RegExp(`${key}:\\s*\`([\\s\\S]*?)\`,`);
    const match = content.match(regex);
    return match ? match[1].trim() : '';
  };

  const learningContent = extractBacktick('learningContent');
  const fullNotes = extractBacktick('fullNotes');
  const shortNotes = extractBacktick('shortNotes');
  const cheatSheet = extractBacktick('cheatSheet');

  // Extract interview questions
  const interviewQuestions = [];
  const qRegex = /\{\s*question:\s*['"]([^'"]+)['"],\s*answerHint:\s*['"]([^'"]+)['"],\s*type:\s*['"]([^'"]+)['"]/g;
  let qMatch;
  while ((qMatch = qRegex.exec(content)) !== null) {
    interviewQuestions.push({
      question: qMatch[1],
      answerHint: qMatch[2],
      type: qMatch[3]
    });
  }

  // Extract resources
  const resources = [];
  const rRegex = /\{\s*title:\s*['"]([^'"]+)['"],\s*url:\s*['"]([^'"]+)['"],\s*type:\s*['"]([^'"]+)['"]/g;
  let rMatch;
  while ((rMatch = rRegex.exec(content)) !== null) {
    resources.push({
      title: rMatch[1],
      url: rMatch[2],
      type: rMatch[3]
    });
  }

  const baseName = path.basename(filePath, '.ts');
  const slug = baseName.replace(/^sd_\d+_/, '').replace(/^aiml_\d+_/, '');

  return {
    id: baseName,
    slug,
    title,
    description,
    difficulty,
    estimatedLearnTime,
    learningContent,
    fullNotes,
    shortNotes,
    cheatSheet,
    interviewQuestions,
    resources
  };
}

const outDir = path.join(__dirname, '..', 'apps', 'web', 'src', 'data');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// 1. Process System Design
const sdDir = path.join(__dirname, '..', 'apps', 'api', 'prisma', 'content', 'system_design');
const sdFiles = fs.readdirSync(sdDir).filter(f => f.endsWith('.ts')).sort();
const sdTopics = sdFiles.map(f => parseTsFile(path.join(sdDir, f)));

fs.writeFileSync(
  path.join(outDir, 'systemDesignData.ts'),
  `// Auto-generated real system design curriculum data
export interface SystemDesignTopic {
  id: string;
  slug: string;
  title: string;
  description: string;
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  estimatedLearnTime: number;
  learningContent: string;
  fullNotes: string;
  shortNotes: string;
  cheatSheet: string;
  interviewQuestions: Array<{ question: string; answerHint: string; type: string }>;
  resources: Array<{ title: string; url: string; type: string }>;
}

export const SYSTEM_DESIGN_TOPICS: SystemDesignTopic[] = ${JSON.stringify(sdTopics, null, 2)};
`
);
console.log(`Generated ${sdTopics.length} system design topics into apps/web/src/data/systemDesignData.ts`);

// 2. Process AI/ML
const aimlDir = path.join(__dirname, '..', 'apps', 'api', 'prisma', 'content', 'aiml');
const aimlFiles = fs.readdirSync(aimlDir).filter(f => f.endsWith('.ts')).sort();
const aimlTopics = aimlFiles.map(f => parseTsFile(path.join(aimlDir, f)));

fs.writeFileSync(
  path.join(outDir, 'aimlData.ts'),
  `// Auto-generated real AI/ML systems curriculum data
export interface AimlTopic {
  id: string;
  slug: string;
  title: string;
  description: string;
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  estimatedLearnTime: number;
  learningContent: string;
  fullNotes: string;
  shortNotes: string;
  cheatSheet: string;
  interviewQuestions: Array<{ question: string; answerHint: string; type: string }>;
  resources: Array<{ title: string; url: string; type: string }>;
}

export const AIML_TOPICS: AimlTopic[] = ${JSON.stringify(aimlTopics, null, 2)};
`
);
console.log(`Generated ${aimlTopics.length} AI/ML topics into apps/web/src/data/aimlData.ts`);
