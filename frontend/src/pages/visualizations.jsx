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

      <br/>
      <br/>
      <br/>

      <div>
      Self critique<br/>
What did we do well?<br/>
We were able to accomplish our goal of creating a website that provides a multitude of services for non-English speakers<br/>
What did we learn?<br/>
We learned how to work collaboratively on larger projects<br/>
What did we teach each other?<br/>
Each team member had unique skill sets that the other team members were able to learn from<br/>
What can we do better?<br/>
We wanted to spend more time polishing our website’s visuals and design<br/>
What effect did the peer reviews have?<br/>
We were able to improve our site further due to their feedback<br/>
What puzzles us?<br/>
We were puzzled by how best to serve the non-English communities in Texas (what services to include, etc.)<br/>
<br/>
Other critique (SafeHarborTX)<br/>
What did they do well?<br/>
We liked their pictures. The splash page looks amazing, and the design of the website is very cohesive overall.<br/>
How effective was their RESTful API?<br/>
It was very descriptive and easy to use.<br/>
How well did they implement your user stories?<br/>
They implemented them well, and asked for clarification when needed.<br/>
What did we learn from their website?<br/>
We learned that good visual design can be compelling. It is a very informative website if anyone is ever in need of help.<br/>
What can they do better?<br/>
They could fix some small inconsistencies, such as card width, but otherwise good.<br/>
What puzzles us about their website?<br/>
We were puzzled by the button that links to Domino’s pizza.<br/>

      </div>
    </div>

    
  );
};

export default VisualizationsPage;
