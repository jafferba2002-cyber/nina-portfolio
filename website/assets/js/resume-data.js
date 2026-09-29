/* =====================================================================
   RÉSUMÉ DATA  ·  N. Naina Mohamed
   ---------------------------------------------------------------------
   One source for three things on the site:
     1. the Experience cards and the career Gantt chart
     2. the numbers that update themselves (years of experience etc.)
     3. everything the chatbot is allowed to know
   When the CV changes, update this file (and the matching text in
   index.html for the hero / about / education sections).

   Privacy: the passport number, date of birth, father's name and home
   address from the CV are deliberately NOT included on this public site.
   ===================================================================== */

window.RESUME = {
  name: "N. Naina Mohamed",
  firstName: "Naina",
  credential: "B.E.",
  title: "Planning Engineer",
  focus: "Refinery shutdown and turnaround planning",
  location: "Tirunelveli, Tamil Nadu, India",
  email: "nainamohameddamr174@gmail.com",
  phone: "+918012166602",
  phoneDisplay: "+91 80121 66602",
  whatsapp: "918012166602",
  cv: "assets/docs/Naina-Mohamed-CV.pdf",
  nationality: "Indian",
  languages: ["English", "Tamil", "Hindi"],
  passport: "Valid until September 2028",
  countries: ["India", "Qatar"],

  objective:
    "To work in a firm with a professional, work-driven atmosphere where he can apply his knowledge and skills, keep growing as an experienced graduate engineer and help the organization meet its goals.",

  software: ["Primavera P6", "SAP", "MS Excel", "MS Word"],

  planning: [
    "Shutdown and turnaround planning",
    "Level-1 to Level-6 schedules",
    "Baseline and resource-loaded schedules",
    "Critical path analysis",
    "3-, 7- and 14-day look-ahead schedules",
    "WBS, calendars, milestones and constraints",
    "Progress measurement and quantity tracking",
    "S-curves and manpower histograms",
    "Recovery and revised schedules",
    "Risk identification and mitigation",
    "Work packs and job cards",
    "Daily, weekly and monthly progress reports (DPR)"
  ],

  execution: [
    "Piping fabrication, fit-up and welding",
    "NDT and hydrotest tracking",
    "MOV installation, alignment, testing and commissioning",
    "Pipeline rerouting, tie-ins and reinstatement",
    "Permit-to-work coordination",
    "Materials, manpower and equipment follow-up",
    "Billing quantities and measurement sheets",
    "Refinery safety (HSE) compliance"
  ],

  strengths: [
    "Leadership: motivates teams to achieve targets and goals",
    "Self-confidence",
    "Creative and logical thinking",
    "Problem solving",
    "Hardworking",
    "Adaptability"
  ],

  /* Most recent first. Dates are "YYYY-MM"; end: null means "present". */
  experience: [
    {
      id: "A1040",
      title: "Planning Engineer",
      company: "EMCOP Engineering & Associates",
      client: "CPCL (Chennai Petroleum Corporation Ltd.)",
      site: "OM&S-1 & 2, Manali",
      location: "Chennai, India",
      start: "2026-01",
      end: null,
      summary:
        "Shutdown planning for 24-inch MOV erection on crude tanks and a propylene pipeline reroute at CPCL Manali.",
      highlightsLabel: "Key achievements",
      highlights: [
        "Coordinated 24″ MOV erection for Crude Tanks 105, 106, 107 and 108 during the shutdown period.",
        "Managed planning and execution support for propylene pipeline rerouting within the scheduled shutdown duration.",
        "Achieved effective coordination between fabrication, erection, testing and commissioning teams.",
        "Maintained progress tracking and reporting with minimal schedule deviation."
      ],
      duties: [
        "Prepared detailed project schedules for 24″ MOV erection works and propylene pipeline rerouting activities using Primavera.",
        "Planned and monitored shutdown activities to ensure completion within the approved timeline.",
        "Coordinated with mechanical, piping, welding, QA/QC, safety and client teams for smooth project execution.",
        "Prepared daily, weekly and monthly progress reports and submitted updates to management and client representatives.",
        "Monitored manpower, equipment and material availability as per project requirements.",
        "Tracked piping fabrication, fit-up, welding, NDT, hydrotest and erection.",
        "Prepared look-ahead schedules and recovery plans to minimize delays during shutdown execution.",
        "Conducted progress measurement and updated actual progress against baseline schedules.",
        "Coordinated site activities for MOV installation, alignment, testing and commissioning.",
        "Planned pipeline rerouting activities including dismantling, spool fabrication, erection, tie-in, testing and reinstatement works.",
        "Ensured all activities were executed in accordance with approved drawings, specifications, method statements and safety standards.",
        "Coordinated with procurement and stores for timely delivery of piping materials, valves, fittings and consumables.",
        "Monitored welding productivity, resource utilization and daily work targets during shutdown.",
        "Participated in client meetings, shutdown coordination meetings and progress review discussions.",
        "Prepared work-front availability status and coordinated permit requirements with operations and safety departments.",
        "Maintained records of additional works, scope changes, delays and site instructions for project documentation.",
        "Assisted in preparing billing quantities, measurement sheets and work completion reports.",
        "Ensured compliance with refinery safety procedures and shutdown execution requirements."
      ],
      tags: ["Primavera P6", "Shutdown", "MOV erection", "Pipeline rerouting", "Progress reporting", "Billing quantities"]
    },
    {
      id: "A1030",
      title: "Planner",
      company: "Excellent Projects India Pvt. Ltd.",
      client: "CPCL (Chennai Petroleum Corporation Ltd.)",
      site: "Refinery-1 · Plants 9, 10 & 12, Manali",
      location: "Chennai, India",
      start: "2025-06",
      end: "2025-11",
      summary:
        "Turnaround planning for CPCL Refinery-1: a 1,854-activity Primavera P6 schedule covering 176 piping lines.",
      highlightsLabel: "Highlights",
      highlights: [
        "Built a 1,854-activity shutdown/turnaround schedule in Primavera P6 with work packs, job cards, sequencing and resource allocation.",
        "Prepared and monitored Level-1 to Level-6 schedules for replacing 176 piping lines (8,500 inch-dia incl. field and shop welds) and 39 critical hydrotest lines.",
        "Ran S-curve analysis to evaluate schedule and cost performance.",
        "Wrote the final shutdown performance report: lessons learned, delay summary, productivity analysis and recommendations."
      ],
      duties: [
        "Developed detailed shutdown/turnaround schedules using Primavera P6 (1,854 activities for the project), including work packs, job cards, sequencing and resource allocation.",
        "Prepared and monitored Level-1, Level-2, Level-3, Level-4, Level-5 and Level-6 schedules for piping replacement of 176 lines (total 8,500 inch-dia including field and shop welds) and 39 critical hydrotest lines.",
        "Coordinated with maintenance, operations, safety, QA/QC and execution contractors for scope finalization and job planning.",
        "Created the critical path to ensure safe and timely completion of shutdown activities.",
        "Followed up with procurement, vendors and contractors to ensure materials, tools, spares, heavy equipment, scaffolding and manpower were available before shutdown start-up.",
        "Generated and tracked daily progress reports, manpower reports, productivity reports and look-ahead schedules to monitor job status.",
        "Monitored work execution around the clock during the shutdown and gave management updated schedule forecasts and delay alerts.",
        "Conducted S-curve analysis to evaluate schedule and cost performance.",
        "Participated in daily and shift-wise planning review meetings with the client and contractors, highlighting critical issues, bottlenecks and recovery plans.",
        "Assisted in creating job prioritization lists and mechanical completion plans for system handover.",
        "Prepared the final shutdown performance report, including lessons learned, delay summary, productivity analysis and recommendations for future turnarounds."
      ],
      tags: ["Primavera P6", "Turnaround", "Level 1–6 schedules", "Critical path", "S-curve", "Hydrotest"]
    },
    {
      id: "A1020",
      title: "Scheduler",
      company: "Altrad Babcock",
      client: "Shell GTL",
      site: "Unit MT4",
      location: "Qatar",
      start: "2025-02",
      end: "2025-05",
      summary:
        "Scheduling for Shell GTL Unit MT4 in Qatar: baselines, resource-loaded schedules and short-interval look-aheads.",
      highlightsLabel: "Highlights",
      highlights: [
        "Developed and maintained baseline and resource-loaded schedules in Primavera P6 with WBS, calendars, relationships, milestones and constraints.",
        "Prepared 3-day, 7-day and 14-day look-ahead schedules for site execution.",
        "Monitored critical and near-critical activities; issued S-curves, DPRs, weekly and management reports.",
        "Prepared recovery and revised schedules when activities fell behind the approved plan."
      ],
      duties: [
        "Developed, updated and maintained detailed project schedules using Primavera P6.",
        "Prepared baseline schedules, work schedules and detailed activity plans for project execution.",
        "Coordinated with planning, engineering, construction, maintenance, procurement and operations teams to collect progress information.",
        "Monitored planned vs. actual progress and identified delays, critical activities and schedule deviations.",
        "Updated daily and weekly progress in Primavera P6 and prepared S-curves, progress reports and look-ahead schedules.",
        "Developed daily, weekly and monthly schedules based on project requirements and site priorities.",
        "Tracked manpower, equipment, materials and work-front availability against planned activities.",
        "Identified the critical path and monitored critical and near-critical activities.",
        "Prepared 3-day, 7-day and 14-day look-ahead schedules for site execution.",
        "Coordinated with site supervisors and engineers to ensure activities were completed as per schedule.",
        "Analyzed schedule delays and productivity and assisted in developing recovery plans.",
        "Prepared resource-loaded schedules and monitored resource utilization.",
        "Maintained activity relationships, calendars, WBS, milestones, constraints and progress in Primavera P6.",
        "Prepared progress measurement and quantity tracking for completed activities.",
        "Assisted in preparing manpower and resource histograms.",
        "Monitored shutdown/turnaround activities against the approved shutdown schedule.",
        "Coordinated daily shutdown progress meetings and updated action points.",
        "Prepared daily progress reports (DPR), weekly progress reports and management reports.",
        "Maintained documentation of schedule revisions, delays, hindrances and schedule impacts.",
        "Supported the Planning Engineer and Project Manager in schedule forecasting and completion planning.",
        "Prepared recovery / revised schedules when project activities fell behind the approved plan.",
        "Ensured all activities were properly sequenced and aligned with project milestones and the completion date."
      ],
      tags: ["Primavera P6", "Baseline schedules", "Look-aheads", "Resource loading", "S-curve", "Shutdown"]
    },
    {
      id: "A1010",
      title: "Planning Engineer",
      company: "AEMS Pvt. Ltd.",
      client: "",
      site: "",
      location: "",
      start: "2020-12",
      end: "2024-02",
      summary:
        "Multi-discipline turnaround planning: Level-3 and Level-4 schedules, resources, risks and permits.",
      highlightsLabel: "Highlights",
      highlights: [
        "Developed Level-3 and Level-4 turnaround schedules in Primavera P6 combining mechanical, electrical, instrumentation, civil and inspection scopes.",
        "Consolidated work lists from operations, maintenance, inspection and safety into the final execution plan.",
        "Identified schedule risks, proposed mitigation and aligned planned work with permit-to-work availability.",
        "Produced progress reports, S-curves, histograms and performance dashboards for management and the client."
      ],
      duties: [
        "Turnaround planning and scheduling: developed detailed Level-3 and Level-4 schedules for turnaround activities using Primavera P6, integrating mechanical, electrical, instrumentation, civil and inspection work scopes.",
        "Work scope integration: collected, reviewed and consolidated work lists from operations, maintenance, inspection and safety departments so every task was included in the final execution plan.",
        "Resource allocation: planned and allocated manpower, tools, equipment and material requirements based on activity priorities and schedule constraints.",
        "Progress monitoring: tracked daily progress against the baseline schedule, updated Primavera P6 and highlighted variances with root-cause analysis.",
        "Coordination and communication: facilitated daily coordination meetings with execution teams, contractors and client representatives to keep everyone aligned on targets.",
        "Risk management: identified potential schedule delays and risks, proposed mitigation measures and ensured preventive actions were implemented.",
        "Permit-to-work integration: coordinated with permit issuers and receivers to align planned work with permit availability and safety requirements.",
        "Reporting: prepared daily, weekly and monthly progress reports, S-curves, histograms and performance dashboards for management and client review.",
        "Post-turnaround analysis: participated in post-turnaround review meetings to document lessons learned and improve future planning efficiency.",
        "Compliance and safety: ensured adherence to refinery safety standards, company procedures and industry best practices through all planning and execution stages."
      ],
      tags: ["Turnaround", "Primavera P6", "Resource allocation", "Risk management", "Permit-to-work", "Reporting"]
    },
    {
      id: "A1000",
      title: "Junior Planner",
      company: "Engerious Erectors Pvt. Ltd.",
      client: "",
      site: "",
      location: "",
      start: "2017-09",
      end: "2020-11",
      summary: "Where the planning career started: turnaround schedules, job packages and progress tracking.",
      highlightsLabel: "Highlights",
      highlights: [
        "Assisted in developing detailed turnaround schedules using planning tools.",
        "Prepared job packages with scope of work, manpower requirements and material lists.",
        "Monitored progress against the plan, updated schedules and flagged potential delays to management.",
        "Built HSE guidelines into planning activities and supported post-turnaround reviews."
      ],
      duties: [
        "Assisted in developing detailed turnaround schedules using planning tools and software.",
        "Coordinated with operations, maintenance, inspection and safety teams for smooth execution of activities.",
        "Prepared job packages including scope of work, manpower requirements and material lists.",
        "Monitored progress against the plan, updated schedules and highlighted potential delays to management.",
        "Ensured timely availability of resources such as tools, equipment and spare parts.",
        "Maintained records of work execution, progress reports and resource utilization.",
        "Supported safety compliance by incorporating HSE guidelines into planning activities.",
        "Assisted in post-turnaround reviews to capture lessons learned and improve future planning."
      ],
      tags: ["Turnaround", "Job packages", "Progress monitoring", "HSE"]
    }
  ],

  education: [
    {
      id: "M1010",
      degree: "B.E.",
      full: "Bachelor of Engineering",
      institution: "PSN Engineering College",
      board: "Anna University",
      year: 2025,
      score: ""
    },
    {
      id: "M1000",
      degree: "DME",
      full: "Diploma in Mechanical Engineering",
      institution: "St. Xavier's Polytechnic College",
      board: "DOTE, Tamil Nadu",
      year: 2016,
      score: "75%"
    },
    {
      id: "",
      degree: "SSLC",
      full: "Secondary School Leaving Certificate",
      institution: "Schaffter Hr. Sec. School",
      board: "Tamil Nadu State Board",
      year: 2013,
      score: "65%"
    }
  ],

  projects: [
    {
      title: "Refinery-1 turnaround, Plants 9, 10 & 12",
      where: "Excellent Projects · CPCL Manali · 2025",
      text:
        "1,854-activity Primavera P6 schedule; Level-1 to Level-6 schedules for replacing 176 piping lines (8,500 inch-dia incl. field and shop welds) and 39 critical hydrotest lines; critical path, S-curves and a final shutdown performance report."
    },
    {
      title: "24″ MOV erection, Crude Tanks 105–108",
      where: "EMCOP Engineering · CPCL OM&S, Manali · 2026",
      text:
        "Coordinated 24-inch MOV erection on four crude tanks during the shutdown: installation, alignment, testing and commissioning."
    },
    {
      title: "Propylene pipeline rerouting",
      where: "EMCOP Engineering · CPCL, Manali · 2026",
      text:
        "Planned dismantling, spool fabrication, erection, tie-in, testing and reinstatement; completed within the scheduled shutdown duration."
    },
    {
      title: "Shell GTL, Unit MT4",
      where: "Altrad Babcock · Qatar · 2025",
      text:
        "Baseline and resource-loaded Primavera P6 schedules, 3-, 7- and 14-day look-aheads, S-curves, DPRs and recovery schedules."
    },
    {
      title: "Multi-discipline turnarounds",
      where: "AEMS Pvt. Ltd. · 2020–2024",
      text:
        "Level-3 and Level-4 schedules integrating mechanical, electrical, instrumentation, civil and inspection jobs, with resource, risk and permit-to-work planning."
    }
  ]
};

