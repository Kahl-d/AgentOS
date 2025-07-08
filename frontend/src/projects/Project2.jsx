import React from 'react';

export default function Project2() {
  return (
    <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'left', fontFamily: 'inherit' }}>
      {/* Project Title & One-liner */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 8 }}>
        <img src="https://img.icons8.com/color/48/000000/security-checked.png" alt="Secure Sense" style={{ width: 44, height: 44, borderRadius: 10, background: '#fff' }} />
        <div>
          <h1 style={{ margin: 0, fontSize: '2rem', fontWeight: 700, color: '#ff7043' }}>Secure Sense: Privacy-Centric PII Redaction</h1>
          <div style={{ color: '#ff7043', fontWeight: 500, fontSize: '1.1rem' }}>On-device AI for real-time, secure data privacy</div>
        </div>
      </div>

      {/* Summary */}
      <div style={{ fontSize: '1.08rem', margin: '18px 0 18px 0', color: '#333', lineHeight: 1.6 }}>
        Secure Sense is an award-winning browser extension that uses prompt-conditioned LLaMA models for real-time, on-device PII redaction—eliminating cloud reliance and maximizing data security. Winner of SF Hacks 2025 Emerging AI Innovation.
      </div>

      {/* Key Results/Stats (vertical cards for variety) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 18, maxWidth: 340 }}>
        <div style={{ background: '#fff3e0', borderRadius: 12, padding: '14px 20px', textAlign: 'left', boxShadow: '0 2px 8px #ff704311' }}>
          <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ff7043' }}>94% PII Detection Accuracy</div>
          <div style={{ fontSize: '0.98rem', color: '#555' }}>on limited local compute</div>
        </div>
        <div style={{ background: '#fff3e0', borderRadius: 12, padding: '14px 20px', textAlign: 'left', boxShadow: '0 2px 8px #ff704311' }}>
          <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ff7043' }}>80% Model Size Reduction</div>
          <div style={{ fontSize: '0.98rem', color: '#555' }}>via transfer learning & distillation</div>
        </div>
        <div style={{ background: '#fff3e0', borderRadius: 12, padding: '14px 20px', textAlign: 'left', boxShadow: '0 2px 8px #ff704311' }}>
          <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ff7043' }}>99% Uptime</div>
          <div style={{ fontSize: '0.98rem', color: '#555' }}>with serverless AWS Lambda/S3</div>
        </div>
      </div>

      {/* Tech Stack */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 18, flexWrap: 'wrap' }}>
        <span style={{ background: '#ffe0b2', color: '#ff7043', borderRadius: 8, padding: '6px 14px', fontWeight: 600, fontSize: '1rem' }}>Python</span>
        <span style={{ background: '#ffe0b2', color: '#ff7043', borderRadius: 8, padding: '6px 14px', fontWeight: 600, fontSize: '1rem' }}>LLaMA</span>
        <span style={{ background: '#ffe0b2', color: '#ff7043', borderRadius: 8, padding: '6px 14px', fontWeight: 600, fontSize: '1rem' }}>Transfer Learning</span>
        <span style={{ background: '#ffe0b2', color: '#ff7043', borderRadius: 8, padding: '6px 14px', fontWeight: 600, fontSize: '1rem' }}>Distillation</span>
        <span style={{ background: '#ffe0b2', color: '#ff7043', borderRadius: 8, padding: '6px 14px', fontWeight: 600, fontSize: '1rem' }}>AWS Lambda</span>
        <span style={{ background: '#ffe0b2', color: '#ff7043', borderRadius: 8, padding: '6px 14px', fontWeight: 600, fontSize: '1rem' }}>S3</span>
      </div>

      {/* Approach/Explanation */}
      <div style={{ marginBottom: 18, fontSize: '1.05rem', color: '#444' }}>
        <b>How it works:</b> Secure Sense uses prompt-conditioned LLaMA models for on-device PII detection and redaction, with staged knowledge distillation to shrink the model by 80%. A serverless AWS Lambda/S3 framework handles complex edge cases, ensuring privacy and reliability.
      </div>

      {/* Impact/Value */}
      <div style={{ background: '#fff3e0', borderRadius: 10, padding: '16px 18px', marginBottom: 18, fontWeight: 500, color: '#ff7043', fontSize: '1.08rem', boxShadow: '0 2px 8px #ff704311' }}>
        <span role="img" aria-label="Impact" style={{ marginRight: 8 }}>🔒</span>
        <b>Impact:</b> Enables real-time, privacy-centric PII redaction for end users—no cloud required.
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 8 }}>
        <a href="https://github.com/Kahl-d" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
          <button style={{ background: '#ff7043', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 22px', fontWeight: 600, fontSize: '1rem', cursor: 'pointer', boxShadow: '0 2px 8px #ff704322' }}>GitHub</button>
        </a>
      </div>
    </div>
  );
} 