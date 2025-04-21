import React from 'react'
import TranslationChart from './translation'
import JobChart from './jobs'
import CommunityChart from './communities'

const Visualizations = () => {
  return (
    <div>
        <h1 className='mt-4'>Data Visualizations</h1>
        <p>See what our website offers at a glance!</p>
        <TranslationChart/>
        <JobChart/>
        <CommunityChart/>
    </div>
  )
}

export default Visualizations
