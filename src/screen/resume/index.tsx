
// "use client";

// import { site } from "@/lib/site";
// import { experience } from "@/lib/experience";
// import Link from "next/link";

// const skills = {
//   Frontend: [
//     "HTML",
//     "CSS",
//     "JavaScript",
//     "TypeScript",
//     "React.js",
//     "Next.js",
//     "Tailwind CSS",
//   ],
//   Backend: [
//     "Node.js",
//     "Express.js",
//     "REST APIs",
//     "JWT Authentication",
//   ],
//   Database: ["MongoDB", "Mongoose", "Firebase"],
//   Tools: ["Git", "GitHub", "Cloudinary", "Axios", "Postman", "Swagger"],
// };

// const workExperience = [...experience]
//   .filter((item) => item.type === "work")
//   .reverse();

// const projects = [...experience]
//   .filter((item) => item.type === "project")
//   .reverse();

// const training = experience.filter((item) => item.type === "training");

// const volunteering = experience.filter((item) => item.type === "volunteer");

// export default function ResumePage() {
//   return (
//     <main className="min-h-screen bg-ink px-4 py-10 text-paper sm:px-6 lg:px-8">
//       <div className="mx-auto max-w-4xl">

//         {/* Page Actions */}
//         <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between print:hidden">
//           <Link
//             href="/"
//             className="inline-flex items-center gap-2 text-sm text-paper-dim transition-colors hover:text-signal"
//           >
//             <span>←</span> Back to Portfolio
//           </Link>

//           <div className="flex flex-wrap gap-3">
//             <a
//               href="/Resume.pdf"
//               download="Egbeleke_Taiwo_Resume.pdf"
//               className="btn-secondary text-center text-xs sm:text-sm"
//             >
//               Download PDF
//             </a>

//             <button
//               onClick={() => window.print()}
//               className="btn-primary text-center text-xs sm:text-sm"
//             >
//               Print / Save as PDF
//             </button>
//           </div>
//         </div>

//         {/* Resume Document */}
//         <article className="space-y-10 rounded-2xl border border-white/10 bg-white/[0.02] p-5 shadow-2xl sm:space-y-12 sm:p-8 lg:p-12 print:rounded-none print:border-0 print:bg-white print:p-0 print:text-black print:shadow-none">

//           {/* Header */}
//           <header className="border-b border-white/10 pb-6 sm:pb-8 print:border-gray-300">
//             <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-signal print:text-gray-600 sm:text-xs">
//               Curriculum Vitae
//             </p>

//             <h1 className="text-3xl font-bold tracking-tight text-paper sm:text-4xl lg:text-5xl print:text-black">
//               {site.name}
//             </h1>

//             <p className="mt-2 text-base font-medium text-signal print:text-gray-700 sm:text-lg">
//               Full-Stack Developer
//             </p>

//             <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-paper-dim print:text-gray-700 sm:text-sm">
//               <span className="font-mono">{site.location}</span>

//               <span className="text-white/20 print:text-gray-400">|</span>

//               <a
//                 href="tel:07063422983"
//                 className="transition-colors hover:text-signal print:text-black"
//               >
//                 07063422983
//               </a>

//               <span className="text-white/20 print:text-gray-400">|</span>

//               <a
//                 href="mailto:egbeleketaiwo@gmail.com"
//                 className="transition-colors hover:text-signal print:text-black"
//               >
//                 egbeleketaiwo@gmail.com
//               </a>

//               <span className="text-white/20 print:text-gray-400">|</span>

//               <a
//                 href={site.links.github}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="underline underline-offset-4 hover:text-signal print:text-black"
//               >
//                 GitHub ↗
//               </a>

//               <span className="text-white/20 print:text-gray-400">|</span>

//               <a
//                 href="https://www.linkedin.com/in/taiwo-egbeleke-391b42328/"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="underline underline-offset-4 hover:text-signal print:text-black"
//               >
//                 LinkedIn ↗
//               </a>

//               <span className="text-white/20 print:text-gray-400">|</span>

//               <Link
//                 href="/"
//                 className="underline underline-offset-4 hover:text-signal print:text-black"
//               >
//                 Portfolio
//               </Link>
//             </div>
//           </header>

