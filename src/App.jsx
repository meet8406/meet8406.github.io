import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, MotionConfig, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import {
  ArrowDown, ArrowDownRight, ArrowRight, ArrowUpRight, Braces, Check, ChevronRight,
  Code2, Command, Cpu, ExternalLink, Github, Globe2, Layers3, Linkedin, Mail,
  MapPin, Menu, MousePointer2, Radio, Send, Server, Terminal, X,
} from 'lucide-react';
import { capabilities, learning, milestones, profile, projects, technologies } from './data/portfolio.js';

const navItems = [
  ['home', 'Home'], ['systems', 'Systems'], ['work', 'Work'], ['lab', 'Lab'], ['contact', 'Contact'],
];
const stateFor = { home: 'INITIALIZE', systems: 'ENGINEERING', work: 'SYSTEMS', lab: 'RESEARCH', contact: 'CONNECTION' };
const reveal = { hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.2, 0.7, 0.2, 1] } } };

function currentPage() {
  const segment = window.location.pathname.split('/').filter(Boolean)[0] || 'home';
  return navItems.some(([id]) => id === segment) ? segment : 'home';
}

function Cursor() {
  const reduce = useReducedMotion();
  const [point, setPoint] = useState({ x: -80, y: -80 });
  const [engaged, setEngaged] = useState(false);
  useEffect(() => {
    if (reduce || !window.matchMedia('(pointer: fine)').matches) return undefined;
    const move = (event) => setPoint({ x: event.clientX, y: event.clientY });
    const over = (event) => setEngaged(Boolean(event.target.closest('a, button, [data-cursor]')));
    window.addEventListener('pointermove', move);
    document.addEventListener('pointerover', over);
    return () => { window.removeEventListener('pointermove', move); document.removeEventListener('pointerover', over); };
  }, [reduce]);
  if (reduce) return null;
  return <motion.div className={`cursor-dot ${engaged ? 'is-engaged' : ''}`} animate={{ x: point.x, y: point.y, scale: engaged ? 1.45 : 1 }} transition={{ type: 'spring', stiffness: 500, damping: 36 }} aria-hidden="true" />;
}

function SignalField() {
  const field = useRef(null);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce || !window.matchMedia('(pointer: fine)').matches) return undefined;
    let frame = 0;
    const move = (event) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const x = ((event.clientX / window.innerWidth) - 0.5) * 18;
        const y = ((event.clientY / window.innerHeight) - 0.5) * 12;
        field.current?.style.setProperty('--field-drift', `${x.toFixed(1)}px ${y.toFixed(1)}px`);
      });
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => { cancelAnimationFrame(frame); window.removeEventListener('pointermove', move); };
  }, [reduce]);
  return <div className="signal-field" ref={field} aria-hidden="true">
    <svg viewBox="0 0 1440 1000" preserveAspectRatio="xMidYMid slice">
      <g className="signal-map">
        <path className="signal-route route-a" d="M110 714H306l112-112h126l86-86h140l96-96h178l110-110h178" />
        <path className="signal-route route-b" d="M338 0v186l132 132v126l108 108v156l164 164v128" />
        <path className="signal-route route-c" d="M1440 446h-168l-90 90h-142l-86 86H816l-92 92H570" />
        <path className="signal-flow" d="M110 714H306l112-112h126l86-86h140l96-96h178l110-110h178" />
        <circle className="signal-node" cx="306" cy="714" r="4" /><circle className="signal-node" cx="544" cy="602" r="4" />
        <circle className="signal-node node-bright" cx="770" cy="516" r="5" /><circle className="signal-node" cx="948" cy="420" r="4" />
        <circle className="signal-node" cx="338" cy="318" r="4" /><circle className="signal-node" cx="578" cy="552" r="4" />
        <circle className="signal-ring" cx="770" cy="516" r="30" /><circle className="signal-ring ring-wide" cx="770" cy="516" r="48" />
      </g>
    </svg>
    <span className="field-stamp">FIELD 07 <i /> SIGNAL ROUTING</span>
  </div>;
}

