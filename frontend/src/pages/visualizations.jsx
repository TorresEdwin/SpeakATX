import React, { useState } from 'react';
import Visualizations from '../components/Visualization';
import Visualizations2 from '../components/Visualization2';

const VisualizationsPage = () => {
  const [activeComponent, setActiveComponent] = useState('viz1'); // default to Visualizations

  return (
    
    <div style={{ textAlign: 'center', marginTop: '60px'}}>
      <h1 className='mt-4'>Data Visualizations</h1>
      <div style={{ marginBottom: '20px' }}>
      <button
        className={`visual-button ${activeComponent === 'viz1' ? 'active' : ''}`}
        onClick={() => setActiveComponent('viz1')}
        >
        SpeakATX
        </button>
        <button
        className={`visual-button ${activeComponent === 'viz2' ? 'active' : ''}`}
        onClick={() => setActiveComponent('viz2')}
        >
        SafeHarborTexas
        </button>

      </div>

      {activeComponent === 'viz1' && <Visualizations />}
      {activeComponent === 'viz2' && <Visualizations2 />}
    </div>
  );
};

export default VisualizationsPage;
