import React,{useEffect,useState} from 'react'
import Canvas from './components/Canvas'
import axios from "axios";
import Area from './components/Area';


function App() {
  const baseURL = "http://localhost:8000";
  
  const [areas,setAreas] = useState([]);
  useEffect(()=>{
    axios.get(`${baseURL}/area`).then((response)=>{
      setAreas(response.data)
    })
  },[]);
  return (
    <>
    {areas.map((area)=>(<Area area={area} key={area.id}/>))}
    </>
    
  // <Area/>
  )
}

export default App