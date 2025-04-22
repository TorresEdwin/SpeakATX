import React from 'react'
import TranslationChart from './translation'
import JobChart from './jobs'
import CommunityChart from './communities'

const Visualizations = () => {
  return (
    <div>
        <p>See what our website offers at a glance!</p>
        <h2 className='mt-4'>Community Member Counts per Language</h2>
        <CommunityChart/>
        <h2 className='mt-4'>Service Ratings</h2>
        <TranslationChart/>
        <h2 className='mt-4'>Common Job Titles</h2>
        <JobChart/>
    </div>
  )
}

export default Visualizations
