import React, { useState } from 'react';

const SKILL_CATEGORIES = [
  {
    name: 'Programming & Tools',
    skills: [
      'Python', 'SQL', 'PyTorch', 'LangChain', 'Flask', 'FastAPI',
    ],
  },
  {
    name: 'Data Science & ML',
    skills: [
      'Predictive Modeling (Classification, Regression)',
      'Feature Engineering',
      'Ensemble Methods (Random Forest, XGBoost)',
      't-SNE',
      'Model Evaluation',
    ],
  },
  {
    name: 'AI / LLMs',
    skills: [
      'Transformers (BERT, T5, Mistral-7B)',
      'Named Entity Recognition',
      'Fine-Tuning',
      'Retrieval-Augmented Generation (RAG)',
      'Semantic Search',
      'Agentic AI',
    ],
  },
  {
    name: 'MLOps & Cloud',
    skills: [
      'AWS',
      'Experiment Design & Monitoring',
      'Model Deployment',
      'Vector Databases',
    ],
  },
];

export default function SkillsWidget() {
  const [expanded, setExpanded] = useState([]);
  const [search, setSearch] = useState('');

  const toggle = (cat) => {
    setExpanded((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const filterSkills = (skills) =>
    skills.filter((s) => s.toLowerCase().includes(search.toLowerCase()));

  // Auto-expand categories with matches when searching
  const autoExpanded = search
    ? SKILL_CATEGORIES.filter(cat => filterSkills(cat.skills).length > 0).map(cat => cat.name)
    : expanded;

  return (
    <div className="skills-widget-macos">
      <div className="skills-title">Skills</div>
      <input
        className="skills-search"
        type="text"
        placeholder="Search skills..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        aria-label="Search skills"
      />
      <div className="skills-categories">
        {SKILL_CATEGORIES.map((cat) => {
          const filtered = filterSkills(cat.skills);
          if (search && filtered.length === 0) return null;
          const isOpen = autoExpanded.includes(cat.name);
          return (
            <div className="skills-category" key={cat.name}>
              <button
                className="skills-category-toggle"
                onClick={() => toggle(cat.name)}
                aria-expanded={isOpen}
                aria-controls={`skills-list-${cat.name}`}
              >
                <span className="skills-category-arrow" aria-hidden>{isOpen ? '▼' : '▶'}</span>
                <span className="skills-category-name">{cat.name}</span>
              </button>
              <div
                className="skills-list-wrapper"
                id={`skills-list-${cat.name}`}
                style={{
                  maxHeight: isOpen ? Math.min(filtered.length * 36 + 12, 144) : 0,
                  transition: 'max-height 0.25s cubic-bezier(.4,1.6,.6,1)',
                  overflow: 'hidden',
                }}
              >
                <ul className="skills-list">
                  {filtered.map((skill) => (
                    <li className="skills-list-item" key={skill}>{skill}</li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
} 