import React, { useState } from 'react';

export default function FolderWindow({ title, items, onItemOpen, initialView = 'list', onClose }) {
  const [view, setView] = useState(initialView);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
      {/* Header Bar */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '10px 16px 8px 16px', borderBottom: '1px solid var(--window-border, #e0e7ef)', background: 'var(--window-bg, #f8fafc)',
        fontWeight: 600, fontSize: '1.12rem', letterSpacing: 0.01, minHeight: 44, color: 'var(--window-title, #23262f)'
      }}>
        <div />
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            aria-label="List view"
            style={{
              background: view === 'list' ? 'var(--primary, #e0e7ff)' : 'transparent',
              border: 'none', borderRadius: 4, padding: 4, cursor: 'pointer', fontSize: 18
            }}
            onClick={() => setView('list')}
          >
            <span role="img" aria-label="List">📄</span>
          </button>
          <button
            aria-label="Icon view"
            style={{
              background: view === 'icons' ? 'var(--primary, #e0e7ff)' : 'transparent',
              border: 'none', borderRadius: 4, padding: 4, cursor: 'pointer', fontSize: 18
            }}
            onClick={() => setView('icons')}
          >
            <span role="img" aria-label="Icons">🗂️</span>
          </button>
        </div>
      </div>
      {/* Main Area */}
      <div style={{ flex: 1, overflow: 'auto', background: 'var(--window-bg, #fff)', color: 'var(--text, #23262f)', padding: 0 }}>
        {view === 'list' ? (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.98rem' }}>
            <thead>
              <tr style={{ background: '#f4f6fa', color: '#888', fontWeight: 500 }}>
                <th style={{ textAlign: 'left', padding: '8px 12px', fontWeight: 500 }}>Name</th>
                <th style={{ textAlign: 'left', padding: '8px 12px', fontWeight: 500 }}>Type</th>
                <th style={{ textAlign: 'left', padding: '8px 12px', fontWeight: 500 }}>Modified</th>
                <th style={{ textAlign: 'right', padding: '8px 12px', fontWeight: 500 }}>Size</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, idx) => (
                <tr
                  key={item.name}
                  style={{ cursor: 'pointer', borderBottom: '1px solid #f0f2f8', transition: 'background 0.12s' }}
                  onClick={() => onItemOpen(item)}
                  onMouseOver={e => e.currentTarget.style.background = '#e0e7ff'}
                  onMouseOut={e => e.currentTarget.style.background = 'transparent'}
                >
                  <td style={{ padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 8, minWidth: 320 }}>
                    <span role="img" aria-label={item.type === 'folder' ? 'Folder' : 'File'} style={{ fontSize: 20 }}>
                      {item.icon || (item.type === 'folder' ? '📁' : '📄')}
                    </span>
                    <span style={{ whiteSpace: 'normal', overflow: 'visible', textOverflow: 'clip' }}>{item.name}</span>
                  </td>
                  <td style={{ padding: '8px 12px', color: '#888' }}>{item.type || ''}</td>
                  <td style={{ padding: '8px 12px', color: '#888' }}>{item.modified || ''}</td>
                  <td style={{ padding: '8px 12px', textAlign: 'right', color: '#888' }}>{item.size || ''}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, padding: 18 }}>
            {items.map((item, idx) => (
              <div
                key={item.name}
                style={{ width: 90, textAlign: 'center', cursor: 'pointer', userSelect: 'none' }}
                onClick={() => onItemOpen(item)}
              >
                <div style={{ fontSize: 36, marginBottom: 6 }}>
                  {item.icon || (item.type === 'folder' ? '📁' : '📄')}
                </div>
                <div style={{ fontSize: '0.98rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {item.name}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 