export const profile = {
  name: 'Meet Shah',
  role: 'Software Developer',
  location: 'Ahmedabad, India',
  company: 'Technman Consulting',
  email: 'shahmeet2626@gmail.com',
  phone: '8238596629',
  linkedin: 'https://www.linkedin.com/in/meet-shah-9649b53a2/',
  github: 'https://github.com/meet8406',
};

export const projects = [
  {
    id: '01', key: 'hrms', name: 'HRMS / HRATS', type: 'PEOPLE OPERATIONS PLATFORM',
    summary: 'A complete HR management and payroll platform, developed across product, backend, and production infrastructure.',
    scope: 'Employee management · Attendance · Payroll · Full & Final · Appraisals · Assets · Email automation',
    stack: ['React', 'Django REST', 'PostgreSQL', 'Celery', 'Redis', 'AWS'],
    architecture: ['REACT APP', 'DJANGO REST API', 'POSTGRESQL', 'CELERY + REDIS', 'AWS INFRA'],
    detail: 'Geofenced attendance, salary structures and payslips, leave encashment, resignation workflows, and scheduled HR communication.',
  },
  {
    id: '02', key: 'tracker', name: 'TNM Tracker', type: 'EMPLOYEE ACTIVITY PLATFORM',
    summary: 'An activity and productivity platform connecting a Python desktop agent to a FastAPI service and admin dashboard.',
    scope: 'Attendance · App and URL usage · Screenshots · Productivity reports · Blacklist violations',
    stack: ['React', 'FastAPI', 'PostgreSQL', 'Python', 'AWS S3', 'Docker'],
    architecture: ['PYTHON AGENT', 'FASTAPI', 'POSTGRESQL', 'AWS S3', 'REACT DASHBOARD'],
    detail: 'Agent heartbeats, activity signals, and screenshots flow into APIs and cloud object storage for review in an admin workspace.',
  },
  {
    id: '03', key: 'resume', name: 'AI Resume Analyzer', type: 'AI-POWERED APPLICATION',
    summary: 'A full-stack resume analysis application using language-model-driven feedback to help candidates improve their resumes.',
    scope: 'Resume analysis · Candidate feedback · NLP · Automation',
    stack: ['React', 'Node.js', 'Django', 'Python', 'PostgreSQL', 'LLMs'],
    architecture: ['REACT UI', 'DJANGO + PYTHON', 'LLM ANALYSIS', 'POSTGRESQL'],
    detail: 'A practical exploration of AI and automation applied to a focused candidate experience.',
  },
];

export const technologies = [
  { name: 'React', group: 'FRONTEND', use: 'Interactive dashboards and application interfaces.', work: 'HRMS · TNM Tracker · Resume Analyzer' },
  { name: 'JavaScript', group: 'FRONTEND', use: 'Product behavior, API integration, and application logic.', work: 'HRMS · TNM Tracker' },
  { name: 'Tailwind CSS', group: 'FRONTEND', use: 'Responsive, consistent interface styling.', work: 'Frontend applications' },
  { name: 'Django REST', group: 'BACKEND', use: 'Business APIs, authentication, and workflow logic.', work: 'HRMS · Resume Analyzer' },
  { name: 'FastAPI', group: 'BACKEND', use: 'Service APIs for activity and agent data.', work: 'TNM Tracker' },
  { name: 'Python', group: 'BACKEND', use: 'Backend services, automation, and desktop tooling.', work: 'All projects' },
  { name: 'PostgreSQL', group: 'DATA', use: 'Relational application data and operational records.', work: 'All projects' },
  { name: 'AWS', group: 'CLOUD', use: 'Production compute, relational data, and object storage.', work: 'HRMS · TNM Tracker' },
  { name: 'Docker', group: 'DELIVERY', use: 'Containerized application environments and deployment.', work: 'HRMS · TNM Tracker' },
  { name: 'Celery + Redis', group: 'AUTOMATION', use: 'Background tasks and scheduled communication.', work: 'HRMS' },
  { name: 'Nginx', group: 'DELIVERY', use: 'Production web serving and reverse proxy configuration.', work: 'HRMS' },
  { name: 'LLMs', group: 'AI / ML', use: 'Resume feedback and applied language-model workflows.', work: 'AI Resume Analyzer' },
];

export const milestones = [
  ['DEC 2024', 'Joined Technman Consulting', 'Started as a Software Developer.'],
  ['FULL STACK', 'Product surfaces', 'Building React dashboards alongside backend services and APIs.'],
  ['HR SYSTEMS', 'People operations', 'Contributing to attendance, leave, employee and HR workflows.'],
  ['PAYROLL', 'Business critical logic', 'Working across salary structures, payslips and Full & Final processes.'],
  ['CLOUD', 'Production delivery', 'Working with AWS, Docker, Nginx, SSL and deployment workflows.'],
  ['AUTOMATION', 'Async workflows', 'Building background email and reporting tasks with Celery and Redis.'],
  ['NOW', 'Payroll · AI · Systems', 'Deepening backend architecture and exploring applied AI / ML.'],
];

export const capabilities = [
  ['01', 'Production APIs', 'Designing REST APIs and business logic with Django REST Framework and FastAPI.'],
  ['02', 'Business systems', 'Building HRMS, payroll, attendance, and employee management workflows.'],
  ['03', 'Cloud delivery', 'Taking applications to production with AWS, Docker, Nginx, and CI workflows.'],
  ['04', 'Automation', 'Running background processing and scheduled communication with Celery and Redis.'],
  ['05', 'AI applications', 'Building LLM-based features and exploring practical AI / ML applications.'],
  ['06', 'Frontend systems', 'Creating responsive React interfaces for complex operational dashboards.'],
];

export const learning = ['AI / ML', 'Prompt engineering', 'Python + NumPy', 'Algorithms', 'LeetCode', 'System design', 'Backend architecture'];
