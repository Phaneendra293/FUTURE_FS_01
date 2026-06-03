import fs from 'fs';
import path from 'path';

// Define the absolute data file path
const DATA_DIR = path.resolve(process.cwd(), 'data');
const DATA_FILE = path.resolve(DATA_DIR, 'db.json');

// Interface for Database schema
export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  githubUrl: string;
  liveUrl?: string;
  featured: boolean;
  category: string;
  createdAt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  tags: string[];
  readTime: string;
  createdAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  isRead: boolean;
}

interface DatabaseSchema {
  projects: Project[];
  blogs: BlogPost[];
  messages: ContactMessage[];
}

// Initial Database Data (Seed)
const INITIAL_DATA: DatabaseSchema = {
  projects: [
    {
      id: 'proj_1',
      title: 'iotreactproject',
      description: 'An interactive state visualizer and control panel for real-time IoT devices, monitoring telemetry data such as temperature, humidity, and status indicators with smooth animations.',
      tech: ['React', 'Tailwind CSS', 'Vite', 'Lucide Icons'],
      githubUrl: 'https://github.com/Phaneendra293',
      liveUrl: 'https://github.com/Phaneendra293',
      featured: true,
      category: 'IoT & React',
      createdAt: '2026-05-15T00:00:00.000Z'
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
      createdAt: '2026-05-10T00:00:00.000Z'
    },
    {
      id: 'proj_3',
      title: 'mytrees using DSA',
      description: 'An in-depth visual dashboard and library showcasing Binary Search Trees, AVL Trees, and standard Tree Traversal algorithms (DFS, BFS) implementing comprehensive Data Structures & Algorithms concepts.',
      tech: ['TypeScript', 'DSA', 'Algorithms', 'Interactive Canvas'],
      githubUrl: 'https://github.com/Phaneendra293',
      liveUrl: 'https://github.com/Phaneendra293',
      featured: true,
      category: 'Algorithms & DSA',
      createdAt: '2026-05-20T00:00:00.000Z'
    }
  ],
  blogs: [
    {
      id: 'blog_1',
      title: 'Building Real-Time IoT Dashboards with React and WebSockets',
      slug: 'iot-dashboards-react-websockets',
      excerpt: 'Discover how to stream telemetry data from connected edge devices into React state systems seamlessly with responsive animations.',
      content: 'In modern technology stacks, visualising IoT status is crucial. In this guide, we dive deep into setup rules for rendering real-time device updates, tracking metrics seamlessly, and optimizing rendering cascades so your dashboard updates smoothly at 60fps.',
      tags: ['IoT', 'React', 'Websockets', 'WebDev'],
      readTime: '4 min read',
      createdAt: '2026-05-25T14:30:00.000Z'
    },
    {
      id: 'blog_2',
      title: 'Mastering Tree Traversal Algorithms in TypeScript',
      slug: 'mastering-tree-traversal-typescript',
      excerpt: 'Struggling to wrap your head around depth-first search (DFS) and breadth-first search (BFS)? Let’s break down recursive and iterative tree traversals in modern TypeScript.',
      content: 'Tree structures form the backbone of advanced web DOM systems, nesting data, and folder hierarchies. Understanding search operations, balancing algorithms, and tree layouts is an absolute game changer. In this article, we outline iterative DFS stack setups and queue BFS strategies.',
      tags: ['DSA', 'Algorithms', 'TypeScript', 'Computer Science'],
      readTime: '6 min read',
      createdAt: '2026-05-28T09:15:00.000Z'
    },
    {
      id: 'blog_3',
      title: 'Python Scripts for Automating Daily Developer Repetitive Tasks',
      slug: 'python-automation-scripts-developer',
      excerpt: 'Unlock dozens of hours of developer productivity with short, elegant, and efficient Python automation scripts for workspace tasks.',
      content: 'Unshackle your potential from copying folders, syncing directories, or scraping layouts manually. This Python scripting manual walks through directory scanning, parsing configuration files, batch-editing text tables, and executing shell automations from python subprocess triggers.',
      tags: ['Python', 'Automation', 'Dev Productivity'],
      readTime: '3 min read',
      createdAt: '2026-05-30T10:00:00.000Z'
    }
  ],
  messages: []
};

