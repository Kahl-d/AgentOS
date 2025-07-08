import './App.css';
import { useState, useRef, useEffect } from 'react';
import Project1 from './projects/Project1';
import Project2 from './projects/Project2';
import Project3 from './projects/Project3';
import ContactWindow from './components/ContactWindow';
import FolderWindow from './components/FolderWindow';
import Wallpaper from './components/Wallpaper';
import SkillsWidget from './components/SkillsWidget';
import { config } from './config';

const today = new Date().toLocaleDateString();
const PROJECTS = [
  { name: 'Aware: Cultural Capital Theme Classification', component: Project1, modified: today },
  { name: 'Secure Sense (Winner, SF Hacks 2025 Emerging AI Innovation)', component: Project2, modified: today },
  { name: 'Context-Aware Data Augmentation Tool for Low Data Scenarios', component: Project3, modified: today },
];

const FILES = [
  { name: 'Resume.pdf', type: 'file', icon: '📄', modified: today, size: '120 KB' },
  // Add more files/folders here as needed
];

function useDraggableResizable(initial) {
  const [pos, setPos] = useState({ x: initial.x, y: initial.y });
  const [size, setSize] = useState({ w: initial.w, h: initial.h });
  const dragging = useRef(false);
  const resizing = useRef(false);
  const offset = useRef({ x: 0, y: 0 });
  const startSize = useRef({ w: 0, h: 0 });

  // Drag
  const onDragStart = (e) => {
    dragging.current = true;
    offset.current = {
      x: e.clientX - pos.x,
      y: e.clientY - pos.y,
    };
    document.addEventListener('mousemove', onDrag);
    document.addEventListener('mouseup', onDragEnd);
  };
  const onDrag = (e) => {
    if (!dragging.current) return;
    setPos({ x: e.clientX - offset.current.x, y: e.clientY - offset.current.y });
  };
  const onDragEnd = () => {
    dragging.current = false;
    document.removeEventListener('mousemove', onDrag);
    document.removeEventListener('mouseup', onDragEnd);
  };

  // Resize
  const onResizeStart = (e) => {
    e.stopPropagation();
    resizing.current = true;
    startSize.current = { w: size.w, h: size.h };
    offset.current = { x: e.clientX, y: e.clientY };
    document.addEventListener('mousemove', onResize);
    document.addEventListener('mouseup', onResizeEnd);
  };
  const onResize = (e) => {
    if (!resizing.current) return;
    setSize({
      w: Math.max(220, startSize.current.w + (e.clientX - offset.current.x)),
      h: Math.max(180, startSize.current.h + (e.clientY - offset.current.y)),
    });
  };
  const onResizeEnd = () => {
    resizing.current = false;
    document.removeEventListener('mousemove', onResize);
    document.removeEventListener('mouseup', onResizeEnd);
  };

  return {
    pos,
    size,
    onDragStart,
    onResizeStart,
  };
}

function OSWindow({ title, children, onClose, initial, minWidth = 220, minHeight = 120, appAccent }) {
  const { pos, size, onDragStart, onResizeStart } = useDraggableResizable({
    x: initial.x,
    y: initial.y,
    w: initial.w || minWidth,
    h: initial.h || minHeight,
  });
  return (
    <div
      className="os-window draggable"
      style={{ top: pos.y, left: pos.x, width: size.w, height: size.h, minWidth, minHeight }}
    >
      <div
        className="os-window-titlebar"
        onMouseDown={onDragStart}
        style={appAccent ? { background: 'linear-gradient(90deg, #6c63ff 70%, #23262f 100%)', color: '#fff' } : {}}
      >
        <span>{title}</span>
        <button className="os-window-close" onClick={onClose}>✕</button>
      </div>
      <div className="os-window-content" style={{ height: `calc(100% - 38px)`, overflow: 'auto' }}>
        {children}
      </div>
      <div className="os-window-resize" onMouseDown={onResizeStart} />
    </div>
  );
}

