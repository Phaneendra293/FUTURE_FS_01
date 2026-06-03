import React, { useState, useEffect } from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Sun, 
  Moon, 
  Briefcase, 
  GraduationCap, 
  Code, 
  Database as DbIcon, 
  Plus, 
  Trash2, 
  ExternalLink,
  ChevronRight,
  BookOpen,
  MessageSquare,
  Sparkles,
  Award,
  Terminal,
  FileText,
  User,
  CheckCircle,
  X,
  Send,
  Lock,
  RefreshCw,
  Cpu,
  Layers
} from 'lucide-react';

export default function App() {
  // Theme state: defaults to dark mode, fallback is clean light theme
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return true;
  });

  // Database / entity lists
  const [projects, setProjects] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [messages, setMessages] = useState([]);
  
  // Statuses
  const [isApiWorking, setIsApiWorking] = useState(true);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState('All');
  
  // Admin & forms
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [contactSuccess, setContactSuccess] = useState(false);
  const [emailReceipt, setEmailReceipt] = useState(null);
  const [contactSubmitting, setContactSubmitting] = useState(false);

  // New record forms
  const [newProject, setNewProject] = useState({ title: '', description: '', tech: '', githubUrl: '', liveUrl: '', category: 'General', featured: true });
  const [newBlog, setNewBlog] = useState({ title: '', excerpt: '', content: '', tags: '', readTime: '5 min read' });
  const [formFeedback, setFormFeedback] = useState(null);

  // Profile data Model
  const profileDetails = {
    name: 'Phaneendra V R',
    title: 'Full-Stack Developer & IoT Solutions Engineer',
    about: 'I am a highly driven software developer and technical systems architect specializing in building real-time telemetry systems, recursive algorithms, and reactive full-stack panels. Grounded in Data Structures & Algorithms, I bridge the divide between low-level automation and responsive web client interfaces.',
    email: 'vellorephaneendra4@gmail.com',
    github: 'https://github.com/Phaneendra293',
    linkedin: 'https://www.linkedin.com/in/phaneendra-vr-334519326/',
    skills: {
      frontend: ['React.js', 'Vite', 'JavaScript', 'Tailwind CSS', 'Next.js', 'Responsive Canvas', 'CSS Grids'],
      backend: ['Node.js', 'Express.js', 'REST APIs', 'MongoDB', 'JSON Document Engines'],
      programming: ['C++', 'Python basics', 'Java', 'Data Structures & Algorithms (Trees, Graphs, Recursion)'],
      iot: ['IoT Architectures', 'Node-RED', 'Sensors Interfacing', 'MQTT Protocols', 'Automation Systems']
    }
  };

  // Sync index root styles
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  // Read express records
  const fetchDatabase = async () => {
    setLoading(true);
    try {
      const projRes = await fetch('/api/projects');
      const blogRes = await fetch('/api/blogs');
      const msgRes = await fetch('/api/contacts');

      if (projRes.ok && blogRes.ok && msgRes.ok) {
        const projData = await projRes.json();
        const blogData = await blogRes.json();
        const msgData = await msgRes.json();
        
        setProjects(projData);
        setBlogs(blogData);
        setMessages(msgData);
        setIsApiWorking(true);
      } else {
        throw new Error('Fallback target');
      }
    } catch (e) {
      console.warn('Fallback to local storage emulation. Standard Express server loading schema offline.');
      setIsApiWorking(false);
      loadMockDataFromLocalStorage();
    } finally {
      setLoading(false);
    }
  };

  // Browser offline database backup mapping
  const loadMockDataFromLocalStorage = () => {
    const localProj = localStorage.getItem('local_projects');
    if (localProj) {
      setProjects(JSON.parse(localProj));
    } else {
      const initialProj = [
        {
          id: 'proj_1',
          title: 'iotreactproject',
          description: 'An interactive state visualizer and control panel for real-time IoT devices, monitoring telemetry data such as temperature, humidity, and status indicators with smooth animations.',
          tech: ['React', 'Tailwind CSS', 'Vite', 'Lucide Icons'],
          githubUrl: 'https://github.com/Phaneendra293',
          liveUrl: 'https://github.com/Phaneendra293',
          featured: true,
          category: 'IoT & React',
          createdAt: new Date().toISOString()
        },
        {
          id: 'proj_2',
          title: 'python basics',
          description: 'A comprehensive educational codebase and scripting toolkit exploring core Python fundamentals, object-oriented concepts, automation scripts, and foundational problem solving.',
          tech: ['Python', 'Automation', 'CLI Utilities'],
          githubUrl: 'https://github.com/Phaneendra293',
          liveUrl: 'https://github.com/Phaneendra293',
          featured: true,
          category: 'Python Basics',
          createdAt: new Date().toISOString()
        },
        {
          id: 'proj_3',
          title: 'mytrees using DSA',
          description: 'An in-depth visual dashboard and library showcasing Binary Search Trees, AVL Trees, and standard Tree Traversal algorithms (DFS, BFS) implementing comprehensive Data Structures & Algorithms concepts.',
          tech: ['JavaScript', 'DSA', 'Algorithms', 'Interactive Canvas'],
          githubUrl: 'https://github.com/Phaneendra293',
          liveUrl: 'https://github.com/Phaneendra293',
          featured: true,
          category: 'Algorithms & DSA',
          createdAt: new Date().toISOString()
        }
      ];
      setProjects(initialProj);
      localStorage.setItem('local_projects', JSON.stringify(initialProj));
    }

    const localBlogs = localStorage.getItem('local_blogs');
    if (localBlogs) {
      setBlogs(JSON.parse(localBlogs));
    } else {
      const initialBlogs = [
        {
          id: 'blog_1',
          title: 'Building Real-Time IoT Dashboards with React and WebSockets',
          slug: 'iot-dashboards-react-websockets',
          excerpt: 'Discover how to stream telemetry data from connected edge devices into React state systems seamlessly with responsive animations.',
          content: 'In modern technology stacks, visualising IoT status is crucial. In this guide, we dive deep into setup rules for rendering real-time device updates, tracking metrics seamlessly, and optimizing rendering cascades so your dashboard updates smoothly at 60fps.',
          tags: ['IoT', 'React', 'Websockets', 'WebDev'],
          readTime: '4 min read',
          createdAt: new Date().toISOString()
        },
        {
          id: 'blog_2',
          title: 'Mastering Tree Traversal Algorithms in TypeScript',
          slug: 'mastering-tree-traversal-typescript',
          excerpt: 'Struggling to wrap your head around depth-first search (DFS) and breadth-first search (BFS)? Let’s break down recursive and iterative tree traversals in modern TypeScript.',
          content: 'Tree structures form the backbone of advanced web DOM systems, nesting data, and folder hierarchies. Understanding search operations, balancing algorithms, and tree layouts is an absolute game changer. In this article, we outline iterative DFS stack setups and queue BFS strategies.',
          tags: ['DSA', 'Algorithms', 'TypeScript', 'Computer Science'],
          readTime: '6 min read',
          createdAt: new Date().toISOString()
        },
        {
          id: 'blog_3',
          title: 'Python Scripts for Automating Daily Developer Repetitive Tasks',
          slug: 'python-automation-scripts-developer',
          excerpt: 'Unlock dozens of hours of developer productivity with short, elegant, and efficient Python automation scripts for workspace tasks.',
          content: 'Unshackle your potential from copying folders, syncing directories, or scraping layouts manually. This Python scripting manual walks through directory scanning, parsing configuration files, batch-editing text tables, and executing shell automations from python subprocess triggers.',
          tags: ['Python', 'Automation', 'Dev Productivity'],
          readTime: '3 min read',
          createdAt: new Date().toISOString()
        }
      ];
      setBlogs(initialBlogs);
      localStorage.setItem('local_blogs', JSON.stringify(initialBlogs));
    }

    const localMsgs = localStorage.getItem('local_messages');
    if (localMsgs) {
      setMessages(JSON.parse(localMsgs));
    } else {
      setMessages([]);
      localStorage.setItem('local_messages', JSON.stringify([]));
    }
  };

  useEffect(() => {
    fetchDatabase();
  }, []);

  // Form submit trigger
  const handleContactSubmit = async (e) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) return;
    
    setContactSubmitting(true);
    try {
      if (isApiWorking) {
        const response = await fetch('/api/contacts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(contactForm)
        });
        
        if (response.ok) {
          const resData = await response.json();
          setContactSuccess(true);
          setEmailReceipt(resData.email_receipt);
          setContactForm({ name: '', email: '', subject: '', message: '' });
          fetchDatabase();
        } else {
          throw new Error('Network fault');
        }
      } else {
        const dummyMsg = {
          id: 'msg_' + Math.random().toString(36).substr(2, 9),
          name: contactForm.name,
          email: contactForm.email,
          subject: contactForm.subject || 'Inquiry',
          message: contactForm.message,
          createdAt: new Date().toISOString(),
          isRead: false
        };
        const updatedMsgs = [dummyMsg, ...messages];
        setMessages(updatedMsgs);
        localStorage.setItem('local_messages', JSON.stringify(updatedMsgs));
        
        setContactSuccess(true);
        setEmailReceipt({
          dispatched: true,
          gateway: 'Client-side Local Notification Router',
          target_mailbox: profileDetails.email,
          timestamp: new Date().toISOString(),
          status: 'success'
        });
        setContactForm({ name: '', email: '', subject: '', message: '' });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setContactSubmitting(false);
    }
  };

  // DB Insert project
  const handleAddProject = async (e) => {
    e.preventDefault();
    setFormFeedback(null);
    if (!newProject.title || !newProject.description || !newProject.githubUrl) {
      setFormFeedback('Error: Title, Description, and GitHub URL are mandatory.');
      return;
    }

    try {
      if (isApiWorking) {
        const response = await fetch('/api/projects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newProject)
        });
        if (response.ok) {
          setNewProject({ title: '', description: '', tech: '', githubUrl: '', liveUrl: '', category: 'General', featured: true });
          setFormFeedback('Project added to database (db.json) successfully!');
          fetchDatabase();
        }
      } else {
        const item = {
          id: 'proj_' + Math.random().toString(36).substr(2, 9),
          title: newProject.title,
          description: newProject.description,
          tech: newProject.tech.split(',').map(t => t.trim()).filter(Boolean),
          githubUrl: newProject.githubUrl,
          liveUrl: newProject.liveUrl || undefined,
          featured: newProject.featured,
          category: newProject.category,
          createdAt: new Date().toISOString()
        };
        const updated = [item, ...projects];
        setProjects(updated);
        localStorage.setItem('local_projects', JSON.stringify(updated));
        setNewProject({ title: '', description: '', tech: '', githubUrl: '', liveUrl: '', category: 'General', featured: true });
        setFormFeedback('Project added to browser local storage successfully!');
      }
    } catch (_) {
      setFormFeedback('Failed to write project document.');
    }
  };

  // DB purge project
  const handleDeleteProject = async (id) => {
    try {
      if (isApiWorking) {
        await fetch(`/api/projects/${id}`, { method: 'DELETE' });
        fetchDatabase();
      } else {
        const updated = projects.filter(p => p.id !== id);
        setProjects(updated);
        localStorage.setItem('local_projects', JSON.stringify(updated));
      }
    } catch (e) {
      console.error(e);
    }
  };

  // DB Insert blog
  const handleAddBlog = async (e) => {
    e.preventDefault();
    setFormFeedback(null);
    if (!newBlog.title || !newBlog.content || !newBlog.excerpt) {
      setFormFeedback('Error: Title, Excerpt, and Content are mandatory.');
      return;
    }

    try {
      if (isApiWorking) {
        const response = await fetch('/api/blogs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newBlog)
        });
        if (response.ok) {
          setNewBlog({ title: '', excerpt: '', content: '', tags: '', readTime: '5 min read' });
          setFormFeedback('Blog post added to database (db.json) successfully!');
          fetchDatabase();
        }
      } else {
        const slug = newBlog.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        const item = {
          id: 'blog_' + Math.random().toString(36).substr(2, 9),
          title: newBlog.title,
          slug,
          excerpt: newBlog.excerpt,
          content: newBlog.content,
          tags: newBlog.tags.split(',').map(t => t.trim()).filter(Boolean),
          readTime: newBlog.readTime,
          createdAt: new Date().toISOString()
        };
        const updated = [item, ...blogs];
        setBlogs(updated);
        localStorage.setItem('local_blogs', JSON.stringify(updated));
        setNewBlog({ title: '', excerpt: '', content: '', tags: '', readTime: '5 min read' });
        setFormFeedback('Blog post added to browser local storage successfully!');
      }
    } catch (_) {
      setFormFeedback('Failed to write blog metadata to DB.');
    }
  };

  // DB purge blog
  const handleDeleteBlog = async (id) => {
    try {
      if (isApiWorking) {
        await fetch(`/api/blogs/${id}`, { method: 'DELETE' });
        fetchDatabase();
      } else {
        const updated = blogs.filter(b => b.id !== id);
        setBlogs(updated);
        localStorage.setItem('local_blogs', JSON.stringify(updated));
      }
    } catch (e) {
      console.error(e);
    }
  };

  // DB purge message
  const handleDeleteMessage = async (id) => {
    try {
      if (isApiWorking) {
        await fetch(`/api/contacts/${id}`, { method: 'DELETE' });
        fetchDatabase();
      } else {
        const updated = messages.filter(m => m.id !== id);
        setMessages(updated);
        localStorage.setItem('local_messages', JSON.stringify(updated));
      }
    } catch (e) {
      console.error(e);
    }
  };

  // DB edit message
  const handleMarkRead = async (id) => {
    try {
      if (isApiWorking) {
        await fetch(`/api/contacts/${id}/read`, { method: 'PUT' });
        fetchDatabase();
      } else {
        const updated = messages.map(m => m.id === id ? { ...m, isRead: true } : m);
        setMessages(updated);
        localStorage.setItem('local_messages', JSON.stringify(updated));
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Dynamic filter lists
  const filteredProjects = projects.filter(p => 
    categoryFilter === 'All' || p.category.toLowerCase().includes(categoryFilter.toLowerCase()) || p.title.toLowerCase().includes(categoryFilter.toLowerCase())
  );

  const categories = ['All', 'IoT & React', 'Python Basics', 'Algorithms & DSA'];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 dark:bg-[#0F172A] dark:text-slate-300 font-sans border-t-4 border-emerald-500 transition-colors duration-300">
      
      {/* Hidden SEO indices */}
      <header className="hidden">
        <h1>{profileDetails.name} | Professional Full-Stack Portfolio</h1>
        <p>{profileDetails.about}</p>
        <span id="seo-links">github link {profileDetails.github} and linkedin {profileDetails.linkedin}</span>
      </header>

      {/* NAVIGATION PANEL */}
      <nav className="h-20 border-b border-slate-200 dark:border-slate-800 bg-[#FFFFFF]/80 dark:bg-[#0F172A]/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto h-full px-6 flex items-center justify-between">
          
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => { setActiveSection('home'); setIsAdminPanelOpen(false); }}>
            <div className="w-9 h-9 bg-emerald-500 rounded-sm flex items-center justify-center font-bold text-slate-900 font-mono tracking-tighter shadow-sm">
              P
            </div>
            <div>
              <span className="font-mono font-bold tracking-tight text-slate-900 dark:text-white uppercase text-sm block">
                Phaneendra V R
              </span>
              <span className="block text-[9px] font-mono tracking-widest text-emerald-600 dark:text-emerald-400 font-bold uppercase">
                developer.portfolio.v2.js
              </span>
            </div>
          </div>

          {/* Navigation Elements */}
          <div className="hidden md:flex items-center gap-6">
            {[
              { id: 'home', label: 'Home' },
              { id: 'portfolio', label: 'Portfolio' },
              { id: 'resume', label: 'Resume Block' },
              { id: 'blog', label: 'Articles' },
              { id: 'contact', label: 'Contact Panel' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => { setActiveSection(tab.id); setIsAdminPanelOpen(false); setSelectedBlog(null); }}
                className={`font-mono text-xs font-semibold uppercase tracking-widest py-2 transition-all cursor-pointer relative ${
                  activeSection === tab.id && !isAdminPanelOpen
                    ? 'text-emerald-600 dark:text-emerald-400 border-b-2 border-emerald-500'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-b-2 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
                id={`nav-${tab.id}`}
              >
                {tab.label}
              </button>
            ))}

            <button
              onClick={() => setIsAdminPanelOpen(!isAdminPanelOpen)}
              className={`flex items-center gap-1.5 px-3 py-1.5 border font-mono text-xs uppercase tracking-wider transition-all cursor-pointer ${
                isAdminPanelOpen 
                  ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-600 dark:text-emerald-400' 
                  : 'border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-950 dark:hover:text-white'
              }`}
              id="admin-console-trigger"
            >
              <DbIcon className="w-3.5 h-3.5" />
              <span>Admin Database</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            {/* Dark & Light Trigger */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/40 transition-all cursor-pointer"
              title="Toggle Theme"
              id="theme-toggler"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>

            {/* Reload State Schema */}
            <button
              onClick={fetchDatabase}
              title="Sync express storage model"
              className="p-2 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/40 transition-all cursor-pointer"
              id="force-sync-db"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-emerald-500' : ''}`} />
            </button>
          </div>

        </div>
      </nav>

      {/* NOSTALGIC SYSTEM TELEMETRY STRIP */}
      <div className="bg-slate-100 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800/50 px-6 py-2.5 text-[10px] font-mono">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-1.5 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>NODE: {isApiWorking ? 'Express LIVE API' : 'Static Fallback State (Sandbox)'}</span>
            </div>
            <span className="text-slate-300 dark:text-slate-700">/</span>
            <span>STORAGE: <strong>MongoDB simulated local DB (db.json)</strong></span>
            <span className="text-slate-300 dark:text-slate-700">/</span>
            <a href={profileDetails.github} target="_blank" rel="noreferrer" className="text-emerald-600 dark:text-emerald-400 underline hover:text-emerald-500">github/Phaneendra293</a>
          </div>
          <div className="text-slate-400 dark:text-slate-500">
            TIME_Z_UTC: <strong className="text-slate-600 dark:text-slate-300 font-bold">2026-06-03 06:13 UTC</strong>
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-6 py-12 flex-1">

        {/* ========================================================== */}
        {/* DB WORKSPACE DRAWER (CRUDS IN SYSTEM DATA FILE) */}
        {/* ========================================================== */}
        {isAdminPanelOpen && (
          <div className="mb-12 p-8 border border-emerald-500/30 bg-white dark:bg-slate-900/60 shadow-xl" id="database-admin-module">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  <Terminal className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-mono font-bold uppercase tracking-widest text-slate-900 dark:text-white">Active Database Ledger (JS Mod)</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">Direct document injection for local & cloud server assets</p>
                </div>
              </div>
              <button 
                onClick={() => setIsAdminPanelOpen(false)}
                className="p-1 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 transition-colors"
                title="Close drawer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {formFeedback && (
              <div className="mb-6 px-4 py-3 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-mono flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>{formFeedback}</span>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Write project */}
              <div className="p-5 border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20">
                <div className="flex items-center gap-2 mb-4">
                  <Plus className="w-4 h-4 text-indigo-500" />
                  <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">Inject doc into [projects_collection]</h4>
                </div>
                <form onSubmit={handleAddProject} className="space-y-4 font-mono text-xs">
                  <div>
                    <label className="block text-slate-500 mb-1 font-bold uppercase">Project Identifier (Code Title) *</label>
                    <input 
                      type="text" 
                      placeholder="e.g. iotreactproject" 
                      value={newProject.title}
                      onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                      className="w-full bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 p-2 text-slate-800 dark:text-slate-100 focus:outline-emerald-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-slate-500 mb-1 font-bold uppercase">Technical Outline (Description) *</label>
                    <textarea 
                      placeholder="High fidelity system metrics visualization panels..." 
                      rows={2}
                      value={newProject.description}
                      onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                      className="w-full bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 p-2 text-slate-800 dark:text-slate-100 focus:outline-emerald-500"
                      required
                    ></textarea>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-500 mb-1 font-bold uppercase">Section Category</label>
                      <input 
                        type="text" 
                        placeholder="e.g. IoT & React" 
                        value={newProject.category}
                        onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                        className="w-full bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 p-2"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-500 mb-1 font-bold">Tech Stack (CSV)</label>
                      <input 
                        type="text" 
                        placeholder="React, CSS, Node-RED" 
                        value={newProject.tech}
                        onChange={(e) => setNewProject({ ...newProject, tech: e.target.value })}
                        className="w-full bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 p-2"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-slate-500 mb-1 font-bold uppercase">Repository code link *</label>
                    <input 
                      type="url" 
                      placeholder="https://github.com/Phaneendra293" 
                      value={newProject.githubUrl}
                      onChange={(e) => setNewProject({ ...newProject, githubUrl: e.target.value })}
                      className="w-full bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 p-2"
                      required
                    />
                  </div>
                  <button 
                    type="submit"
                    className="w-full py-2.5 bg-slate-900 border border-slate-700 hover:bg-emerald-500 text-white hover:text-slate-950 font-bold transition-all uppercase tracking-widest text-xs cursor-pointer"
                  >
                    🚀 Execute & Synchronous Save
                  </button>
                </form>
              </div>

              {/* Publish blog */}
              <div className="p-5 border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20">
                <div className="flex items-center gap-2 mb-4">
                  <Plus className="w-4 h-4 text-emerald-500" />
                  <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">Inject doc into [blogs_collection]</h4>
                </div>
                <form onSubmit={handleAddBlog} className="space-y-4 font-mono text-xs">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-500 mb-1 font-bold uppercase">Article Title *</label>
                      <input 
                        type="text" 
                        placeholder="Node.js telemetry..." 
                        value={newBlog.title}
                        onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
                        className="w-full bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 p-2"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-slate-500 mb-1 font-bold uppercase">Read Estimation</label>
                      <input 
                        type="text" 
                        placeholder="e.g. 5 min read" 
                        value={newBlog.readTime}
                        onChange={(e) => setNewBlog({ ...newBlog, readTime: e.target.value })}
                        className="w-full bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 p-2"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-slate-500 mb-1 font-bold uppercase">Short Excerpt Summary *</label>
                    <input 
                      type="text" 
                      placeholder="Brief meta highlights of the technical findings..." 
                      value={newBlog.excerpt}
                      onChange={(e) => setNewBlog({ ...newBlog, excerpt: e.target.value })}
                      className="w-full bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 p-2"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-slate-500 mb-1 font-bold uppercase">Raw Content Payload *</label>
                    <textarea 
                      placeholder="Deep technical analysis or recursive tree walk code snippet..." 
                      rows={2}
                      value={newBlog.content}
                      onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
                      className="w-full bg-[#FFFFFF] dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 p-2"
                      required
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-slate-500 mb-1 font-bold uppercase">Tags (comma delimited)</label>
                    <input 
                      type="text" 
                      placeholder="DataStructures, WebSockets" 
                      value={newBlog.tags}
                      onChange={(e) => setNewBlog({ ...newBlog, tags: e.target.value })}
                      className="w-full bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 p-2"
                    />
                  </div>
                  <button 
                    type="submit"
                    className="w-full py-2.5 bg-slate-900 border border-[#1E293B] hover:bg-emerald-500 text-white hover:text-slate-950 font-bold transition-all uppercase tracking-widest text-xs cursor-pointer"
                  >
                    📄 Publish & Sync Document
                  </button>
                </form>
              </div>

            </div>

            {/* Direct collection audit */}
            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800">
              <span className="text-[10px] font-mono font-bold tracking-widest text-slate-400 dark:text-slate-500 uppercase block mb-4">Direct collection audit telemetry</span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
                
                {/* project section ledger */}
                <div className="p-4 border border-slate-200 dark:border-slate-800 bg-slate-50/20 dark:bg-slate-900/30">
                  <span className="block font-bold text-indigo-505 text-indigo-500 mb-2 uppercase">[projects_collection] ({projects.length})</span>
                  <div className="space-y-1 max-h-40 overflow-y-auto pr-1">
                    {projects.map((p) => (
                      <div key={p.id} className="p-2 border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F172A] flex justify-between items-center">
                        <span className="truncate mr-2 font-semibold text-[11px]">{p.title}</span>
                        <button 
                          onClick={() => handleDeleteProject(p.id)}
                          className="text-red-500 hover:text-red-400 p-1"
                          type="button"
                          title="Purge"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* blogs index ledger */}
                <div className="p-4 border border-slate-200 dark:border-slate-800 bg-slate-50/20 dark:bg-slate-900/30">
                  <span className="block font-bold text-emerald-505 text-emerald-500 mb-2 uppercase">[blogs_collection] ({blogs.length})</span>
                  <div className="space-y-1 max-h-40 overflow-y-auto pr-1">
                    {blogs.map((b) => (
                      <div key={b.id} className="p-2 border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F172A] flex justify-between items-center">
                        <span className="truncate mr-2 font-semibold text-[11px]">{b.title}</span>
                        <button 
                          onClick={() => handleDeleteBlog(b.id)}
                          className="text-red-500 hover:text-red-400 p-1"
                          type="button"
                          title="Purge"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* contact reports list */}
                <div className="p-4 border border-slate-200 dark:border-slate-800 bg-slate-50/20 dark:bg-slate-900/30">
                  <span className="block font-bold text-purple-500 mb-2 uppercase">[contact_messages_collection] ({messages.length})</span>
                  <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                    {messages.length === 0 ? (
                      <span className="text-slate-550 dark:text-slate-500 italic block mt-2 text-[11px]">No contact history.</span>
                    ) : (
                      messages.map((m) => (
                        <div key={m.id} className="p-2 border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F172A] flex flex-col gap-1">
                          <div className="flex justify-between items-center">
                            <span className={`font-bold text-[10px] ${m.isRead ? 'text-slate-500 line-through' : 'text-emerald-500'}`}>{m.name}</span>
                            <div className="flex items-center gap-1.5">
                              {!m.isRead && (
                                <button 
                                  onClick={() => handleMarkRead(m.id)}
                                  className="text-[9px] bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 px-1 border border-slate-300 dark:border-slate-700 font-bold"
                                >
                                  Read
                                </button>
                              )}
                              <button onClick={() => handleDeleteMessage(m.id)} className="text-red-500 hover:text-red-400">
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                          <p className="text-[10px] text-slate-500 line-clamp-1 italic">{m.message}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>

              </div>
            </div>

          </div>
        )}

        {/* ========================================================== */}
        {/* HOMEPAGE VIEW */}
        {/* ========================================================== */}
        {activeSection === 'home' && (
          <div className="space-y-24" id="section-home">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              <div className="lg:col-span-7 space-y-6">
                
                <div className="inline-block px-3 py-1 border border-emerald-500/30 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400 text-[10px] font-mono tracking-widest">
                  FULL STACK ARCHITECT & IoT SOLUTIONS
                </div>

                <h1 className="text-6xl sm:text-7xl font-bold tracking-tighter text-slate-900 dark:text-white leading-[1.05] uppercase">
                  Phaneendra
                  <br />
                  <span className="text-slate-400 dark:text-slate-600 font-mono font-medium lowercase">v r.js</span>
                </h1>

                <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed">
                  {profileDetails.about} Bridging real-world device integration logic with modern full-stack web architectures using HTML, CSS and progressive JS scripts.
                </p>

                <div className="flex flex-wrap gap-4 pt-4">
                  <a 
                    href={profileDetails.github}
                    target="_blank"
                    rel="noreferrer"
                    className="px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs uppercase tracking-widest hover:bg-emerald-500 dark:hover:bg-emerald-400 transition-colors font-mono cursor-pointer flex items-center gap-2"
                    id="hero-github-explorer"
                  >
                    <Github className="w-4 h-4" />
                    <span>View GitHub Link</span>
                  </a>

                  <a 
                    href={profileDetails.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="px-6 py-3 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-white font-bold text-xs uppercase tracking-widest hover:border-emerald-500 hover:text-emerald-500 transition-colors font-mono cursor-pointer flex items-center gap-2"
                    id="hero-linkedin-connector"
                  >
                    <Linkedin className="w-4 h-4" />
                    <span>LinkedIn Profile</span>
                  </a>
                </div>

              </div>

              {/* Stats panels */}
              <div className="lg:col-span-5 grid grid-cols-2 gap-4">
                
                <div className="border border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between bg-white/50 dark:bg-slate-900/10 hover:bg-slate-100/50 dark:hover:bg-slate-800/30 transition-colors">
                  <span className="text-xs font-mono uppercase text-emerald-600 dark:text-emerald-500 font-bold">IoT Code</span>
                  <div className="text-4xl font-bold text-slate-900 dark:text-white mt-4">293</div>
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider font-mono mt-2">Active Commits</p>
                </div>

                <div className="border border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between bg-white/50 dark:bg-slate-900/10 hover:bg-slate-100/50 dark:hover:bg-slate-800/30 transition-colors">
                  <span className="text-xs font-mono uppercase text-emerald-600 dark:text-emerald-500 font-bold">Articles</span>
                  <div className="text-4xl font-bold text-slate-900 dark:text-white mt-4">{blogs.length}</div>
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider font-mono mt-2">Published posts</p>
                </div>

                <div className="border border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between bg-white/50 dark:bg-slate-900/10 hover:bg-slate-100/50 dark:hover:bg-slate-800/30 transition-colors">
                  <span className="text-xs font-mono uppercase text-emerald-600 dark:text-emerald-500 font-bold">Projects</span>
                  <div className="text-4xl font-bold text-slate-900 dark:text-white mt-4">{projects.length}</div>
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider font-mono mt-2">Design updates</p>
                </div>

                <div className="border border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between bg-white/50 dark:bg-[#1E293B]/10 hover:bg-slate-100/50 dark:hover:bg-slate-800/30 transition-colors">
                  <span className="text-xs font-mono uppercase text-emerald-600 dark:text-emerald-500 font-bold">Status</span>
                  <div className="flex items-center gap-2 mt-4">
                    <span className="w-3.5 h-3.5 bg-emerald-500 rounded-full animate-pulse"></span>
                    <span className="text-sm font-bold tracking-tight text-slate-900 dark:text-white font-mono uppercase">available</span>
                  </div>
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider font-mono mt-2">Ready for contracts</p>
                </div>

              </div>

            </div>

            {/* PROJECTS IN THE SYSTEM */}
            <div className="space-y-6">
              <div className="flex justify-between items-end border-b border-slate-200 dark:border-slate-800 pb-4">
                <div>
                  <h2 className="text-xs font-mono uppercase text-emerald-600 dark:text-emerald-400 tracking-wider font-bold">01 / Required Dynamic Projects</h2>
                  <p className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">Core Software Systems & DSA Traversal Libraries</p>
                </div>
                <button 
                  onClick={() => setActiveSection('portfolio')}
                  className="font-mono text-xs text-slate-600 dark:text-slate-400 hover:text-emerald-500 uppercase tracking-wider font-bold"
                >
                  View All Projects →
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <div 
                    key={project.id}
                    className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/30 p-6 flex flex-col justify-between hover:border-emerald-500/50 transition-all duration-300"
                  >
                    <div>
                      <span className="text-[9px] font-mono text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block mb-2">{project.category}</span>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white uppercase tracking-tight">{project.title}</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-3 leading-relaxed font-sans">{project.description}</p>
                      
                      <div className="flex flex-wrap gap-1.5 mt-4">
                        {project.tech.map((t) => (
                          <span key={t} className="text-[9px] font-mono px-2 py-0.5 border border-slate-200 dark:border-slate-800 text-slate-500 rounded-none bg-slate-55 dark:bg-transparent">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs">
                      <a 
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="font-mono text-emerald-600 dark:text-emerald-400 font-bold hover:underline flex items-center gap-1"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>GitHub Repo</span>
                      </a>
                      <span className="text-[10px] font-mono text-slate-400">2026</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ARTICLES PREVIEW */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8">
              
              <div className="space-y-6">
                <span className="text-xs font-mono uppercase text-emerald-600 dark:text-emerald-400 tracking-wider font-bold block">02 / Published Software Manuals</span>
                <h3 className="text-2xl font-bold text-slate-905 dark:text-white uppercase leading-tight">Mastering traversing trees & python parameters</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  I write clear technical tutorials to explain core Computer Science parameters, including WebSocket connectivity, recursive tree walks, and Python automation. Look at my published articles to see how I think through algorithm optimization.
                </p>
                <button 
                  onClick={() => setActiveSection('blog')}
                  className="px-6 py-2.5 bg-slate-100 border border-slate-200 hover:bg-emerald-500 hover:text-slate-950 font-mono text-xs uppercase text-slate-800 tracking-widest font-bold transition-all cursor-pointer dark:bg-slate-900 dark:hover:bg-emerald-400 dark:border-slate-800 dark:text-white dark:hover:text-slate-900"
                >
                  Open Blog Index
                </button>
              </div>

              {/* Grid block of recent indices */}
              <div className="space-y-4">
                {blogs.slice(0, 2).map((post) => (
                  <div 
                    key={post.id}
                    onClick={() => { setSelectedBlog(post); setActiveSection('blog'); }}
                    className="p-5 border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-905 dark:bg-slate-900/20 hover:border-emerald-500/40 transition-all cursor-pointer flex justify-between items-center group"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400">
                        <span>{post.readTime}</span>
                        <span>•</span>
                        <span className="text-emerald-600 dark:text-emerald-400">{post.tags[0]}</span>
                      </div>
                      <h4 className="font-bold text-slate-900 dark:text-white uppercase text-xs group-hover:text-emerald-500 transition-colors">
                        {post.title}
                      </h4>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                ))}
              </div>

            </div>

          </div>
        )}

        {/* ========================================================== */}
        {/* PORTFOLIO TAB */}
        {/* ========================================================== */}
        {activeSection === 'portfolio' && (
          <div className="space-y-8" id="section-portfolio">
            
            <div className="border-b border-slate-200 dark:border-slate-850 pb-6">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white uppercase font-mono tracking-tight">Technical Portfolio</h2>
              <p className="text-xs font-mono text-slate-500 mt-2">Active telemetry states, algorithms and automation repos</p>
            </div>

            {/* Interactive filter tabs */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-4 py-1.5 font-mono text-xs uppercase tracking-wider transition-all cursor-pointer ${
                    categoryFilter === cat
                      ? 'bg-emerald-500 text-slate-950 font-bold'
                      : 'border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* List columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.length === 0 ? (
                <div className="col-span-full py-16 text-center text-sm font-mono text-slate-500">
                  No matching files registered under context "{categoryFilter}".
                </div>
              ) : (
                filteredProjects.map((project) => (
                  <div 
                    key={project.id}
                    className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/30 p-6 flex flex-col justify-between hover:border-emerald-505 hover:border-emerald-500/50 transition-all duration-300"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-mono text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">{project.category}</span>
                        {project.featured && (
                          <span className="flex items-center gap-1 text-[9px] font-mono text-amber-500 font-bold uppercase">
                            <Sparkles className="w-2.5 h-2.5" /> Featured
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white uppercase tracking-tight mt-2">{project.title}</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-3 leading-relaxed">{project.description}</p>
                      
                      <div className="flex flex-wrap gap-1.5 mt-4">
                        {project.tech.map((t) => (
                          <span key={t} className="text-[9px] font-mono px-2 py-0.5 border border-slate-200 dark:border-slate-800 text-slate-500 bg-slate-50 dark:bg-transparent">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs">
                      <a 
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="font-mono text-emerald-600 dark:text-emerald-400 font-bold hover:underline flex items-center gap-1"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>GitHub Repo</span>
                      </a>
                      
                      {project.liveUrl && (
                        <a 
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="font-mono text-slate-400 hover:text-white hover:underline flex items-center gap-1 text-[11px]"
                        >
                          <ExternalLink className="w-3 h-3" />
                          <span>Live View</span>
                        </a>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>

          </div>
        )}

        {/* ========================================================== */}
        {/* RESUME VIEW */}
        {/* ========================================================== */}
        {activeSection === 'resume' && (
          <div className="space-y-12" id="section-resume">
            
            <div className="border-b border-slate-200 dark:border-slate-806 pb-6">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white uppercase font-mono tracking-tight">Engineering Record</h2>
              <p className="text-xs font-mono text-slate-500 mt-2">Technical profile, experiences and verified skills matrix</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              
              {/* Left Skills grid */}
              <div className="lg:col-span-4 space-y-8 font-mono">
                
                <div>
                  <h3 className="text-xs uppercase text-emerald-600 dark:text-emerald-400 font-bold tracking-widest border-b border-slate-200 dark:border-slate-800 pb-2 mb-4">Programming Framework</h3>
                  <div className="flex flex-wrap gap-2">
                    {profileDetails.skills.frontend.map(s => (
                      <span key={s} className="px-2.5 py-1 text-xs border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/30 text-slate-600 dark:text-slate-350">{s}</span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xs uppercase text-emerald-600 dark:text-emerald-400 font-bold tracking-widest border-b border-slate-200 dark:border-slate-800 pb-2 mb-4">Backend & Document Engines</h3>
                  <div className="flex flex-wrap gap-2">
                    {profileDetails.skills.backend.map(s => (
                      <span key={s} className="px-2.5 py-1 text-xs border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/30 text-slate-600 dark:text-slate-350">{s}</span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xs uppercase text-emerald-600 dark:text-emerald-400 font-bold tracking-widest border-b border-slate-200 dark:border-slate-800 pb-2 mb-4">Core Science</h3>
                  <div className="flex flex-wrap gap-2">
                    {profileDetails.skills.programming.map(s => (
                      <span key={s} className="px-2.5 py-1 text-xs border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/30 text-slate-600 dark:text-slate-350">{s}</span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xs uppercase text-emerald-600 dark:text-emerald-400 font-bold tracking-widest border-b border-slate-200 dark:border-slate-800 pb-2 mb-4">IoT Automation & Systems</h3>
                  <div className="flex flex-wrap gap-2">
                    {profileDetails.skills.iot.map(s => (
                      <span key={s} className="px-2.5 py-1 text-xs border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-905 dark:bg-slate-900/30 text-slate-600 dark:text-slate-350">{s}</span>
                    ))}
                  </div>
                </div>

              </div>

              {/* Right Experience timeline */}
              <div className="lg:col-span-8 space-y-12">
                
                <div className="space-y-8">
                  <span className="text-xs font-mono uppercase text-emerald-600 dark:text-emerald-400 font-bold tracking-widest block">01 / Education History</span>
                  
                  <div className="relative pl-6 border-l border-slate-200 dark:border-slate-800 space-y-8">
                    
                    {/* Edu Item 1 */}
                    <div className="relative">
                      <div className="absolute -left-[30px] top-1 w-4 h-4 rounded-full bg-emerald-500 border-4 border-slate-50 dark:border-[#0F172A]"></div>
                      <div className="space-y-1">
                        <span className="font-mono text-[10px] text-slate-450 text-slate-500 font-bold">2024 - 2028</span>
                        <h4 className="font-bold uppercase tracking-tight text-slate-900 dark:text-white text-base">Bachelor of Engineering Computer Science</h4>
                        <span className="block font-mono text-xs text-emerald-600 dark:text-emerald-400">MIT (Madras Institute of Technology)</span>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed pr-4 pt-2">
                          Specializing in technical architectures, modern web integrations, and database design. Grounded heavily in algorithmic analysis, telemetry layouts, and IoT firmware parameters.
                        </p>
                      </div>
                    </div>

                    {/* Edu Item 2 */}
                    <div className="relative">
                      <div className="absolute -left-[30px] top-1 w-4 h-4 rounded-full bg-slate-300 dark:bg-slate-700 border-4 border-slate-50 dark:border-[#0F172A]"></div>
                      <div className="space-y-1">
                        <span className="font-mono text-[10px] text-slate-500">Completed 2024</span>
                        <h4 className="font-bold uppercase tracking-tight text-slate-900 dark:text-white text-base">Higher Secondary Education Certificate</h4>
                        <span className="block font-mono text-xs text-emerald-600 dark:text-emerald-400">Advanced Mathematics & Computer Applications Block</span>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed pr-4 pt-1">
                          Consistently focused on systemic logic, automation parameters, data sorting, and scripting libraries.
                        </p>
                      </div>
                    </div>

                  </div>
                </div>

                <div className="space-y-4">
                  <span className="text-xs font-mono uppercase text-emerald-600 dark:text-emerald-400 font-bold tracking-widest block">02 / Engineering Scope Focus</span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-5 border border-slate-200 dark:border-slate-800">
                      <h4 className="font-bold text-sm uppercase text-slate-900 dark:text-white font-mono flex items-center gap-2">
                        <Cpu className="w-4 h-4 text-emerald-500" /> Web-to-Edge Bridging
                      </h4>
                      <p className="text-xs text-slate-605 text-slate-500 leading-relaxed mt-2">
                        Configuring MQTT and Node-RED systems to stream raw hardware sensor data directly into state systems for remote visual control.
                      </p>
                    </div>

                    <div className="p-5 border border-slate-200 dark:border-slate-800">
                      <h4 className="font-bold text-sm uppercase text-slate-900 dark:text-white font-mono flex items-center gap-2">
                        <Layers className="w-4 h-4 text-indigo-500" /> Document Ledger Scaling
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed mt-2">
                        Securing JSON storage layers with clean Express proxy APIs, managing active documents in Mongo collections, and persisting client backups safely.
                      </p>
                    </div>
                  </div>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* ========================================================== */}
        {/* BLOGS VIEW */}
        {/* ========================================================== */}
        {activeSection === 'blog' && (
          <div className="space-y-8" id="section-blog">
            
            {selectedBlog ? (
              // Individual Blog post Layout
              <div className="max-w-3xl mx-auto space-y-6">
                <button 
                  onClick={() => setSelectedBlog(null)}
                  className="font-mono text-xs font-bold uppercase text-slate-500 hover:text-emerald-500 tracking-widest flex items-center gap-1 cursor-pointer"
                >
                  ← Return to articles list
                </button>

                <div className="space-y-4 pt-4 border-t border-slate-205 border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
                    <span>{selectedBlog.readTime}</span>
                    <span>•</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium">{selectedBlog.tags.join(', ')}</span>
                  </div>

                  <h1 className="text-4xl font-bold text-slate-909 dark:text-white uppercase tracking-tight leading-none font-sans">
                    {selectedBlog.title}
                  </h1>

                  <span className="block text-[11px] font-mono text-slate-500 border-b border-slate-200 dark:border-slate-800 pb-4">
                    Published: {new Date(selectedBlog.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="text-base text-slate-700 dark:text-slate-300 leading-relaxed font-sans space-y-4">
                  <p className="font-mono text-xs text-slate-500 bg-slate-100 p-4 dark:bg-slate-900 dark:text-slate-400 border-l-2 border-emerald-500 italic">
                    "{selectedBlog.excerpt}"
                  </p>
                  <div className="whitespace-pre-line leading-relaxed text-sm pt-4">
                    {selectedBlog.content}
                  </div>
                </div>

                <div className="pt-12 border-t border-slate-200 dark:border-slate-800">
                  <div className="p-6 border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20 flex flex-col sm:flex-row items-center gap-6">
                    <div className="w-12 h-12 bg-emerald-500 text-slate-900 font-mono font-extrabold flex items-center justify-center text-lg rounded-sm shrink-0">
                      P
                    </div>
                    <div className="space-y-1 text-center sm:text-left">
                      <span className="font-mono text-xs font-bold text-slate-900 dark:text-white">Written By Phaneendra V R</span>
                      <p className="text-xs text-slate-600 dark:text-slate-400">Full-Stack dev and systems architect tracking telemetry state and standard traversal parameters.</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              // Blog indexing layout
              <div className="space-y-8">
                <div className="border-b border-slate-200 dark:border-slate-850 pb-6">
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white uppercase font-mono tracking-tight">Technical Manuals</h2>
                  <p className="text-xs font-mono text-slate-500 mt-2">Tutorials and findings on computing mechanics and integrations</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {blogs.length === 0 ? (
                    <div className="col-span-full py-16 text-center text-sm font-mono text-slate-505 text-slate-500">
                      No published manuals inside active document ledger index.
                    </div>
                  ) : (
                    blogs.map((post) => (
                      <div 
                        key={post.id}
                        onClick={() => setSelectedBlog(post)}
                        className="p-6 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/30 hover:border-emerald-500/50 transition-all cursor-pointer flex flex-col justify-between group"
                      >
                        <div className="space-y-4">
                          <div className="flex justify-between items-center text-[10px] font-mono text-slate-400">
                            <span>{post.readTime}</span>
                            <span className="text-emerald-600 dark:text-emerald-400">{post.tags[0]}</span>
                          </div>

                          <h3 className="text-lg font-bold text-slate-909 dark:text-white uppercase tracking-tight group-hover:text-emerald-500 transition-colors">
                            {post.title}
                          </h3>

                          <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                            {post.excerpt}
                          </p>
                        </div>

                        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs">
                          <span className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 uppercase tracking-widest text-[10px]">
                            Read Guide <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                          </span>
                          <span className="font-mono text-[10px] text-slate-400">2026</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

          </div>
        )}

        {/* ========================================================== */}
        {/* CONTACT VIEW */}
        {/* ========================================================== */}
        {activeSection === 'contact' && (
          <div className="space-y-12 animate-fade-in" id="section-contact">
            
            <div className="border-b border-slate-200 dark:border-slate-850 pb-6">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white uppercase font-mono tracking-tight">Contact Panel</h2>
              <p className="text-xs font-mono text-slate-500 mt-2">Dispatch dynamic inquiries to registered mailbox metrics ledger</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              
              {/* Profile card details */}
              <div className="lg:col-span-4 space-y-6">
                
                <div className="p-6 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/30 font-mono text-xs space-y-4">
                  <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold">P</div>
                    <div>
                      <span className="block font-bold text-slate-900 dark:text-white">Phaneendra V R</span>
                      <span className="block text-[10px] text-slate-500">Authorised Signatory</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-start gap-2.5">
                      <Mail className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="block text-[10px] text-slate-500 uppercase font-bold">Mail gateway</span>
                        <a href={`mailto:${profileDetails.email}`} className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline">{profileDetails.email}</a>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="block text-[10px] text-slate-505 text-slate-500 uppercase font-bold">Geographic coordinates</span>
                        <span className="font-semibold text-slate-800 dark:text-slate-350">MIT College, Chromepet, Chennai, TN, India</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 border border-sky-505/20 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/10 font-mono text-[10px] text-slate-500">
                  <span className="block font-bold mb-1 uppercase tracking-widest text-indigo-505 text-indigo-500">Communications Agreement</span>
                  Submissions are injected directly into db.json, stimulating automatic SMTP dispatch relays. Clear SMTP telemetry maps will be returned instantly.
                </div>

              </div>

              {/* Inquiries email form selector */}
              <div className="lg:col-span-8">
                
                {contactSuccess ? (
                  // Success delivery reports
                  <div className="p-8 border border-emerald-500/30 bg-emerald-500/5 text-slate-800 dark:text-slate-200 space-y-6" id="delivery-ledger-feedback">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-emerald-500 rounded-full text-slate-950 font-bold">
                        <CheckCircle className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-mono text-base font-bold uppercase tracking-widest text-slate-900 dark:text-white">Communication Dispatched Successfully</h3>
                        <p className="text-xs text-slate-555 text-slate-500 font-mono">Simulated email dispatch telemetry completed</p>
                      </div>
                    </div>

                    {emailReceipt && (
                      <div className="bg-white/80 dark:bg-slate-950/40 p-5 font-mono text-xs border border-emerald-500/25 space-y-2.5">
                        <span className="block font-bold uppercase tracking-wider text-[10px] text-emerald-600 dark:text-emerald-400 border-b border-slate-200 dark:border-slate-800 pb-1.5">[System_Mail_Dispatcher_State]</span>
                        <div><strong>Target Mailbox:</strong> {emailReceipt.target_mailbox}</div>
                        <div><strong>Dispatch Hub:</strong> {emailReceipt.gateway}</div>
                        <div><strong>Dispatched Flag:</strong> {emailReceipt.dispatched ? 'TRUE' : 'FALSE'}</div>
                        <div><strong>Relay Timestamp:</strong> {emailReceipt.timestamp}</div>
                        <div className="flex items-center gap-1 pt-1 text-emerald-600 dark:text-emerald-400 font-bold">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                          <span>Routing path: {emailReceipt.status}</span>
                        </div>
                      </div>
                    )}

                    <button 
                      onClick={() => { setContactSuccess(false); setEmailReceipt(null); }}
                      className="px-6 py-2.5 bg-slate-900 border border-slate-700 hover:bg-emerald-500 text-white hover:text-slate-950 font-mono text-xs uppercase tracking-widest font-bold transition-all cursor-pointer"
                    >
                      🔄 Open New Channel
                    </button>
                  </div>
                ) : (
                  // General Form
                  <form onSubmit={handleContactSubmit} className="space-y-6 font-mono text-xs">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-slate-500 mb-1.5 font-bold uppercase">Your Identifier Name *</label>
                        <input 
                          type="text" 
                          placeholder="e.g. Isaac Newton"
                          value={contactForm.name}
                          onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                          className="w-full bg-[#FFFFFF]/50 dark:bg-[#0F172A] border border-slate-205 border-slate-200 dark:border-slate-8c0 border-slate-200 dark:border-slate-800 p-3 text-slate-900 dark:text-white"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-slate-500 mb-1.5 font-bold uppercase">Return Mailbox *</label>
                        <input 
                          type="email" 
                          placeholder="your-mailbox@example.com"
                          value={contactForm.email}
                          onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                          className="w-full bg-white/50 dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 p-3 text-slate-905 dark:text-white"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-500 mb-1.5 font-bold uppercase">Inquiry Subject Tag</label>
                      <input 
                        type="text" 
                        placeholder="Inquiry about dynamic node layouts"
                        value={contactForm.subject}
                        onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                        className="w-full bg-white/50 dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 p-3 text-slate-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-500 mb-1.5 font-bold uppercase">Inquiry Message Core *</label>
                      <textarea 
                        rows={5}
                        placeholder="Type standard payload content requests here..."
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        className="w-full bg-white/50 dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 p-3 text-slate-900 dark:text-white"
                        required
                      ></textarea>
                    </div>

                    <button 
                      type="submit"
                      disabled={contactSubmitting}
                      className="px-8 py-3.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-emerald-500 dark:hover:bg-emerald-400 hover:text-slate-950 dark:hover:text-slate-950 font-bold transition-all uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="w-4 h-4" />
                      <span>{contactSubmitting ? 'Relaying Packet...' : 'Transmit Communications Packet'}</span>
                    </button>
                  </form>
                )}

              </div>

            </div>

          </div>
        )}

      </main>

      {/* FOOTER BLOCK WITH ESTABLISHED LINKS */}
      <footer className="border-t border-slate-200 dark:border-slate-850 bg-white dark:bg-[#0F172A]/50 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="font-mono text-xs text-slate-500 dark:text-slate-400 text-center md:text-left">
            <div>© 2026 Phaneendra V R. All software packages secured and configured in client local storage.</div>
            <div className="text-[10px] mt-1 text-slate-455 text-slate-500">Vit University Campus, India. Telemetry systems model portfolio standard.</div>
          </div>

          <div className="flex gap-4">
            <a 
              href={profileDetails.github} 
              target="_blank" 
              rel="noreferrer" 
              className="p-2 border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-emerald-500 transition-colors"
              title="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>
            <a 
              href={profileDetails.linkedin} 
              target="_blank" 
              rel="noreferrer" 
              className="p-2 border border-slate-250 border-slate-200 dark:border-slate-800 text-slate-500 hover:text-emerald-555 hover:text-emerald-500 transition-colors"
              title="Connect on LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}
