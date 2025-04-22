import React from 'react';
import ShelterChart from './shelter';
import CommunityChart from './community';
import LegalAidChart from './legalaid';

const Visualizations2 = () => {
  return (
    <div>
      <p>
        See what <a href="https://safeharbortexas.me" target="_blank" rel="noopener noreferrer">SafeHarborTexas </a> offers at a glance!
      </p>
      <h2 className="mt-4">Beds Available by City</h2>
      <ShelterChart/>
      <h2 className='mt-4'>Session Cost Distribution</h2>
      <CommunityChart/>
      <h2 className='mt-4'>Legal Aid Provider Experience</h2>
      <LegalAidChart/>
    </div>
  );
};

export default Visualizations2;
