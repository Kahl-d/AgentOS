import React from 'react';

export default function Project1() {
  return (
    <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'left' }}>
      <h1>🧠 Aware: Cultural Capital Theme Classification</h1>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
        <img src="https://img.shields.io/badge/Python-3.8+-blue.svg" alt="Python" />
        <img src="https://img.shields.io/badge/PyTorch-2.0+-red.svg" alt="PyTorch" />
        <img src="https://img.shields.io/badge/Transformers-4.20+-green.svg" alt="Transformers" />
        <img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="MIT License" />
        <img src="https://img.shields.io/badge/arXiv-Paper-orange.svg" alt="arXiv" />
      </div>
      <blockquote style={{ fontStyle: 'italic', color: '#666', marginBottom: 16 }}>
        <b>Aware</b>: A multi-stage pipeline for identifying Cultural Capital Themes (CCTs) in student essays using Domain-Adaptive Pre-training, Essay-Aware Architecture, and Multi-Label Classification.
      </blockquote>
      <h2>📖 Overview</h2>
      <p>
        <b>Aware</b> is an innovative framework designed to automatically identify Cultural Capital Themes in student essays, particularly within STEM classrooms. Based on Yosso's (2005) framework of community cultural wealth, this system recognizes 11 distinct cultural capital themes that students bring to educational settings.
      </p>
      <h2>🏗️ Architecture & Approaches</h2>
      <ol>
        <li><b>Domain-Adaptive Pre-training (DAPT):</b> Adapts DeBERTa-v3-large to student essay language patterns.</li>
        <li><b>Essay-Aware Architecture:</b> Processes essays as a whole, using attention pooling and BiLSTM for context.</li>
        <li><b>Multi-Label Classification:</b> Handles theme overlap, class imbalance, and optimal threshold tuning.</li>
      </ol>
      <h3>Key Components</h3>
      <ul>
        <li><b>Model:</b> DeBERTa-v3-large, Transformers, PyTorch</li>
        <li><b>Data:</b> 1,499 essays, 10,921 sentences, 11 cultural capital themes</li>
        <li><b>Techniques:</b> DAPT, BiLSTM, Attention Pooling, Focal Loss, Ensemble Learning</li>
      </ul>
      <h2>📊 Cultural Capital Themes</h2>
      <table style={{ width: '100%', fontSize: '0.95em', marginBottom: 16 }}>
        <thead>
          <tr><th>Theme</th><th>Description</th><th>Example</th></tr>
        </thead>
        <tbody>
          <tr><td>Aspirational</td><td>Future goals and ambitions</td><td>"I want to become a doctor"</td></tr>
          <tr><td>Attainment</td><td>Academic/career achievements</td><td>"I earned my degree"</td></tr>
          <tr><td>Community Consciousness</td><td>Social responsibility</td><td>"I want to help my community"</td></tr>
          <tr><td>Familial</td><td>Family-related motivations</td><td>"My parents sacrificed for me"</td></tr>
          <tr><td>Filial Piety</td><td>Respect for parents/family</td><td>"I must make my family proud"</td></tr>
          <tr><td>First Generation</td><td>First-gen college experiences</td><td>"I'm the first in my family"</td></tr>
          <tr><td>Navigational</td><td>Navigating academic systems</td><td>"I learned to navigate college"</td></tr>
          <tr><td>Perseverance</td><td>Overcoming challenges</td><td>"Despite obstacles, I persisted"</td></tr>
          <tr><td>Resistance</td><td>Resistance to systems</td><td>"I challenge traditional norms"</td></tr>
          <tr><td>Social</td><td>Social connections</td><td>"My friends supported me"</td></tr>
          <tr><td>Spiritual</td><td>Spiritual/philosophical</td><td>"I believe everything happens for a reason"</td></tr>
        </tbody>
      </table>
      <h2>📈 Performance Results</h2>
      <ul>
        <li><b>Base Model Macro F1:</b> 0.5135</li>
        <li><b>Essay-Aware Macro F1:</b> <b>0.5329</b></li>
        <li><b>Micro F1:</b> 0.8255</li>
        <li><b>Hamming Loss:</b> 0.0328</li>
      </ul>
      <h2>📁 Project Structure</h2>
      <pre style={{ background: '#f4f4f4', padding: 10, borderRadius: 6, fontSize: '0.95em', overflowX: 'auto' }}>{`
aware/
├── README.md
├── requirements.txt
├── LICENSE
├── .gitignore
├── Aware-Paper.docx
├── base_cls.png
├── essay_aware.png
│
├── multi-base/
│   ├── base_model.py
│   ├── train.csv
│   ├── test.csv
│   ├── run_job.sh
│   └── proto/
│
├── multi-ea/
│   ├── essay_aware_model.py
│   ├── train_essay_aware.csv
│   ├── test_essay_aware.csv
│   ├── run_job.sh
│   └── models_essay_aware/
│
├── dapt/
│   ├── train.py
│   ├── test.py
│   ├── combined_essays.csv
│   ├── run_job.sh
│   └── deberta-v3-large-essays-adapted-final/
│
├── data/
│   ├── Attainment_essayaware_train.csv
│   └── Attainment_essayaware_test.csv
│
└── logs/
    ├── training_log_essay_aware.log
    └── training_proto.log
`}</pre>
      <h2>🔬 Research Impact</h2>
      <ul>
        <li>Automates expert-level annotation of cultural capital themes in essays</li>
        <li>Supports equity and policy development in STEM education</li>
        <li>First computational framework for CCT identification</li>
        <li>Novel essay-aware architecture and domain adaptation</li>
      </ul>
      <h2>📞 Contact</h2>
      <p><b>Author:</b> Khalid Khan<br/>
      <b>Email:</b> kkhan@sfsu.edu<br/>
      <b>Institution:</b> San Francisco State University<br/>
      <b>Research Area:</b> Educational Technology, NLP, Equity in STEM</p>
      <div style={{ marginTop: 24, textAlign: 'center', fontWeight: 600 }}>
        Empowering educators to recognize and value student cultural capital through AI
      </div>
    </div>
  );
} 