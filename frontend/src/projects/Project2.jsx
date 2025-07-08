import React from 'react';

export default function Project2() {
  return (
    <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'left' }}>
      <h1>🔒 Secure Sense <span style={{fontSize:'1rem',fontWeight:400}}>(Winner, SF Hacks 2025 Emerging AI Innovation)</span></h1>
      <div style={{ color: '#888', fontSize: '1.05rem', marginBottom: 10 }}>Mar 2025 – Aug 2025</div>
      <blockquote style={{ fontStyle: 'italic', color: '#666', marginBottom: 16 }}>
        Privacy-centric PII redaction tool as a browser extension, using prompt-conditioned LLaMA models for real-time, on-device inference—eliminating cloud reliance and improving data security.
      </blockquote>
      <h2>🚀 Overview</h2>
      <ul>
        <li>Engineered a browser extension for real-time PII redaction using LLaMA models, running fully on-device for maximum privacy.</li>
        <li>Eliminated cloud reliance, ensuring all sensitive data remains local to the user.</li>
      </ul>
      <h2>🧠 Technical Highlights</h2>
      <ul>
        <li>Applied transfer learning and staged knowledge distillation to shrink the model by 80%, while maintaining 94% PII detection accuracy on limited local compute.</li>
        <li>Serverless contingency framework (AWS Lambda + S3) for complex redaction edge cases, supporting hybrid execution paths with 99% operational uptime.</li>
      </ul>
      <h2>📈 Results</h2>
      <ul>
        <li>80% model size reduction with no significant loss in accuracy.</li>
        <li>94% PII detection accuracy on-device.</li>
        <li>99% operational uptime for hybrid cloud/on-device execution.</li>
      </ul>
      <h2>🔑 Key Features</h2>
      <ul>
        <li>Real-time, privacy-first PII redaction in the browser.</li>
        <li>Hybrid execution: on-device by default, serverless fallback for edge cases.</li>
        <li>Modern, user-friendly browser extension UI.</li>
      </ul>
    </div>
  );
} 