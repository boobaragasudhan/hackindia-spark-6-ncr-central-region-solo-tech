export const nodes = [
  { id: '1', label: 'Math' }, { id: '2', label: 'Calculus' },
  { id: '3', label: 'Algebra' }, { id: '4', label: 'Geometry' },
  { id: '5', label: 'Physics' }, { id: '6', label: 'Biology' },
  { id: '7', label: 'Chemistry' }, { id: '8', label: 'Computer Science' },
  { id: '9', label: 'Algorithms' }, { id: '10', label: 'Data Structures' },
  { id: '11', label: 'Programming' }, { id: '12', label: 'JavaScript' },
  { id: '13', label: 'React' }, { id: '14', label: 'Next.js' },
  { id: '15', label: 'Node.js' }, { id: '16', label: 'Databases' },
  { id: '17', label: 'SQL' }, { id: '18', label: 'NoSQL' },
  { id: '19', label: 'PostgreSQL' }, { id: '20', label: 'MongoDB' },
  { id: '21', label: 'Web Development' }, { id: '22', label: 'HTML/CSS' },
  { id: '23', label: 'Frontend' }, { id: '24', label: 'Backend' },
  { id: '25', label: 'Machine Learning' }, { id: '26', label: 'AI' },
  { id: '27', label: 'Neural Networks' }, { id: '28', label: 'Deep Learning' },
  { id: '29', label: 'Computer Vision' }, { id: '30', label: 'NLP' },
  { id: '31', label: 'Neuroscience' }, { id: '32', label: 'Finance' },
  { id: '33', label: 'Economics' }, { id: '34', label: 'Investing' },
  { id: '35', label: 'Blockchain' }, { id: '36', label: 'Crypto' },
  { id: '37', label: 'Smart Contracts' }, { id: '38', label: 'Web3' },
  { id: '39', label: 'Security' }, { id: '40', label: 'Cryptography' },
  { id: '41', label: 'Hardware' }, { id: '42', label: 'CPU Design' },
  { id: '43', label: 'Linux' }, { id: '44', label: 'Unix' },
  { id: '45', label: 'Distributed Systems' }, { id: '46', label: 'System Design' }
];

// Randomize links heavily so it looks like the complex roadmap web
export const links = [
  { source: '1', target: '2' }, { source: '1', target: '3' }, { source: '1', target: '4' },
  { source: '5', target: '1' }, { source: '5', target: '7' }, { source: '6', target: '7' },
  { source: '8', target: '1' }, { source: '8', target: '9' }, { source: '8', target: '10' },
  { source: '11', target: '8' }, { source: '11', target: '12' }, { source: '12', target: '13' },
  { source: '13', target: '14' }, { source: '12', target: '15' }, { source: '15', target: '16' },
  { source: '16', target: '17' }, { source: '16', target: '18' }, { source: '17', target: '19' },
  { source: '18', target: '20' }, { source: '21', target: '22' }, { source: '21', target: '23' },
  { source: '21', target: '24' }, { source: '23', target: '13' }, { source: '24', target: '15' },
  { source: '25', target: '8' }, { source: '25', target: '26' }, { source: '26', target: '27' },
  { source: '27', target: '28' }, { source: '28', target: '29' }, { source: '28', target: '30' },
  { source: '31', target: '6' }, { source: '32', target: '33' }, { source: '32', target: '34' },
  { source: '35', target: '36' }, { source: '35', target: '37' }, { source: '35', target: '38' },
  { source: '11', target: '37' }, { source: '39', target: '40' }, { source: '40', target: '1' },
  { source: '41', target: '8' }, { source: '41', target: '42' }, { source: '43', target: '44' },
  { source: '43', target: '8' }, { source: '45', target: '46' }, { source: '46', target: '8' },
  { source: '45', target: '16' }, { source: '45', target: '43' }, { source: '11', target: '43' },
  // Cross connection links to make it messier like learn-anything.xyz
  { source: '1', target: '8' }, { source: '32', target: '1' }, { source: '25', target: '1' },
  { source: '39', target: '8' }, { source: '41', target: '5' }, { source: '15', target: '45' }
];