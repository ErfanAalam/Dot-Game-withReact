import { useState } from 'react'
import './App.css'
import { COLORS } from './Colors'

function App() {

  const [positions, setpositions] = useState([])
  const [removedDots, setRemovedDots] = useState([])
  const [color, setColor] = useState(0)


  function handleMouse(e) {
    setColor(Math.floor(Math.random() * 8))
    setpositions(prev => [...prev, { x: e.clientX, y: e.clientY , dotColor: COLORS[color]}])
  }

  function handleUndo(e) {
    e.preventDefault()
    if (positions.length > 0) {
      let removedDot = positions.pop()

      setRemovedDots(prev => [...prev, removedDot])
    }
  }

  function handleRedo(e) {
    e.preventDefault()

    if (removedDots.length > 0) {
      const newRemovedDots = [...removedDots];
      const redoDot = newRemovedDots.pop();
      setRemovedDots(newRemovedDots);
      setpositions(prev => [...prev, redoDot])
    }
  }

  function handleReset(e) {

    setpositions([])
  }


  return (
    <div>
      <div className="buttons">
        <button onClick={(e) => handleReset(e)}>Reset</button>
        <button onClick={(e) => handleUndo(e)} disabled={positions.length === 0}>Undo</button>
        <button onClick={(e) => handleRedo(e)} disabled={removedDots.length === 0}>Redo</button>
      </div>
      <div className='maindiv' onClick={(e) => handleMouse(e)}>

        {
          positions.map((dot, index) => {
            return <div key={index} className='dot' style={{ backgroundColor: `${dot.dotColor}`, left: `${dot.x}px`, top: `${dot.y}px` }}></div>
          })
        }

      </div>

    </div>
  )
}

export default App
