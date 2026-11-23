
import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/shared/Reveal";
import BackgroundGrid from "@/components/shared/BackgroundGrid";

export const metadata: Metadata = {
  title: "About — Egbeleke Taiwo",
  description:
    "Meet Egbeleke Taiwo, a Full-Stack Software Developer from Lagos, Nigeria, with a background in frontend development, backend engineering, and building practical digital solutions.",
};

const experienceHighlights = [
  {
    period: "2025 — Present",
    role: "Frontend Development & Software Engineering",
    description:
      "Completed web design and web development training at TopIbro Technology and continued developing practical applications. Working with HTML, CSS, JavaScript, TypeScript, React, Next.js, and Tailwind CSS, while expanding into backend development and full-stack engineering.",
  },
  {
    period: "Project Collaboration",
    role: "Full-Stack Developer — LAEF",
    description:
      "Developed a full-stack digital platform for Larsen Advocacy & Empowerment Foundation. Worked on the frontend, backend APIs, MongoDB database, authentication, administrative dashboards, content management, donation systems, and payment integration.",
  },
  {
    period: "NYSC",
    role: "Store Keeper — KGT Resort and Accommodation",
    description:
      "Completed my National Youth Service Corps (NYSC) primary assignment, gaining practical experience in inventory management, record keeping, organization, and workplace operations.",
  },
  {
    period: "2022 — Present",
    role: "Volunteer Data Entry — WARIF",
    description:
      "Contribute as a volunteer through data entry and administrative support, supporting the work of the Women at Risk International Foundation (WARIF).",
  },
];

const technicalCompetencies = [
  {
    category: "Frontend Development",
    skills: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "TypeScript",
      "React.js",
      "Next.js",
      "Tailwind CSS",
      "Responsive Design",
    ],
  },
  {
    category: "Backend Development",
    skills: [
      "Node.js",
      "Express.js",
      "REST APIs",
      "JWT Authentication",
      "Protected Routes",
      "Swagger / OpenAPI",
      "API Integration",
    ],
  },
  {
    category: "Databases & Cloud Services",
    skills: [
      "MongoDB",
      "Mongoose",
      "Firebase",
      "Cloudinary",
      "Paystack",
      "Kora Payments",
    ],
  },
  {
    category: "Development Tools & Practices",
    skills: [
      "Git",
      "GitHub",
      "Zustand",
      "Context API",
      "Axios",
      "Fetch API",
      "Debugging",
      "UI/UX Principles",
    ],
  },
];

const featuredProjects = [
  {
    name: "LAEF Digital Platform",
    type: "Full-Stack Web Application",
    description:
      "A full-stack platform for Larsen Advocacy & Empowerment Foundation, featuring public-facing pages, program portals, donation management, payment integration, authentication, and separate Admin and Super Admin dashboards.",
    stack: "Next.js, Node.js, Express.js, MongoDB, JWT, Swagger, Cloudinary",
  },
  {
    name: "Gbemileke Tradomedical Hospital",
    type: "Full-Stack Web Application",
    description:
      "A digital platform developed to support my father's traditional medical practice, bringing services such as appointment management, product management, online payments, and administrative operations into one system.",
    stack: "Next.js, Node.js, Express.js, MongoDB, Swagger",
  },
  {
    name: "DMG Clothing",
    type: "E-commerce Application",
    description:
      "A clothing e-commerce project focused on product management, shopping cart functionality, authentication, product variations, inventory, and order processing.",
    stack: "Next.js, React, Tailwind CSS, Node.js, Express.js, MongoDB, Zustand",
  },
  {
    name: "Forever E-commerce",
    type: "E-commerce Application",
    description:
      "An e-commerce project focused on product presentation, shopping cart functionality, and creating a straightforward online shopping experience.",
    stack: "Next.js, React, Tailwind CSS, Context API",
  },
  {
    name: "Tomato",
    type: "Web Application",
    description:
      "A web application built with Next.js, featuring a login interface and application state management using Context API.",
    stack: "Next.js, React, Tailwind CSS, Context API",
  },
  {
    name: "Movie Database",
    type: "Web Application",
    description:
      "A movie discovery application that uses external movie data to display films and provide users with an interactive browsing experience.",
    stack: "React, JavaScript, API Integration",
  },
];

