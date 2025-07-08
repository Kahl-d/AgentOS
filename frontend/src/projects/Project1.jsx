import React from 'react';

export default function Project1() {
  return (
    <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'left', fontFamily: 'inherit' }}>
      {/* Project Title & One-liner */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 8 }}>
        <img src="https://img.icons8.com/color/48/000000/brain.png" alt="Aware" style={{ width: 44, height: 44, borderRadius: 10, background: '#fff' }} />
        <div>
          <h1 style={{ margin: 0, fontSize: '2rem', fontWeight: 700 }}>Aware: Cultural Capital Theme Classification</h1>
          <div style={{ color: '#6c63ff', fontWeight: 500, fontSize: '1.1rem' }}>State-of-the-art AI for understanding student essays</div>
        </div>
      </div>

      {/* Summary */}
      <div style={{ fontSize: '1.08rem', margin: '18px 0 18px 0', color: '#333', lineHeight: 1.6 }}>
        Aware is an award-winning, state-of-the-art NLP framework that automatically identifies 11 cultural capital themes in student essays. Leveraging domain-adaptive pretraining and a novel essay-aware architecture, Aware outperforms BERT baselines by 4–5% and enables scalable, expert-level annotation for educational equity research.
      </div>

      {/* Key Results/Stats */}
      <div style={{ display: 'flex', gap: 18, marginBottom: 18, flexWrap: 'wrap' }}>
        <div style={{ background: '#f3f4fa', borderRadius: 12, padding: '16px 22px', minWidth: 120, textAlign: 'center', boxShadow: '0 2px 8px #6c63ff11' }}>
          <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#6c63ff' }}>0.533</div>
          <div style={{ fontSize: '0.98rem', color: '#555' }}>Macro F1 (SOTA)</div>
        </div>
        <div style={{ background: '#f3f4fa', borderRadius: 12, padding: '16px 22px', minWidth: 120, textAlign: 'center', boxShadow: '0 2px 8px #6c63ff11' }}>
          <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#6c63ff' }}>0.826</div>
          <div style={{ fontSize: '0.98rem', color: '#555' }}>Micro F1</div>
        </div>
        <div style={{ background: '#f3f4fa', borderRadius: 12, padding: '16px 22px', minWidth: 120, textAlign: 'center', boxShadow: '0 2px 8px #6c63ff11' }}>
          <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#6c63ff' }}>1,499</div>
          <div style={{ fontSize: '0.98rem', color: '#555' }}>Essays</div>
        </div>
        <div style={{ background: '#f3f4fa', borderRadius: 12, padding: '16px 22px', minWidth: 120, textAlign: 'center', boxShadow: '0 2px 8px #6c63ff11' }}>
          <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#6c63ff' }}>11</div>
          <div style={{ fontSize: '0.98rem', color: '#555' }}>Themes</div>
        </div>
      </div>

      {/* Tech Stack */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 18, flexWrap: 'wrap' }}>
        <span style={{ background: '#e6e8ff', color: '#3a3a5a', borderRadius: 8, padding: '6px 14px', fontWeight: 600, fontSize: '1rem' }}>Python</span>
        <span style={{ background: '#e6e8ff', color: '#3a3a5a', borderRadius: 8, padding: '6px 14px', fontWeight: 600, fontSize: '1rem' }}>PyTorch</span>
        <span style={{ background: '#e6e8ff', color: '#3a3a5a', borderRadius: 8, padding: '6px 14px', fontWeight: 600, fontSize: '1rem' }}>Transformers</span>
        <span style={{ background: '#e6e8ff', color: '#3a3a5a', borderRadius: 8, padding: '6px 14px', fontWeight: 600, fontSize: '1rem' }}>DeBERTa-v3</span>
        <span style={{ background: '#e6e8ff', color: '#3a3a5a', borderRadius: 8, padding: '6px 14px', fontWeight: 600, fontSize: '1rem' }}>BiLSTM</span>
        <span style={{ background: '#e6e8ff', color: '#3a3a5a', borderRadius: 8, padding: '6px 14px', fontWeight: 600, fontSize: '1rem' }}>Focal Loss</span>
      </div>

      {/* Approach/Explanation */}
      <div style={{ marginBottom: 18, fontSize: '1.05rem', color: '#444' }}>
        <b>How it works:</b> Aware adapts DeBERTa-v3 to student essay language (DAPT), processes essays as a whole with attention pooling and BiLSTM, and uses multi-label classification to identify overlapping cultural capital themes. This approach enables robust, scalable annotation even with class imbalance and theme overlap.
      </div>

      {/* Impact/Value */}
      <div style={{ background: '#e6e8ff', borderRadius: 10, padding: '16px 18px', marginBottom: 18, fontWeight: 500, color: '#23262f', fontSize: '1.08rem', boxShadow: '0 2px 8px #6c63ff11' }}>
        <span role="img" aria-label="Impact" style={{ marginRight: 8 }}>🚀</span>
        <b>Impact:</b> Automates expert-level annotation, supports equity and policy in STEM education, and reduces manual workload by 75%.
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 8 }}>
        <a href="https://github.com/Kahl-d" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
          <button style={{ background: '#23262f', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 22px', fontWeight: 600, fontSize: '1rem', cursor: 'pointer', boxShadow: '0 2px 8px #6c63ff22' }}>GitHub</button>
        </a>
      </div>
    </div>
  );
} 