function SideNav({ active }) {
  const [open, setOpen] = useState(false);
  return <>
    <header className="mobile-header"><a href="/" className="wordmark">MS<span>↗</span></a><button className="menu-toggle" onClick={() => setOpen(!open)} aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open}>{open ? <X /> : <Menu />}</button></header>
    <aside className={`side-nav ${open ? 'nav-open' : ''}`} aria-label="Main navigation">
      <a href="/" className="wordmark" aria-label="Meet Shah home">MS<span>↗</span></a>
      <div className="nav-label">WORKSPACE</div>
      <nav>{navItems.map(([id, label], index) => <a key={id} href={id === 'home' ? '/' : `/${id}/`} onClick={() => setOpen(false)} className={active === id ? 'nav-active' : ''} aria-current={active === id ? 'page' : undefined}><span className="nav-index">0{index + 1}</span><span>{label}</span><span className="nav-pip" /></a>)}</nav>
      <div className="nav-spacer" />
      <div className="availability"><span className="live-dot" /><span>OPEN TO<br />OPPORTUNITIES</span></div>
      <a className="side-github" href={profile.github} target="_blank" rel="noreferrer"><Github size={15} /> <span>GITHUB</span><ArrowUpRight size={13} /></a>
    </aside>
  </>;
}

function SectionHeading({ index, label, title, note }) {
  return <motion.div className="section-heading" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
    <div className="section-kicker"><span>{index}</span><span className="kicker-line" />{label}</div>
    <div className="heading-row"><h2>{title}</h2>{note && <p>{note}</p>}</div>
  </motion.div>;
}

function SystemCore({ active }) {
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 22, mass: 0.3 });
  const rotate = useTransform(smooth, [0, 1], [0, 250]);
  const scale = useTransform(smooth, [0, 1], [1, 1.11]);
  return <div className="core-dock" aria-label={`System state: ${stateFor[active] || 'SYSTEMS'}`}>
    <div className="core-caption"><span>ACTIVE SYSTEM</span><b>{stateFor[active] || 'SYSTEMS'}</b></div>
    <div className="core-assembly">
      <span className="sr-only">Scroll-responsive developer journey indicator</span>
      <motion.div className="core-orbit orbit-one" style={{ rotate }} />
      <motion.div className="core-orbit orbit-two" style={{ rotate: useTransform(rotate, (value) => -value * 0.72) }} />
      <motion.div className="core-center" style={{ scale }}><span>MS</span></motion.div>
      <span className="core-spark spark-a" /><span className="core-spark spark-b" />
    </div>
    <div className="core-readout"><span>JOURNEY</span><div className="readout-line"><motion.i style={{ scaleX: smooth, transformOrigin: 'left' }} /></div><span>01—06</span></div>
  </div>;
}

function Hero({ ready }) {
  return <section className="hero section-frame" id="home">
    <div className="hero-meta"><span><span className="live-dot" /> SYSTEM ONLINE</span><span>AHMEDABAD, IN <MapPin size={12} /></span><span>23°01' N / 72°34' E</span></div>
    <div className="hero-content">
      <div className="hero-copy">
        <motion.div className="eyebrow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}><span className="eyebrow-mark"><Command size={14} /></span> FULL-STACK SOFTWARE DEVELOPER</motion.div>
        <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.22 }}>Meet Shah<span className="title-period">.</span></motion.h1>
        <motion.p className="hero-statement" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.38, duration: 0.65 }}>Building production systems<br className="desktop-break" /> from <span>API to cloud.</span></motion.p>
        <motion.div className="hero-actions" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.62 }}>
          <a className="button-primary" href="/work/">EXPLORE THE WORK <ArrowDownRight size={16} /></a>
          <a className="button-quiet" href="/contact/">LET'S CONNECT <ArrowRight size={14} /></a>
        </motion.div>
      </div>
      <motion.div className="boot-window" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35, duration: 0.6 }}>
        <div className="window-bar"><div className="window-lights"><i /><i /><i /></div><span><Terminal size={12} /> profile.init</span><span className="window-menu">•••</span></div>
        <div className="boot-content" aria-label="Developer profile initialization"><div className="boot-path">meet@workspace <b>~</b> / profile</div>
          <div className="boot-lines"><p><span className="term-prompt">$</span> boot --profile meet-shah</p><motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.75 }}><Check /> Loading experience <em>.................. done</em></motion.p><motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.92 }}><Check /> Loading production systems <em>....... done</em></motion.p><motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.09 }}><Check /> Connecting cloud layer <em>............ done</em></motion.p><motion.p className="ready-line" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.28 }}><span className="term-prompt">&gt;</span> {ready ? 'PROFILE READY' : 'INITIALIZING PROFILE'} <span className="terminal-caret" /></motion.p></div>
          <div className="boot-footer"><span><i className="live-dot" /> ALL SYSTEMS NOMINAL</span><span>BUILD 2026.10</span></div>
        </div>
      </motion.div>
    </div>
    <div className="hero-bottom"><span>SOFTWARE / SYSTEMS / DEPLOYMENT</span><a href="#about">SCROLL TO EXPLORE <ArrowDown size={14} /></a><span>SCROLL 01 — 06</span></div>
    <div className="hero-cross cross-one" /><div className="hero-cross cross-two" />
  </section>;
}

