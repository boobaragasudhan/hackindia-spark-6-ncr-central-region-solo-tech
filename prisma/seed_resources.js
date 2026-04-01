const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Resources for EVERY topic in the database
const allResources = {
  'cs': [
    { title: 'CS50 - Harvard (Video)', url: 'https://www.youtube.com/watch?v=8mAITcNt710', category: 'Intro' },
    { title: 'Teach Yourself CS', url: 'https://teachyourselfcs.com/', category: 'Intro' },
    { title: 'OSSU Computer Science', url: 'https://github.com/ossu/computer-science', category: 'Interesting' },
  ],
  'programming': [
    { title: 'freeCodeCamp Full Course', url: 'https://www.freecodecamp.org/', category: 'Intro' },
    { title: 'The Odin Project', url: 'https://www.theodinproject.com/', category: 'Intro' },
    { title: 'Codecademy', url: 'https://www.codecademy.com/', category: 'Interesting' },
  ],
  'algorithms': [
    { title: 'Visualgo - Algorithm Visualization', url: 'https://visualgo.net/', category: 'Intro' },
    { title: 'NeetCode Roadmap', url: 'https://neetcode.io/roadmap', category: 'Intro' },
    { title: 'Abdul Bari Algorithms (Video)', url: 'https://www.youtube.com/watch?v=0IAPZzGSbME', category: 'Intro' },
    { title: 'Algorithm Design Manual', url: 'https://www.algorist.com/', category: 'Interesting' },
  ],
  'data-structures': [
    { title: 'Data Structures Easy to Advanced (Video)', url: 'https://www.youtube.com/watch?v=RBSGKlAvoiM', category: 'Intro' },
    { title: 'GeeksforGeeks DS', url: 'https://www.geeksforgeeks.org/data-structures/', category: 'Intro' },
    { title: 'Programiz DS Tutorial', url: 'https://www.programiz.com/dsa', category: 'Interesting' },
  ],
  'databases': [
    { title: 'Database Systems Course (Video)', url: 'https://www.youtube.com/watch?v=4cWkVbC2bNE', category: 'Intro' },
    { title: 'SQLBolt Interactive', url: 'https://sqlbolt.com/', category: 'Intro' },
    { title: 'Database Design Guide', url: 'https://www.guru99.com/database-design.html', category: 'Interesting' },
  ],
  'os': [
    { title: 'Operating Systems: Three Easy Pieces', url: 'https://pages.cs.wisc.edu/~remzi/OSTEP/', category: 'Intro' },
    { title: 'Neso Academy OS (Video)', url: 'https://www.youtube.com/watch?v=vBURTt97EkA', category: 'Intro' },
  ],
  'networking': [
    { title: 'Computer Networking Course (Video)', url: 'https://www.youtube.com/watch?v=IPvYjXCsTg8', category: 'Intro' },
    { title: 'Networking Fundamentals', url: 'https://www.cloudflare.com/learning/', category: 'Intro' },
    { title: 'Beej Network Programming', url: 'https://beej.us/guide/bgnet/', category: 'Interesting' },
  ],
  'compilers': [
    { title: 'Crafting Interpreters', url: 'https://craftinginterpreters.com/', category: 'Intro' },
    { title: 'Compiler Design Tutorial', url: 'https://www.tutorialspoint.com/compiler_design/', category: 'Intro' },
  ],
  'discrete-math': [
    { title: 'Discrete Math (Video)', url: 'https://www.youtube.com/watch?v=rdXw7Ps9vxc', category: 'Intro' },
    { title: 'MIT Discrete Math', url: 'https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-fall-2010/', category: 'Interesting' },
  ],
  'computation': [
    { title: 'Theory of Computation (Video)', url: 'https://www.youtube.com/watch?v=58N2N7zJGrQ', category: 'Intro' },
    { title: 'Introduction to Automata', url: 'https://www.tutorialspoint.com/automata_theory/', category: 'Intro' },
  ],
  'web': [
    { title: 'MDN Web Docs', url: 'https://developer.mozilla.org/en-US/', category: 'Intro' },
    { title: 'Full Stack Open', url: 'https://fullstackopen.com/en/', category: 'Intro' },
    { title: 'Web Dev Roadmap', url: 'https://roadmap.sh/', category: 'Interesting' },
  ],
  'html': [
    { title: 'MDN: HTML Basics', url: 'https://developer.mozilla.org/en-US/docs/Learn/HTML', category: 'Intro' },
    { title: 'W3Schools HTML', url: 'https://www.w3schools.com/html/', category: 'Intro' },
    { title: 'HTML Crash Course (Video)', url: 'https://www.youtube.com/watch?v=UB1O30fR-EE', category: 'Intro' },
    { title: 'HTML Best Practices', url: 'https://github.com/hail2u/html-best-practices', category: 'Interesting' },
  ],
  'css': [
    { title: 'MDN CSS', url: 'https://developer.mozilla.org/en-US/docs/Learn/CSS', category: 'Intro' },
    { title: 'CSS Crash Course (Video)', url: 'https://www.youtube.com/watch?v=yfoY53QXEnI', category: 'Intro' },
    { title: 'Flexbox Guide', url: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/', category: 'Interesting' },
    { title: 'CSS Grid Garden', url: 'https://cssgridgarden.com/', category: 'Interesting' },
    { title: 'Flexbox Froggy', url: 'https://flexboxfroggy.com/', category: 'Interesting' },
  ],
  'js': [
    { title: 'JavaScript.info', url: 'https://javascript.info/', category: 'Intro' },
    { title: 'MDN JavaScript Guide', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide', category: 'Intro' },
    { title: 'Eloquent JavaScript', url: 'https://eloquentjavascript.net/', category: 'Intro' },
    { title: 'JavaScript 30', url: 'https://javascript30.com/', category: 'Interesting' },
    { title: "You Don't Know JS", url: 'https://github.com/getify/You-Dont-Know-JS', category: 'Interesting' },
  ],
  'typescript': [
    { title: 'TypeScript Handbook', url: 'https://www.typescriptlang.org/docs/handbook/', category: 'Intro' },
    { title: 'TypeScript Deep Dive', url: 'https://basarat.gitbook.io/typescript/', category: 'Intro' },
    { title: 'TS Exercises', url: 'https://typescript-exercises.github.io/', category: 'Interesting' },
  ],
  'react': [
    { title: 'React Official Docs', url: 'https://react.dev/learn', category: 'Intro' },
    { title: 'React Full Course (Video)', url: 'https://www.youtube.com/watch?v=bMknfKXIFA8', category: 'Intro' },
    { title: 'React Developer Roadmap', url: 'https://roadmap.sh/react', category: 'Intro' },
    { title: 'React Patterns', url: 'https://www.patterns.dev/react', category: 'Interesting' },
    { title: 'useHooks', url: 'https://usehooks.com/', category: 'Interesting' },
  ],
  'nextjs': [
    { title: 'Next.js Official Learn', url: 'https://nextjs.org/learn', category: 'Intro' },
    { title: 'Next.js Crash Course (Video)', url: 'https://www.youtube.com/watch?v=mTz0GXj8NN0', category: 'Intro' },
    { title: 'Next.js App Router Docs', url: 'https://nextjs.org/docs/app', category: 'Interesting' },
  ],
  'vue': [
    { title: 'Vue.js Official Guide', url: 'https://vuejs.org/guide/introduction.html', category: 'Intro' },
    { title: 'Vue.js Course (Video)', url: 'https://www.youtube.com/watch?v=FXpIoQ_rT_c', category: 'Intro' },
  ],
  'angular': [
    { title: 'Angular Official Tutorial', url: 'https://angular.dev/tutorials', category: 'Intro' },
    { title: 'Angular Crash Course (Video)', url: 'https://www.youtube.com/watch?v=3qBXWUpoPHo', category: 'Intro' },
  ],
  'svelte': [
    { title: 'Svelte Tutorial', url: 'https://learn.svelte.dev/', category: 'Intro' },
    { title: 'Svelte Crash Course (Video)', url: 'https://www.youtube.com/watch?v=3TVy6GdtNuQ', category: 'Intro' },
  ],
  'node': [
    { title: 'Node.js Official Docs', url: 'https://nodejs.org/en/learn', category: 'Intro' },
    { title: 'Node Crash Course (Video)', url: 'https://www.youtube.com/watch?v=fBNz5xF-Kx4', category: 'Intro' },
    { title: 'The Odin Project - Node', url: 'https://www.theodinproject.com/paths/full-stack-javascript/courses/nodejs', category: 'Interesting' },
  ],
  'express': [
    { title: 'Express.js Guide', url: 'https://expressjs.com/en/starter/installing.html', category: 'Intro' },
    { title: 'Express Crash Course (Video)', url: 'https://www.youtube.com/watch?v=L72fhGm1tfE', category: 'Intro' },
  ],
  'graphql': [
    { title: 'GraphQL Official Learn', url: 'https://graphql.org/learn/', category: 'Intro' },
    { title: 'How to GraphQL', url: 'https://www.howtographql.com/', category: 'Intro' },
  ],
  'rest-api': [
    { title: 'REST API Tutorial', url: 'https://restfulapi.net/', category: 'Intro' },
    { title: 'Build REST API with Node (Video)', url: 'https://www.youtube.com/watch?v=pKd0Rpw7O48', category: 'Intro' },
  ],
  'websocket': [
    { title: 'WebSocket MDN Docs', url: 'https://developer.mozilla.org/en-US/docs/Web/API/WebSocket', category: 'Intro' },
    { title: 'Socket.io Tutorial', url: 'https://socket.io/get-started/chat', category: 'Interesting' },
  ],
  'tailwind': [
    { title: 'Tailwind CSS Docs', url: 'https://tailwindcss.com/docs', category: 'Intro' },
    { title: 'Tailwind Crash Course (Video)', url: 'https://www.youtube.com/watch?v=UBOj6rqRUME', category: 'Intro' },
  ],
  'sass': [
    { title: 'Sass Official Guide', url: 'https://sass-lang.com/guide/', category: 'Intro' },
    { title: 'Sass Crash Course (Video)', url: 'https://www.youtube.com/watch?v=nu5mdN2JIwM', category: 'Intro' },
  ],
  'webpack': [
    { title: 'Webpack Official Guides', url: 'https://webpack.js.org/guides/', category: 'Intro' },
  ],
  'vite': [
    { title: 'Vite Getting Started', url: 'https://vite.dev/guide/', category: 'Intro' },
  ],
  'browser': [
    { title: 'How Browsers Work', url: 'https://web.dev/articles/howbrowserswork', category: 'Intro' },
  ],
  'dom': [
    { title: 'MDN DOM Introduction', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction', category: 'Intro' },
  ],
  'pwa': [
    { title: 'PWA Tutorial - web.dev', url: 'https://web.dev/learn/pwa/', category: 'Intro' },
  ],
  'accessibility': [
    { title: 'Web Accessibility - W3C', url: 'https://www.w3.org/WAI/fundamentals/accessibility-intro/', category: 'Intro' },
    { title: 'A11y Project', url: 'https://www.a11yproject.com/', category: 'Interesting' },
  ],
  'seo': [
    { title: 'Google SEO Starter Guide', url: 'https://developers.google.com/search/docs/fundamentals/seo-starter-guide', category: 'Intro' },
    { title: 'Moz SEO Guide', url: 'https://moz.com/beginners-guide-to-seo', category: 'Intro' },
  ],
  'python': [
    { title: 'Python Official Tutorial', url: 'https://docs.python.org/3/tutorial/', category: 'Intro' },
    { title: 'Automate the Boring Stuff', url: 'https://automatetheboringstuff.com/', category: 'Intro' },
    { title: 'Python Crash Course (Video)', url: 'https://www.youtube.com/watch?v=rfscVS0vtbw', category: 'Intro' },
    { title: 'Real Python', url: 'https://realpython.com/', category: 'Interesting' },
    { title: 'Python Exercises - HackerRank', url: 'https://www.hackerrank.com/domains/python', category: 'Interesting' },
  ],
  'java': [
    { title: 'Oracle Java Tutorials', url: 'https://docs.oracle.com/javase/tutorial/', category: 'Intro' },
    { title: 'W3Schools Java', url: 'https://www.w3schools.com/java/', category: 'Intro' },
    { title: 'Java Full Course (Video)', url: 'https://www.youtube.com/watch?v=xk4_1vDrzzo', category: 'Intro' },
    { title: 'Baeldung', url: 'https://www.baeldung.com/', category: 'Interesting' },
    { title: 'Spring Boot Guide', url: 'https://spring.io/guides/gs/spring-boot/', category: 'Interesting' },
  ],
  'csharp': [
    { title: 'C# Official Docs', url: 'https://learn.microsoft.com/en-us/dotnet/csharp/', category: 'Intro' },
    { title: 'C# Full Course (Video)', url: 'https://www.youtube.com/watch?v=GhQdlMFylQ8', category: 'Intro' },
  ],
  'cpp': [
    { title: 'LearnCpp.com', url: 'https://www.learncpp.com/', category: 'Intro' },
    { title: 'C++ Full Course (Video)', url: 'https://www.youtube.com/watch?v=vLnPwxZdW4Y', category: 'Intro' },
    { title: 'C++ Reference', url: 'https://en.cppreference.com/', category: 'Other' },
  ],
  'c': [
    { title: 'C Programming Tutorial', url: 'https://www.learn-c.org/', category: 'Intro' },
    { title: 'C Full Course (Video)', url: 'https://www.youtube.com/watch?v=KJgsSFOSQv0', category: 'Intro' },
  ],
  'rust': [
    { title: 'The Rust Book', url: 'https://doc.rust-lang.org/book/', category: 'Intro' },
    { title: 'Rustlings Exercises', url: 'https://github.com/rust-lang/rustlings', category: 'Intro' },
    { title: 'Rust by Example', url: 'https://doc.rust-lang.org/rust-by-example/', category: 'Interesting' },
  ],
  'go': [
    { title: 'A Tour of Go', url: 'https://go.dev/tour/', category: 'Intro' },
    { title: 'Go by Example', url: 'https://gobyexample.com/', category: 'Intro' },
    { title: 'Learn Go with Tests', url: 'https://quii.gitbook.io/learn-go-with-tests/', category: 'Interesting' },
  ],
  'kotlin': [
    { title: 'Kotlin Official Docs', url: 'https://kotlinlang.org/docs/home.html', category: 'Intro' },
    { title: 'Kotlin Course (Video)', url: 'https://www.youtube.com/watch?v=F9UC9DY-vIU', category: 'Intro' },
  ],
  'swift': [
    { title: 'Swift Official Guide', url: 'https://docs.swift.org/swift-book/', category: 'Intro' },
    { title: 'Swift Tutorial (Video)', url: 'https://www.youtube.com/watch?v=comQ1-x2a1Q', category: 'Intro' },
  ],
  'ruby': [
    { title: 'Try Ruby Interactive', url: 'https://try.ruby-lang.org/', category: 'Intro' },
    { title: 'Ruby Guide', url: 'https://www.ruby-lang.org/en/documentation/quickstart/', category: 'Intro' },
  ],
  'php': [
    { title: 'PHP Official Docs', url: 'https://www.php.net/manual/en/tutorial.php', category: 'Intro' },
    { title: 'PHP Crash Course (Video)', url: 'https://www.youtube.com/watch?v=BUCiSSyIGGU', category: 'Intro' },
    { title: 'Laravel Docs', url: 'https://laravel.com/docs', category: 'Interesting' },
  ],
  'r-lang': [
    { title: 'R for Data Science', url: 'https://r4ds.had.co.nz/', category: 'Intro' },
    { title: 'R Tutorial', url: 'https://www.statmethods.net/', category: 'Intro' },
  ],
  'haskell': [
    { title: 'Learn You a Haskell', url: 'http://learnyouahaskell.com/', category: 'Intro' },
    { title: 'Haskell Wiki', url: 'https://wiki.haskell.org/Haskell', category: 'Other' },
  ],
  'scala': [
    { title: 'Scala Official Tour', url: 'https://docs.scala-lang.org/tour/tour-of-scala.html', category: 'Intro' },
  ],
  'lua': [
    { title: 'Programming in Lua', url: 'https://www.lua.org/pil/contents.html', category: 'Intro' },
  ],
  'dart': [
    { title: 'Dart Official Tutorial', url: 'https://dart.dev/tutorials', category: 'Intro' },
    { title: 'DartPad Playground', url: 'https://dartpad.dev/', category: 'Interesting' },
  ],
  'sql': [
    { title: 'SQLBolt Interactive', url: 'https://sqlbolt.com/', category: 'Intro' },
    { title: 'W3Schools SQL', url: 'https://www.w3schools.com/sql/', category: 'Intro' },
    { title: 'SQL Murder Mystery', url: 'https://mystery.knightlab.com/', category: 'Interesting' },
  ],
  'ml': [
    { title: 'Andrew Ng ML Course', url: 'https://www.coursera.org/learn/machine-learning', category: 'Intro' },
    { title: 'fast.ai Practical ML', url: 'https://www.fast.ai/', category: 'Intro' },
    { title: 'Kaggle Learn ML', url: 'https://www.kaggle.com/learn', category: 'Interesting' },
    { title: 'ML Roadmap', url: 'https://roadmap.sh/ai-data-scientist', category: 'Interesting' },
  ],
  'deep-learning': [
    { title: 'Deep Learning Book', url: 'https://www.deeplearningbook.org/', category: 'Intro' },
    { title: 'Deep Learning Specialization', url: 'https://www.coursera.org/specializations/deep-learning', category: 'Intro' },
    { title: '3Blue1Brown Neural Networks (Video)', url: 'https://www.youtube.com/watch?v=aircAruvnKk', category: 'Interesting' },
  ],
  'neural-networks': [
    { title: 'Neural Networks from Scratch', url: 'https://nnfs.io/', category: 'Intro' },
    { title: 'But what is a Neural Network? (Video)', url: 'https://www.youtube.com/watch?v=aircAruvnKk', category: 'Intro' },
  ],
  'nlp': [
    { title: 'Hugging Face NLP Course', url: 'https://huggingface.co/learn/nlp-course/', category: 'Intro' },
    { title: 'Stanford NLP (Video)', url: 'https://www.youtube.com/watch?v=8rXD5-xhemo', category: 'Intro' },
  ],
  'cv': [
    { title: 'OpenCV Tutorial', url: 'https://docs.opencv.org/4.x/d6/d00/tutorial_py_root.html', category: 'Intro' },
    { title: 'Stanford CS231n (Video)', url: 'https://www.youtube.com/watch?v=vT1JzLTH4G4', category: 'Intro' },
  ],
  'data-science': [
    { title: 'Kaggle Intro to Data Science', url: 'https://www.kaggle.com/learn', category: 'Intro' },
    { title: 'Data Science Handbook', url: 'https://jakevdp.github.io/PythonDataScienceHandbook/', category: 'Intro' },
    { title: 'IBM Data Science Certificate', url: 'https://www.coursera.org/professional-certificates/ibm-data-science', category: 'Interesting' },
  ],
  'ai': [
    { title: 'Elements of AI', url: 'https://www.elementsofai.com/', category: 'Intro' },
    { title: 'AI for Everyone - Coursera', url: 'https://www.coursera.org/learn/ai-for-everyone', category: 'Intro' },
    { title: 'Google AI Course', url: 'https://ai.google/education/', category: 'Interesting' },
  ],
  'reinforcement-learning': [
    { title: 'Spinning Up in Deep RL', url: 'https://spinningup.openai.com/', category: 'Intro' },
    { title: 'RL Course - David Silver (Video)', url: 'https://www.youtube.com/watch?v=2pWv7GOvuf0', category: 'Intro' },
  ],
  'generative-ai': [
    { title: 'Google Generative AI Course', url: 'https://www.cloudskillsboost.google/paths/118', category: 'Intro' },
    { title: 'Prompt Engineering Guide', url: 'https://www.promptingguide.ai/', category: 'Interesting' },
  ],
  'llm': [
    { title: 'Andrej Karpathy: LLM Intro (Video)', url: 'https://www.youtube.com/watch?v=zjkBMFhNj_g', category: 'Intro' },
    { title: 'LLM University by Cohere', url: 'https://docs.cohere.com/docs/llmu', category: 'Intro' },
  ],
  'tensorflow': [
    { title: 'TensorFlow Official Tutorials', url: 'https://www.tensorflow.org/tutorials', category: 'Intro' },
    { title: 'TensorFlow Crash Course (Video)', url: 'https://www.youtube.com/watch?v=tPYj3fFJGjk', category: 'Intro' },
  ],
  'pytorch': [
    { title: 'PyTorch Official Tutorials', url: 'https://pytorch.org/tutorials/', category: 'Intro' },
    { title: 'PyTorch for Deep Learning (Video)', url: 'https://www.youtube.com/watch?v=V_xro1bcAuA', category: 'Intro' },
  ],
  'pandas': [
    { title: 'Pandas Getting Started', url: 'https://pandas.pydata.org/docs/getting_started/', category: 'Intro' },
    { title: 'Kaggle Pandas Course', url: 'https://www.kaggle.com/learn/pandas', category: 'Intro' },
  ],
  'numpy': [
    { title: 'NumPy Quickstart', url: 'https://numpy.org/doc/stable/user/quickstart.html', category: 'Intro' },
  ],
  'statistics': [
    { title: 'Khan Academy Statistics', url: 'https://www.khanacademy.org/math/statistics-probability', category: 'Intro' },
    { title: 'StatQuest (Video)', url: 'https://www.youtube.com/c/joshstarmer', category: 'Intro' },
  ],
  'linear-algebra': [
    { title: '3Blue1Brown Linear Algebra (Video)', url: 'https://www.youtube.com/watch?v=fNk_zzaMoSs', category: 'Intro' },
    { title: 'MIT Linear Algebra', url: 'https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/', category: 'Interesting' },
  ],
  'data-viz': [
    { title: 'Data Visualization with D3', url: 'https://observablehq.com/@d3/learn-d3', category: 'Intro' },
    { title: 'Matplotlib Tutorial', url: 'https://matplotlib.org/stable/tutorials/', category: 'Intro' },
  ],
  'devops': [
    { title: 'DevOps Roadmap', url: 'https://roadmap.sh/devops', category: 'Intro' },
    { title: 'DevOps Full Course (Video)', url: 'https://www.youtube.com/watch?v=j5Zsa_eOXeY', category: 'Intro' },
  ],
  'docker': [
    { title: 'Docker Getting Started', url: 'https://docs.docker.com/get-started/', category: 'Intro' },
    { title: 'Docker Crash Course (Video)', url: 'https://www.youtube.com/watch?v=pg19Z8LL06w', category: 'Intro' },
    { title: 'Docker Compose Tutorial', url: 'https://docs.docker.com/compose/gettingstarted/', category: 'Interesting' },
  ],
  'kubernetes': [
    { title: 'Kubernetes Official Tutorial', url: 'https://kubernetes.io/docs/tutorials/', category: 'Intro' },
    { title: 'K8s Crash Course (Video)', url: 'https://www.youtube.com/watch?v=s_o8dwzRlu4', category: 'Intro' },
  ],
  'aws': [
    { title: 'AWS Cloud Practitioner', url: 'https://aws.amazon.com/training/learn-about/cloud-practitioner/', category: 'Intro' },
    { title: 'AWS Full Course (Video)', url: 'https://www.youtube.com/watch?v=ZB5ONbD_SMY', category: 'Intro' },
  ],
  'gcp': [
    { title: 'Google Cloud Skills Boost', url: 'https://www.cloudskillsboost.google/', category: 'Intro' },
  ],
  'azure': [
    { title: 'Azure Fundamentals', url: 'https://learn.microsoft.com/en-us/certifications/azure-fundamentals/', category: 'Intro' },
  ],
  'linux': [
    { title: 'Linux Journey', url: 'https://linuxjourney.com/', category: 'Intro' },
    { title: 'Linux Full Course (Video)', url: 'https://www.youtube.com/watch?v=sWbUDq4S6Y8', category: 'Intro' },
    { title: 'Linux Command Reference', url: 'https://ss64.com/bash/', category: 'Other' },
  ],
  'git': [
    { title: 'Git Official Book', url: 'https://git-scm.com/book/en/v2', category: 'Intro' },
    { title: 'Learn Git Branching', url: 'https://learngitbranching.js.org/', category: 'Intro' },
    { title: 'GitHub Skills', url: 'https://skills.github.com/', category: 'Interesting' },
  ],
  'cicd': [
    { title: 'GitHub Actions Docs', url: 'https://docs.github.com/en/actions', category: 'Intro' },
    { title: 'CI/CD Tutorial', url: 'https://www.atlassian.com/continuous-delivery/principles/continuous-integration-vs-delivery-vs-deployment', category: 'Intro' },
  ],
  'terraform': [
    { title: 'Terraform Getting Started', url: 'https://developer.hashicorp.com/terraform/tutorials', category: 'Intro' },
  ],
  'nginx': [
    { title: 'Nginx Beginner Guide', url: 'https://nginx.org/en/docs/beginners_guide.html', category: 'Intro' },
  ],
  'postgresql': [
    { title: 'PostgreSQL Tutorial', url: 'https://www.postgresqltutorial.com/', category: 'Intro' },
    { title: 'PostgreSQL Official Docs', url: 'https://www.postgresql.org/docs/current/tutorial.html', category: 'Other' },
  ],
  'mysql': [
    { title: 'MySQL Tutorial', url: 'https://www.mysqltutorial.org/', category: 'Intro' },
  ],
  'mongodb': [
    { title: 'MongoDB University', url: 'https://learn.mongodb.com/', category: 'Intro' },
    { title: 'MongoDB Crash Course (Video)', url: 'https://www.youtube.com/watch?v=ofme2o29ngU', category: 'Intro' },
  ],
  'redis': [
    { title: 'Redis Official Tutorial', url: 'https://redis.io/docs/get-started/', category: 'Intro' },
    { title: 'Redis Crash Course (Video)', url: 'https://www.youtube.com/watch?v=jgpVdJB2sKQ', category: 'Intro' },
  ],
  'sqlite': [
    { title: 'SQLite Tutorial', url: 'https://www.sqlitetutorial.net/', category: 'Intro' },
  ],
  'firebase': [
    { title: 'Firebase Official Docs', url: 'https://firebase.google.com/docs', category: 'Intro' },
    { title: 'Firebase Course (Video)', url: 'https://www.youtube.com/watch?v=9kRgVxULbag', category: 'Intro' },
  ],
  'supabase': [
    { title: 'Supabase Official Docs', url: 'https://supabase.com/docs', category: 'Intro' },
    { title: 'Supabase Crash Course (Video)', url: 'https://www.youtube.com/watch?v=7uKQBl9uZ00', category: 'Intro' },
  ],
  'prisma': [
    { title: 'Prisma Getting Started', url: 'https://www.prisma.io/docs/getting-started', category: 'Intro' },
    { title: 'Prisma Crash Course (Video)', url: 'https://www.youtube.com/watch?v=RebA5J-rlwg', category: 'Intro' },
  ],
  'mobile': [
    { title: 'Mobile Dev Roadmap', url: 'https://roadmap.sh/android', category: 'Intro' },
  ],
  'react-native': [
    { title: 'React Native Docs', url: 'https://reactnative.dev/docs/getting-started', category: 'Intro' },
    { title: 'React Native Course (Video)', url: 'https://www.youtube.com/watch?v=obH0Po_RdWk', category: 'Intro' },
  ],
  'flutter': [
    { title: 'Flutter Official Codelabs', url: 'https://docs.flutter.dev/codelabs', category: 'Intro' },
    { title: 'Flutter Course (Video)', url: 'https://www.youtube.com/watch?v=VPvVD8t02U8', category: 'Intro' },
  ],
  'ios': [
    { title: 'Apple iOS Dev Tutorials', url: 'https://developer.apple.com/tutorials/swiftui', category: 'Intro' },
  ],
  'android': [
    { title: 'Android Developer Guide', url: 'https://developer.android.com/guide', category: 'Intro' },
    { title: 'Android Basics in Kotlin', url: 'https://developer.android.com/courses/android-basics-kotlin/course', category: 'Intro' },
  ],
  'security': [
    { title: 'OWASP Top 10', url: 'https://owasp.org/www-project-top-ten/', category: 'Intro' },
    { title: 'Cybersecurity Full Course (Video)', url: 'https://www.youtube.com/watch?v=U_P23SqJaDc', category: 'Intro' },
    { title: 'Hack The Box', url: 'https://www.hackthebox.com/', category: 'Interesting' },
  ],
  'cryptography': [
    { title: 'Crypto101 Book', url: 'https://www.crypto101.io/', category: 'Intro' },
    { title: 'Cryptography Course (Video)', url: 'https://www.youtube.com/watch?v=JoeiLuFNBc4', category: 'Intro' },
  ],
  'ethical-hacking': [
    { title: 'TryHackMe', url: 'https://tryhackme.com/', category: 'Intro' },
    { title: 'Ethical Hacking Course (Video)', url: 'https://www.youtube.com/watch?v=3Kq1MIfTWCE', category: 'Intro' },
  ],
  'web-security': [
    { title: 'PortSwigger Web Security Academy', url: 'https://portswigger.net/web-security', category: 'Intro' },
  ],
  'game-dev': [
    { title: 'Game Dev Roadmap', url: 'https://roadmap.sh/game-developer', category: 'Intro' },
    { title: 'Game Dev Full Course (Video)', url: 'https://www.youtube.com/watch?v=iqlH4okiQqg', category: 'Intro' },
  ],
  'unity': [
    { title: 'Unity Learn', url: 'https://learn.unity.com/', category: 'Intro' },
    { title: 'Unity Beginner Course (Video)', url: 'https://www.youtube.com/watch?v=gB1F9G0JXOo', category: 'Intro' },
  ],
  'unreal': [
    { title: 'Unreal Engine Docs', url: 'https://docs.unrealengine.com/', category: 'Intro' },
  ],
  'godot': [
    { title: 'Godot Official Docs', url: 'https://docs.godotengine.org/', category: 'Intro' },
    { title: 'Godot Beginner Tutorial (Video)', url: 'https://www.youtube.com/watch?v=LOhfqjmasi0', category: 'Intro' },
  ],
  'opengl': [
    { title: 'LearnOpenGL', url: 'https://learnopengl.com/', category: 'Intro' },
  ],
  'computer-graphics': [
    { title: 'Scratchapixel', url: 'https://www.scratchapixel.com/', category: 'Intro' },
  ],
  'embedded': [
    { title: 'Embedded Systems Guide', url: 'https://www.embedded.com/', category: 'Intro' },
  ],
  'arduino': [
    { title: 'Arduino Official Tutorials', url: 'https://docs.arduino.cc/built-in-examples/', category: 'Intro' },
    { title: 'Arduino Course (Video)', url: 'https://www.youtube.com/watch?v=zJ-LqeX_fLU', category: 'Intro' },
  ],
  'raspberry-pi': [
    { title: 'Raspberry Pi Projects', url: 'https://projects.raspberrypi.org/', category: 'Intro' },
  ],
  'iot': [
    { title: 'IoT Full Course (Video)', url: 'https://www.youtube.com/watch?v=LlhmzVL5bm8', category: 'Intro' },
  ],
  'firmware': [
    { title: 'Embedded Firmware Basics', url: 'https://www.embedded.com/firmware/', category: 'Intro' },
  ],
  'ui-ux': [
    { title: 'Google UX Design Certificate', url: 'https://www.coursera.org/professional-certificates/google-ux-design', category: 'Intro' },
    { title: 'Laws of UX', url: 'https://lawsofux.com/', category: 'Interesting' },
    { title: 'Refactoring UI', url: 'https://www.refactoringui.com/', category: 'Interesting' },
  ],
  'figma': [
    { title: 'Figma Official Tutorials', url: 'https://help.figma.com/hc/en-us/categories/360002051613', category: 'Intro' },
    { title: 'Figma Crash Course (Video)', url: 'https://www.youtube.com/watch?v=4W4LvJnNegM', category: 'Intro' },
  ],
  'design-patterns': [
    { title: 'Refactoring Guru', url: 'https://refactoring.guru/design-patterns', category: 'Intro' },
    { title: 'Patterns.dev', url: 'https://www.patterns.dev/', category: 'Interesting' },
  ],
  'system-design': [
    { title: 'System Design Primer', url: 'https://github.com/donnemartin/system-design-primer', category: 'Intro' },
    { title: 'System Design Interview (Video)', url: 'https://www.youtube.com/c/SystemDesignInterview', category: 'Intro' },
    { title: 'ByteByteGo', url: 'https://bytebytego.com/', category: 'Interesting' },
  ],
  'microservices': [
    { title: 'Microservices.io', url: 'https://microservices.io/', category: 'Intro' },
  ],
  'clean-code': [
    { title: 'Clean Code Summary', url: 'https://gist.github.com/wojteklu/73c6914cc446146b8b533c0988cf8d29', category: 'Intro' },
  ],
  'testing': [
    { title: 'Jest Official Docs', url: 'https://jestjs.io/docs/getting-started', category: 'Intro' },
    { title: 'Testing JavaScript', url: 'https://testingjavascript.com/', category: 'Interesting' },
  ],
  'agile': [
    { title: 'Agile Manifesto', url: 'https://agilemanifesto.org/', category: 'Intro' },
    { title: 'Scrum Guide', url: 'https://scrumguides.org/', category: 'Intro' },
  ],
  'open-source': [
    { title: 'First Contributions', url: 'https://firstcontributions.github.io/', category: 'Intro' },
    { title: 'Open Source Guide', url: 'https://opensource.guide/', category: 'Intro' },
  ],
  'blockchain': [
    { title: 'Blockchain Demo', url: 'https://andersbrownworth.com/blockchain/', category: 'Intro' },
    { title: 'Blockchain Full Course (Video)', url: 'https://www.youtube.com/watch?v=gyMwXuJrbJQ', category: 'Intro' },
  ],
  'web3': [
    { title: 'Web3 University', url: 'https://www.web3.university/', category: 'Intro' },
    { title: 'Solidity by Example', url: 'https://solidity-by-example.org/', category: 'Interesting' },
  ],
  'quantum': [
    { title: 'Qiskit Textbook', url: 'https://qiskit.org/learn/', category: 'Intro' },
    { title: 'Quantum Computing for Everyone', url: 'https://www.youtube.com/watch?v=QuR969uMICM', category: 'Intro' },
  ],
  'robotics': [
    { title: 'ROS2 Tutorials', url: 'https://docs.ros.org/en/humble/Tutorials.html', category: 'Intro' },
  ],
  'functional-programming': [
    { title: 'FP in JavaScript', url: 'https://github.com/MostlyAdequate/mostly-adequate-guide', category: 'Intro' },
  ],
  'regex': [
    { title: 'RegexOne Interactive', url: 'https://regexone.com/', category: 'Intro' },
    { title: 'Regex101 Playground', url: 'https://regex101.com/', category: 'Interesting' },
  ],
  'automation': [
    { title: 'Automate the Boring Stuff', url: 'https://automatetheboringstuff.com/', category: 'Intro' },
  ],
  'web-scraping': [
    { title: 'Web Scraping with Python', url: 'https://realpython.com/beautiful-soup-web-scraper-python/', category: 'Intro' },
  ],
  'competitive-prog': [
    { title: 'Codeforces', url: 'https://codeforces.com/', category: 'Intro' },
    { title: 'CP Handbook', url: 'https://cses.fi/book/book.pdf', category: 'Interesting' },
  ],
  'dsa': [
    { title: 'NeetCode 150', url: 'https://neetcode.io/', category: 'Intro' },
    { title: 'LeetCode', url: 'https://leetcode.com/', category: 'Intro' },
    { title: 'Striver DSA Sheet', url: 'https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/', category: 'Interesting' },
  ],
  'interview-prep': [
    { title: 'Tech Interview Handbook', url: 'https://www.techinterviewhandbook.org/', category: 'Intro' },
    { title: 'Cracking the Coding Interview', url: 'https://www.crackingthecodinginterview.com/', category: 'Interesting' },
  ],
  'math': [
    { title: 'Khan Academy Math', url: 'https://www.khanacademy.org/math', category: 'Intro' },
    { title: '3Blue1Brown (Video)', url: 'https://www.youtube.com/c/3blue1brown', category: 'Interesting' },
  ],
  'physics-sim': [
    { title: 'Nature of Code', url: 'https://natureofcode.com/', category: 'Intro' },
  ],
  'music-prod': [
    { title: 'Music Production Basics', url: 'https://learningmusic.ableton.com/', category: 'Intro' },
  ],
  'video-editing': [
    { title: 'DaVinci Resolve Tutorial (Video)', url: 'https://www.youtube.com/watch?v=63Ln33O4p4c', category: 'Intro' },
  ],
  'three-js': [
    { title: 'Three.js Journey', url: 'https://threejs-journey.com/', category: 'Intro' },
    { title: 'Three.js Official Docs', url: 'https://threejs.org/docs/', category: 'Intro' },
  ],
  'd3': [
    { title: 'D3.js Official Tutorial', url: 'https://observablehq.com/@d3/learn-d3', category: 'Intro' },
    { title: 'D3 in Depth', url: 'https://www.d3indepth.com/', category: 'Interesting' },
  ],
  'electron': [
    { title: 'Electron Official Docs', url: 'https://www.electronjs.org/docs/latest/', category: 'Intro' },
  ],
};

async function main() {
  console.log('Clearing old resources...');
  await prisma.userProgress.deleteMany();
  await prisma.resource.deleteMany();

  let total = 0;
  const topicIds = Object.keys(allResources);
  console.log(`Seeding resources for ${topicIds.length} topics...`);

  for (const [topicId, resources] of Object.entries(allResources)) {
    for (const res of resources) {
      try {
        await prisma.resource.create({
          data: { title: res.title, url: res.url, category: res.category, topicId }
        });
        total++;
      } catch (e) {
        // Skip if topic doesn't exist
      }
    }
  }

  console.log(`\n✅ ${total} resources seeded across ${topicIds.length} topics!`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
