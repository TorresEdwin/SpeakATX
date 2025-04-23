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

      <div className="max-w-5xl mx-auto p-4 ">
      {/* Self Critique Section */}
      <h2 className="text-2xl font-bold mb-4">Self Critique</h2>
      <table className="table-auto w-full border-collapse border border-gray-300 mb-8">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2 text-left">Question</th>
            <th className="border border-gray-300 p-2 text-left">Response</th>
          </tr>
        </thead>
        <tbody>
          <tr className="even:bg-gray-50">
            <td className="border border-gray-300 p-2 font-medium">What did we do well?</td>
            <td className="border border-gray-300 p-2">We were able to accomplish our goal of creating a website that provides a multitude of services for non-English speakers.</td>
          </tr>
          <tr className="even:bg-gray-50">
            <td className="border border-gray-300 p-2 font-medium">What did we learn?</td>
            <td className="border border-gray-300 p-2">We learned how to collaborate effectively on a large-scale project.</td>
          </tr>
          <tr className="even:bg-gray-50">
            <td className="border border-gray-300 p-2 font-medium">What did we teach each other?</td>
            <td className="border border-gray-300 p-2">Each team member had unique skill sets that the other team members were able to learn from.</td>
          </tr>
          <tr className="even:bg-gray-50">
            <td className="border border-gray-300 p-2 font-medium">What can we do better?</td>
            <td className="border border-gray-300 p-2">We wanted to spend more time refining the website’s visuals and overall design.</td>
          </tr>
          <tr className="even:bg-gray-50">
            <td className="border border-gray-300 p-2 font-medium">What effect did the peer reviews have?</td>
            <td className="border border-gray-300 p-2">They helped us improve our site through constructive feedback.</td>
          </tr>
          <tr className="even:bg-gray-50">
            <td className="border border-gray-300 p-2 font-medium">What puzzles us?</td>
            <td className="border border-gray-300 p-2">We were unsure how best to serve non-English-speaking communities in Texas—especially which services to include.</td>
          </tr>
        </tbody>
      </table>


      <h2 className="mt-4 text-2xl font-bold mb-4">Other Critique: SafeHarborTX</h2>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2 text-left">Question</th>
            <th className="border border-gray-300 p-2 text-left">Response</th>
          </tr>
        </thead>
        <tbody>
          <tr className="even:bg-gray-50">
            <td className="border border-gray-300 p-2 font-medium">What did they do well?</td>
            <td className="border border-gray-300 p-2">The visuals were impressive, especially the splash page. The site design felt cohesive and professional.</td>
          </tr>
          <tr className="even:bg-gray-50">
            <td className="border border-gray-300 p-2 font-medium">How effective was their RESTful API?</td>
            <td className="border border-gray-300 p-2">It was well-documented and easy to use.</td>
          </tr>
          <tr className="even:bg-gray-50">
            <td className="border border-gray-300 p-2 font-medium">How well did they implement your user stories?</td>
            <td className="border border-gray-300 p-2">They implemented them thoughtfully and reached out when clarification was needed.</td>
          </tr>
          <tr className="even:bg-gray-50">
            <td className="border border-gray-300 p-2 font-medium">What did we learn from their website?</td>
            <td className="border border-gray-300 p-2">We saw how impactful clean and appealing visual design can be. Their site is informative and helpful.</td>
          </tr>
          <tr className="even:bg-gray-50">
            <td className="border border-gray-300 p-2 font-medium">What can they do better?</td>
            <td className="border border-gray-300 p-2">Fix small inconsistencies such as card width, but overall the site was good.</td>
          </tr>
          <tr className="even:bg-gray-50">
            <td className="border border-gray-300 p-2 font-medium">What puzzles us?</td>
            <td className="border border-gray-300 p-2">We were puzzled by the button that links to Domino’s pizza.</td>
          </tr>
        </tbody>
      </table>
    </div>

    </div>

    
  );
};

export default VisualizationsPage;
