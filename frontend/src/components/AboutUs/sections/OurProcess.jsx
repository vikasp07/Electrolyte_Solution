import React, { useState } from 'react';
import '../styles/OurProcess.css';

const OurProcess = () => {
  const [activeStep, setActiveStep] = useState(null);

  const processSteps = [
    {
      number: '1',
      title: 'Discover Phase',
      icon: 'ri-search-line',
      description: 'The first step in our process is to understand the client\'s requirements and gain deep insights into their business, operational goals, and existing infrastructure.'
    },
    {
      number: '2',
      title: 'Analyzing Phase',
      icon: 'ri-bar-chart-line',
      description: 'Once we have a clear understanding of the client\'s environment and needs, we move on to analyzing the gathered data.'
    },
    {
      number: '3',
      title: 'Designing Phase',
      icon: 'ri-pencil-line',
      description: 'In this phase, we create a customized solution design that is aligned with the client\'s business goals and technological requirements. This is where our extensive industry expertise in cybersecurity, HPC, and storage comes into play.'
    },
    {
      number: '4',
      title: 'Testing Phase',
      icon: 'ri-test-tube-line',
      description: 'Once the solution has been designed, we proceed to the testing phase in our local cyber Labs to ensure it meets the required standards and functions as expected in real-world conditions.'
    },
    {
      number: '5',
      title: 'Deployment Phase',
      icon: 'ri-rocket-line',
      description: 'After successful testing, we move to the deployment phase, where the solution is implemented and integrated into the client\'s live environment.'
    },
    {
      number: '6',
      title: 'Support Phase',
      icon: 'ri-service-line',
      description: 'Post-deployment, we continue to support our clients through the support phase. This is an ongoing phase where we ensure that the system remains operational, secure, and optimized.'
    }
  ];

  return (
    <section className="our-process">
      <div className="container">
        <h2 className="section-title">Our Process</h2>
        <p className="section-subtitle">From Consultation to Implementation</p>

        <div className="process-timeline">
          <div className="process-grid">
            {processSteps.map((step, index) => (
              <div 
                key={index} 
                className={`process-step ${activeStep === index ? 'active' : ''}`}
                onMouseEnter={() => setActiveStep(index)}
                onMouseLeave={() => setActiveStep(null)}
              >
                <div className="step-icon">
                  <i className={step.icon}></i>
                </div>
                <h3 className="step-number">{step.number}</h3>
                <h4 className="step-title">{step.title}</h4>
                <p className="step-description">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurProcess;
