import { Database } from './db.js';

export function configureApiRoutes(app: any) {
  // Parsing middleware compatibility check
  // (In some environments, Vite passes raw connect requests. Standard express already has body parsers)
  
  // Endpoint: Get all projects
  app.get('/api/projects', (req: any, res: any) => {
    try {
      const projects = Database.getProjects();
      res.setHeader('Content-Type', 'application/json');
      res.json(projects);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  // Endpoint: Add a new project
  app.post('/api/projects', (req: any, res: any) => {
    try {
      const { title, description, tech, githubUrl, liveUrl, category, featured } = req.body;
      if (!title || !description || !githubUrl) {
        return res.status(400).json({ error: 'Title, description and GitHub URL are required.' });
      }
      
      const newProj = Database.addProject({
        title,
        description,
        tech: Array.isArray(tech) ? tech : (tech ? tech.toString().split(',').map((t: string) => t.trim()) : []),
        githubUrl,
        liveUrl: liveUrl || '',
        category: category || 'General',
        featured: !!featured
      });
      res.status(201).json(newProj);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  // Endpoint: Delete a project
  app.delete('/api/projects/:id', (req: any, res: any) => {
    try {
      const success = Database.deleteProject(req.params.id);
      if (success) {
        res.json({ success: true, message: 'Project successfully deleted.' });
      } else {
        res.status(404).json({ error: 'Project not found.' });
      }
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  // Endpoint: Get all blogs
  app.get('/api/blogs', (req: any, res: any) => {
    try {
      const blogs = Database.getBlogs();
      res.setHeader('Content-Type', 'application/json');
      res.json(blogs);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  // Endpoint: Add a new blog post
  app.post('/api/blogs', (req: any, res: any) => {
    try {
      const { title, excerpt, content, tags, readTime } = req.body;
      if (!title || !content || !excerpt) {
        return res.status(400).json({ error: 'Title, excerpt and content are required.' });
      }

      const newBlog = Database.addBlogPost({
        title,
        excerpt,
        content,
        tags: Array.isArray(tags) ? tags : (tags ? tags.toString().split(',').map((t: string) => t.trim()) : ['General']),
        readTime: readTime || '3 min read'
      });
      res.status(201).json(newBlog);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  // Endpoint: Delete a blog post
  app.delete('/api/blogs/:id', (req: any, res: any) => {
    try {
      const success = Database.deleteBlogPost(req.params.id);
      if (success) {
        res.json({ success: true, message: 'Blog post successfully deleted.' });
      } else {
        res.status(404).json({ error: 'Blog post not found.' });
      }
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  // Endpoint: Submit contact form with dynamic email simulation receipts
  app.post('/api/contacts', (req: any, res: any) => {
    try {
      const { name, email, subject, message } = req.body;
      if (!name || !email || !message) {
        return res.status(400).json({ error: 'Name, email, and message are required.' });
      }

      // Add to simulated mongo database
      const newMessage = Database.addMessage({ name, email, subject: subject || 'No Subject', message });

      // Simulated Professional Email Dispatch Notification LOGGING
      console.log('----------------------------------------------------');
      console.log('📧 EMAIL NOTIFICATION DISPATCHED SIMULATED:');
      console.log(`To: developer@phaneendra.dev`);
      console.log(`From: portfolio-notifications@phaneendra.dev`);
      console.log(`Subject: [Portfolio Contact] ${subject || 'New Contact Form Submission'}`);
      console.log(`Sender Name: ${name}`);
      console.log(`Sender Email: ${email}`);
      console.log(`Message: \n${message}`);
      console.log('----------------------------------------------------');

      res.status(201).json({
        success: true,
        message: 'Message sent and stored in DB successfully.',
        data: newMessage,
        email_receipt: {
          dispatched: true,
          gateway: 'Local SMTP Simulation Service',
          target_mailbox: 'vellorephaneendra4@gmail.com', // User registered email from metadata
          timestamp: new Date().toISOString(),
          status: 'success'
        }
      });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  // Endpoint: Get contact form messages (for professional administration panel)
  app.get('/api/contacts', (req: any, res: any) => {
    try {
      const messages = Database.getMessages();
      res.setHeader('Content-Type', 'application/json');
      res.json(messages);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  // Endpoint: Mark message as read
  app.put('/api/contacts/:id/read', (req: any, res: any) => {
    try {
      const success = Database.markMessageRead(req.params.id);
      if (success) {
        res.json({ success: true, message: 'Message updated to read status.' });
      } else {
        res.status(404).json({ error: 'Message not found.' });
      }
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  // Endpoint: Delete a contact message from storage
  app.delete('/api/contacts/:id', (req: any, res: any) => {
    try {
      const success = Database.deleteMessage(req.params.id);
      if (success) {
        res.json({ success: true, message: 'Message deleted from database successfully.' });
      } else {
        res.status(404).json({ error: 'Message not found.' });
      }
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });
}
