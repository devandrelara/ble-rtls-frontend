import Canvas from './Canvas'
import React,{useEffect,useState} from 'react'
import axios from "axios";

const mt_to_px = (mt_value, area_mt_value, area_pixel) =>{
  const RATIO = area_pixel/area_mt_value
  return mt_value*RATIO

}

const baseURL = "http://localhost:8000";
const draw = (ctx, frameCount, area, scanners, position) => {
  
  var floorplan_image = new Image();
  floorplan_image.src = area.floorplan
  floorplan_image.onload = function() {
    ctx.drawImage(floorplan_image,0,0);
  }
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  ctx.drawImage(floorplan_image,0,0);
  ctx.fillStyle = '#cc0000'

  ctx.beginPath()
  // DRAW SCANNERS
  // scanners.map((scanner)=>{
  //   ctx.moveTo(mt_to_px(scanner.x_pos,area.width,floorplan_image.width ), mt_to_px(scanner.y_pos,area.height,floorplan_image.height ))
  //   ctx.arc(mt_to_px(scanner.x_pos,area.width,floorplan_image.width ), mt_to_px(scanner.y_pos,area.height,floorplan_image.height ), 20+5*Math.sin(frameCount*0.05)**2, 0, 2*Math.PI)
  // })
  // DRAW POSITIONS
  console.log(mt_to_px(position.x,area.width,floorplan_image.width ), mt_to_px(position.y,area.height,floorplan_image.height ));
  ctx.moveTo(mt_to_px(position.x,area.width,floorplan_image.width ), mt_to_px(position.y,area.height,floorplan_image.height ))
  // ctx.arc(mt_to_px(position.x,area.width,floorplan_image.width ), mt_to_px(position.y,area.height,floorplan_image.height ), 5+5*Math.sin(frameCount*0.05)**2, 0, 2*Math.PI)
  ctx.arc(mt_to_px(position.x,area.width,floorplan_image.width ), mt_to_px(position.y,area.height,floorplan_image.height ),10, 0, 2*Math.PI)
  ctx.fill()
  
  
  
}
const Area = props => {

  const area = props.area

  const [scanners,setScanners] = useState([]);
  
  useEffect(()=>{
    axios.get(`${baseURL}/scanner/area/${area.id}`).then((response)=>{
      setScanners(response.data)
    })
  },[]);

  
  return <Canvas draw={draw} scanners={scanners} area={area} />
};

export default Area