function ProfileSection() {
  const fields = [['NAME', 'Meet Shah'], ['ROLE', 'Software Developer'], ['FOCUS', 'Full-Stack / AI / Cloud'], ['LOCATION', 'Ahmedabad, India'], ['CURRENT', 'Technman Consulting'], ['EDUCATION', 'BCA Hons · SVGU · 2023—27']];
  return <section className="section-frame content-section profile-section" id="about">
    <SectionHeading index="01" label="IDENTITY" title={<>Engineer at the<br /><span>intersection.</span></>} note="A closer look at the person behind the systems." />
    <div className="profile-layout">
      <div className="profile-panel"><div className="panel-head"><span><Radio size={13} /> SYSTEM PROFILE</span><span>VERIFIED / 01</span></div><div className="profile-fields">{fields.map(([key, value], i) => <motion.div className="profile-field" key={key} initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }} viewport={{ once: true }}><span>{key}</span><b>{value}</b></motion.div>)}</div><div className="profile-panel-bottom"><span>PROFILE.SYS</span><span>● ACTIVE</span></div></div>
      <motion.div className="profile-copy" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}><div className="copy-mark"><Braces size={24} /></div><p className="profile-lead">I build real-world software systems with a focus on <span>backend engineering, APIs, and cloud delivery.</span></p><p>I currently work across frontend, backend, and infrastructure on HRMS and payroll products. From geofenced attendance and background workflows to production deployments, I enjoy taking a system from its first endpoint all the way to the people who depend on it.</p><div className="profile-focus"><span>WHERE I WORK</span><div>{['BACKEND', 'PRODUCT', 'CLOUD'].map((x) => <b key={x}>{x}</b>)}</div></div></motion.div>
    </div>
  </section>;
}

function JourneySection() {
  return <section className="section-frame content-section journey-section" id="experience">
    <SectionHeading index="02" label="ENGINEERING JOURNEY" title={<>From feature work<br /><span>to full systems.</span></>} note="Technman Consulting / Software Developer" />
    <div className="journey-layout"><div className="journey-intro"><span className="date-stamp">DEC 2024 — NOW</span><p>Growing through the details that make production software work: business rules, system boundaries, and dependable delivery.</p><a href="/work/">SEE SYSTEMS BUILT <ArrowRight size={14} /></a></div>
      <div className="timeline">{milestones.map(([date, title, desc], index) => <motion.article className="timeline-entry" key={title} initial={{ opacity: 0, x: 14 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.06, duration: 0.45 }} viewport={{ once: true, amount: 0.35 }}><div className="timeline-node"><span>{String(index + 1).padStart(2, '0')}</span><i /></div><div className="timeline-date">{date}</div><div className="timeline-details"><h3>{title}</h3><p>{desc}</p></div><ArrowUpRight className="timeline-arrow" size={15} /></motion.article>)}</div>
    </div>
  </section>;
}

function Architecture({ project }) {
  return <div className="architecture" aria-label={`${project.name} architecture flow`}><div className="architecture-label"><span>DATA FLOW</span><span>APPLICATION LAYERS / {project.architecture.length}</span></div><div className="architecture-flow">{project.architecture.map((node, index) => <div className="arch-step" key={node}><div className={`arch-node ${index === project.architecture.length - 1 ? 'arch-cloud' : ''}`}><span>{index === 0 ? <Code2 size={15} /> : index === project.architecture.length - 1 ? <Globe2 size={15} /> : index === 2 ? <Layers3 size={15} /> : <Server size={15} />}</span>{node}</div>{index < project.architecture.length - 1 && <div className="arch-connector"><i /></div>}</div>)}</div></div>;
}