//           {/* Professional Summary */}
//           <section className="resume-section space-y-3">
//             <h2 className="resume-heading font-mono text-xs font-bold uppercase tracking-[0.18em] text-signal print:text-gray-900">
//               Professional Summary
//             </h2>

//             <p className="text-sm leading-relaxed text-paper-dim print:text-gray-800 sm:text-base sm:leading-7">
//               Full-Stack Developer with practical experience building responsive
//               web applications and backend services. Proficient in React.js,
//               Next.js, TypeScript, Node.js, Express.js, and MongoDB, with
//               experience developing user interfaces, building REST APIs,
//               implementing authentication and authorization systems, managing
//               databases, and integrating third-party services. Experienced in
//               developing e-commerce platforms, administrative dashboards, and
//               business-oriented web applications. Passionate about solving
//               problems, continuous learning, and building reliable, maintainable
//               digital solutions.
//             </p>
//           </section>

//           {/* Technical Skills */}
//           <section className="resume-section space-y-4">
//             <h2 className="resume-heading font-mono text-xs font-bold uppercase tracking-[0.18em] text-signal print:text-gray-900">
//               Technical Skills
//             </h2>

//             <div className="grid gap-4 sm:grid-cols-2">
//               {Object.entries(skills).map(([category, items]) => (
//                 <div
//                   key={category}
//                   className="rounded-lg border border-white/5 bg-white/[0.01] p-4 print:border-gray-200 print:bg-gray-50"
//                 >
//                   <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-paper print:text-black">
//                     {category}
//                   </h3>

//                   <div className="flex flex-wrap gap-1.5">
//                     {items.map((item) => (
//                       <span
//                         key={item}
//                         className="rounded border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[11px] text-paper-dim print:border-gray-300 print:bg-white print:text-gray-800"
//                       >
//                         {item}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </section>

//           {/* Work Experience */}
//           <section className="resume-section space-y-4">
//             <h2 className="resume-heading font-mono text-xs font-bold uppercase tracking-[0.18em] text-signal print:text-gray-900">
//               Work Experience
//             </h2>

//             <div className="space-y-6">
//               {workExperience.map((item) => (
//                 <div
//                   key={item.id}
//                   className="resume-entry border-b border-white/5 pb-6 last:border-0 print:border-gray-200"
//                 >
//                   <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
//                     <div>
//                       <h3 className="text-base font-semibold text-paper print:text-black">
//                         {item.role}
//                       </h3>

//                       <p className="text-sm font-medium text-signal print:text-gray-700">
//                         {item.org}
//                       </p>
//                     </div>

//                     <span className="shrink-0 font-mono text-xs text-paper-dim print:text-gray-600">
//                       {item.period}
//                     </span>
//                   </div>

//                   <p className="mt-2 text-sm leading-relaxed text-paper-dim print:text-gray-800">
//                     {item.summary}
//                   </p>

//                   {item.highlights && (
//                     <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-paper-dim print:text-gray-800">
//                       {item.highlights.map((highlight) => (
//                         <li key={highlight}>{highlight}</li>
//                       ))}
//                     </ul>
//                   )}

//                   {item.stack && (
//                     <p className="mt-3 font-mono text-xs leading-relaxed text-paper-dim/80 print:text-gray-600">
//                       <strong className="text-paper print:text-black">
//                         Tech Stack:
//                       </strong>{" "}
//                       {item.stack.join(", ")}
//                     </p>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </section>

//           {/* Selected Projects */}
//           <section className="resume-section space-y-4">
//             <h2 className="resume-heading font-mono text-xs font-bold uppercase tracking-[0.18em] text-signal print:text-gray-900">
//               Selected Projects
//             </h2>

//             <div className="space-y-6">
//               {projects.map((item) => (
//                 <div
//                   key={item.id}
//                   className="resume-entry border-b border-white/5 pb-6 last:border-0 print:border-gray-200"
//                 >
//                   <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
//                     <div>
//                       <h3 className="text-base font-semibold text-paper print:text-black">
//                         {item.org}
//                       </h3>

//                       <p className="text-sm font-medium text-signal print:text-gray-700">
//                         {item.role}
//                       </p>