function AIBotWindow({ onClose }) {
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([
    { from: 'bot', text: "Hi! I'm Khalid's Personal Assistant. How can I help you?" },
  ]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const chatEndRef = useRef(null);

  // Show loading effect for 1s on open
  useState(() => {
    const t = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(t);
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = { from: 'user', text: input };
    setMessages((msgs) => [...msgs, userMsg]);
    setInput('');
    setSending(true);
    
    // Call backend with better error handling for Safari
    try {
      console.log('Sending message to:', config.API_ENDPOINTS.ask);
      console.log('Request payload:', { question: userMsg.text });
      
      const res = await fetch(config.API_ENDPOINTS.ask, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        mode: 'cors',
        credentials: 'omit',
        body: JSON.stringify({ question: userMsg.text }),
      });
      
      console.log('Response status:', res.status);
      console.log('Response headers:', Object.fromEntries(res.headers.entries()));
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const data = await res.json();
      console.log('Response data:', data);
      setMessages((msgs) => [...msgs, { from: 'bot', text: data.answer }]);
    } catch (error) {
      console.error('AI Bot Error:', error);
      console.error('Error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
      
      // More specific error message based on error type
      let errorMessage = 'Sorry, there was an error connecting to the AI assistant.';
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        errorMessage = 'Network error: Unable to connect to the server. Please check your internet connection.';
      } else if (error.message.includes('CORS')) {
        errorMessage = 'CORS error: Browser security policy is blocking the request.';
      }
      
      setMessages((msgs) => [...msgs, { from: 'bot', text: errorMessage }]);
    }
    setSending(false);
  };

  // Scroll to bottom on new message
  useEffect(() => {
    if (chatEndRef.current) chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Test API connection on component mount
  useEffect(() => {
    const testAPI = async () => {
      try {
        const testUrl = config.API_BASE_URL + '/api/test';
        console.log('Testing API connection to:', testUrl);
        console.log('User Agent:', navigator.userAgent);
        console.log('Is Safari:', /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent));
        
        const res = await fetch(testUrl, {
          method: 'GET',
          headers: { 'Accept': 'application/json' },
          mode: 'cors',
          credentials: 'omit',
        });
        const data = await res.json();
        console.log('API test successful:', data);
      } catch (error) {
        console.error('API test failed:', error);
        console.error('Error details:', {
          name: error.name,
          message: error.message,
          stack: error.stack
        });
      }
    };
    testAPI();
  }, []);

  return (
    <OSWindow
      title={<><span style={{marginRight:8}}>🤖</span>Khalid's AI Assistant</>}
      onClose={onClose}
      initial={{ x: 420, y: 120, w: 340, h: 420 }}
      minWidth={280}
      minHeight={260}
      appAccent
    >
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%', flex: 1 }}>
        {loading ? (
          <div className="ai-bot-loading" style={{ flex: 1 }}>
            <div className="ai-bot-spinner" />
            <div>Welcome to Khalid's Personal Assistant...</div>
          </div>
        ) : (
          <div className="os-window-content flex-col" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
            <div className="ai-bot-chat" style={{ flex: 1, minHeight: 0 }}>
              <div className="ai-bot-messages" style={{ flex: 1, minHeight: 0 }}>
                {messages.map((msg, i) => (
                  <div key={i} className={msg.from === 'user' ? 'ai-bot-msg user' : 'ai-bot-msg bot'}>
                    {msg.text}
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>
              <form className="ai-bot-input-row" onSubmit={sendMessage} style={{ marginTop: 'auto' }}>
                <input
                  className="ai-bot-input"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="Ask me anything..."
                  disabled={sending}
                />
                <button className="ai-bot-send" type="submit" disabled={sending || !input.trim()}>
                  {sending ? '...' : 'Send'}
                </button>
              </form>
              <div style={{ marginTop: 8, textAlign: 'center' }}>
                <button 
                  onClick={() => {
                    console.log('Manual API test triggered');
                    const testAPI = async () => {
                      try {
                        const res = await fetch(config.API_ENDPOINTS.test, {
                          method: 'GET',
                          headers: { 'Accept': 'application/json' },
                          mode: 'cors',
                          credentials: 'omit',
                        });
                        const data = await res.json();
                        console.log('Manual test successful:', data);
                        setMessages((msgs) => [...msgs, { from: 'bot', text: `API Test: ${data.message}` }]);
                      } catch (error) {
                        console.error('Manual test failed:', error);
                        setMessages((msgs) => [...msgs, { from: 'bot', text: `API Test Failed: ${error.message}` }]);
                      }
                    };
                    testAPI();
                  }}
                  style={{ 
                    fontSize: '0.8rem', 
                    padding: '4px 8px', 
                    background: '#f0f0f0', 
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Test API Connection
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </OSWindow>
  );
}

function ResumeWindow({ onClose }) {
  return (
    <OSWindow
      title="Resume.pdf"
      onClose={onClose}
      initial={{ x: 320, y: 120, w: 520, h: 600 }}
      minWidth={320}
      minHeight={320}
    >
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%', flex: 1 }}>
        <iframe
          src="/resume.pdf"
          title="Resume PDF"
          className="resume-pdf-iframe"
          style={{ border: '1px solid #bfc9d1', background: '#fff', flex: 1, minHeight: 0 }}
        />
        <a
          href="/resume.pdf"
          download
          className="resume-download-btn"
        >
          Download PDF
        </a>
      </div>
    </OSWindow>
  );
}

function SettingsWindow({ onClose, theme, setTheme }) {
  return (
    <OSWindow
      title="Settings"
      onClose={onClose}
      initial={{ x: 540, y: 220, w: 320, h: 220 }}
      minWidth={220}
      minHeight={120}
    >
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <h3 style={{ marginBottom: 24 }}>Settings</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ fontWeight: 500 }}>Theme:</span>
          <button
            className="settings-theme-toggle"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label="Toggle light/dark mode"
          >
            {theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
          </button>
        </div>
      </div>
    </OSWindow>
  );
}

function App() {
  const [projectsOpen, setProjectsOpen] = useState(false);
  const [filesOpen, setFilesOpen] = useState(false);
  const [fileViewer, setFileViewer] = useState(null); // {name, content} or null
  const [aiBotOpen, setAIBotOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div className="desktop-bg">
      <Wallpaper />
      <div className="desktop-intro">
        <div className="intro-title">Hi, I'm Khalid</div>
        <div className="intro-role">AI Engineer</div>
      </div>
      <div className="desktop-icons">
        <div className="icon" onClick={() => setProjectsOpen(true)}>
          <span role="img" aria-label="Projects">📁</span>
          <div className="icon-label">Projects</div>
        </div>
        <div className="icon">
          <span role="img" aria-label="Work">💼</span>
          <div className="icon-label">Work</div>
        </div>
        <div className="icon" onClick={() => setFilesOpen(true)}>
          <span role="img" aria-label="Files">🗂️</span>
          <div className="icon-label">Files</div>
        </div>
        <div className="icon" onClick={() => setResumeOpen(true)}>
          <span role="img" aria-label="Resume">📄</span>
          <div className="icon-label">Resume.pdf</div>
        </div>
        <div className="icon" onClick={() => setAIBotOpen(true)}>
          <span role="img" aria-label="AI Bot">🤖</span>
          <div className="icon-label">AI Bot</div>
        </div>
      </div>
      {/* Top-right widgets */}
      <div className="top-right-widgets">
        {/* Settings Widget */}
        <div className="settings-widget-macos">
          <div className="settings-title">Settings</div>
          <div className="settings-toggle-row">
            <span className="settings-toggle-label">Theme</span>
            <div
              className={`settings-toggle-switch ${theme === 'dark' ? 'dark' : 'light'}`}
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label="Toggle light/dark mode"
            >
              <div className="settings-toggle-thumb">
                {theme === 'dark' ? (
                  <span className="settings-moon">🌙</span>
                ) : (
                  <span className="settings-sun">☀️</span>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* Skills Widget */}
        <SkillsWidget />
      </div>
      {/* Center-bottom contact bar */}
      <div className="desktop-contact-bar">
        <a href="mailto:khalidmehtabk@gmail.com" className="contact-icon-btn" aria-label="Email">
          {/* Email SVG */}
          <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><polyline points="3 7 12 13 21 7"/></svg>
        </a>
        <a href="tel:4042637813" className="contact-icon-btn" aria-label="Call">
          {/* Phone SVG */}
          <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M22 16.92V21a2 2 0 0 1-2.18 2A19.72 19.72 0 0 1 3 5.18 2 2 0 0 1 5 3h4.09a2 2 0 0 1 2 1.72c.13 1.13.37 2.23.72 3.28a2 2 0 0 1-.45 2.11l-1.27 1.27a16 16 0 0 0 6.29 6.29l1.27-1.27a2 2 0 0 1 2.11-.45c1.05.35 2.15.59 3.28.72A2 2 0 0 1 22 16.92z"/></svg>
        </a>
        <a href="https://github.com/Kahl-d" className="contact-icon-btn" aria-label="GitHub" target="_blank" rel="noopener noreferrer">
          {/* GitHub SVG */}
          <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.48 2.87 8.28 6.84 9.63.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.36-3.37-1.36-.45-1.18-1.1-1.5-1.1-1.5-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05A9.38 9.38 0 0 1 12 7.07c.85.004 1.71.12 2.51.35 1.91-1.33 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.07.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.58.69.48A10.01 10.01 0 0 0 22 12.26C22 6.58 17.52 2 12 2z"/></svg>
        </a>
        <a href="https://www.linkedin.com/in/khalidm-khan/" className="contact-icon-btn" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
          {/* LinkedIn SVG */}
          <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 8a6 6 0 0 1 6 6v5h-4v-5a2 2 0 0 0-4 0v5h-4v-9h4v1.5"/></svg>
        </a>
      </div>

      {/* Projects Window */}
      {projectsOpen && (
        <OSWindow
          title="Projects"
          onClose={() => setProjectsOpen(false)}
          initial={{ x: 120, y: 120, w: 600, h: 480 }}
        >
          <FolderWindow
            items={PROJECTS.map(p => ({
              name: p.name,
              type: 'file',
              icon: '📄',
              modified: p.modified,
              size: '',
              component: p.component
            }))}
            onItemOpen={item => setFileViewer(item)}
            initialView="list"
          />
        </OSWindow>
      )}

      {/* File Viewer Window */}
      {fileViewer && (
        <OSWindow
          title={fileViewer.name || fileViewer.displayName || 'File'}
          onClose={() => setFileViewer(null)}
          initial={{ x: 180, y: 120, w: 700, h: 600 }}
        >
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div className="os-file-content" style={{ flex: 1, whiteSpace: 'pre-line', overflow: 'auto', height: '100%' }}>
              {typeof fileViewer.component === 'function' ? fileViewer.component() : fileViewer.content}
            </div>
          </div>
        </OSWindow>
      )}

      {/* Resume PDF Window */}
      {resumeOpen && <ResumeWindow onClose={() => setResumeOpen(false)} />}

      {/* AI Bot Window */}
      {aiBotOpen && <AIBotWindow onClose={() => setAIBotOpen(false)} />}

      {/* Settings Window */}
      {settingsOpen && <SettingsWindow onClose={() => setSettingsOpen(false)} theme={theme} setTheme={setTheme} />}

      {/* Files Window */}
      {filesOpen && (
        <OSWindow
          title="Files"
          onClose={() => setFilesOpen(false)}
          initial={{ x: 180, y: 140, w: 600, h: 480 }}
        >
          <FolderWindow
            items={FILES}
            onItemOpen={item => {
              if (item.name === 'Resume.pdf') {
                setResumeOpen(true);
              }
              // Add more file open logic here as needed
            }}
            initialView="list"
          />
        </OSWindow>
      )}
    </div>
  );
}

export default App;
