const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Clearing old data...');
  await prisma.userProgress.deleteMany();
  await prisma.resource.deleteMany();
  await prisma.graphLink.deleteMany();
  await prisma.topic.deleteMany();

  // ══════════════════════════════════════════════════
  // MASSIVE TOPIC LIST — organized by domain
  // ══════════════════════════════════════════════════
  const topics = [
    // === CORE CS ===
    { id: 'cs', label: 'Computer Science' },
    { id: 'programming', label: 'Programming' },
    { id: 'algorithms', label: 'Algorithms' },
    { id: 'data-structures', label: 'Data Structures' },
    { id: 'databases', label: 'Databases' },
    { id: 'os', label: 'Operating Systems' },
    { id: 'networking', label: 'Networking' },
    { id: 'compilers', label: 'Compilers' },
    { id: 'discrete-math', label: 'Discrete Math' },
    { id: 'computation', label: 'Theory of Computation' },
    
    // === WEB DEV ===
    { id: 'web', label: 'Web' },
    { id: 'html', label: 'HTML' },
    { id: 'css', label: 'CSS' },
    { id: 'js', label: 'JavaScript' },
    { id: 'typescript', label: 'TypeScript' },
    { id: 'react', label: 'React' },
    { id: 'nextjs', label: 'Next.js' },
    { id: 'vue', label: 'Vue.js' },
    { id: 'angular', label: 'Angular' },
    { id: 'svelte', label: 'Svelte' },
    { id: 'node', label: 'Node.js' },
    { id: 'express', label: 'Express' },
    { id: 'graphql', label: 'GraphQL' },
    { id: 'rest-api', label: 'REST API' },
    { id: 'websocket', label: 'WebSocket' },
    { id: 'tailwind', label: 'Tailwind CSS' },
    { id: 'sass', label: 'Sass' },
    { id: 'webpack', label: 'Webpack' },
    { id: 'vite', label: 'Vite' },
    { id: 'browser', label: 'Browser' },
    { id: 'dom', label: 'DOM' },
    { id: 'pwa', label: 'PWA' },
    { id: 'accessibility', label: 'Accessibility' },
    { id: 'seo', label: 'SEO' },
    
    // === LANGUAGES ===
    { id: 'python', label: 'Python' },
    { id: 'java', label: 'Java' },
    { id: 'csharp', label: 'C#' },
    { id: 'cpp', label: 'C++' },
    { id: 'c', label: 'C' },
    { id: 'rust', label: 'Rust' },
    { id: 'go', label: 'Go' },
    { id: 'kotlin', label: 'Kotlin' },
    { id: 'swift', label: 'Swift' },
    { id: 'ruby', label: 'Ruby' },
    { id: 'php', label: 'PHP' },
    { id: 'r-lang', label: 'R' },
    { id: 'haskell', label: 'Haskell' },
    { id: 'scala', label: 'Scala' },
    { id: 'lua', label: 'Lua' },
    { id: 'dart', label: 'Dart' },
    { id: 'sql', label: 'SQL' },
    
    // === DATA & AI ===
    { id: 'ml', label: 'Machine Learning' },
    { id: 'deep-learning', label: 'Deep Learning' },
    { id: 'neural-networks', label: 'Neural Networks' },
    { id: 'nlp', label: 'NLP' },
    { id: 'cv', label: 'Computer Vision' },
    { id: 'data-science', label: 'Data Science' },
    { id: 'ai', label: 'AI' },
    { id: 'reinforcement-learning', label: 'Reinforcement Learning' },
    { id: 'generative-ai', label: 'Generative AI' },
    { id: 'llm', label: 'LLMs' },
    { id: 'tensorflow', label: 'TensorFlow' },
    { id: 'pytorch', label: 'PyTorch' },
    { id: 'pandas', label: 'Pandas' },
    { id: 'numpy', label: 'NumPy' },
    { id: 'statistics', label: 'Statistics' },
    { id: 'linear-algebra', label: 'Linear Algebra' },
    { id: 'data-viz', label: 'Data Visualization' },
    
    // === DEVOPS & CLOUD ===
    { id: 'devops', label: 'DevOps' },
    { id: 'docker', label: 'Docker' },
    { id: 'kubernetes', label: 'Kubernetes' },
    { id: 'aws', label: 'AWS' },
    { id: 'gcp', label: 'Google Cloud' },
    { id: 'azure', label: 'Azure' },
    { id: 'linux', label: 'Linux' },
    { id: 'git', label: 'Git' },
    { id: 'cicd', label: 'CI/CD' },
    { id: 'terraform', label: 'Terraform' },
    { id: 'nginx', label: 'Nginx' },
    
    // === DATABASES ===
    { id: 'postgresql', label: 'PostgreSQL' },
    { id: 'mysql', label: 'MySQL' },
    { id: 'mongodb', label: 'MongoDB' },
    { id: 'redis', label: 'Redis' },
    { id: 'sqlite', label: 'SQLite' },
    { id: 'firebase', label: 'Firebase' },
    { id: 'supabase', label: 'Supabase' },
    { id: 'prisma', label: 'Prisma' },
    
    // === MOBILE ===
    { id: 'mobile', label: 'Mobile Dev' },
    { id: 'react-native', label: 'React Native' },
    { id: 'flutter', label: 'Flutter' },
    { id: 'ios', label: 'iOS Dev' },
    { id: 'android', label: 'Android Dev' },

    // === SECURITY ===
    { id: 'security', label: 'Cybersecurity' },
    { id: 'cryptography', label: 'Cryptography' },
    { id: 'ethical-hacking', label: 'Ethical Hacking' },
    { id: 'web-security', label: 'Web Security' },
    
    // === GAME DEV ===
    { id: 'game-dev', label: 'Game Dev' },
    { id: 'unity', label: 'Unity' },
    { id: 'unreal', label: 'Unreal Engine' },
    { id: 'godot', label: 'Godot' },
    { id: 'opengl', label: 'OpenGL' },
    { id: 'computer-graphics', label: 'Computer Graphics' },
    
    // === EMBEDDED / HARDWARE ===
    { id: 'embedded', label: 'Embedded Systems' },
    { id: 'arduino', label: 'Arduino' },
    { id: 'raspberry-pi', label: 'Raspberry Pi' },
    { id: 'iot', label: 'IoT' },
    { id: 'firmware', label: 'Firmware' },
    
    // === DESIGN & MISC ===
    { id: 'ui-ux', label: 'UI/UX Design' },
    { id: 'figma', label: 'Figma' },
    { id: 'design-patterns', label: 'Design Patterns' },
    { id: 'system-design', label: 'System Design' },
    { id: 'microservices', label: 'Microservices' },
    { id: 'clean-code', label: 'Clean Code' },
    { id: 'testing', label: 'Testing' },
    { id: 'agile', label: 'Agile' },
    { id: 'open-source', label: 'Open Source' },
    { id: 'blockchain', label: 'Blockchain' },
    { id: 'web3', label: 'Web3' },
    { id: 'quantum', label: 'Quantum Computing' },
    { id: 'robotics', label: 'Robotics' },
    { id: 'functional-programming', label: 'Functional Programming' },
    { id: 'regex', label: 'Regex' },
    { id: 'automation', label: 'Automation' },
    { id: 'web-scraping', label: 'Web Scraping' },
    { id: 'competitive-prog', label: 'Competitive Programming' },
    { id: 'dsa', label: 'DSA' },
    { id: 'interview-prep', label: 'Interview Prep' },
    { id: 'math', label: 'Mathematics' },
    { id: 'physics-sim', label: 'Physics Simulation' },
    { id: 'music-prod', label: 'Music Production' },
    { id: 'video-editing', label: 'Video Editing' },
    { id: 'three-js', label: 'Three.js' },
    { id: 'd3', label: 'D3.js' },
    { id: 'electron', label: 'Electron' },
  ];

  // ══════════════════════════════════════════════════
  // CONNECTIONS — how topics relate to each other
  // ══════════════════════════════════════════════════
  const links = [
    // CS Core tree
    ['cs', 'programming'], ['cs', 'algorithms'], ['cs', 'data-structures'], ['cs', 'databases'],
    ['cs', 'os'], ['cs', 'networking'], ['cs', 'compilers'], ['cs', 'discrete-math'],
    ['cs', 'computation'], ['cs', 'system-design'],
    
    // Programming → Languages
    ['programming', 'python'], ['programming', 'java'], ['programming', 'js'],
    ['programming', 'cpp'], ['programming', 'c'], ['programming', 'rust'],
    ['programming', 'go'], ['programming', 'ruby'], ['programming', 'php'],
    ['programming', 'kotlin'], ['programming', 'swift'], ['programming', 'csharp'],
    ['programming', 'haskell'], ['programming', 'scala'], ['programming', 'lua'],
    ['programming', 'dart'], ['programming', 'r-lang'], ['programming', 'typescript'],
    ['programming', 'functional-programming'],
    ['programming', 'design-patterns'], ['programming', 'clean-code'],
    
    // Web tree
    ['web', 'html'], ['web', 'css'], ['web', 'js'], ['web', 'browser'],
    ['html', 'css'], ['css', 'js'], ['css', 'sass'], ['css', 'tailwind'],
    ['js', 'typescript'], ['js', 'dom'], ['js', 'node'],
    ['js', 'react'], ['js', 'vue'], ['js', 'angular'], ['js', 'svelte'],
    ['react', 'nextjs'], ['react', 'react-native'],
    ['vue', 'vite'], ['node', 'express'], 
    ['node', 'graphql'], ['node', 'rest-api'], ['node', 'websocket'],
    ['web', 'pwa'], ['web', 'accessibility'], ['web', 'seo'],
    ['web', 'web-security'], ['web', 'webpack'], ['web', 'vite'],
    ['js', 'three-js'], ['js', 'd3'], ['js', 'electron'],
    
    // Data & AI tree
    ['ai', 'ml'], ['ai', 'nlp'], ['ai', 'cv'], ['ai', 'generative-ai'],
    ['ml', 'deep-learning'], ['ml', 'reinforcement-learning'], ['ml', 'statistics'],
    ['deep-learning', 'neural-networks'], ['deep-learning', 'tensorflow'], ['deep-learning', 'pytorch'],
    ['generative-ai', 'llm'],
    ['data-science', 'ml'], ['data-science', 'statistics'], ['data-science', 'data-viz'],
    ['data-science', 'python'], ['data-science', 'pandas'], ['data-science', 'numpy'],
    ['python', 'pandas'], ['python', 'numpy'], ['python', 'tensorflow'], ['python', 'pytorch'],
    ['ml', 'linear-algebra'], ['statistics', 'math'], ['linear-algebra', 'math'],
    ['python', 'automation'], ['python', 'web-scraping'],
    
    // DevOps tree
    ['devops', 'docker'], ['devops', 'kubernetes'], ['devops', 'cicd'],
    ['devops', 'linux'], ['devops', 'git'], ['devops', 'terraform'],
    ['devops', 'nginx'], ['devops', 'aws'], ['devops', 'gcp'], ['devops', 'azure'],
    ['linux', 'os'],
    
    // Database tree
    ['databases', 'sql'], ['databases', 'postgresql'], ['databases', 'mysql'],
    ['databases', 'mongodb'], ['databases', 'redis'], ['databases', 'sqlite'],
    ['databases', 'firebase'], ['databases', 'supabase'], ['databases', 'prisma'],
    ['supabase', 'postgresql'],
    
    // Mobile tree
    ['mobile', 'react-native'], ['mobile', 'flutter'], ['mobile', 'ios'], ['mobile', 'android'],
    ['dart', 'flutter'], ['swift', 'ios'], ['kotlin', 'android'],
    ['react', 'react-native'],
    
    // Security tree
    ['security', 'cryptography'], ['security', 'ethical-hacking'], ['security', 'web-security'],
    ['security', 'networking'],
    
    // Game Dev tree
    ['game-dev', 'unity'], ['game-dev', 'unreal'], ['game-dev', 'godot'],
    ['game-dev', 'opengl'], ['game-dev', 'computer-graphics'],
    ['cpp', 'unreal'], ['csharp', 'unity'], ['computer-graphics', 'opengl'],
    ['computer-graphics', 'three-js'], ['computer-graphics', 'physics-sim'],
    
    // Embedded tree
    ['embedded', 'arduino'], ['embedded', 'raspberry-pi'], ['embedded', 'iot'],
    ['embedded', 'firmware'], ['embedded', 'c'], ['embedded', 'cpp'],
    ['iot', 'arduino'], ['iot', 'raspberry-pi'],
    
    // Architecture
    ['system-design', 'microservices'], ['system-design', 'databases'],
    ['system-design', 'rest-api'], ['system-design', 'graphql'],
    ['design-patterns', 'clean-code'], ['testing', 'cicd'],
    ['agile', 'devops'],
    
    // Blockchain
    ['blockchain', 'web3'], ['blockchain', 'cryptography'],
    
    // Career
    ['algorithms', 'dsa'], ['dsa', 'competitive-prog'], ['dsa', 'interview-prep'],
    ['interview-prep', 'system-design'],
    
    // Design
    ['ui-ux', 'figma'], ['ui-ux', 'css'], ['ui-ux', 'accessibility'],
    
    // Cross-domain
    ['java', 'android'], ['java', 'kotlin'],
    ['python', 'django'], // won't exist yet, that's fine
    ['rust', 'embedded'], ['go', 'devops'], ['go', 'docker'],
    ['quantum', 'math'], ['robotics', 'python'], ['robotics', 'embedded'],
    ['regex', 'programming'],
    ['r-lang', 'statistics'], ['r-lang', 'data-science'],
    ['open-source', 'git'],
  ];

  // ══════════════════════════════════════════════════
  // INSERT EVERYTHING
  // ══════════════════════════════════════════════════
  console.log(`Inserting ${topics.length} topics...`);
  for (const t of topics) {
    await prisma.topic.create({ data: { id: t.id, label: t.label } });
  }

  // Filter links to only valid topic IDs
  const topicIds = new Set(topics.map(t => t.id));
  const validLinks = links.filter(([s, t]) => topicIds.has(s) && topicIds.has(t));

  console.log(`Inserting ${validLinks.length} connections...`);
  for (const [source, target] of validLinks) {
    await prisma.graphLink.create({ data: { sourceId: source, targetId: target } });
  }

  // ══════════════════════════════════════════════════
  // SEED RESOURCES for major topics
  // ══════════════════════════════════════════════════
  const resourceMap = {
    'html': [
      { title: 'MDN: HTML Basics', url: 'https://developer.mozilla.org/en-US/docs/Learn/HTML', category: 'Intro' },
      { title: 'W3Schools HTML', url: 'https://www.w3schools.com/html/', category: 'Intro' },
      { title: 'HTML Crash Course (Video)', url: 'https://www.youtube.com/watch?v=UB1O30fR-EE', category: 'Intro' },
      { title: 'HTML Best Practices', url: 'https://github.com/hail2u/html-best-practices', category: 'Interesting' },
      { title: 'HTML Reference', url: 'https://htmlreference.io/', category: 'Other' },
    ],
    'css': [
      { title: 'MDN: CSS First Steps', url: 'https://developer.mozilla.org/en-US/docs/Learn/CSS', category: 'Intro' },
      { title: 'CSS Crash Course (Video)', url: 'https://www.youtube.com/watch?v=yfoY53QXEnI', category: 'Intro' },
      { title: 'Learn CSS - web.dev', url: 'https://web.dev/learn/css/', category: 'Intro' },
      { title: 'Flexbox Guide', url: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/', category: 'Interesting' },
      { title: 'CSS Grid Garden', url: 'https://cssgridgarden.com/', category: 'Interesting' },
      { title: 'Flexbox Froggy', url: 'https://flexboxfroggy.com/', category: 'Interesting' },
    ],
    'js': [
      { title: 'JavaScript.info', url: 'https://javascript.info/', category: 'Intro' },
      { title: 'MDN JavaScript Guide', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide', category: 'Intro' },
      { title: 'Eloquent JavaScript', url: 'https://eloquentjavascript.net/', category: 'Intro' },
      { title: 'freeCodeCamp JS Course (Video)', url: 'https://www.youtube.com/watch?v=PkZNo7MFNFg', category: 'Intro' },
      { title: 'JavaScript 30', url: 'https://javascript30.com/', category: 'Interesting' },
      { title: 'You Don\'t Know JS', url: 'https://github.com/getify/You-Dont-Know-JS', category: 'Interesting' },
    ],
    'react': [
      { title: 'React Official Docs', url: 'https://react.dev/learn', category: 'Intro' },
      { title: 'React Full Course (Video)', url: 'https://www.youtube.com/watch?v=bMknfKXIFA8', category: 'Intro' },
      { title: 'React Patterns', url: 'https://www.patterns.dev/react', category: 'Interesting' },
      { title: 'useHooks', url: 'https://usehooks.com/', category: 'Interesting' },
    ],
    'python': [
      { title: 'Python Official Tutorial', url: 'https://docs.python.org/3/tutorial/', category: 'Intro' },
      { title: 'Automate the Boring Stuff', url: 'https://automatetheboringstuff.com/', category: 'Intro' },
      { title: 'Python Crash Course (Video)', url: 'https://www.youtube.com/watch?v=rfscVS0vtbw', category: 'Intro' },
      { title: 'Real Python', url: 'https://realpython.com/', category: 'Interesting' },
    ],
    'java': [
      { title: 'Oracle Java Tutorials', url: 'https://docs.oracle.com/javase/tutorial/', category: 'Intro' },
      { title: 'W3Schools Java', url: 'https://www.w3schools.com/java/', category: 'Intro' },
      { title: 'Java Full Course (Video)', url: 'https://www.youtube.com/watch?v=xk4_1vDrzzo', category: 'Intro' },
      { title: 'Baeldung', url: 'https://www.baeldung.com/', category: 'Interesting' },
      { title: 'Spring Boot Guide', url: 'https://spring.io/guides/gs/spring-boot/', category: 'Interesting' },
    ],
    'node': [
      { title: 'Node.js Official Docs', url: 'https://nodejs.org/en/learn', category: 'Intro' },
      { title: 'Node Crash Course (Video)', url: 'https://www.youtube.com/watch?v=fBNz5xF-Kx4', category: 'Intro' },
      { title: 'The Odin Project - Node', url: 'https://www.theodinproject.com/paths/full-stack-javascript/courses/nodejs', category: 'Intro' },
    ],
    'ml': [
      { title: 'Andrew Ng ML Course', url: 'https://www.coursera.org/learn/machine-learning', category: 'Intro' },
      { title: 'fast.ai', url: 'https://www.fast.ai/', category: 'Intro' },
      { title: 'Kaggle Learn', url: 'https://www.kaggle.com/learn', category: 'Interesting' },
      { title: 'ML Roadmap', url: 'https://roadmap.sh/ai-data-scientist', category: 'Other' },
    ],
    'docker': [
      { title: 'Docker Official Getting Started', url: 'https://docs.docker.com/get-started/', category: 'Intro' },
      { title: 'Docker Crash Course (Video)', url: 'https://www.youtube.com/watch?v=pg19Z8LL06w', category: 'Intro' },
    ],
    'git': [
      { title: 'Git Official Book', url: 'https://git-scm.com/book/en/v2', category: 'Intro' },
      { title: 'Learn Git Branching', url: 'https://learngitbranching.js.org/', category: 'Interesting' },
    ],
    'rust': [
      { title: 'The Rust Book', url: 'https://doc.rust-lang.org/book/', category: 'Intro' },
      { title: 'Rustlings Exercises', url: 'https://github.com/rust-lang/rustlings', category: 'Interesting' },
    ],
    'go': [
      { title: 'Go by Example', url: 'https://gobyexample.com/', category: 'Intro' },
      { title: 'A Tour of Go', url: 'https://go.dev/tour/', category: 'Intro' },
    ],
    'typescript': [
      { title: 'TypeScript Handbook', url: 'https://www.typescriptlang.org/docs/handbook/', category: 'Intro' },
      { title: 'TypeScript Exercises', url: 'https://typescript-exercises.github.io/', category: 'Interesting' },
    ],
    'algorithms': [
      { title: 'Visualgo - Algorithm Visualization', url: 'https://visualgo.net/', category: 'Intro' },
      { title: 'Algorithm Design Manual', url: 'https://www.algorist.com/', category: 'Interesting' },
      { title: 'NeetCode Roadmap', url: 'https://neetcode.io/roadmap', category: 'Interesting' },
    ],
    'linux': [
      { title: 'Linux Journey', url: 'https://linuxjourney.com/', category: 'Intro' },
      { title: 'Linux Command Reference', url: 'https://ss64.com/bash/', category: 'Other' },
    ],
    'security': [
      { title: 'OWASP Top 10', url: 'https://owasp.org/www-project-top-ten/', category: 'Intro' },
      { title: 'Hack The Box', url: 'https://www.hackthebox.com/', category: 'Interesting' },
    ],
  };

  let totalResources = 0;
  for (const [topicId, resources] of Object.entries(resourceMap)) {
    for (const res of resources) {
      await prisma.resource.create({
        data: { title: res.title, url: res.url, category: res.category, topicId }
      });
      totalResources++;
    }
  }

  console.log(`\n✅ Seeded ${topics.length} topics, ${validLinks.length} connections, ${totalResources} resources!`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
