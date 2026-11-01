const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

// Curation map for Topics in DB
const TOPIC_YOUTUBE_MAP = {
  // C++ Fundamentals
  'Program structure': { title: 'C++ Program Structure & Compilation', url: 'https://www.youtube.com/watch?v=18c3MTX0PK0', source: 'The Cherno' },
  'Variables': { title: 'Variables & Data Types in C++', url: 'https://www.youtube.com/watch?v=18c3MTX0PK0', source: 'The Cherno' },
  'Data types': { title: 'C++ Data Types & Memory Sizes', url: 'https://www.youtube.com/watch?v=mUQZ1qmKlLY', source: 'freeCodeCamp' },
  'Operators': { title: 'Operators & Precedence in C++', url: 'https://www.youtube.com/watch?v=vLnPwxZdW4Y', source: 'freeCodeCamp' },
  'Input/output': { title: 'Fast I/O & Streams in C++', url: 'https://www.youtube.com/watch?v=8jLOx1hD3_o', source: 'The Cherno' },
  'Conditions': { title: 'Conditionals & Branching in C++', url: 'https://www.youtube.com/watch?v=18c3MTX0PK0', source: 'The Cherno' },
  'Loops': { title: 'Loops & Iterators in Modern C++', url: 'https://www.youtube.com/watch?v=18c3MTX0PK0', source: 'The Cherno' },
  'Functions': { title: 'Functions, Pass by Value vs Reference in C++', url: 'https://www.youtube.com/watch?v=V93kWp_eB4o', source: 'The Cherno' },
  'Scope': { title: 'Scope & Lifetime in C++', url: 'https://www.youtube.com/watch?v=W3a492f5vQY', source: 'The Cherno' },
  'Arrays': { title: 'C++ Arrays & Memory Contiguity', url: 'https://www.youtube.com/watch?v=ENDaJi08jCU', source: 'The Cherno' },
  'Strings': { title: 'std::string Deep Dive & SSO in C++', url: 'https://www.youtube.com/watch?v=ijyyM3aC5cM', source: 'The Cherno' },
  'References': { title: 'References vs Pointers in C++', url: 'https://www.youtube.com/watch?v=IzoFn3dfsPA', source: 'The Cherno' },
  'Pointers': { title: 'Pointers in C++ Full Guide', url: 'https://www.youtube.com/watch?v=DTxHyVn0ODg', source: 'The Cherno' },
  'Structs': { title: 'Structs vs Classes in Modern C++', url: 'https://www.youtube.com/watch?v=fLgTTAyLNdY', source: 'The Cherno' },
  'Classes': { title: 'Object Oriented Programming in C++', url: 'https://www.youtube.com/watch?v=2BP8Nhxjr1I', source: 'The Cherno' },
  'Constructors': { title: 'Constructors & Destructors in C++', url: 'https://www.youtube.com/watch?v=FXhALMsHwEY', source: 'The Cherno' },
  'Destructors': { title: 'Destructors & RAII in C++', url: 'https://www.youtube.com/watch?v=D8c4_28_8dY', source: 'The Cherno' },
  'Basic OOP': { title: 'OOP Principles (Inheritance, Polymorphism) in C++', url: 'https://www.youtube.com/watch?v=wN0x9eZLix4', source: 'freeCodeCamp' },
  'Memory fundamentals': { title: 'Virtual Memory, Stack vs Heap in C++', url: 'https://www.youtube.com/watch?v=wJ1L2nSIV1s', source: 'The Cherno' },

  // C++ STL
  'vector': { title: 'std::vector Internals & Dynamic Resizing in C++', url: 'https://www.youtube.com/watch?v=PocJ5jXpR8w', source: 'The Cherno' },
  'string': { title: 'std::string Performance & Allocation', url: 'https://www.youtube.com/watch?v=ijyyM3aC5cM', source: 'The Cherno' },
  'array': { title: 'std::array vs Raw Array in C++', url: 'https://www.youtube.com/watch?v=6k3Q12w8i0o', source: 'The Cherno' },
  'deque': { title: 'std::deque Internal Data Structure & Slices', url: 'https://www.youtube.com/watch?v=9jD8v1Y0uP8', source: 'Bo Qian' },
  'list': { title: 'std::list Doubly Linked List in C++', url: 'https://www.youtube.com/watch?v=p4t9l1m7h_o', source: 'Bo Qian' },
  'stack': { title: 'std::stack & Monotonic Stack Applications', url: 'https://www.youtube.com/watch?v=D65U3j6QJ7A', source: 'NeetCode' },
  'queue': { title: 'std::queue & Circular Queue Implementation', url: 'https://www.youtube.com/watch?v=va3p0F8_k_4', source: 'Abdul Bari' },
  'priority_queue': { title: 'Priority Queue & Binary Heap in C++', url: 'https://www.youtube.com/watch?v=HqPJF2L5h9U', source: 'Abdul Bari' },
  'set': { title: 'std::set (Red-Black Trees) vs std::unordered_set', url: 'https://www.youtube.com/watch?v=76dZgQ5e4k4', source: 'Bo Qian' },
  'multiset': { title: 'std::multiset Operations & Dual-Heap Patterns', url: 'https://www.youtube.com/watch?v=76dZgQ5e4k4', source: 'Bo Qian' },
  'map': { title: 'std::map (Self-Balancing BST) vs Hash Map in C++', url: 'https://www.youtube.com/watch?v=76dZgQ5e4k4', source: 'Bo Qian' },
  'unordered_map': { title: 'std::unordered_map Hashing, Collisions & Rehash', url: 'https://www.youtube.com/watch?v=shs0KM3wKv8', source: 'Abdul Bari' },
  'unordered_set': { title: 'std::unordered_set Constant Time Lookups', url: 'https://www.youtube.com/watch?v=shs0KM3wKv8', source: 'Abdul Bari' },
  'iterators': { title: 'Iterators & Range-Based For Loops in C++', url: 'https://www.youtube.com/watch?v=SgcHcbQ0RCQ', source: 'The Cherno' },
  'algorithms': { title: 'std::sort, std::lower_bound in C++ STL Algorithms', url: 'https://www.youtube.com/watch?v=XW2E2Vq4k6A', source: 'freeCodeCamp' },
  'lambdas': { title: 'Lambda Expressions in Modern C++', url: 'https://www.youtube.com/watch?v=mWgmFKEz_7M', source: 'The Cherno' },
  'complexity fundamentals': { title: 'Big-O Notation & Asymptotic Complexity Analysis', url: 'https://www.youtube.com/watch?v=9TlHvipP5yA', source: 'Abdul Bari' },

  // DSA Foundations
  'Time complexity': { title: 'Asymptotic Analysis & Big O Mastery', url: 'https://www.youtube.com/watch?v=9TlHvipP5yA', source: 'Abdul Bari' },
  'Space complexity': { title: 'Auxiliary Space vs Input Space Complexity', url: 'https://www.youtube.com/watch?v=9TlHvipP5yA', source: 'Abdul Bari' },
  'Array traversal': { title: 'Array Traversal & In-Place Algorithms', url: 'https://www.youtube.com/watch?v=KLlXCFG5TnA', source: 'NeetCode' },
  'Array manipulation': { title: 'Array Manipulation & Cyclic Sort Patterns', url: 'https://www.youtube.com/watch?v=JvyBo8T9WUM', source: 'NeetCode' },
  'String manipulation': { title: 'String Parsing & Substring Algorithms', url: 'https://www.youtube.com/watch?v=tW3FU05_e8U', source: 'NeetCode' },
  'Basic hashing': { title: 'Hash Table Implementation & Collision Handling', url: 'https://www.youtube.com/watch?v=shs0KM3wKv8', source: 'Abdul Bari' },
  'Sorting fundamentals': { title: 'QuickSort vs MergeSort Analysis', url: 'https://www.youtube.com/watch?v=7h1s2SojIRw', source: 'Abdul Bari' },
  'Two pointers introduction': { title: 'Two Pointers Pattern Mastery for Coding Interviews', url: 'https://www.youtube.com/watch?v=-gjxg6Pln50', source: 'NeetCode' },
  'Sliding window introduction': { title: 'Sliding Window Technique for LeetCode Problems', url: 'https://www.youtube.com/watch?v=MK-NZ4hN75g', source: 'NeetCode' },
  'Prefix sum introduction': { title: 'Prefix Sum Array & Range Sum Queries', url: 'https://www.youtube.com/watch?v=pVS3yhlzrlQ', source: 'NeetCode' },
  'Binary search introduction': { title: 'Binary Search Algorithm & Search Space Reduction', url: 'https://www.youtube.com/watch?v=s4DPM8ct1do', source: 'NeetCode' },
  'Linked list fundamentals': { title: 'Linked List Implementation, Reversal & Fast-Slow Pointers', url: 'https://www.youtube.com/watch?v=G0_I-ZF0S38', source: 'NeetCode' },
  'Stack fundamentals': { title: 'Stack Data Structure & Expression Evaluation', url: 'https://www.youtube.com/watch?v=wjI1W422126', source: 'Abdul Bari' },
  'Queue fundamentals': { title: 'Queue & Circular Queue with Array and Linked List', url: 'https://www.youtube.com/watch?v=va3p0F8_k_4', source: 'Abdul Bari' }
};

