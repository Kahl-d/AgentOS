import React, { useState } from 'react';

export default function FolderWindow({ title, items, onItemOpen, initialView = 'list', onClose }) {
  const [view, setView] = useState(initialView);

  return (
    <div className="folder-window-root">
      {/* Header Bar */}
      <div className="folder-window-header">
        <div />
        <div className="folder-window-view-toggle">
          <button
            aria-label="List view"
            className={view === 'list' ? 'folder-view-btn active' : 'folder-view-btn'}
            onClick={() => setView('list')}
          >
            <span role="img" aria-label="List">📄</span>
          </button>
          <button
            aria-label="Icon view"
            className={view === 'icons' ? 'folder-view-btn active' : 'folder-view-btn'}
            onClick={() => setView('icons')}
          >
            <span role="img" aria-label="Icons">🗂️</span>
          </button>
        </div>
      </div>
      {/* Main Area */}
      <div className="folder-window-content">
        {view === 'list' ? (
          <table className="folder-table">
            <thead>
              <tr className="folder-table-header-row">
                <th className="folder-table-header">Name</th>
                <th className="folder-table-header">Type</th>
                <th className="folder-table-header">Modified</th>
                <th className="folder-table-header folder-table-header-right">Size</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr
                  key={item.name}
                  className="folder-table-row"
                  onClick={() => onItemOpen(item)}
                  tabIndex={0}
                >
                  <td className="folder-table-cell folder-table-name" style={{ textAlign: 'left' }}>
                    <span className="folder-table-icon" role="img" aria-label={item.type === 'folder' ? 'Folder' : 'File'}>
                      {item.icon || (item.type === 'folder' ? '📁' : '📄')}
                    </span>
                    <span className="folder-table-filename">{item.name}</span>
                  </td>
                  <td className="folder-table-cell folder-table-type">{item.type || ''}</td>
                  <td className="folder-table-cell folder-table-modified">{item.modified || ''}</td>
                  <td className="folder-table-cell folder-table-size folder-table-header-right">{item.size || ''}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="folder-icon-view">
            {items.map((item) => (
              <div
                key={item.name}
                className="folder-icon-item"
                onClick={() => onItemOpen(item)}
                tabIndex={0}
              >
                <div className="folder-icon-img">{item.icon || (item.type === 'folder' ? '📁' : '📄')}</div>
                <div className="folder-icon-label">{item.name}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 