//                       {/* Project URL */}
//                       {item.url && (
//                         <a
//                           href={item.url}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="mt-1 inline-flex items-center gap-1 break-all text-xs text-signal underline underline-offset-4 transition-colors hover:text-white print:text-blue-700"
//                         >
//                           {item.url}
//                           <span className="shrink-0">↗</span>
//                         </a>
//                       )}
//                     </div>

//                     <span className="shrink-0 font-mono text-xs text-paper-dim print:text-gray-600">
//                       {item.period}
//                     </span>
//                   </div>

//                   <p className="mt-2 text-sm leading-relaxed text-paper-dim print:text-gray-800">
//                     {item.summary}
//                   </p>

//                   {item.highlights && (
//                     <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-paper-dim print:text-gray-800">
//                       {item.highlights.map((highlight) => (
//                         <li key={highlight}>{highlight}</li>
//                       ))}
//                     </ul>
//                   )}

//                   {item.stack && (
//                     <p className="mt-3 font-mono text-xs leading-relaxed text-paper-dim/80 print:text-gray-600">
//                       <strong className="text-paper print:text-black">
//                         Tech Stack:
//                       </strong>{" "}
//                       {item.stack.join(", ")}
//                     </p>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </section>

//           {/* Education */}
//           <section className="resume-section space-y-4">
//             <h2 className="resume-heading font-mono text-xs font-bold uppercase tracking-[0.18em] text-signal print:text-gray-900">
//               Education
//             </h2>

//             <div className="resume-entry">
//               <h3 className="text-base font-semibold text-paper print:text-black">
//                 Bachelor of Science (B.Sc.)
//               </h3>

//               <p className="mt-0.5 text-sm font-medium text-signal print:text-gray-700">
//                 Industrial Relations and Personnel Management
//               </p>

//               <p className="mt-0.5 text-sm text-paper-dim print:text-gray-700">
//                 University of Lagos (UNILAG)
//               </p>

//               <p className="mt-1 font-mono text-xs text-paper-dim/80 print:text-gray-600">
//                 October 2017 – August 2023
//               </p>
//             </div>
//           </section>

//           {/* Training */}
//           <section className="resume-section space-y-4">
//             <h2 className="resume-heading font-mono text-xs font-bold uppercase tracking-[0.18em] text-signal print:text-gray-900">
//               Training & Development
//             </h2>

//             <div className="space-y-4">
//               {training.map((item) => (
//                 <div key={item.id} className="resume-entry">
//                   <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
//                     <h3 className="text-base font-semibold text-paper print:text-black">
//                       {item.role}
//                     </h3>

//                     <span className="shrink-0 font-mono text-xs text-paper-dim print:text-gray-600">
//                       {item.period}
//                     </span>
//                   </div>

//                   <p className="mt-0.5 text-sm font-medium text-signal print:text-gray-700">
//                     {item.org}
//                   </p>

//                   <p className="mt-2 text-sm leading-relaxed text-paper-dim print:text-gray-800">
//                     {item.summary}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </section>

//           {/* Volunteer Experience */}
//           <section className="resume-section space-y-4">
//             <h2 className="resume-heading font-mono text-xs font-bold uppercase tracking-[0.18em] text-signal print:text-gray-900">
//               Volunteer Experience
//             </h2>

//             <div className="space-y-6">
//               {volunteering.map((item) => (
//                 <div key={item.id} className="resume-entry">
//                   <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
//                     <div>
//                       <h3 className="text-base font-semibold text-paper print:text-black">
//                         {item.role}
//                       </h3>

//                       <p className="text-sm font-medium text-signal print:text-gray-700">
//                         {item.org}
//                       </p>
//                     </div>

//                     <span className="shrink-0 font-mono text-xs text-paper-dim print:text-gray-600">
//                       {item.period}
//                     </span>
//                   </div>

//                   <p className="mt-2 text-sm leading-relaxed text-paper-dim print:text-gray-800">
//                     {item.summary}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </section>

//           {/* Footer */}
//           <footer className="border-t border-white/10 pt-6 print:border-gray-300">
//             <p className="text-center font-mono text-xs text-paper-dim print:text-gray-600">
//               {site.name} · {site.location}
//             </p>
//           </footer>
//         </article>
//       </div>
//     </main>
//   );
// }