/* ---------------------------------------------------------------------
   Helpers (dates, durations, chatbot knowledge text)
   --------------------------------------------------------------------- */
window.RESUME_UTILS = (function () {
  const R = window.RESUME;
  const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  function parse(ym) {
    const [y, m] = ym.split("-").map(Number);
    return { y, m };
  }
  function nowYM() {
    const d = new Date();
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0");
  }
  /* Whole months, counting both the first and the last month */
  function months(start, end) {
    const a = parse(start), b = parse(end || nowYM());
    return Math.max(1, (b.y - a.y) * 12 + (b.m - a.m) + 1);
  }
  function fmt(ym) {
    if (!ym) return "Present";
    const { y, m } = parse(ym);
    return MONTHS[m - 1] + " " + y;
  }
  function duration(n) {
    const y = Math.floor(n / 12), m = n % 12, parts = [];
    if (y) parts.push(y + (y === 1 ? " yr" : " yrs"));
    if (m) parts.push(m + (m === 1 ? " mo" : " mos"));
    return parts.join(" ") || "1 mo";
  }
  function totalMonths() {
    return R.experience.reduce((sum, job) => sum + months(job.start, job.end), 0);
  }
  function totalYearsLabel() {
    return Math.floor(totalMonths() / 12) + "+";
  }
  /* Primavera-style data date, e.g. 29-Sep-26 */
  function p6Date(d) {
    d = d || new Date();
    return String(d.getDate()).padStart(2, "0") + "-" + MONTHS[d.getMonth()] + "-" + String(d.getFullYear()).slice(2);
  }

  /* Plain-text résumé handed to the AI model. Keep it factual. */
  function knowledgeText() {
    const total = totalMonths();
    const today = new Date().toISOString().slice(0, 10);
    const lines = [];
    lines.push("NAME: " + R.name + ", " + R.credential);
    lines.push("CURRENT ROLE: " + R.experience[0].title + " at " + R.experience[0].company + " (" + R.experience[0].client + ", " + R.experience[0].site + ")");
    lines.push("PROFESSION: " + R.title + " - " + R.focus + " (Primavera P6)");
    lines.push("BASED IN: " + R.location);
    lines.push("EMAIL: " + R.email);
    lines.push("PHONE / CALL: " + R.phoneDisplay);
    lines.push("WHATSAPP: " + R.phoneDisplay + " (https://wa.me/" + R.whatsapp + ")");
    lines.push("CV DOWNLOAD: " + R.cv);
    lines.push("TOTAL EXPERIENCE: " + duration(total) + " of work across " + R.experience.length + " companies, from " + fmt(R.experience[R.experience.length - 1].start) + " to present (as of " + today + ")");
    lines.push("COUNTRIES WORKED IN: " + R.countries.join(", "));
    lines.push("NATIONALITY: " + R.nationality);
    lines.push("LANGUAGES: " + R.languages.join(", "));
    lines.push("PASSPORT: " + R.passport + " (the passport number is not shared publicly)");
    lines.push("CAREER OBJECTIVE: " + R.objective);
    lines.push("");
    lines.push("WORK EXPERIENCE (most recent first):");
    R.experience.forEach((job, i) => {
      const where = [job.client, job.site, job.location].filter(Boolean).join(", ");
      lines.push((i + 1) + ". " + job.title + " - " + job.company + (where ? " | " + where : "") + " | " + fmt(job.start) + " to " + fmt(job.end) + " (" + duration(months(job.start, job.end)) + ")");
      lines.push("   Summary: " + job.summary);
      lines.push("   " + job.highlightsLabel + ": " + job.highlights.join(" "));
      lines.push("   Responsibilities: " + job.duties.join(" "));
    });
    lines.push("");
    lines.push("KEY PROJECTS:");
    R.projects.forEach(p => lines.push("- " + p.title + " (" + p.where + "): " + p.text));
    lines.push("");
    lines.push("EDUCATION:");
    R.education.forEach(e => lines.push("- " + e.degree + " (" + e.full + "), " + e.institution + ", " + e.board + ", passed " + e.year + (e.score ? ", " + e.score : "")));
    lines.push("");
    lines.push("SOFTWARE: " + R.software.join(", "));
    lines.push("PLANNING & PROJECT CONTROLS: " + R.planning.join("; "));
    lines.push("SITE EXECUTION KNOWLEDGE: " + R.execution.join("; "));
    lines.push("PERSONAL STRENGTHS: " + R.strengths.join("; "));
    lines.push("");
    lines.push("NOT IN THE RÉSUMÉ: salary, notice period, availability date, certifications, references, relocation preferences. Private details (date of birth, passport number, home address, family) are intentionally not shared.");
    return lines.join("\n");
  }

  return { months, fmt, duration, totalMonths, totalYearsLabel, p6Date, parse, nowYM, knowledgeText };
})();