function ProjectsSection() {
  const [selected, setSelected] = useState('hrms');
  const project = projects.find((item) => item.key === selected);
  return <section className="section-frame content-section projects-section" id="projects">
    <SectionHeading index="03" label="SELECTED SYSTEMS" title={<>Built for the<br /><span>real world.</span></>} note="Product thinking, working software, and the infrastructure behind it." />
    <div className="project-console"><div className="project-tabs" role="tablist" aria-label="Projects">{projects.map((item) => <button role="tab" id={`tab-${item.key}`} aria-controls={`panel-${item.key}`} aria-selected={selected === item.key} className={selected === item.key ? 'project-tab selected' : 'project-tab'} key={item.key} onClick={() => setSelected(item.key)}><span className="tab-num">{item.id}</span><span>{item.name}</span><ChevronRight size={14} /></button>)}<div className="project-side-note"><Layers3 size={14} /><span>PRODUCT<br />ENVIRONMENT</span></div></div>
      <AnimatePresence mode="wait"><motion.article className="project-detail" role="tabpanel" id={`panel-${project.key}`} aria-labelledby={`tab-${project.key}`} key={project.key} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.24 }}>
        <div className="project-topline"><span>{project.id} / {project.type}</span><span className="project-status"><i className="live-dot" /> BUILT IN PRODUCTION CONTEXT</span></div>
        <div className="project-title-row"><h3>{project.name}</h3><span className="project-index">SYS_{project.id}</span></div>
        <p className="project-summary">{project.summary}</p><Architecture project={project} />
        <div className="project-foot"><div className="project-detail-copy"><span>ENGINEERING SCOPE</span><p>{project.detail}</p></div><div className="project-stack"><span>TOOLCHAIN</span><div>{project.stack.map((tech) => <b key={tech}>{tech}</b>)}</div></div></div>
        <div className="project-bottom"><span>{project.scope}</span><a href={profile.github} target="_blank" rel="noreferrer">EXPLORE ON GITHUB <ArrowUpRight size={14} /></a></div>
      </motion.article></AnimatePresence>
    </div>
    <div className="project-flow-note"><span className="flow-line"><i /></span><p>INTERFACES<span>→</span>APIS<span>→</span>DATA<span>→</span>QUEUES<span>→</span>CLOUD</p><span className="flow-caption">HOW SYSTEMS MOVE</span></div>
  </section>;
}

function StackSection() {
  const [active, setActive] = useState(technologies[3]);
  const groups = [...new Set(technologies.map((tech) => tech.group))];
  return <section className="section-frame content-section stack-section" id="stack">
    <SectionHeading index="04" label="TECHNOLOGY UNIVERSE" title={<>The tools behind<br /><span>the work.</span></>} note="A practical stack, connected by the systems it supports." />
    <div className="stack-layout"><div className="tech-universe" aria-label="Technology categories">{groups.map((group, groupIndex) => <div className="tech-group" key={group}><div className="tech-group-label"><span>{String(groupIndex + 1).padStart(2, '0')}</span>{group}</div><div className="tech-nodes">{technologies.filter((tech) => tech.group === group).map((tech) => <button className={`tech-node ${active.name === tech.name ? 'tech-selected' : ''}`} key={tech.name} onClick={() => setActive(tech)} onMouseEnter={() => setActive(tech)} aria-pressed={active.name === tech.name}><span className="node-dot" />{tech.name}</button>)}</div></div>)}</div>
      <AnimatePresence mode="wait"><motion.aside className="tech-inspector" key={active.name} initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -5 }} transition={{ duration: 0.18 }}><div className="inspector-head"><span><Cpu size={14} /> NODE INSPECTOR</span><span>LIVE</span></div><div className="inspector-orb"><span className="orb-ring ring-a" /><span className="orb-ring ring-b" /><span className="orb-center"><Code2 size={20} /></span></div><span className="inspector-category">{active.group} / COMPONENT</span><h3>{active.name}</h3><p>{active.use}</p><div className="inspector-related"><span>RELATED SYSTEMS</span><b>{active.work}</b></div><div className="inspector-serial">NODE ID <span>0x{active.name.length}A7F</span></div></motion.aside></AnimatePresence>
    </div>
    <div className="stack-footer"><span>12 TECHNOLOGIES</span><span>SELECT A NODE TO INSPECT</span><span>CONNECTED BY PRACTICE <span className="live-dot" /></span></div>
  </section>;
}

