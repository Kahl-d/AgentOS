import React from 'react';

export default function Project3() {
  return (
    <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'left', fontFamily: 'inherit' }}>
      {/* Project Title & One-liner */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 8 }}>
        <img src="https://img.icons8.com/color/48/000000/artificial-intelligence.png" alt="Data Augmentation" style={{ width: 44, height: 44, borderRadius: 10, background: '#fff' }} />
        <div>
          <h1 style={{ margin: 0, fontSize: '2rem', fontWeight: 700, color: '#43a047' }}>Context-Aware Data Augmentation</h1>
          <div style={{ color: '#43a047', fontWeight: 500, fontSize: '1.1rem' }}>Boosting low-resource public health AI with smart data</div>
        </div>
      </div>

      {/* Summary */}
      <div style={{ fontSize: '1.08rem', margin: '18px 0 18px 0', color: '#333', lineHeight: 1.6 }}>
        This project fine-tunes BioBERT with masked language modeling and knowledge graph conditioning to generate clinically meaningful synthetic samples for low-resource public health classes, outperforming traditional augmentation methods.
      </div>

      {/* Key Results/Stats (horizontal cards for variety) */}
      <div style={{ display: 'flex', gap: 18, marginBottom: 18, flexWrap: 'wrap' }}>
        <div style={{ background: '#e8f5e9', borderRadius: 12, padding: '16px 22px', minWidth: 120, textAlign: 'center', boxShadow: '0 2px 8px #43a04711' }}>
          <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#43a047' }}>+5% Accuracy</div>
          <div style={{ fontSize: '0.98rem', color: '#555' }}>vs. SMOTE/back-translation</div>
        </div>
        <div style={{ background: '#e8f5e9', borderRadius: 12, padding: '16px 22px', minWidth: 120, textAlign: 'center', boxShadow: '0 2px 8px #43a04711' }}>
          <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#43a047' }}>BioBERT + KG</div>
          <div style={{ fontSize: '0.98rem', color: '#555' }}>for clinical text</div>
        </div>
        <div style={{ background: '#e8f5e9', borderRadius: 12, padding: '16px 22px', minWidth: 120, textAlign: 'center', boxShadow: '0 2px 8px #43a04711' }}>
          <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#43a047' }}>3.5–5% Gain</div>
          <div style={{ fontSize: '0.98rem', color: '#555' }}>on imbalanced datasets</div>
        </div>
      </div>

      {/* Tech Stack */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 18, flexWrap: 'wrap' }}>
        <span style={{ background: '#e8f5e9', color: '#43a047', borderRadius: 8, padding: '6px 14px', fontWeight: 600, fontSize: '1rem' }}>Python</span>
        <span style={{ background: '#e8f5e9', color: '#43a047', borderRadius: 8, padding: '6px 14px', fontWeight: 600, fontSize: '1rem' }}>BioBERT</span>
        <span style={{ background: '#e8f5e9', color: '#43a047', borderRadius: 8, padding: '6px 14px', fontWeight: 600, fontSize: '1rem' }}>XGBoost</span>
        <span style={{ background: '#e8f5e9', color: '#43a047', borderRadius: 8, padding: '6px 14px', fontWeight: 600, fontSize: '1rem' }}>Random Forest</span>
        <span style={{ background: '#e8f5e9', color: '#43a047', borderRadius: 8, padding: '6px 14px', fontWeight: 600, fontSize: '1rem' }}>Knowledge Graphs</span>
      </div>

      {/* Approach/Explanation */}
      <div style={{ marginBottom: 18, fontSize: '1.05rem', color: '#444' }}>
        <b>How it works:</b> Fine-tunes BioBERT with masked language modeling and knowledge graph context to generate synthetic samples for low-resource classes, boosting model performance on imbalanced clinical datasets.
      </div>

      {/* Impact/Value */}
      <div style={{ background: '#e8f5e9', borderRadius: 10, padding: '16px 18px', marginBottom: 18, fontWeight: 500, color: '#43a047', fontSize: '1.08rem', boxShadow: '0 2px 8px #43a04711' }}>
        <span role="img" aria-label="Impact" style={{ marginRight: 8 }}>💡</span>
        <b>Impact:</b> Enables robust, fair AI for public health by generating high-quality data for underrepresented classes.
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 8 }}>
        <a href="https://github.com/Kahl-d" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
          <button style={{ background: '#43a047', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 22px', fontWeight: 600, fontSize: '1rem', cursor: 'pointer', boxShadow: '0 2px 8px #43a04722' }}>GitHub</button>
        </a>
      </div>
    </div>
  );
} 