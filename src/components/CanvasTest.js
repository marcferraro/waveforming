import { useEffect, useRef, useState } from 'react';
import iro from "@jaames/iro"

function Canvas(){
    
    const canvasRef = useRef(null)
    const [color, setColor] = useState("")


    // const draw = ctx => {
    //     ctx.fillStyle = '#000000'
    //     ctx.beginPath()
    //     ctx.arc(50, 100, 20, 0, 2*Math.PI)
    //     ctx.fill()
    // }

    useEffect(() => {

        const div = document.getElementById('picker')
        const colorPicker = new iro.ColorPicker(div, {
            width: 100
        })

        colorPicker.on('color:change', function(color) {
            // log the current color as a HEX string
            ctx.fillStyle = color.hexString
        });

        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')

        ctx.fillStyle = "#FF0000";
        ctx.fillRect( 0, 0, 1, 1 );

        const pos = { x: 0, y: 0 };
        
        function setPosition(e) {
            pos.x = e.offsetX / 15 | 0;
            pos.y = e.offsetY / 15 | 0;
            console.log(pos)
        }

        canvas.addEventListener('mousedown', (e) => {
            // debugger
            setPosition(e)
            ctx.fillRect( pos.x, pos.y, 1, 1 );
        });
        
    //     function draw(e) {
    //         // console.log(e)
    //         // mouse left button must be pressed
    //         if (e.buttons !== 1) return;
          
    //         ctx.beginPath(); // begin
          
    //         ctx.lineWidth = 5;
    //         ctx.lineCap = 'round';
    //         ctx.strokeStyle = '#c0392b';
          
    //         ctx.moveTo(pos.x, pos.y); // from
    //         setPosition(e);
    //         ctx.lineTo(pos.x, pos.y); // to
          
    //         ctx.stroke(); // draw it!
    //     }

    //     // new position from mouse event

    //   function resize() {
    //     ctx.canvas.width = window.innerWidth;
    //     ctx.canvas.height = window.innerHeight;
    //   }
    //     window.addEventListener('resize', resize);
        // document.addEventListener('mousemove', draw);
        // document.addEventListener('mouseenter', setPosition);



    }, [])

    
    return(
        <div >
            <canvas width="16" height="16" style={{width:"240px", height:"240px"}} ref={canvasRef}></canvas>
            <div id="picker"></div>
        </div>
    )
}
export default Canvas

// style={{marginLeft: 180, marginRight: 'auto'}} 