// Database utility class (mimicking MongoDB-like behavior)
export class Database {
  private static initCompleted = false;

  private static init() {
    if (this.initCompleted) return;
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      if (!fs.existsSync(DATA_FILE)) {
        fs.writeFileSync(DATA_FILE, JSON.stringify(INITIAL_DATA, null, 2), 'utf-8');
      }
      this.initCompleted = true;
    } catch (e) {
      console.warn('Could not initialize file-based DB, falling back to clean in-memory storage.', e);
      this.initCompleted = true;
    }
  }

  private static readData(): DatabaseSchema {
    this.init();
    try {
      if (fs.existsSync(DATA_FILE)) {
        const fileContent = fs.readFileSync(DATA_FILE, 'utf-8');
        return JSON.parse(fileContent);
      }
    } catch (e) {
      console.error('Error reading database file, using raw memory state.', e);
    }
    return INITIAL_DATA;
  }

  private static writeData(data: DatabaseSchema): boolean {
    this.init();
    try {
      fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
      return true;
    } catch (e) {
      console.error('Failed writing DB to disk.', e);
      return false;
    }
  }

  // --- COLLECTION: PROJECTS ---
  public static getProjects(): Project[] {
    return this.readData().projects;
  }

  public static addProject(project: Omit<Project, 'id' | 'createdAt'>): Project {
    const data = this.readData();
    const newProject: Project = {
      ...project,
      id: 'proj_' + Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString()
    };
    data.projects.unshift(newProject);
    this.writeData(data);
    return newProject;
  }

  public static deleteProject(id: string): boolean {
    const data = this.readData();
    const originalLength = data.projects.length;
    data.projects = data.projects.filter(p => p.id !== id);
    if (data.projects.length !== originalLength) {
      this.writeData(data);
      return true;
    }
    return false;
  }

  // --- COLLECTION: BLOGS ---
  public static getBlogs(): BlogPost[] {
    return this.readData().blogs;
  }

  public static addBlogPost(blog: Omit<BlogPost, 'id' | 'createdAt' | 'slug'>): BlogPost {
    const data = this.readData();
    const slug = blog.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
    
    const newBlog: BlogPost = {
      ...blog,
      id: 'blog_' + Math.random().toString(36).substr(2, 9),
      slug,
      createdAt: new Date().toISOString()
    };
    data.blogs.unshift(newBlog);
    this.writeData(data);
    return newBlog;
  }

  public static deleteBlogPost(id: string): boolean {
    const data = this.readData();
    const originalLength = data.blogs.length;
    data.blogs = data.blogs.filter(b => b.id !== id);
    if (data.blogs.length !== originalLength) {
      this.writeData(data);
      return true;
    }
    return false;
  }

  // --- COLLECTION: CONTACT MESSAGES ---
  public static getMessages(): ContactMessage[] {
    return this.readData().messages;
  }

  public static addMessage(message: Omit<ContactMessage, 'id' | 'createdAt' | 'isRead'>): ContactMessage {
    const data = this.readData();
    const newMessage: ContactMessage = {
      ...message,
      id: 'msg_' + Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      isRead: false
    };
    data.messages.unshift(newMessage);
    this.writeData(data);
    return newMessage;
  }

  public static markMessageRead(id: string): boolean {
    const data = this.readData();
    const msgIndex = data.messages.findIndex(m => m.id === id);
    if (msgIndex !== -1) {
      data.messages[msgIndex].isRead = true;
      this.writeData(data);
      return true;
    }
    return false;
  }

  public static deleteMessage(id: string): boolean {
    const data = this.readData();
    const originalLength = data.messages.length;
    data.messages = data.messages.filter(m => m.id !== id);
    if (data.messages.length !== originalLength) {
      this.writeData(data);
      return true;
    }
    return false;
  }
}
