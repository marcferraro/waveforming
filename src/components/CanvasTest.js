import { useEffect, useRef } from 'react';

function Canvas(){
    
    const canvasRef = useRef(null)


    // const draw = ctx => {
    //     ctx.fillStyle = '#000000'
    //     ctx.beginPath()
    //     ctx.arc(50, 100, 20, 0, 2*Math.PI)
    //     ctx.fill()
    // }

    useEffect(() => {

        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        const pos = { x: 0, y: 0 };
        
        function draw(e) {
            // console.log(e)
            // mouse left button must be pressed
            if (e.buttons !== 1) return;
          
            ctx.beginPath(); // begin
          
            ctx.lineWidth = 5;
            ctx.lineCap = 'round';
            ctx.strokeStyle = '#c0392b';
          
            ctx.moveTo(pos.x, pos.y); // from
            setPosition(e);
            ctx.lineTo(pos.x, pos.y); // to
          
            ctx.stroke(); // draw it!
        }

        // new position from mouse event
      function setPosition(e) {
          pos.x = e.clientX;
          pos.y = e.clientY;
      }

      function resize() {
        ctx.canvas.width = window.innerWidth;
        ctx.canvas.height = window.innerHeight;
      }
        window.addEventListener('resize', resize);
        document.addEventListener('mousemove', draw);
        document.addEventListener('mousedown', setPosition);
        document.addEventListener('mouseenter', setPosition);



    }, [])

    
    return(
        <div >
            <canvas width="16" height="16" style={{width:"240px", height:"240px"}} ref={canvasRef}></canvas>
        </div>
    )
}
export default Canvas

// style={{marginLeft: 180, marginRight: 'auto'}} 