function CapabilitiesSection() {
  return <section className="section-frame content-section capabilities-section">
    <SectionHeading index="05" label="WHAT I BUILD" title={<>Engineering in<br /><span>the practical.</span></>} note="Capabilities shaped by shipping and supporting real product work." />
    <div className="capability-grid">{capabilities.map(([number, title, copy], index) => <motion.article className="capability-item" key={number} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.055 }} viewport={{ once: true, amount: 0.25 }}><div className="capability-top"><span>{number}</span><span className="capability-icon">{[<Braces />, <Layers3 />, <Globe2 />, <Radio />, <Cpu />, <Code2 />][index]}</span></div><h3>{title}</h3><p>{copy}</p><div className="capability-rule" /></motion.article>)}</div>
  </section>;
}

function LabSection() {
  const [time, setTime] = useState(new Date());
  useEffect(() => { const timer = setInterval(() => setTime(new Date()), 60000); return () => clearInterval(timer); }, []);
  const timeText = useMemo(() => time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }), [time]);
  return <section className="section-frame content-section lab-section" id="lab">
    <SectionHeading index="06" label="DEVELOPER LAB" title={<>Always in<br /><span>progress.</span></>} note="The practice behind better systems: curiosity, repetition, and steady improvement." />
    <div className="lab-console"><div className="lab-window"><div className="lab-window-bar"><div className="window-lights"><i /><i /><i /></div><span><Terminal size={12} /> meet@lab:~/learning</span><span className="lab-localtime">LOCAL {timeText}</span></div><div className="lab-terminal"><div className="lab-terminal-title">CURRENT PROCESS<span className="terminal-caret" /></div><div className="activity-feed">{['Solving LeetCode', 'Exploring AI / ML', 'Improving backend architecture', 'Building production features', 'Learning new technologies'].map((line, index) => <motion.p key={line} initial={{ opacity: 0, x: -6 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }} viewport={{ once: true }}><span>{String(index + 1).padStart(2, '0')}</span><b>&gt;</b>{line}<em>{index === 0 ? 'IN FOCUS' : index === 1 ? 'EXPLORING' : 'ONGOING'}</em></motion.p>)}</div><div className="lab-cmd"><span>$</span> learn --continuously <span className="terminal-caret" /></div></div><div className="lab-window-foot"><span><i className="live-dot" /> SESSION ACTIVE</span><span>NO SHORTCUTS / JUST REPS</span></div></div>
      <div className="lab-topics"><div className="lab-topics-head"><span>ACTIVE THREADS</span><span>07</span></div><div className="topic-cloud">{learning.map((item, index) => <motion.span key={item} initial={{ opacity: 0, scale: 0.94 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.05 }} viewport={{ once: true }}>{item}<i>{String(index + 1).padStart(2, '0')}</i></motion.span>)}</div><div className="lab-note"><MousePointer2 size={14} /><p>Learning is part of the build loop. Ideas become experiments; experiments become better engineering.</p></div><a href="https://leetcode.com/" target="_blank" rel="noreferrer">FOLLOW THE PRACTICE <ArrowUpRight size={14} /></a></div>
    </div>
  </section>;
}

