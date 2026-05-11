import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowUpRight,
  Award,
  BookOpen,
  BrainCircuit,
  BriefcaseBusiness,
  Code2,
  Database,
  ExternalLink,
  Gamepad2,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  Rocket,
  ShieldCheck,
  Sparkles,
  Trophy,
  Zap,
} from 'lucide-react';
import './styles.css';

gsap.registerPlugin(ScrollTrigger);

const profile = {
  name: 'Pratyaksha Verma',
  title: 'Software Developer & Instructor',
  location: 'Hyderabad, Telangana',
  email: 'pratyakshaverma2018@gmail.com',
  phone: '8171180311',
  portfolio: 'https://pratyakshaportfolio.netlify.app/',
  github: 'https://github.com/pratyakshacode',
  linkedin: 'https://www.linkedin.com/in/pratyaksha-verma-296729186/',
};

const stats = [
  { label: 'Daily users served', value: '20K+', icon: Trophy },
  { label: 'Students mentored', value: '1000+', icon: GraduationCap },
  { label: 'Leaderboard speedup', value: '18x', icon: Zap },
  { label: 'CGPA', value: '8.97', icon: Award },
];

const quests = [
  {
    level: 'Level 01',
    title: 'Software Developer and Instructor',
    org: 'Being Zero Private Limited',
    period: 'Nov 2023 - Present',
    icon: BriefcaseBusiness,
    xp: 9200,
    missions: [
      'Developed and maintained full-stack MERN applications including Mentorpick, CP Tracker, and Real-Time Leaderboard for 20,000+ daily users.',
      'Built a Reveal.js based presentation system for structured course delivery and stronger classroom engagement.',
      'Reduced global leaderboard generation from 3 minutes to 10 seconds with parallel database queries and caching.',
      'Designed a batch synchronization job to sync users from Mentorpick to CP Tracker for automated cross-platform user management.',
      'Mentored 1000+ students in Data Structures and Algorithms across multiple colleges.',
      'Engineered AWS S3 certificate generation with QR-based verification and built encrypted RBAC in CP Tracker v2 using Redux.',
    ],
  },
];

const projects = [
  {
    name: 'Binary Brains',
    type: 'Education Platform',
    link: 'https://github.com/pratyakshacode/BinaryBrains/',
    score: 96,
    accent: '#7dd3fc',
    stack: ['React', 'Redux Toolkit', 'Node.js', 'Express.js', 'Fastify.js', 'MongoDB', 'Tailwind', 'shadcn/ui'],
    bullets: [
      'Full-stack education platform for structured course delivery and content management.',
      'Google OAuth and JWT access control supporting 1000+ users.',
      'Dual-server Express and Fastify architecture with a round-robin load balancer using http-proxy.',
    ],
  },
  {
    name: 'WowShow',
    type: 'Ticket Booking Application',
    link: 'https://github.com/pratyakshacode/WowShow',
    score: 89,
    accent: '#f59e0b',
    stack: ['Node.js', 'TypeORM', 'MySQL', 'Express.js'],
    bullets: [
      'Transactional seat booking system built for concurrent booking flows.',
      'Used pessimistic locking in TypeORM to prevent double booking under load.',
      'Modeled a reliable backend for high-pressure checkout moments.',
    ],
  },
];

const skills = [
  { group: 'Languages', icon: Code2, items: ['Java', 'JavaScript', 'Python', 'C++'] },
  { group: 'Frontend', icon: Sparkles, items: ['React.js', 'Redux Toolkit', 'Tailwind', 'Bootstrap', 'Mantine UI', 'shadcn/ui'] },
  { group: 'Backend', icon: Rocket, items: ['Node.js', 'Express.js', 'Fastify.js', 'TypeORM'] },
  { group: 'Data', icon: Database, items: ['MongoDB', 'MySQL', 'DBMS', 'Caching'] },
  { group: 'Core CS', icon: BrainCircuit, items: ['DSA', 'OOPs', 'Computer Networks', 'Operating Systems'] },
  { group: 'Systems', icon: ShieldCheck, items: ['AWS S3', 'RBAC', 'JWT', 'Load Balancing'] },
];

