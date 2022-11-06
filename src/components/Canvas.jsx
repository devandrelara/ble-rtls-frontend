import React,{useEffect,useState} from 'react'
import PropTypes from "prop-types";
import useCanvas from "../hooks/useCanvas";
import axios from "axios";
const baseURL = "http://localhost:8000";
const Canvas = props => {
  
  const { draw, options, scanners,area, ...rest } = props;
  const [position,setPosition] = useState({});
  
  useEffect(() => {
    const updatePosition = () => {
      axios.get(`${baseURL}/position/latest/4`).then((response)=>{
        setPosition(response.data)
      })
      setTimeout(updatePosition, 1000);
    }
  updatePosition();
  }, []);

  
  
  const canvasRef = useCanvas(draw, options, scanners, area, position);
  return <canvas ref={canvasRef} width={614} height={635} {...rest} />;
};

Canvas.defaultProps = {
  draw: () => {}
};

Canvas.propTypes = {
  draw: PropTypes.func.isRequired,
  options: PropTypes.shape({
    context: PropTypes.oneOf([
      "2d",
      "webgl",
      "experimental-webgl",
      "webgl2",
      "bitmaprenderer"
    ])
  })
};

export default Canvas;