function CodeSection() {
  return <section className="section-frame content-section code-section" id="code">
    <SectionHeading index="07" label="FROM IDEA TO CODE" title={<>Open by<br /><span>default.</span></>} note="Explore my public work and the tools I reach for." />
    <div className="repo-panel"><div className="repo-sidebar"><div className="repo-brand"><Github size={21} /><span>CODE / SOURCE</span></div><span className="repo-branch"><i /> PUBLIC PROFILE</span><div className="repo-side-links"><span><Braces size={14} /> Repositories</span><span><Layers3 size={14} /> Project systems</span><span><Code2 size={14} /> Technology map</span></div><div className="repo-language"><span>CORE TOOLING</span><p><b>Python</b><b>JavaScript</b><b>React</b><b>Django</b><b>FastAPI</b><b>AWS</b></p></div></div><div className="repo-main"><div className="repo-path"><span>meet8406</span><b>/</b><span>developer-workspace</span><span className="public-pill">PUBLIC</span></div><div className="repo-readme"><div className="readme-bar"><span>README.md</span><span>RAW <ExternalLink size={11} /></span></div><div className="readme-content"><span className="readme-overline">// A WORK IN PROGRESS</span><h3>Building software<br />that <em>works in the world.</em></h3><p>Full-stack development across HR platforms, activity systems, and applied AI. I work across product interfaces, backend logic, and the cloud infrastructure that brings them together.</p><div className="readme-tags">{['REACT', 'DJANGO', 'FASTAPI', 'AWS', 'PYTHON'].map((tag) => <span key={tag}>{tag}</span>)}</div><a href={profile.github} target="_blank" rel="noreferrer">OPEN GITHUB PROFILE <ArrowUpRight size={15} /></a></div></div><div className="repo-bottom"><span><i className="live-dot" /> SOURCE AVAILABLE</span><span>NO FABRICATED METRICS / JUST CODE</span></div></div></div>
  </section>;
}

