import React, { useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {
  Routes,
  Route,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';

const App = () => {
  const newDotOrgApiKey = process.env.REACT_APP_NEWS_DOT_ORG_API_KEY

  const [progress, setProgress] = useState(0)

    return (
      <div>
        <React.StrictMode>
          <Navbar/>
          <LoadingBar
          color='#f11946'
          progress={progress}
          height={4}/>
          <Routes>
            <Route path="/" element={<News key="general" pageSize={12} country={"in"} category={"general"} setProgress={setProgress} newsDotOrgApiKey={newDotOrgApiKey}/>}/>
            <Route path="/business" element={<News key="business" pageSize={12} country={"in"} category={"business"} setProgress={setProgress} newsDotOrgApiKey={newDotOrgApiKey}/>}/>
            <Route path="/entertainment" element={<News key="entertainment" pageSize={12} country={"in"} category={"entertainment"} setProgress={setProgress} newsDotOrgApiKey={newDotOrgApiKey}/>}/>
            <Route path="/health" element={<News key="health" pageSize={12} country={"in"} category={"health"} setProgress={setProgress} newsDotOrgApiKey={newDotOrgApiKey}/>}/> 
            <Route path="/science" element={<News key="science" pageSize={12} country={"in"} category={"science"} setProgress={setProgress} newsDotOrgApiKey={newDotOrgApiKey}/>}/> 
            <Route path="/sports" element={<News key="sports" pageSize={12} country={"in"} category={"sports"} setProgress={setProgress} newsDotOrgApiKey={newDotOrgApiKey}/>}/>
            <Route path="/technology" element={<News key="technology" pageSize={12} country={"in"} category={"technology"} setProgress={setProgress} newsDotOrgApiKey={newDotOrgApiKey}/>}/>
          </Routes>
          
        </React.StrictMode>
      </div>
    )
  }

 export default App;