import React from 'react';

export default function Project3() {
  return (
    <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'left' }}>
      <h1>🧬 Context-Aware Data Augmentation Tool for Low Data Scenarios</h1>
      <div style={{ color: '#888', fontSize: '1.05rem', marginBottom: 10 }}>Aug 2024 – Dec 2024</div>
      <blockquote style={{ fontStyle: 'italic', color: '#666', marginBottom: 16 }}>
        Fine-tuned BioBERT with masked language modeling and knowledge graph conditioning to generate clinically meaningful synthetic samples for low-resource public health classes.
      </blockquote>
      <h2>🚀 Overview</h2>
      <ul>
        <li>Developed a tool for context-aware data augmentation in low-data, imbalanced public health datasets.</li>
        <li>Generated synthetic samples that preserve clinical meaning and improve downstream model performance.</li>
      </ul>
      <h2>🧠 Technical Highlights</h2>
      <ul>
        <li>Fine-tuned BioBERT with masked language modeling and knowledge graph conditioning.</li>
        <li>Benchmarked against SMOTE and back-translation; outperformed both in precision and recall.</li>
      </ul>
      <h2>📈 Results</h2>
      <ul>
        <li>Improved XGBoost and Random Forest accuracy by 3.5–5% on imbalanced datasets.</li>
        <li>Generated synthetic data that is clinically meaningful and robust for public health applications.</li>
      </ul>
      <h2>🔑 Key Features</h2>
      <ul>
        <li>Context-aware, domain-specific data augmentation for low-resource scenarios.</li>
        <li>Integrates with standard ML pipelines (XGBoost, Random Forest, etc.).</li>
        <li>Open-source and extensible for other domains.</li>
      </ul>
    </div>
  );
} 