function ContactSection() {
  const [sent, setSent] = useState(false);
  const submit = (event) => { event.preventDefault(); const form = new FormData(event.currentTarget); const subject = encodeURIComponent(form.get('subject') || 'Hello, Meet'); const body = encodeURIComponent(`Hi Meet,\n\n${form.get('message')}\n\n— ${form.get('name')} (${form.get('email')})`); window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`; setSent(true); };
  return <section className="section-frame content-section contact-section" id="contact">
    <SectionHeading index="08" label="ESTABLISH CONNECTION" title={<>A good system<br /><span>starts somewhere.</span></>} note="Open to opportunities and conversations about the work." />
    <div className="contact-layout"><div className="contact-info"><div className="connection-status"><span><i className="live-dot" /> STATUS: AVAILABLE FOR OPPORTUNITIES</span><Radio size={14} /></div><p>Have a role, a product challenge, or an idea you want to build? Send a signal.</p><div className="contact-links"><a href={`mailto:${profile.email}`}><span><Mail size={15} /> EMAIL</span><b>{profile.email}</b><ArrowUpRight size={14} /></a><a href={profile.linkedin} target="_blank" rel="noreferrer"><span><Linkedin size={15} /> LINKEDIN</span><b>Meet Shah</b><ArrowUpRight size={14} /></a><a href={profile.github} target="_blank" rel="noreferrer"><span><Github size={15} /> GITHUB</span><b>meet8406</b><ArrowUpRight size={14} /></a><a href={`tel:${profile.phone}`}><span><Radio size={15} /> PHONE</span><b>{profile.phone}</b><ArrowUpRight size={14} /></a></div></div>
      <form className="contact-form" onSubmit={submit}><div className="form-title"><span>NEW MESSAGE</span><span><i className="live-dot" /> ENCRYPTION: N/A</span></div><label>Your name<input name="name" type="text" autoComplete="name" placeholder="How should I address you?" required /></label><label>Your email<input name="email" type="email" autoComplete="email" placeholder="you@company.com" required /></label><label>Subject<input name="subject" type="text" placeholder="What are you building?" /></label><label>Message<textarea name="message" rows="3" placeholder="A little context goes a long way..." required /></label><button type="submit" className="button-primary">{sent ? 'OPENING EMAIL CLIENT' : 'SEND MESSAGE'} <Send size={15} /></button><p className="form-hint">YOUR EMAIL APP WILL OPEN WITH THIS MESSAGE.</p></form>
    </div>
    <footer className="site-footer"><a href="/" className="footer-brand">MS<span>↗</span></a><span>DESIGNED & BUILT BY MEET SHAH</span><a href="/">BACK TO HOME <ArrowUpRight size={12} /></a><span>© {new Date().getFullYear()} / AHMEDABAD, IN</span></footer>
  </section>;
}

function HomeOverview() {
  const launchCards = [
    { href: '/systems/', icon: <Layers3 size={17} />, code: '01 / SYSTEMS', title: 'How I engineer', copy: 'The profile, engineering journey, and toolchain behind the work.' },
    { href: '/work/', icon: <Code2 size={17} />, code: '02 / PRODUCTS', title: 'What I have built', copy: 'Explore HR systems, activity tracking, and applied AI projects.' },
    { href: '/lab/', icon: <Cpu size={17} />, code: '03 / PRACTICE', title: 'What I am learning', copy: 'Current experiments in AI / ML, algorithms, and system design.' },
  ];
  return <section className="section-frame content-section home-overview" id="home-overview">
    <SectionHeading index="01" label="WORKSPACE INDEX" title={<>Choose a <span>signal.</span></>} note="A developer workspace organized around the systems, practice, and people behind each build." />
    <div className="home-launch-grid">{launchCards.map((card, index) => <motion.a href={card.href} className="home-launch-card" key={card.code} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08 }} viewport={{ once: true, amount: 0.3 }}><div className="home-launch-top"><span>{card.icon}{card.code}</span><ArrowUpRight size={15} /></div><h3>{card.title}</h3><p>{card.copy}</p><span className="launch-underline" /></motion.a>)}</div>
    <div className="home-work-strip"><div><span>IN PRODUCTION CONTEXT</span><b>People systems / Activity platforms / AI applications</b></div><a href="/work/">OPEN PROJECT INDEX <ArrowRight size={14} /></a></div>
  </section>;
}

function PageIntro({ index, label, title, note }) {
  return <section className="section-frame page-intro"><SectionHeading index={index} label={label} title={title} note={note} /></section>;
}

function SystemsPage() {
  return <><PageIntro index="01" label="SYSTEMS / ENGINEERING PROFILE" title={<>From product logic<br /><span>to production.</span></>} note="The foundations, decisions, and tools I bring to full-stack software." /><ProfileSection /><JourneySection /><StackSection /><CapabilitiesSection /><div className="section-frame route-cta"><span>THE SYSTEMS ARE BUILT FOR REAL WORK.</span><a href="/work/">EXPLORE THE PROJECTS <ArrowUpRight size={14} /></a></div></>;
}

function WorkPage() {
  return <><PageIntro index="02" label="WORK / SELECTED SYSTEMS" title={<>Software with<br /><span>a job to do.</span></>} note="Production platforms and focused applications, explored through their architecture." /><ProjectsSection /><CodeSection /><div className="section-frame route-cta"><span>HAVE A SYSTEM IN MIND?</span><a href="/contact/">START A CONVERSATION <ArrowUpRight size={14} /></a></div></>;
}

function LabPage() {
  return <><PageIntro index="03" label="LAB / ACTIVE PRACTICE" title={<>Keep the loop<br /><span>running.</span></>} note="Learning is part of the engineering process: curiosity, repetition, and experiments." /><LabSection /><section className="section-frame lab-next"><div className="lab-next-copy"><span>FROM STUDY TO SYSTEM</span><h2>Curiosity should<br />ship somewhere.</h2><p>My learning interests stay close to practical software: algorithms, backend architecture, AI workflows, and the systems people use every day.</p></div><div className="lab-next-stack"><span>ACTIVE THREADS</span>{learning.slice(0, 5).map((item, index) => <div key={item}><i>{String(index + 1).padStart(2, '0')}</i><b>{item}</b><ArrowUpRight size={13} /></div>)}</div></section><div className="section-frame route-cta"><span>EXPERIMENTS MEET PRODUCTION.</span><a href="/work/">SEE WHAT I BUILD <ArrowUpRight size={14} /></a></div></>;
}

export default function App() {
  const page = currentPage();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const [ready, setReady] = useState(false);
  useEffect(() => { const timer = window.setTimeout(() => setReady(true), 1450); return () => window.clearTimeout(timer); }, []);
  return <MotionConfig reducedMotion="user"><div className="portfolio-shell"><SignalField /><motion.div className="scroll-progress" style={{ scaleX }} /><Cursor /><SideNav active={page} /><a className="skip-link" href="#main-content">Skip to content</a><main id="main-content"><SystemCore active={page} /><AnimatePresence mode="wait"><motion.div className="route-page" key={page} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.4, ease: [0.2, 0.7, 0.2, 1] }}>{page === 'home' ? <><Hero ready={ready} /><HomeOverview /></> : page === 'systems' ? <SystemsPage /> : page === 'work' ? <WorkPage /> : page === 'lab' ? <LabPage /> : <ContactSection />}</motion.div></AnimatePresence></main><div className="global-coordinate">MS / FULL-STACK ENGINEERING <span>—</span> 2026</div></div></MotionConfig>;
}
