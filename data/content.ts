// Single source of truth for all portfolio content.
// Edit this file to update the site — components read everything from here.

export const profile = {
  name: "Piyush Verma",
  firstName: "Piyush",
  lastName: "Verma",
  role: "Associate Software Engineer",
  company: "ServiceNow",
  location: "India",
  tagline: "I build AI agents and developer tooling that make thousands of engineers faster.",
  intro:
    "Software engineer at ServiceNow working where platform engineering meets GenAI — agentic automation, TypeScript DSLs, and best-practice tooling for an organisation of ~2,500 developers.",
  email: "vermapiyush823@gmail.com",
  // TODO: verify these handles — derived from the resume header.
  socials: [
    { label: "GitHub", href: "https://github.com/vermapiyush823" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/vermapiyush823" },
    { label: "LeetCode", href: "https://leetcode.com/vermapiyush823" },
  ],
  resumeHref: "/Piyush-Verma-Resume.pdf",
};

export const stats = [
  { value: 2500, suffix: "+", label: "developers served by the tooling I'm building" },
  { value: 3000, suffix: "+", label: "people in the org my Fluent R&D targeted" },
  { value: 500, suffix: "+", label: "LeetCode problems solved" },
  { value: 2, suffix: "×", label: "ServiceNow certifications (CSA, CAD)" },
];

export type Experience = {
  id: string;
  company: string;
  role: string;
  period: string;
  start: string;
  current?: boolean;
  summary: string;
  points: string[];
  stack: string[];
};

export const experience: Experience[] = [
  {
    id: "ase",
    company: "ServiceNow",
    role: "Associate Software Engineer",
    period: "Jul 2025 — Present",
    start: "2025",
    current: true,
    summary: "Driving a from-scratch platform for best-practice code across ~2,500 developers.",
    points: [
      "Driving a project built from scratch to establish best-practice code for an organisation of around 2,500 developers.",
      "Created an AI Agent that automates resolution of code findings, cutting manual remediation effort.",
      "Building new developer tools on the ServiceNow SDK and the latest ServiceNow technologies.",
    ],
    stack: ["ServiceNow SDK", "Fluent", "TypeScript", "AI Agents", "LLMs"],
  },
  {
    id: "intern-2",
    company: "ServiceNow",
    role: "Associate Software Engineer Intern",
    period: "Jan 2025 — Jun 2025",
    start: "2025",
    summary: "R&D on Fluent, ServiceNow's TypeScript DSL, to scale adoption org-wide.",
    points: [
      "Did complete R&D on Fluent (a TypeScript DSL) to expand its use across an organisation of 3,000+ people.",
      "Built an AI Agent to automate resolving generated findings, reducing manual effort.",
      "Earned the CSA (Certified System Administrator) and CAD (Certified Application Developer) certifications.",
    ],
    stack: ["Fluent DSL", "TypeScript", "AI Agents", "ServiceNow Platform"],
  },
  {
    id: "intern-1",
    company: "ServiceNow",
    role: "Associate Software Engineer Summer Intern",
    period: "May 2024 — Jul 2024",
    start: "2024",
    summary: "Shipped a customer-facing Now Assist showcase and GenAI in the microsite builder.",
    points: [
      "Built a dashboard to showcase Now Assist features and products to customers.",
      "Integrated GenAI features into the ServiceNow microsite builder.",
      "Worked across AngularJS, REST APIs, JavaScript and the ServiceNow platform.",
    ],
    stack: ["AngularJS", "JavaScript", "REST APIs", "UI Builder", "Now Assist"],
  },
];

export type Project = {
  id: string;
  title: string;
  kicker: string;
  period: string;
  summary: string;
  description: string;
  highlights: string[];
  stack: string[];
  accent: string;
  architecture: string[];
  links?: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    id: "agentflow",
    title: "AgentFlow",
    kicker: "AI Software Engineering Agent",
    period: "Mar 2026 — Apr 2026",
    summary:
      "A stateful multi-agent system that takes a software task from plan to reviewed pull request.",
    description:
      "AgentFlow decomposes a software task into explicit planning, code analysis, implementation, testing and review stages — each run by a specialised agent over a shared LangGraph state. Repository understanding comes from a RAG layer over code and docs, and every change is validated by automated tests and an AI review stage before a human approves it.",
    highlights: [
      "Stateful multi-agent graph: planner → analyst → implementer → tester → reviewer.",
      "RAG-based repository understanding with embeddings and vector search over code and docs.",
      "MCP-based developer tools and GitHub workflows for real repository interaction.",
      "Automated testing and code-review gates validate changes before user approval.",
    ],
    stack: ["LangGraph", "LangChain", "RAG", "MCP", "Python", "Next.js", "GitHub API", "Vector DB"],
    accent: "#7CFFB2",
    architecture: ["Plan", "Analyse", "Implement", "Test", "Review", "Approve"],
  },
  {
    id: "revibe",
    title: "Revibe",
    kicker: "AI Mental Wellness Platform",
    period: "Feb 2025 — Apr 2025",
    summary:
      "A full-stack wellness platform with mood tracking, goals, community and a Gemini-powered companion.",
    description:
      "Revibe helps people understand their mental wellbeing over time. It combines mood tracking, personal goals, curated resources and support-network management with a conversational AI assistant that turns a user's mood history into personalised insights — backed by real-time community chat.",
    highlights: [
      "Google Gemini 2.0 Flash conversational assistant with personalised insights from mood data.",
      "Persistent chat history and real-time community messaging via MongoDB, Redis and Server-Sent Events.",
      "Full auth flows: OTP verification, password reset, secure hashing and RESTful APIs.",
    ],
    stack: ["Next.js", "Tailwind CSS", "MongoDB", "Redis", "SSE", "Python", "scikit-learn", "Gemini"],
    accent: "#B69CFF",
    architecture: ["Track", "Store", "Analyse", "Converse", "Connect"],
  },
  {
    id: "findings-agent",
    title: "Findings Resolver",
    kicker: "Internal AI Agent · ServiceNow",
    period: "2025",
    summary:
      "An AI agent that automatically resolves code findings, removing hours of repetitive remediation.",
    description:
        "Built during my internship and continued into my full-time role: an AI agent that automates resolving generated code findings, turning a manual, repetitive queue into an automated workflow and reducing developer effort.",
    highlights: [
      "Automates resolution of findings that previously required manual developer effort.",
      "Started during my 2025 internship and continued into my full-time role.",
    ],
    stack: ["AI Agents", "LLM APIs", "Tool Calling", "ServiceNow SDK", "TypeScript"],
    accent: "#FFC876",
    architecture: ["Ingest", "Reason", "Fix", "Verify"],
  },
  {
    id: "now-assist-dashboard",
    title: "Now Assist Showcase",
    kicker: "Customer Dashboard · ServiceNow",
    period: "Summer 2024",
    summary:
      "A customer-facing dashboard showcasing Now Assist features, plus GenAI inside the microsite builder.",
    description:
      "As a summer intern I built a dashboard that lets customers explore Now Assist capabilities and products, and integrated GenAI features into ServiceNow's microsite builder so teams could generate content faster.",
    highlights: [
      "Interactive dashboard presenting Now Assist features and products to customers.",
      "GenAI integrated into the ServiceNow microsite builder.",
      "Built with AngularJS, REST APIs and the ServiceNow platform.",
    ],
    stack: ["AngularJS", "JavaScript", "REST APIs", "ServiceNow", "GenAI"],
    accent: "#7CC8FF",
    architecture: ["Discover", "Explore", "Generate"],
  },
];

