
export interface ExperienceEntry {
  id: string;
  type: "work" | "training" | "project" | "volunteer";
  period: string;
  role: string;
  org: string;
  summary: string;
  url?: string;
  highlights?: string[];
  stack?: string[];
}

export const typeLabel: Record<ExperienceEntry["type"], string> = {
  work: "Work Experience",
  training: "Training",
  project: "Projects",
  volunteer: "Volunteer Experience",
};

export const experience: ExperienceEntry[] = [
  {
    id: "warif-volunteer",
    type: "volunteer",
    period: "2022 – Present",
    role: "Volunteer Data Entry",
    org: "Women at Risk International Foundation (WARIF)",
    summary:
      "Supporting the organisation's work through data entry and administrative assistance, contributing to its efforts to support women and girls.",
    highlights: [
      "Assist with data entry and information organisation.",
      "Support administrative activities when needed.",
      "Contribute to an organisation focused on addressing sexual and gender-based violence.",
    ],
  },

  {
    id: "kgt-resort-storekeeper",
    type: "work",
    period: "NYSC – 1 Year",
    role: "Store Keeper",
    org: "KGT Resort and Accommodation",
    summary:
      "Served as a Store Keeper during my National Youth Service Corps (NYSC), supporting daily store operations and inventory management.",
    highlights: [
      "Assisted with inventory monitoring, stock recording, and tracking.",
      "Supported daily store operations and maintained organised inventory records.",
    ],
  },

  {
    id: "topibro-training",
    type: "training",
    period: "2025",
    role: "Web Design & Web Development Trainee",
    org: "TopIbro Technology",
    summary:
      "Completed web design and web development training, building a foundation in frontend development and modern web technologies.",
    highlights: [
      "Learned HTML, CSS, and JavaScript.",
      "Worked with React.js and Tailwind CSS.",
      "Built responsive web interfaces and practical projects.",
      "Developed familiarity with Git and GitHub.",
    ],
    stack: [
      "HTML",
      "CSS",
      "JavaScript",
      "React.js",
      "Tailwind CSS",
      "Git",
      "GitHub",
    ],
  },

  {
    id: "dmg-clothing",
    type: "project",
    period: "2025",
    role: "Full-Stack Developer",
    org: "DMG Clothing",
    url: "https://dmg-clothing.vercel.app/",
    summary:
      "Developed a full-stack e-commerce application featuring product management, user authentication, shopping cart functionality, product variants, and order management.",
    highlights: [
      "Built responsive e-commerce interfaces using Next.js and Tailwind CSS.",
      "Developed backend APIs using Node.js and Express.js.",
      "Integrated MongoDB and Mongoose for data management.",
      "Implemented user authentication and product management.",
      "Developed shopping cart, product variant, and order functionalities.",
    ],
    stack: [
      "Next.js",
      "React.js",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Mongoose",
      "JWT",
      "Cloudinary",
      "Zustand",
    ],
  },

  {
    id: "junior-fullstack-engineer",
    type: "work",
    period: "May 2026 - Present",
    role: "Junior Full-Stack Engineer",
    org: "TopIbro Technology",
    summary:
      "Worked on developing web applications across the frontend and backend, building responsive interfaces, integrating APIs, and contributing to application functionality.",
    highlights: [
      "Developed responsive user interfaces with React.js and Tailwind CSS.",
      "Built reusable components and worked with Next.js and TypeScript.",
      "Contributed to backend development using Node.js and Express.js.",
      "Integrated REST APIs and worked with MongoDB for data management.",
      "Used Git and GitHub for version control and collaboration.",
    ],
    stack: [
      "React.js",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Git",
      "GitHub",
    ],
  },

  {
    id: "gbemileke-tradomedical",
    type: "project",
    period: "2026",
    role: "Full-Stack Developer",
    org: "Gbemileke Tradomedical Hospital",
    url: "https://gbemileketradomedical.vercel.app/",
    summary:
      "Developed a full-stack web platform for a traditional medical practice, supporting appointment bookings, product management, online payments, and administrative operations.",
    highlights: [
      "Developed responsive frontend interfaces.",
      "Built backend REST APIs using Node.js and Express.js.",
      "Integrated MongoDB and Mongoose for database management.",
      "Implemented appointment booking and product management functionalities.",
      "Developed administrative dashboard features.",
      "Integrated online payment functionality.",
    ],
    stack: [
      "Next.js",
      "React.js",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Mongoose",
      "Swagger",
    ],
  },

  {
    id: "laef-fullstack-developer",
    type: "project",
    period: "2026",
    role: "Full-Stack Web Developer",
    org: "Larsen Advocacy & Empowerment Foundation (LAEF)",
    url: "https://larsenadvocacy.vercel.app/",
    summary:
      "Developed a full-stack digital platform supporting the foundation's programmes, donations, partnerships, community engagement, and administrative operations.",
    highlights: [
      "Developed public-facing website pages and dedicated programme portals.",
      "Built Admin and Super Admin dashboards for managing platform operations.",
      "Implemented donation and funding management functionalities.",
      "Developed partnership management, support reporting, and fit test result management.",
      "Integrated Cloudinary for media management.",
      "Worked on payment integration and backend API documentation using Swagger.",
    ],
    stack: [
      "Next.js",
      "React.js",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Mongoose",
      "JWT",
      "Cloudinary",
      "Swagger",
      "Bachs",
    ],
  },
];
