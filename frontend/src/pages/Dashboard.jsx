import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useState } from 'react'
import Dashprofile from '../components/Dashprofile'
import Dashsidebar from '../components/Dashsidebar'
import Dashpposts from '../components/Dashpposts'
import DashUsers from '../components/DashUsers'

const DashBoard = () => {
  const location = useLocation()
  const [tab,settab] = useState('');
  useEffect(
    ()=>
    {
      const searchparams = new URLSearchParams(location.search)
      const taburl = searchparams.get('tab')
      if(taburl) settab(taburl)
    },[location.search])
  return (
    <div className='min-h-screen flex flex-col md:flex-row pt-14'>
      <Dashsidebar/> 
      {tab === 'profile' && <Dashprofile/>}
      {tab === 'posts' && <Dashpposts/>}
      {tab === 'users' && <DashUsers/>}
    
    </div>
  )
}

export default DashBoard