export type SkillGroup = { id: string; label: string; skills: string[] };

export const skillGroups: SkillGroup[] = [
  {
    id: "ai",
    label: "AI / GenAI",
    skills: ["LLMs", "AI Agents", "LangGraph", "RAG", "MCP", "Tool Calling", "Vector DBs", "Prompt Engineering", "LLM APIs", "Generative AI"],
  },
  { id: "lang", label: "Languages", skills: ["TypeScript", "JavaScript", "Python", "Java"] },
  { id: "frontend", label: "Frontend", skills: ["React", "Next.js", "HTML5", "CSS3", "SCSS", "Tailwind", "Bootstrap"] },
  { id: "backend", label: "Backend", skills: ["Node.js", "Express", "REST APIs", "SSE"] },
  { id: "data", label: "Data", skills: ["PostgreSQL", "MongoDB", "Redis", "SQL", "NoSQL"] },
  { id: "servicenow", label: "ServiceNow", skills: ["ServiceNow SDK", "Fluent", "UI Builder", "AngularJS", "Now Assist"] },
  { id: "core", label: "Core", skills: ["Data Structures", "Algorithms", "Competitive Programming"] },
];

export const certifications = [
  {
    id: "cad",
    title: "Certified Application Developer",
    short: "CAD",
    issuer: "ServiceNow",
    date: "May 2025",
    description:
      "Validates designing and building advanced applications on the ServiceNow platform.",
  },
  {
    id: "csa",
    title: "Certified System Administrator",
    short: "CSA",
    issuer: "ServiceNow",
    date: "Feb 2025",
    description:
      "Validates advanced proficiency configuring, managing and maintaining the ServiceNow platform.",
  },
];

export const journey = [
  { year: "2021", title: "Started B.Tech CSE", body: "Lovely Professional University. Graduated with an 8.35 CGPA in 2025.", tag: "Education" },
  { year: "2023", title: "Smart India Hackathon", body: "Led a high-impact project to a nomination at SIH 2023 with a cross-functional team.", tag: "Achievement" },
  { year: "2023", title: "500+ LeetCode", body: "Built deep fundamentals in data structures, algorithms and competitive programming.", tag: "Craft" },
  { year: "2024", title: "Joined ServiceNow", body: "Summer intern — first taste of shipping to real customers with Now Assist.", tag: "Career" },
  { year: "2025", title: "CSA + CAD", body: "Certified as a ServiceNow System Administrator and Application Developer.", tag: "Certification" },
  { year: "2025", title: "Fluent R&D", body: "Researched a TypeScript DSL to scale its use across 3,000+ people.", tag: "Research" },
  { year: "2025", title: "Full-time ASE", body: "Building best-practice tooling and AI agents for ~2,500 developers.", tag: "Career" },
  { year: "2026", title: "Agentic systems", body: "AgentFlow — multi-agent software engineering with LangGraph, RAG and MCP.", tag: "Now" },
];

export const interests = [
  "Multi-agent orchestration",
  "Model Context Protocol",
  "Retrieval over codebases",
  "Developer experience",
  "TypeScript DSLs",
  "Evaluating LLM systems",
];

export const education = [
  { school: "Lovely Professional University", degree: "B.Tech, Computer Science & Engineering", period: "2021 — 2025", score: "8.35 CGPA" },
  { school: "Hindu Vidyapeeth, Sonipat", degree: "High School", period: "2020 — 2021", score: "85.6%" },
];

export const navLinks = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Stack" },
  { id: "projects", label: "Work" },
  { id: "journey", label: "Journey" },
  { id: "contact", label: "Contact" },
];
