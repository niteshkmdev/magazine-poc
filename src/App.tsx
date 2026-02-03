import { useState } from 'react';
import '@assets/css/app.css';
import { DEMOS, type DemoKey } from '@app/demo';

export default function App() {
  const [activeDemo, setActiveDemo] = useState<DemoKey | null>(null);

  if (activeDemo) {
    const demo = DEMOS.find(d => d.key === activeDemo)!;

    return (
      <div className="container">
        <button
          className="back-btn"
          onClick={() => setActiveDemo(null)}
        >
          ← Back
        </button>

        {demo.render()}
      </div>
    );
  }

  return (
    <div className="container demo-home">
      <h1>UI Demos</h1>

      <div className="demo-grid">
        {DEMOS.map(demo => (
          <button
            key={demo.key}
            className="demo-card"
            onClick={() => setActiveDemo(demo.key)}
          >
            <h3>{demo.title}</h3>
            <p>{demo.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
