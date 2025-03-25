// filepath: /c:/Users/User-10/Documents/react tutorial/food del/frontend/src/pages/Home/Home.jsx
import React from 'react'
import './Home.css'
import Header from '../../Componenets/Header/Header'
import ExploreMenu from '../../Componenets/ExploreMenu/ExploreMenu'
import { useState } from 'react'
import ItemDisplay from '../../Componenets/ItemDisplay/ItemDisplay'
import AppDownload from '../../Componenets/AppDownload/AppDownload'
function Home() {
   const [category,setCategory]=useState("All");
  return (
    <div>
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />
      <ItemDisplay category={category}/>
      <AppDownload/>
    </div>
  )
}

export default Home