"use client";

import { site } from "@/lib/site";
import { experience } from "@/lib/experience";
import Link from "next/link";

const skills = {
  Frontend: [
    "HTML",
    "CSS",
    "JavaScript",
    "TypeScript",
    "React.js",
    "Next.js",
    "Tailwind CSS",
  ],
  Backend: [
    "Node.js",
    "Express.js",
    "REST APIs",
    "JWT Authentication",
  ],
  Database: ["MongoDB", "Mongoose", "Firebase"],
  Tools: ["Git", "GitHub", "Cloudinary", "Axios", "Postman", "Swagger"],
};

const workExperience = [...experience]
  .filter((item) => item.type === "work")
  .reverse();

const projects = [...experience]
  .filter((item) => item.type === "project")
  .reverse();

const training = experience.filter((item) => item.type === "training");

export default function ResumePage() {
  return (
    <main className="min-h-screen bg-ink px-4 py-10 text-paper sm:px-6 lg:px-8 print:min-h-0 print:bg-white print:px-0 print:py-0 print:text-black">
      <div className="mx-auto max-w-4xl print:max-w-none">

        {/* Page Actions */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between print:hidden">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-paper-dim transition-colors hover:text-signal"
          >
            <span>←</span> Back to Portfolio
          </Link>

          <div className="flex flex-wrap gap-3">
            <a
              href="/Resume.pdf"
              download="Egbeleke_Taiwo_Resume.pdf"
              className="btn-secondary text-center text-xs sm:text-sm"
            >
              Download PDF
            </a>

            <button
              onClick={() => window.print()}
              className="btn-primary text-center text-xs sm:text-sm"
            >
              Print / Save as PDF
            </button>
          </div>
        </div>

        {/* Resume Document */}
        <article className="space-y-10 rounded-2xl border border-white/10 bg-white/[0.02] p-5 shadow-2xl sm:space-y-12 sm:p-8 lg:p-12 print:space-y-6 print:rounded-none print:border-0 print:bg-white print:p-0 print:text-sm print:leading-relaxed print:text-black print:shadow-none">

          {/* Header */}
          <header className="border-b border-white/10 pb-6 sm:pb-8 print:border-gray-300 print:pb-4">
            <h1 className="text-3xl font-bold tracking-tight text-paper sm:text-4xl lg:text-5xl print:text-3xl print:text-black">
              {site.name}
            </h1>

            <p className="mt-2 text-base font-medium text-signal sm:text-lg print:mt-1 print:text-base print:text-gray-800">
              Full-Stack Developer
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-paper-dim sm:text-sm print:mt-2.5 print:gap-x-3 print:gap-y-1.5 print:text-xs print:text-gray-700">
              <span className="font-mono">{site.location}</span>

              <span className="text-white/20 print:text-gray-400">|</span>

              <a
                href="tel:07063422983"
                className="transition-colors hover:text-signal print:text-black"
              >
                07063422983
              </a>

              <span className="text-white/20 print:text-gray-400">|</span>

              <a
                href="mailto:egbeleketaiwo@gmail.com"
                className="transition-colors hover:text-signal print:text-black"
              >
                egbeleketaiwo@gmail.com
              </a>

              <span className="text-white/20 print:text-gray-400">|</span>

              <a
                href={site.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 hover:text-signal print:text-black"
              >
                GitHub ↗
              </a>

              <span className="text-white/20 print:text-gray-400">|</span>

              <a
                href="https://www.linkedin.com/in/taiwo-egbeleke-391b42328/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 hover:text-signal print:text-black"
              >
                LinkedIn ↗
              </a>

              <span className="text-white/20 print:text-gray-400">|</span>

              <Link
                href="/"
                className="underline underline-offset-4 hover:text-signal print:text-black"
              >
                Portfolio
              </Link>
            </div>
          </header>

          {/* Professional Summary */}
          <section className="resume-section space-y-3 print:mt-4 print:space-y-2 print:break-inside-avoid">
            <h2 className="resume-heading font-mono text-xs font-bold uppercase tracking-[0.18em] text-signal print:mb-2 print:pb-1 print:text-xs print:text-gray-900">
              Professional Summary
            </h2>

            <p className="text-sm leading-relaxed text-paper-dim sm:text-base sm:leading-7 print:text-sm print:leading-relaxed print:text-gray-800">
              Full-Stack Developer with practical experience building responsive
              web applications and backend services. Proficient in React.js,
              Next.js, TypeScript, Node.js, Express.js, and MongoDB, with
              experience developing user interfaces, building REST APIs,
              implementing authentication and authorization systems, managing
              databases, and integrating third-party services. Experienced in
              developing e-commerce platforms, administrative dashboards, and
              business-oriented web applications. Passionate about solving
              problems, continuous learning, and building reliable, maintainable
              digital solutions.
            </p>
          </section>

          {/* Technical Skills */}
          <section className="resume-section space-y-4 print:mt-4 print:space-y-3 print:break-inside-avoid">
            <h2 className="resume-heading font-mono text-xs font-bold uppercase tracking-[0.18em] text-signal print:mb-2 print:pb-1 print:text-xs print:text-gray-900">
              Technical Skills
            </h2>

            <div className="grid gap-4 sm:grid-cols-2 print:grid-cols-2 print:gap-3">
              {Object.entries(skills).map(([category, items]) => (
                <div
                  key={category}
                  className="rounded-lg border border-white/5 bg-white/[0.01] p-4 print:rounded-md print:border-gray-200 print:bg-gray-50 print:p-3"
                >
                  <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-paper print:mb-1.5 print:text-xs print:text-black">
                    {category}
                  </h3>

                  <div className="flex flex-wrap gap-1.5 print:gap-1.5">
                    {items.map((item) => (
                      <span
                        key={item}
                        className="rounded border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[11px] text-paper-dim print:border-gray-300 print:bg-white print:px-2 print:py-0.5 print:text-xs print:text-gray-800"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Work Experience */}
          <section className="resume-section space-y-4 print:mt-4 print:space-y-4">
            <h2 className="resume-heading font-mono text-xs font-bold uppercase tracking-[0.18em] text-signal print:mb-2 print:pb-1 print:text-xs print:text-gray-900">
              Work Experience
            </h2>

            <div className="space-y-6 print:space-y-4">
              {workExperience.map((item) => (
                <div
                  key={item.id}
                  className="resume-entry border-b border-white/5 pb-6 last:border-0 print:border-gray-200 print:pb-3 print:break-inside-avoid"
                >
                  <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
                    <div>
                      <h3 className="text-base font-semibold text-paper print:text-sm print:text-black">
                        {item.role}
                      </h3>

                      <p className="text-sm font-medium text-signal print:text-xs print:text-gray-700">
                        {item.org}
                      </p>
                    </div>

                    <span className="shrink-0 font-mono text-xs text-paper-dim print:text-xs print:text-gray-600">
                      {item.period}
                    </span>
                  </div>

                  <p className="mt-2 text-sm leading-relaxed text-paper-dim print:mt-1.5 print:text-sm print:leading-relaxed print:text-gray-800">
                    {item.summary}
                  </p>

                  {item.highlights && (
                    <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-paper-dim print:mt-1.5 print:space-y-1 print:pl-5 print:text-xs print:leading-relaxed print:text-gray-800">
                      {item.highlights.map((highlight) => (
                        <li key={highlight}>{highlight}</li>
                      ))}
                    </ul>
                  )}

                  {item.stack && (
                    <p className="mt-3 font-mono text-xs leading-relaxed text-paper-dim/80 print:mt-2 print:text-xs print:leading-relaxed print:text-gray-600">
                      <strong className="text-paper print:text-black">
                        Tech Stack:
                      </strong>{" "}
                      {item.stack.join(", ")}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Selected Projects */}
          <section className="resume-section space-y-4 print:mt-4 print:space-y-4">
            <h2 className="resume-heading font-mono text-xs font-bold uppercase tracking-[0.18em] text-signal print:mb-2 print:pb-1 print:text-xs print:text-gray-900">
              Selected Projects
            </h2>

            <div className="space-y-6 print:space-y-4">
              {projects.map((item) => (
                <div
                  key={item.id}
                  className="resume-entry border-b border-white/5 pb-6 last:border-0 print:border-gray-200 print:pb-3 print:break-inside-avoid"
                >
                  <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
                    <div>
                      <h3 className="text-base font-semibold text-paper print:text-sm print:text-black">
                        {item.org}
                      </h3>

                      <p className="text-sm font-medium text-signal print:text-xs print:text-gray-700">
                        {item.role}
                      </p>

                      {/* Project URL */}
                      {item.url && (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-1 inline-flex items-center gap-1 break-all text-xs text-signal underline underline-offset-4 transition-colors hover:text-white print:mt-1 print:text-xs print:text-blue-700"
                        >
                          {item.url}
                          <span className="shrink-0">↗</span>
                        </a>
                      )}
                    </div>

                    <span className="shrink-0 font-mono text-xs text-paper-dim print:text-xs print:text-gray-600">
                      {item.period}
                    </span>
                  </div>

                  <p className="mt-2 text-sm leading-relaxed text-paper-dim print:mt-1.5 print:text-sm print:leading-relaxed print:text-gray-800">
                    {item.summary}
                  </p>

                  {item.highlights && (
                    <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-paper-dim print:mt-1.5 print:space-y-1 print:pl-5 print:text-xs print:leading-relaxed print:text-gray-800">
                      {item.highlights.map((highlight) => (
                        <li key={highlight}>{highlight}</li>
                      ))}
                    </ul>
                  )}

                  {item.stack && (
                    <p className="mt-3 font-mono text-xs leading-relaxed text-paper-dim/80 print:mt-2 print:text-xs print:leading-relaxed print:text-gray-600">
                      <strong className="text-paper print:text-black">
                        Tech Stack:
                      </strong>{" "}
                      {item.stack.join(", ")}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Education */}
          <section className="resume-section space-y-4 print:mt-4 print:space-y-2 print:break-inside-avoid">
            <h2 className="resume-heading font-mono text-xs font-bold uppercase tracking-[0.18em] text-signal print:mb-2 print:pb-1 print:text-xs print:text-gray-900">
              Education
            </h2>

            <div className="resume-entry">
              <h3 className="text-base font-semibold text-paper print:text-sm print:text-black">
                Bachelor of Science (B.Sc.)
              </h3>

              <p className="mt-0.5 text-sm font-medium text-signal print:text-xs print:text-gray-700">
                Industrial Relations and Personnel Management
              </p>

              <p className="mt-0.5 text-sm text-paper-dim print:text-xs print:text-gray-700">
                University of Lagos (UNILAG)
              </p>

              <p className="mt-1 font-mono text-xs text-paper-dim/80 print:mt-1 print:text-xs print:text-gray-600">
                October 2017 – August 2023
              </p>
            </div>
          </section>

          {/* Training */}
          <section className="resume-section space-y-4 print:mt-4 print:space-y-3">
            <h2 className="resume-heading font-mono text-xs font-bold uppercase tracking-[0.18em] text-signal print:mb-2 print:pb-1 print:text-xs print:text-gray-900">
              Training & Development
            </h2>

            <div className="space-y-4 print:space-y-3">
              {training.map((item) => (
                <div key={item.id} className="resume-entry print:break-inside-avoid">
                  <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
                    <h3 className="text-base font-semibold text-paper print:text-sm print:text-black">
                      {item.role}
                    </h3>

                    <span className="shrink-0 font-mono text-xs text-paper-dim print:text-xs print:text-gray-600">
                      {item.period}
                    </span>
                  </div>

                  <p className="mt-0.5 text-sm font-medium text-signal print:text-xs print:text-gray-700">
                    {item.org}
                  </p>

                  <p className="mt-2 text-sm leading-relaxed text-paper-dim print:mt-1 print:text-sm print:leading-relaxed print:text-gray-800">
                    {item.summary}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Footer */}
          <footer className="border-t border-white/10 pt-6 print:border-gray-300 print:pt-3 print:break-inside-avoid">
            <p className="text-center font-mono text-xs text-paper-dim print:text-xs print:text-gray-600">
              {site.name} · {site.location}
            </p>
          </footer>
        </article>
      </div>
    </main>
  );
}