const education = [
  {
    qualification: "Bachelor of Science (B.Sc.)",
    field: "Industrial Relations and Personnel Management",
    institution: "University of Lagos (UNILAG)",
    period: "2017 — 2023",
  },
];

export default function AboutPage() {
  return (
    <div className="relative overflow-hidden">
      <BackgroundGrid size={{ x: "32px", y: "32px" }} />

      <article className="mx-auto max-w-4xl px-4 pb-24 pt-8 sm:px-6 sm:pt-16">
        {/* Back Link */}
        <Reveal>
          <Link
            href="/"
            className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-paper-dim transition-colors hover:text-signal"
          >
            <span className="transition-transform duration-300 group-hover:-translate-x-1">
              ←
            </span>
            Back to home
          </Link>
        </Reveal>

        {/* Hero Section */}
        <header className="relative mt-10">
          <Reveal delay={1}>
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-signal">
                About The Developer
              </span>
              <span className="h-px w-8 bg-white/15" />
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-paper-dim">
                Lagos, Nigeria
              </span>
            </div>

            <h1 className="mt-5 font-display text-4xl leading-[1.05] tracking-tight text-paper sm:text-6xl">
              Building digital experiences, solving problems, and growing through technology.
            </h1>

            <p className="mt-6 text-base leading-7 text-paper-dim sm:text-lg sm:leading-8">
              I&apos;m{" "}
              <strong className="font-semibold text-paper">
                Egbeleke Taiwo
              </strong>
              , a Full-Stack Software Developer based in Lagos, Nigeria, with
              a strong foundation in frontend development and a growing focus
              on backend engineering. I enjoy turning ideas into functional
              digital products, building responsive user interfaces, developing
              APIs, and connecting different parts of an application to create
              complete solutions.
            </p>

            <p className="mt-4 text-sm leading-7 text-paper-dim sm:text-base">
              My approach to development is centred on continuous learning,
              practical problem-solving, and writing code that serves a real
              purpose. I&apos;m particularly interested in building applications
              that make everyday processes easier, more accessible, and more
              efficient.
            </p>
          </Reveal>
        </header>

        {/* My Story */}
        <section className="mt-16">
          <Reveal delay={2}>
            <div className="rounded-2xl border border-white/10 bg-ink-raised/60 p-6 backdrop-blur-xs sm:p-10">
              <div className="mb-4 flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-signal">
                  01
                </span>
                <span className="h-px w-6 bg-signal/30" />
                <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-paper">
                  My Journey Into Technology
                </h2>
              </div>

              <div className="space-y-4 text-sm leading-relaxed text-paper-dim sm:text-base sm:leading-8">
                <p>
                  My academic background is in Industrial Relations and
                  Personnel Management, which I studied at the University of
                  Lagos, where I graduated in 2023. Although my degree is not
                  directly related to software engineering, my interest in
                  technology led me to explore web development and discover
                  how much I enjoyed building things with code.
                </p>

                <p>
                  I began my development journey with the fundamentals of web
                  development: HTML, CSS, and JavaScript. As I became more
                  comfortable, I moved into React.js and Next.js, learning how
                  to build interactive interfaces, manage application state,
                  consume APIs, and create responsive web applications.
                </p>

                <p>
                  My curiosity didn&apos;t stop at the frontend. I wanted to
                  understand what happens behind the interfaces I was
                  building, so I started exploring backend development with
                  Node.js, Express.js, and MongoDB. This gradually introduced
                  me to authentication, database design, API development,
                  server-side logic, and payment integrations.
                </p>

                <p>
                  Today, I work across both frontend and backend development,
                  building projects that bring different technologies
                  together. I&apos;m still learning, experimenting, and challenging
                  myself with projects that push me beyond what I already
                  know.
                </p>
              </div>
            </div>
          </Reveal>
        </section>

        {/* Experience */}
        <section className="mt-16">
          <Reveal delay={1}>
            <div className="mb-8 flex items-center gap-3">
              <span className="font-mono text-xs font-bold text-signal">
                02
              </span>
              <span className="h-px w-6 bg-signal/30" />
              <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-paper">
                Experience & Contributions
              </h2>
            </div>
          </Reveal>

          <div className="space-y-6">
            {experienceHighlights.map((item, idx) => (
              <Reveal
                key={idx}
                delay={Math.min(idx + 1, 5) as 1 | 2 | 3 | 4 | 5}
              >
                <div className="group rounded-xl border border-white/8 bg-ink-raised/40 p-6 transition-all duration-300 hover:border-signal/40 hover:bg-ink-raised">
                  <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                    <h3 className="font-display text-lg text-paper">
                      {item.role}
                    </h3>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-signal">
                      {item.period}
                    </span>
                  </div>

                  <p className="mt-3 text-sm leading-relaxed text-paper-dim">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="mt-16">
          <Reveal delay={1}>
            <div className="mb-8 flex items-center gap-3">
              <span className="font-mono text-xs font-bold text-signal">
                03
              </span>
              <span className="h-px w-6 bg-signal/30" />
              <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-paper">
                Education & Academic Background
              </h2>
            </div>
          </Reveal>

          {education.map((item, idx) => (
            <Reveal key={idx} delay={2}>
              <div className="rounded-xl border border-white/8 bg-ink-raised/40 p-6">
                <span className="font-mono text-[10px] uppercase tracking-wider text-signal">
                  {item.period}
                </span>

                <h3 className="mt-3 font-display text-xl text-paper">
                  {item.qualification}
                </h3>

                <p className="mt-2 text-sm text-paper-dim">
                  {item.field}
                </p>

                <p className="mt-2 text-sm text-paper-dim">
                  {item.institution}
                </p>
              </div>
            </Reveal>
          ))}
        </section>

        {/* Technical Competencies */}
        <section className="mt-16">
          <Reveal delay={1}>
            <div className="mb-8 flex items-center gap-3">
              <span className="font-mono text-xs font-bold text-signal">
                04
              </span>
              <span className="h-px w-6 bg-signal/30" />
              <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-paper">
                Technical Skills & Technologies
              </h2>
            </div>
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-2">
            {technicalCompetencies.map((group, idx) => (
              <Reveal
                key={idx}
                delay={Math.min(idx + 1, 4) as 1 | 2 | 3 | 4}
              >
                <div className="flex h-full flex-col justify-between rounded-xl border border-white/8 bg-ink-raised/40 p-6">
                  <div>
                    <h3 className="mb-4 font-mono text-xs uppercase tracking-wider text-signal">
                      {group.category}
                    </h3>

                    <div className="flex flex-wrap gap-2">
                      {group.skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded border border-white/10 bg-white/[0.02] px-2.5 py-1 font-mono text-[10px] text-paper-dim"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Featured Projects */}
        <section className="mt-16">
          <Reveal delay={1}>
            <div className="mb-8 flex items-center gap-3">
              <span className="font-mono text-xs font-bold text-signal">
                05
              </span>
              <span className="h-px w-6 bg-signal/30" />
              <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-paper">
                Things I&apos;ve Built
              </h2>
            </div>

            <p className="mb-8 text-sm leading-7 text-paper-dim">
              I believe the best way to grow as a developer is by building.
              Over time, I&apos;ve worked on different projects that have helped me
              understand application architecture, frontend development,
              backend systems, database management, and real-world problem
              solving.
            </p>
          </Reveal>

          <div className="space-y-5">
            {featuredProjects.map((project, idx) => (
              <Reveal
                key={project.name}
                delay={Math.min(idx + 1, 5) as 1 | 2 | 3 | 4 | 5}
              >
                <div className="rounded-xl border border-white/8 bg-ink-raised/40 p-6 transition-all duration-300 hover:border-signal/40">
                  <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                    <h3 className="font-display text-lg text-paper">
                      {project.name}
                    </h3>

                    <span className="font-mono text-[10px] uppercase tracking-wider text-signal">
                      {project.type}
                    </span>
                  </div>

                  <p className="mt-3 text-sm leading-relaxed text-paper-dim">
                    {project.description}
                  </p>

                  <p className="mt-4 font-mono text-[10px] leading-relaxed text-paper-dim">
                    <span className="text-signal">TECH STACK: </span>
                    {project.stack}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Community Involvement */}
        <section className="mt-16">
          <Reveal delay={2}>
            <div className="rounded-2xl border border-white/10 bg-ink-raised/60 p-6 backdrop-blur-xs sm:p-10">
              <div className="mb-4 flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-signal">
                  06
                </span>
                <span className="h-px w-6 bg-signal/30" />
                <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-paper">
                  Beyond Software Development
                </h2>
              </div>

              <div className="space-y-4 text-sm leading-relaxed text-paper-dim sm:text-base sm:leading-8">
                <p>
                  Technology is an important part of my life, but I also
                  believe in contributing to things that make a difference
                  beyond the digital space.
                </p>

                <p>
                  Through my volunteer work with the Women at Risk
                  International Foundation (WARIF), I&apos;ve contributed to data
                  entry and administrative support. I&apos;ve also been involved
                  with the Larsen Advocacy & Empowerment Foundation (LAEF),
                  where my development work connects technology with
                  initiatives focused on ending sexual violence, addressing
                  child trafficking, and empowering vulnerable communities.
                </p>

                <p>
                  I also have an interest in sharing knowledge and helping
                  others understand technology. I&apos;ve had opportunities to
                  introduce students to web design and the fundamentals of
                  how websites work. These experiences have strengthened my
                  belief in learning, collaboration, and making knowledge
                  accessible.
                </p>
              </div>
            </div>
          </Reveal>
        </section>

        {/* Philosophy */}
        <section className="mt-16">
          <Reveal delay={1}>
            <div className="rounded-2xl border border-white/10 bg-ink-raised/60 p-6 sm:p-10">
              <div className="mb-4 flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-signal">
                  07
                </span>
                <span className="h-px w-6 bg-signal/30" />
                <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-paper">
                  My Approach & Philosophy
                </h2>
              </div>

              <p className="text-sm leading-relaxed text-paper-dim sm:text-base sm:leading-8">
                I don&apos;t believe becoming a good developer is about knowing
                every technology. It&apos;s about understanding problems, being
                willing to learn, and knowing how to turn ideas into working
                solutions. I&apos;m constantly improving my skills, exploring new
                technologies, and challenging myself to build better
                applications. Every project teaches me something new, and
                every challenge is another opportunity to grow.
              </p>

              <p className="mt-4 text-sm leading-relaxed text-paper sm:text-base sm:leading-8">
                My goal is to keep growing as a software engineer, contribute
                to meaningful projects, collaborate with great people, and
                build technology that creates real value.
              </p>
            </div>
          </Reveal>
        </section>

        {/* CTA */}
        <Reveal>
          <div className="mt-16 flex flex-col gap-6 border-t border-white/[0.07] pt-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-mono text-xs text-paper">
                Let&apos;s build something meaningful together.
              </p>

              <p className="mt-2 text-xs text-paper-dim">
                Open to software development opportunities, collaborations,
                and interesting projects.
              </p>
            </div>

            <div className="flex gap-3">
              <Link href="/projects" className="btn-primary text-xs">
                View projects →
              </Link>
            </div>
          </div>
        </Reveal>
      </article>
    </div>
  );
}
