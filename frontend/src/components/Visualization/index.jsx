import React from 'react'
import TranslationChart from './translation'
import JobChart from './jobs'
import CommunityChart from './communities'

const Visualizations = () => {
  return (
    <div>
        <p>See what our website offers at a glance!</p>
        <h2 className='mt-4'>Service Ratings</h2>
        <TranslationChart/>
        <h2 className='mt-4'>Job Count per Language</h2>
        <JobChart/>
        <h2 className='mt-4'>Community Types per Language</h2>
        <CommunityChart/>
    </div>
  )
}

export default Visualizations
