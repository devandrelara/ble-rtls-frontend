import { useRef, useEffect } from "react";



const useCanvas = (draw, options = {}, scanners, area, position) => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext(options.context || "2d");
    let frameCount = 0;
    let animationFrameId;
    const render = () => {
      frameCount++;
      draw(context, frameCount, area, scanners, position);
      animationFrameId = window.requestAnimationFrame(render);
    };
    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [draw,scanners,position]);

  return canvasRef;
};

export default useCanvas;