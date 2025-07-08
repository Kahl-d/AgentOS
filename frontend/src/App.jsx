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
    // Call backend
    try {
      const res = await fetch(config.API_ENDPOINTS.ask, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: userMsg.text }),
      });
      const data = await res.json();
      setMessages((msgs) => [...msgs, { from: 'bot', text: data.answer }]);
    } catch {
      setMessages((msgs) => [...msgs, { from: 'bot', text: 'Sorry, there was an error.' }]);
    }
    setSending(false);
  };

  // Scroll to bottom on new message
  useState(() => {
    if (chatEndRef.current) chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <OSWindow
      title={
        <div className="ai-bot-header-bar-minimal">
          <img src="https://img.icons8.com/color/32/000000/robot-2.png" alt="AI Bot" className="ai-bot-app-icon-minimal" />
          <span className="ai-bot-header-title-minimal">Khalid's AI Assistant</span>
        </div>
      }
      onClose={onClose}
      initial={{ x: 420, y: 120, w: 380, h: 480 }}
      minWidth={320}
      minHeight={320}
      appAccent
    >
      <div className="ai-bot-app-bg">
        {loading ? (
          <div className="ai-bot-loading" style={{ flex: 1 }}>
            <div className="ai-bot-spinner" />
            <div>Welcome to Khalid's Personal Assistant...</div>
          </div>
        ) : (
          <div className="ai-bot-chat-area">
            <div className="ai-bot-messages-list">
              {messages.map((msg, i) => (
                <div key={i} className={`ai-bot-msg-bubble-minimal ${msg.from}`}> 
                  {msg.from === 'bot' && (
                    <img
                      className="ai-bot-msg-avatar-minimal"
                      src="https://img.icons8.com/color/32/000000/robot-2.png"
                      alt="Bot"
                    />
                  )}
                  <span className="ai-bot-msg-text-minimal">{msg.text}</span>
                  {msg.from === 'user' && (
                    <img
                      className="ai-bot-msg-avatar-minimal"
                      src="https://img.icons8.com/color/32/000000/user-male-circle--v2.png"
                      alt="User"
                    />
                  )}
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
            <form className="ai-bot-input-row-minimal" onSubmit={sendMessage}>
              <input
                className="ai-bot-input-minimal"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Ask me anything..."
                disabled={sending}
              />
              <button className="ai-bot-send-btn-minimal" type="submit" disabled={sending || !input.trim()}>
                <span className="ai-bot-send-symbol-minimal">→</span>
              </button>
            </form>
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
          <img src="https://img.icons8.com/color/96/000000/folder-invoices--v2.png" alt="Projects" className="desktop-icon-img" />
          <div className="icon-label">Projects</div>
        </div>
        <div className="icon" onClick={() => setAIBotOpen(true)}>
          <img src="https://img.icons8.com/color/96/000000/robot-2.png" alt="AI Bot" className="desktop-icon-img" />
          <div className="icon-label">AI Bot</div>
        </div>
        <div className="icon" onClick={() => window.open('tel:4042637813')}> 
          <img src="https://img.icons8.com/color/96/000000/phone.png" alt="Call" className="desktop-icon-img" />
          <div className="icon-label">Call</div>
        </div>
        <div className="icon">
          <img src="https://img.icons8.com/color/96/000000/briefcase.png" alt="Work" className="desktop-icon-img" />
          <div className="icon-label">Work</div>
        </div>
        <div className="icon" onClick={() => window.open('https://github.com/Kahl-d', '_blank', 'noopener noreferrer')}> 
          <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub" className="desktop-icon-img" />
          <div className="icon-label">GitHub</div>
        </div>
        <div className="icon" onClick={() => window.open('https://www.linkedin.com/in/khalidm-khan/', '_blank', 'noopener noreferrer')}>
          <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="LinkedIn" className="desktop-icon-img" />
          <div className="icon-label">LinkedIn</div>
        </div>
        <div className="icon" onClick={() => setFilesOpen(true)}>
          <img src="https://img.icons8.com/color/96/000000/opened-folder.png" alt="Files" className="desktop-icon-img" />
          <div className="icon-label">Files</div>
        </div>
        <div className="icon" onClick={() => window.open('mailto:khalidmehtabk@gmail.com')}> 
          <img src="https://img.icons8.com/color/96/000000/new-post.png" alt="Email" className="desktop-icon-img" />
          <div className="icon-label">Email</div>
        </div>
        <div className="icon" onClick={() => setResumeOpen(true)}>
          <img src="https://img.icons8.com/color/96/000000/document--v2.png" alt="Resume" className="desktop-icon-img" />
          <div className="icon-label">Resume.pdf</div>
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