const navItems = ['quests', 'projects', 'skills', 'contact'];

function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return progress;
}

function ThreeHero() {
  const mountRef = useRef(null);
  const [mode, setMode] = useState(0);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(46, 1, 0.1, 100);
    camera.position.set(0, 0.45, 6.4);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const coreGeometry = new THREE.IcosahedronGeometry(1.25, 2);
    const coreMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x67e8f9,
      roughness: 0.18,
      metalness: 0.52,
      transmission: 0.28,
      thickness: 0.9,
      emissive: 0x0d5c72,
      emissiveIntensity: 0.42,
      transparent: true,
      opacity: 0.86,
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    group.add(core);

    const wire = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.5, 1),
      new THREE.MeshBasicMaterial({
        color: 0x86efac,
        wireframe: true,
        transparent: true,
        opacity: 0.22,
      }),
    );
    group.add(wire);

    const rings = new THREE.Group();
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0xfbbf24,
      transparent: true,
      opacity: 0.42,
      side: THREE.DoubleSide,
    });
    [1.9, 2.35, 2.8].forEach((radius, index) => {
      const torus = new THREE.Mesh(new THREE.TorusGeometry(radius, 0.012, 12, 160), ringMaterial.clone());
      torus.rotation.x = Math.PI / 2.1;
      torus.rotation.y = index * 0.7;
      torus.material.opacity = 0.32 - index * 0.06;
      rings.add(torus);
    });
    group.add(rings);

    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 160;
    const positions = new Float32Array(particleCount * 3);
    for (let index = 0; index < particleCount; index += 1) {
      const radius = 2.2 + Math.random() * 2.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      positions[index * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[index * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[index * 3 + 2] = radius * Math.cos(phi);
    }
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particles = new THREE.Points(
      particleGeometry,
      new THREE.PointsMaterial({
        color: 0xdbeafe,
        size: 0.025,
        transparent: true,
        opacity: 0.68,
      }),
    );
    group.add(particles);

    const cyanLight = new THREE.PointLight(0x67e8f9, 16, 10);
    cyanLight.position.set(2.6, 2, 3);
    scene.add(cyanLight);
    const amberLight = new THREE.PointLight(0xfbbf24, 10, 9);
    amberLight.position.set(-3, -1.2, 2.5);
    scene.add(amberLight);
    scene.add(new THREE.AmbientLight(0xffffff, 0.8));

    let targetRotationX = 0;
    let targetRotationY = 0;
    let pointerX = 0;
    let pointerY = 0;
    let zoom = 6.4;
    let pulse = 0;
    let isDragging = false;
    let canInteract = window.matchMedia('(pointer: fine) and (min-width: 861px)').matches;
    let lastX = 0;
    let lastY = 0;
    let modeIndex = 0;

    const modeColors = [
      { core: 0x67e8f9, ring: 0xfbbf24, light: 0x67e8f9 },
      { core: 0x86efac, ring: 0x67e8f9, light: 0x86efac },
      { core: 0xfb7185, ring: 0x86efac, light: 0xfb7185 },
    ];

    const applyMode = () => {
      const colors = modeColors[modeIndex % modeColors.length];
      gsap.to(coreMaterial.color, {
        r: ((colors.core >> 16) & 255) / 255,
        g: ((colors.core >> 8) & 255) / 255,
        b: (colors.core & 255) / 255,
        duration: 0.35,
      });
      gsap.to(ringMaterial.color, {
        r: ((colors.ring >> 16) & 255) / 255,
        g: ((colors.ring >> 8) & 255) / 255,
        b: (colors.ring & 255) / 255,
        duration: 0.35,
      });
      cyanLight.color.setHex(colors.light);
    };

    const resize = () => {
      const rect = mount.getBoundingClientRect();
      const width = Math.max(1, rect.width);
      const height = Math.max(1, rect.height);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      canInteract = window.matchMedia('(pointer: fine) and (min-width: 861px)').matches;
    };

    const observer = new ResizeObserver(resize);
    observer.observe(mount);
    resize();

    let frame = 0;
    const handlePointer = (event) => {
      if (!canInteract) return;
      const rect = mount.getBoundingClientRect();
      pointerX = ((event.clientX - rect.left) / rect.width - 0.5) * 0.9;
      pointerY = ((event.clientY - rect.top) / rect.height - 0.5) * 0.9;

      if (isDragging) {
        const dx = event.clientX - lastX;
        const dy = event.clientY - lastY;
        targetRotationY += dx * 0.012;
        targetRotationX += dy * 0.012;
        lastX = event.clientX;
        lastY = event.clientY;
      }
    };
    const handlePointerDown = (event) => {
      if (!canInteract) return;
      isDragging = true;
      lastX = event.clientX;
      lastY = event.clientY;
      mount.setPointerCapture?.(event.pointerId);
      mount.classList.add('is-dragging');
    };
    const handlePointerUp = (event) => {
      if (!canInteract) return;
      isDragging = false;
      mount.releasePointerCapture?.(event.pointerId);
      mount.classList.remove('is-dragging');
    };
    const handleClick = () => {
      if (!canInteract) return;
      pulse = 1;
      modeIndex += 1;
      setMode(modeIndex % modeColors.length);
      applyMode();
      gsap.fromTo(
        rings.scale,
        { x: 0.86, y: 0.86, z: 0.86 },
        { x: 1.08, y: 1.08, z: 1.08, duration: 0.42, yoyo: true, repeat: 1, ease: 'power2.out' },
      );
    };
    const handleWheel = (event) => {
      if (!canInteract) return;
      event.preventDefault();
      zoom = THREE.MathUtils.clamp(zoom + event.deltaY * 0.002, 5.5, 7.4);
    };
    mount.addEventListener('pointermove', handlePointer);
    mount.addEventListener('pointerdown', handlePointerDown);
    mount.addEventListener('pointerup', handlePointerUp);
    mount.addEventListener('pointercancel', handlePointerUp);
    mount.addEventListener('click', handleClick);
    mount.addEventListener('wheel', handleWheel, { passive: false });

    const animate = () => {
      frame = requestAnimationFrame(animate);
      const time = performance.now() * 0.001;
      targetRotationY += 0.004;
      pulse *= 0.92;
      camera.position.z += (zoom - camera.position.z) * 0.06;
      group.rotation.y += (targetRotationY + pointerX * 0.28 - group.rotation.y) * 0.045;
      group.rotation.x += (targetRotationX + pointerY * 0.24 - group.rotation.x) * 0.045;
      group.rotation.z += (pointerX * 0.18 - group.rotation.z) * 0.025;
      core.rotation.x = time * 0.38;
      core.rotation.y = time * 0.54;
      wire.rotation.y = -time * 0.32;
      rings.rotation.z = time * 0.18;
      particles.rotation.y = -time * 0.045;
      core.scale.setScalar(1 + Math.sin(time * 1.7) * 0.035 + pulse * 0.18);
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frame);
      mount.removeEventListener('pointermove', handlePointer);
      mount.removeEventListener('pointerdown', handlePointerDown);
      mount.removeEventListener('pointerup', handlePointerUp);
      mount.removeEventListener('pointercancel', handlePointerUp);
      mount.removeEventListener('click', handleClick);
      mount.removeEventListener('wheel', handleWheel);
      observer.disconnect();
      mount.removeChild(renderer.domElement);
      renderer.dispose();
      coreGeometry.dispose();
      coreMaterial.dispose();
      particleGeometry.dispose();
      rings.children.forEach((ring) => {
        ring.geometry.dispose();
        ring.material.dispose();
      });
      wire.geometry.dispose();
      wire.material.dispose();
      particles.material.dispose();
    };
  }, []);

  return (
    <div className="three-stage-wrap">
      <div className="three-stage" ref={mountRef} aria-label="Interactive 3D developer core" />
      <div className="globe-controls" aria-hidden="true">
        <span>{['system map', 'mentor mode', 'secure build'][mode]}</span>
        <small>drag · click · zoom</small>
      </div>
    </div>
  );
}

