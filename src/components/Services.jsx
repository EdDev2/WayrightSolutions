import React from 'react'
import './Services.css'

function Services() {
  const services = [
    {
      icon: '📤',
      title: 'Data Collection & Analytics',
      description: 'Including AI readiness assessment and preparation'
    },
    {
      icon: '🔌',
      title: 'Sensor & System Integration',
      description: 'Seamless connection of different data sources'
    },
    {
      icon: '📈',
      title: 'Dashboards & Alerts',
      description: 'Real-time visibility with intelligent notifications'
    },
    {
      icon: '✅',
      title: 'Compliance Support',
      description: 'Meeting regulatory requirements with confidence'
    },
    {
      icon: '⚡',
      title: 'Risk & Performance Insight',
      description: 'Identify risks and seize opportunities'
    },
    {
      icon: '🤝',
      title: 'Practical Ongoing Support',
      description: 'Dedicated partnership throughout your journey'
    }
  ]

  return (
    <section id="services" className="services">
      <div className="container">
        <h2 className="section-title">Our Services</h2>
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