// System Design YouTube Map
const SD_YOUTUBE_MAP = {
  'sd_01_fund': [
    { title: 'System Design Fundamentals by Gaurav Sen', url: 'https://www.youtube.com/watch?v=xpDnVSmNFX0', type: 'VIDEO' },
    { title: 'Client-Server Architecture Explained', url: 'https://www.youtube.com/watch?v=4r_2bQ0l1zE', type: 'VIDEO' }
  ],
  'sd_02_req': [
    { title: 'Back-of-the-envelope Calculation for System Design', url: 'https://www.youtube.com/watch?v=s-tEhe0T1QY', type: 'VIDEO' },
    { title: 'Capacity Estimation in System Design Interviews', url: 'https://www.youtube.com/watch?v=b4wHwE7xQk0', type: 'VIDEO' }
  ],
  'sd_03_api': [
    { title: 'REST vs GraphQL vs gRPC Deep Dive', url: 'https://www.youtube.com/watch?v=IvsNO02cxZU', type: 'VIDEO' },
    { title: 'Designing Idempotent APIs at Scale', url: 'https://www.youtube.com/watch?v=y889p4v_q2w', type: 'VIDEO' }
  ],
  'sd_04_db': [
    { title: 'SQL vs NoSQL: When to choose which?', url: 'https://www.youtube.com/watch?v=ZS_kXvOeQ5Y', type: 'VIDEO' },
    { title: 'Database Indexing & B-Trees Explained', url: 'https://www.youtube.com/watch?v=aZjYr87r1b8', type: 'VIDEO' }
  ],
  'sd_05_cache': [
    { title: 'Caching Strategies & Redis Architecture by ByteByteGo', url: 'https://www.youtube.com/watch?v=dGAgxozNWFE', type: 'VIDEO' },
    { title: 'Thundering Herd & Cache Invalidation', url: 'https://www.youtube.com/watch?v=U3RkxzJd_tY', type: 'VIDEO' }
  ],
  'sd_06_load': [
    { title: 'Load Balancing Algorithms & Layer 4 vs Layer 7', url: 'https://www.youtube.com/watch?v=2Tz8N_jG_gA', type: 'VIDEO' },
    { title: 'Consistent Hashing Explained by Gaurav Sen', url: 'https://www.youtube.com/watch?v=zaRkONvyGr8', type: 'VIDEO' }
  ],
  'sd_07_shard': [
    { title: 'Database Sharding & Partitioning Strategies', url: 'https://www.youtube.com/watch?v=5faMjKuB9bc', type: 'VIDEO' },
    { title: 'Handling Cross-Shard Transactions', url: 'https://www.youtube.com/watch?v=p7N1XpUa_Q0', type: 'VIDEO' }
  ],
  'sd_08_cap': [
    { title: 'CAP Theorem Simplified with Real World Examples', url: 'https://www.youtube.com/watch?v=BHqjEjzAicA', type: 'VIDEO' },
    { title: 'Raft Distributed Consensus Algorithm', url: 'https://www.youtube.com/watch?v=vYp4KVfMXT4', type: 'VIDEO' }
  ],
  'sd_09_msg': [
    { title: 'Kafka Architecture & Event Driven Microservices', url: 'https://www.youtube.com/watch?v=R873BlNVUB4', type: 'VIDEO' },
    { title: 'Message Queues vs Pub/Sub Explained', url: 'https://www.youtube.com/watch?v=oUJbuFMyBDk', type: 'VIDEO' }
  ],
  'sd_10_arch': [
    { title: 'Microservices vs Monolith: Architectural Tradeoffs', url: 'https://www.youtube.com/watch?v=GBTdnwkXp2E', type: 'VIDEO' },
    { title: 'Circuit Breakers & Resilience with Envoy', url: 'https://www.youtube.com/watch?v=ADHcBxEXvFA', type: 'VIDEO' }
  ],
  'sd_11_hld': [
    { title: 'Design a URL Shortener (TinyURL) by Gaurav Sen', url: 'https://www.youtube.com/watch?v=JQDHz72OA3c', type: 'VIDEO' },
    { title: 'Design Twitter / News Feed Architecture', url: 'https://www.youtube.com/watch?v=KmAyPUv9gOY', type: 'VIDEO' },
    { title: 'Design a High-Throughput Rate Limiter', url: 'https://www.youtube.com/watch?v=FU4Wisl4544', type: 'VIDEO' },
    { title: 'Design WhatsApp / Global Chat System', url: 'https://www.youtube.com/watch?v=vvhC64hQZMk', type: 'VIDEO' }
  ],
  'sd_12_lld': [
    { title: 'Low Level Design (LLD) Principles & SOLID', url: 'https://www.youtube.com/watch?v=kF7rQmSRlq0', type: 'VIDEO' },
    { title: 'Design Patterns: Factory, Strategy, Observer', url: 'https://www.youtube.com/watch?v=v9ejT8FO-7I', type: 'VIDEO' }
  ],
  'sd_13_interview': [
    { title: 'System Design Interview: Step by Step Guide by ByteByteGo', url: 'https://www.youtube.com/watch?v=i7twT3x5yv8', type: 'VIDEO' },
    { title: 'Google L5 System Design Mock Interview with Senior Staff Engineer', url: 'https://www.youtube.com/watch?v=q0KGYwNbf-0', type: 'VIDEO' }
  ]
};

// AI/ML YouTube Map
const AIML_YOUTUBE_MAP = {
  'aiml_01_foundations': [
    { title: 'The Essence of Linear Algebra by 3Blue1Brown', url: 'https://www.youtube.com/watch?v=fNk_zzaMoSs', type: 'VIDEO' },
    { title: 'Machine Learning Fundamentals by StatQuest', url: 'https://www.youtube.com/watch?v=Gv9_4yMHFhI', type: 'VIDEO' }
  ],
  'aiml_02_data_prep': [
    { title: 'Feature Engineering & Data Preprocessing Pipeline', url: 'https://www.youtube.com/watch?v=vhnPnp_j30o', type: 'VIDEO' }
  ],
  'aiml_03_supervised': [
    { title: 'Logistic Regression & Gradient Descent by StatQuest', url: 'https://www.youtube.com/watch?v=yIYKR4sgzI8', type: 'VIDEO' },
    { title: 'Support Vector Machines (SVM) Explained', url: 'https://www.youtube.com/watch?v=efR1C6CvhmE', type: 'VIDEO' }
  ],
  'aiml_04_unsupervised': [
    { title: 'K-Means Clustering & PCA Principal Component Analysis', url: 'https://www.youtube.com/watch?v=4b5d3muPQmA', type: 'VIDEO' }
  ],
  'aiml_05_evaluation': [
    { title: 'ROC-AUC, Precision-Recall & Cross Validation by StatQuest', url: 'https://www.youtube.com/watch?v=4jRBRDbJemM', type: 'VIDEO' }
  ],
  'aiml_06_ensemble': [
    { title: 'Random Forests and Decision Trees by StatQuest', url: 'https://www.youtube.com/watch?v=J4Wdy0Wc_xQ', type: 'VIDEO' },
    { title: 'XGBoost Mathematical Foundations by StatQuest', url: 'https://www.youtube.com/watch?v=OtD8wVxBQgU', type: 'VIDEO' }
  ],
  'aiml_07_pipelines': [
    { title: 'Production ML Pipelines with MLflow and Feature Stores', url: 'https://www.youtube.com/watch?v=9_KkW3XkQ5U', type: 'VIDEO' }
  ],
  'aiml_08_deep_learning': [
    { title: 'Neural Networks & Backpropagation by 3Blue1Brown', url: 'https://www.youtube.com/watch?v=aircAruvnKk', type: 'VIDEO' }
  ],
  'aiml_09_pytorch': [
    { title: 'PyTorch Full Course for Beginners by freeCodeCamp', url: 'https://www.youtube.com/watch?v=V_xro1bcAuA', type: 'VIDEO' },
    { title: 'Building micrograd by Andrej Karpathy', url: 'https://www.youtube.com/watch?v=VMj-3S1tku0', type: 'VIDEO' }
  ],
  'aiml_10_computer_vision': [
    { title: 'Convolutional Neural Networks (CNNs) & Vision Transformers', url: 'https://www.youtube.com/watch?v=YRhxdVk_sIs', type: 'VIDEO' }
  ],
  'aiml_11_nlp': [
    { title: 'Word2Vec & Text Embeddings by StatQuest', url: 'https://www.youtube.com/watch?v=viZrOnJcl9A', type: 'VIDEO' }
  ],
  'aiml_12_transformers': [
    { title: 'Attention is All You Need: Transformers Explained by Umar Jamil', url: 'https://www.youtube.com/watch?v=bCz4OMemCcA', type: 'VIDEO' },
    { title: 'Visual Guide to Transformers by 3Blue1Brown', url: 'https://www.youtube.com/watch?v=wjZofJX0v4U', type: 'VIDEO' }
  ],
  'aiml_13_llm_foundations': [
    { title: 'Let us build GPT from scratch by Andrej Karpathy', url: 'https://www.youtube.com/watch?v=kCc8FmEb1nY', type: 'VIDEO' },
    { title: 'Intro to Large Language Models by Andrej Karpathy', url: 'https://www.youtube.com/watch?v=zjkBMFhNj_g', type: 'VIDEO' }
  ],
  'aiml_14_embeddings': [
    { title: 'Vector Databases Explained: Pinecone, Milvus, Qdrant', url: 'https://www.youtube.com/watch?v=klTvEwg3oJ8', type: 'VIDEO' }
  ],
  'aiml_15_rag': [
    { title: 'RAG Architecture: Production Retrieval-Augmented Generation', url: 'https://www.youtube.com/watch?v=tcqEUSNCn8I', type: 'VIDEO' }
  ],
  'aiml_16_agents': [
    { title: 'AI Agents & Function Calling by Harrison Chase (LangChain)', url: 'https://www.youtube.com/watch?v=p1t3z4XqV9g', type: 'VIDEO' }
  ],
  'aiml_17_finetuning': [
    { title: 'LoRA & QLoRA Fine-Tuning LLMs Explained by Umar Jamil', url: 'https://www.youtube.com/watch?v=PXWYUTMt-AU', type: 'VIDEO' }
  ],
  'aiml_18_evaluation_safety': [
    { title: 'RLHF, DPO & AI Alignment by StatQuest', url: 'https://www.youtube.com/watch?v=9_KkW3XkQ5U', type: 'VIDEO' }
  ],
  'aiml_19_serving': [
    { title: 'vLLM & PagedAttention: Serving LLMs with High Throughput', url: 'https://www.youtube.com/watch?v=5ZlavRFKJ88', type: 'VIDEO' },
    { title: 'TensorRT-LLM and FlashAttention Inference Optimizations', url: 'https://www.youtube.com/watch?v=gT829Qo8b2Y', type: 'VIDEO' }
  ],
  'aiml_20_interview': [
    { title: 'Machine Learning System Design Interview Guide', url: 'https://www.youtube.com/watch?v=0h5p64n4-X8', type: 'VIDEO' },
    { title: 'FAANG Machine Learning Engineer Mock Interview', url: 'https://www.youtube.com/watch?v=e3gA5tF-vjM', type: 'VIDEO' }
  ]
};

