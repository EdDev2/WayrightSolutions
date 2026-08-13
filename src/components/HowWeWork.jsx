import React from 'react'
import './HowWeWork.css'

function HowWeWork() {
  const workflows = [
    {
      title: 'Compliance Checks',
      description: 'Audit your current data landscape, identify compliance gaps, and map requirements.'
    },
    {
      title: 'Data Connection & Cleaning',
      description: 'Connect systems, standardize formats, and prepare data for meaningful analysis.'
    },
    {
      title: 'Analytics & Insights',
      description: 'Build dashboards, define KPIs, and extract actionable intelligence from your data.'
    }
  ]

  return (
    <section className="how-we-work">
      <div className="container">
        <h2 className="section-title">How We Work</h2>
        <p className="section-subtitle">
          Our approach combines strategic thinking with hands-on execution
        </p>
        <div className="workflow-grid">
          {workflows.map((workflow, index) => (
            <div key={index} className="workflow-item">
              <div className="workflow-number">{index + 1}</div>
              <h3>{workflow.title}</h3>
              <p>{workflow.description}</p>
              {index < workflows.length - 1 && <div className="workflow-arrow">→</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowWeWork
