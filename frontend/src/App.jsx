import './App.css';
import { useState, useRef } from 'react';

const PROJECT_FILES = [
  { name: 'Project 1', content: `This is Project 1.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit.\nSed euismod, nunc ut laoreet dictum, massa erat cursus enim,\nnon dictum enim enim nec urna.\n\n- Feature 1\n- Feature 2\n- Feature 3\n\n${'More content.\n'.repeat(30)}` },
  { name: 'Project 2', content: `This is Project 2.\n\nUt facilisis, massa nec laoreet dictum, enim erat cursus massa,\nnon dictum enim enim nec urna.\n\n- Item A\n- Item B\n- Item C\n\n${'Extra details.\n'.repeat(25)}` },
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

function OSWindow({ title, children, onClose, initial, minWidth = 220, minHeight = 120 }) {
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
      <div className="os-window-titlebar" onMouseDown={onDragStart}>
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
      const res = await fetch('http://localhost:8000/api/ask', {
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
      title="Khalid's AI Assistant"
      onClose={onClose}
      initial={{ x: 420, y: 120, w: 340, h: 420 }}
      minWidth={280}
      minHeight={260}
    >
      {loading ? (
        <div className="ai-bot-loading">
          <div className="ai-bot-spinner" />
          <div>Welcome to Khalid's Personal Assistant...</div>
        </div>
      ) : (
        <div className="os-window-content flex-col">
          <div className="ai-bot-chat">
            <div className="ai-bot-messages">
              {messages.map((msg, i) => (
                <div key={i} className={msg.from === 'user' ? 'ai-bot-msg user' : 'ai-bot-msg bot'}>
                  {msg.text}
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
            <form className="ai-bot-input-row" onSubmit={sendMessage}>
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
          </div>
        </div>
      )}
    </OSWindow>
  );
}

function App() {
  const [projectsOpen, setProjectsOpen] = useState(false);
  const [fileViewer, setFileViewer] = useState(null); // {name, content} or null
  const [aiBotOpen, setAIBotOpen] = useState(false);

  return (
    <div className="desktop-bg">
      <div className="desktop-icons">
        <div className="icon" onClick={() => setProjectsOpen(true)}>
          <span role="img" aria-label="Projects">📁</span>
          <div className="icon-label">Projects</div>
        </div>
        <div className="icon">
          <span role="img" aria-label="Work">💼</span>
          <div className="icon-label">Work</div>
        </div>
        <div className="icon">
          <span role="img" aria-label="Files">🗂️</span>
          <div className="icon-label">Files</div>
        </div>
      </div>
      <div className="ai-bot-placeholder" onClick={() => setAIBotOpen(true)} style={{ cursor: 'pointer' }}>
        🤖 AI Bot
      </div>
      <div className="os-dock">
        <div className="dock-icon">🗂️</div>
        <div className="dock-icon">💬</div>
        <div className="dock-icon">⚙️</div>
      </div>

      {/* Projects Window */}
      {projectsOpen && (
        <OSWindow
          title="Projects"
          onClose={() => setProjectsOpen(false)}
          initial={{ x: 120, y: 120, w: 320, h: 320 }}
        >
          <ul className="os-file-list">
            {PROJECT_FILES.map((file) => (
              <li key={file.name} className="os-file-item" onClick={() => setFileViewer(file)}>
                <span role="img" aria-label="file">📄</span> {file.name}
              </li>
            ))}
          </ul>
        </OSWindow>
      )}

      {/* File Viewer Window */}
      {fileViewer && (
        <OSWindow
          title={fileViewer.name}
          onClose={() => setFileViewer(null)}
          initial={{ x: 220, y: 180, w: 400, h: 400 }}
        >
          <div className="os-file-content" style={{ whiteSpace: 'pre-line' }}>{fileViewer.content}</div>
        </OSWindow>
      )}

      {/* AI Bot Window */}
      {aiBotOpen && <AIBotWindow onClose={() => setAIBotOpen(false)} />}
    </div>
  );
}

export default App;