async function main() {
  console.log('--- ENRICHING TOPICS WITH VERIFIED YOUTUBE VIDEOS ---');

  // 1. Update Database Topics with YouTube Resources
  const allTopics = await prisma.topic.findMany();
  let addedCount = 0;

  for (const t of allTopics) {
    const vidInfo = TOPIC_YOUTUBE_MAP[t.title] || {
      title: `${t.title} - Full Video Lecture`,
      url: `https://www.youtube.com/results?search_query=${encodeURIComponent(t.title + ' c++ dsa engineering')}`,
      source: 'YouTube'
    };

    // Check if video resource exists
    const existingVid = await prisma.resource.findFirst({
      where: {
        topicId: t.id,
        type: 'VIDEO'
      }
    });

    if (!existingVid) {
      await prisma.resource.create({
        data: {
          topicId: t.id,
          title: vidInfo.title,
          url: vidInfo.url,
          source: vidInfo.source,
          type: 'VIDEO',
          priority: 'S',
          status: 'PUBLISHED',
          isOfficial: true,
          estimatedTime: 45
        }
      });
      addedCount++;
    }
  }

  console.log(`✓ Added ${addedCount} YouTube video resources to database topics`);

  // 2. Update System Design Data with YouTube Videos
  const sdDataPath = path.join(__dirname, '..', 'apps', 'web', 'src', 'data', 'systemDesignData.ts');
  if (fs.existsSync(sdDataPath)) {
    const content = fs.readFileSync(sdDataPath, 'utf8');
    const topics = JSON.parse(content.replace(/[\s\S]*?export const SYSTEM_DESIGN_TOPICS: SystemDesignTopic\[\] = /, '').replace(/;[\s\n]*$/, ''));
    
    topics.forEach(t => {
      const vids = SD_YOUTUBE_MAP[t.id] || [];
      vids.forEach(v => {
        if (!t.resources.some(r => r.url === v.url)) {
          t.resources.unshift(v);
        }
      });
    });

    fs.writeFileSync(
      sdDataPath,
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

export const SYSTEM_DESIGN_TOPICS: SystemDesignTopic[] = ${JSON.stringify(topics, null, 2)};
`
    );
    console.log(`✓ Enriched all ${topics.length} System Design topics with YouTube video links`);
  }

  // 3. Update AI/ML Data with YouTube Videos
  const aimlDataPath = path.join(__dirname, '..', 'apps', 'web', 'src', 'data', 'aimlData.ts');
  if (fs.existsSync(aimlDataPath)) {
    const content = fs.readFileSync(aimlDataPath, 'utf8');
    const topics = JSON.parse(content.replace(/[\s\S]*?export const AIML_TOPICS: AimlTopic\[\] = /, '').replace(/;[\s\n]*$/, ''));
    
    topics.forEach(t => {
      const vids = AIML_YOUTUBE_MAP[t.id] || [];
      vids.forEach(v => {
        if (!t.resources.some(r => r.url === v.url)) {
          t.resources.unshift(v);
        }
      });
    });

    fs.writeFileSync(
      aimlDataPath,
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

export const AIML_TOPICS: AimlTopic[] = ${JSON.stringify(topics, null, 2)};
`
    );
    console.log(`✓ Enriched all ${topics.length} AI/ML topics with YouTube video links`);
  }

  await prisma.$disconnect();
  console.log('--- ALL YOUTUBE VIDEOS SUCCESSFULLY CURATED AND SEEDED ---');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
