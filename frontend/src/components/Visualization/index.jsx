import React from 'react'
import TranslationChart from './translation'
import JobChart from './jobs'
import CommunityChart from './communities'

const Visualizations = () => {
  return (
    <div>
        <h1 className='mt-4'>Our Visualizations</h1>
      <TranslationChart/>
      <JobChart/>
      <CommunityChart/>
    </div>
  )
}

export default Visualizations