function App() {
  const rootRef = useRef(null);
  const [activeSkill, setActiveSkill] = useState(1);
  const progress = useScrollProgress();
  const unlocked = useMemo(() => Math.min(100, Math.round(progress * 100)), [progress]);
  const selectedSkill = skills[activeSkill];
  const SelectedSkillIcon = selectedSkill.icon;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-copy > *', {
        y: 34,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power3.out',
      });

      gsap.to('.orbit-ring', {
        rotate: 360,
        duration: 42,
        repeat: -1,
        ease: 'none',
      });

      gsap.to('.skill-orbit', {
        rotate: 360,
        duration: 58,
        repeat: -1,
        ease: 'none',
      });

      gsap.utils.toArray('[data-reveal]').forEach((el) => {
        gsap.from(el, {
          y: 46,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 82%',
          },
        });
      });

      gsap.utils.toArray('[data-parallax]').forEach((el) => {
        const depth = Number(el.dataset.parallax || 40);
        gsap.to(el, {
          y: depth,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      });

      gsap.utils.toArray('.quest-card').forEach((card) => {
        gsap.fromTo(
          card.querySelector('.xp-fill'),
          { scaleX: 0 },
          {
            scaleX: 1,
            transformOrigin: 'left center',
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: { trigger: card, start: 'top 74%' },
          },
        );
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={rootRef}>
      <div className="noise" />
      <div className="hud">
        <a className="brand" href="#top" aria-label="Back to top">
          <Gamepad2 size={18} />
          <span>PV</span>
        </a>
        <nav aria-label="Primary navigation">
          {navItems.map((item) => (
            <a key={item} href={`#${item}`}>
              {item}
            </a>
          ))}
        </nav>
        <div className="progress-pill" aria-label={`${unlocked}% portfolio explored`}>
          <span>{unlocked}%</span>
          <div>
            <i style={{ width: `${unlocked}%` }} />
          </div>
        </div>
      </div>

      <section id="top" className="hero">
        <div className="mesh mesh-b" data-parallax="55" />
        <div className="hero-copy">
          <p className="eyebrow">Interactive developer questline</p>
          <h1>{profile.name}</h1>
          <p className="hero-lede">
            I build full-stack products, learning platforms, real-time dashboards, and systems that stay fast when the user count gets serious.
          </p>
          <div className="hero-actions">
            <a className="primary-btn" href="#quests">
              <Sparkles size={18} />
              Start quest
            </a>
            <a className="ghost-btn" href={profile.github} target="_blank" rel="noreferrer">
              <ExternalLink size={18} />
              GitHub
            </a>
          </div>
        </div>

        <div className="avatar-console holo-console" data-parallax="38" aria-label="3D profile console">
          <ThreeHero />
          <div className="holo-readout glass">
            <span className="rank">S-Rank Builder</span>
            <strong>{profile.title}</strong>
            <p>MERN systems, DSA mentoring, RBAC, AWS certificates, caching, and high-concurrency backend flows.</p>
            <div className="mini-map">
              <MapPin size={16} />
              {profile.location}
            </div>
          </div>
        </div>
      </section>

      <section className="stats-band" aria-label="Key metrics">
        {stats.map(({ label, value, icon: Icon }) => (
          <article className="stat-card glass" key={label} data-reveal>
            <Icon size={22} />
            <strong>{value}</strong>
            <span>{label}</span>
          </article>
        ))}
      </section>

      <section id="quests" className="section-shell">
        <div className="section-heading" data-reveal>
          <p className="eyebrow">Campaign progress</p>
          <h2>Experience Quests</h2>
        </div>
        {quests.map((quest) => {
          const Icon = quest.icon;

          return (
            <article className="quest-card glass" key={quest.title} data-reveal>
              <div className="quest-meta">
                <div className="quest-icon">
                  <Icon size={26} />
                </div>
                <div>
                  <span>{quest.level}</span>
                  <h3>{quest.title}</h3>
                  <p>{quest.org} · {quest.period}</p>
                </div>
                <strong>{quest.xp.toLocaleString()} XP</strong>
              </div>
              <div className="xp-track"><i className="xp-fill" /></div>
              <div className="mission-grid">
                {quest.missions.map((mission, index) => (
                  <div className="mission" key={mission}>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <p>{mission}</p>
                  </div>
                ))}
              </div>
            </article>
          );
        })}
      </section>

      <section id="projects" className="section-shell projects-shell">
        <div className="section-heading" data-reveal>
          <p className="eyebrow">Boss fights shipped</p>
          <h2>Playable Projects</h2>
        </div>
        <div className="project-grid">
          {projects.map((project) => (
            <article className="project-card glass" key={project.name} style={{ '--accent': project.accent }} data-reveal>
              <div className="project-score">
                <span>{project.score}</span>
                <small>impact</small>
              </div>
              <div>
                <p className="project-type">{project.type}</p>
                <h3>{project.name}</h3>
              </div>
              <ul>
                {project.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
              </ul>
              <div className="stack">
                {project.stack.map((item) => <span key={item}>{item}</span>)}
              </div>
              <a className="project-link" href={project.link} target="_blank" rel="noreferrer">
                View repository <ArrowUpRight size={18} />
              </a>
            </article>
          ))}
        </div>
      </section>

      <section id="skills" className="section-shell">
        <div className="section-heading" data-reveal>
          <p className="eyebrow">Inventory</p>
          <h2>Skill Loadout</h2>
        </div>
        <div className="skill-constellation" data-reveal>
          <div className="skill-orbit-wrap" aria-label="Skill constellation selector">
            <div className="skill-orbit" />
            <div className="skill-core">
              <SelectedSkillIcon size={38} />
              <strong>{selectedSkill.group}</strong>
              <span>{selectedSkill.items.length} tools</span>
            </div>
            {skills.map(({ group, icon: Icon }, index) => {
              const angle = (index / skills.length) * Math.PI * 2 - Math.PI / 2;
              const radius = 43;
              const x = 50 + Math.cos(angle) * radius;
              const y = 50 + Math.sin(angle) * radius;

              return (
                <button
                  className={`skill-node ${index === activeSkill ? 'is-active' : ''}`}
                  key={group}
                  style={{ left: `${x}%`, top: `${y}%` }}
                  onClick={() => setActiveSkill(index)}
                  onMouseEnter={() => setActiveSkill(index)}
                  type="button"
                  aria-pressed={index === activeSkill}
                >
                  <Icon size={22} />
                  <span>{group}</span>
                </button>
              );
            })}
          </div>
          <div className="skill-terminal glass">
            <p className="eyebrow">Selected Module</p>
            <h3>{selectedSkill.group}</h3>
            <div className="skill-ribbon">
              {selectedSkill.items.map((item, index) => (
                <span key={item} style={{ '--delay': `${index * 70}ms` }}>{item}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="education section-shell">
        <article className="education-panel glass" data-reveal>
          <BookOpen size={30} />
          <div>
            <p className="eyebrow">Training ground</p>
            <h2>Noida Institute of Engineering and Technology</h2>
            <p>B.Tech, Computer Science and Engineering · Aug 2021 - June 2024</p>
          </div>
          <strong>8.97 CGPA</strong>
        </article>
      </section>

      <section id="contact" className="contact section-shell">
        <div className="contact-panel glass" data-reveal>
          <p className="eyebrow">Final portal</p>
          <h2>Let’s build something users actually want to keep using.</h2>
          <div className="contact-grid">
            <a href={`mailto:${profile.email}`}><Mail size={18} /> {profile.email}</a>
            <a href={`tel:${profile.phone}`}><Phone size={18} /> {profile.phone}</a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer"><ExternalLink size={18} /> LinkedIn</a>
            <a href={profile.github} target="_blank" rel="noreferrer"><Code2 size={18} /> GitHub</a>
          </div>
        </div>
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
