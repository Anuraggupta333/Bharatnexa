import '../boot-loader.css'
import {useEffect, useState} from 'react'

export default function BootLoader({onDone}){
  const [p, setP] = useState(0)
  const [out, setOut] = useState(false)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    document.documentElement.classList.add('booting')
    if (reduce) {
      document.documentElement.classList.remove('booting')
      onDone?.()
      return
    }

    const start = performance.now()
    const dur = 3200
    let raf = 0
    let exitT = 0
    let doneT = 0
    const tick = now => {
      const t = Math.min(1, (now - start) / dur)
      const eased = 1 - Math.pow(1 - t, 2.4)
      setP(eased * 100)
      if (t < 1) raf = requestAnimationFrame(tick)
      else {
        setP(100)
        exitT = window.setTimeout(() => setOut(true), 280)
        doneT = window.setTimeout(() => {
          document.documentElement.classList.remove('booting')
          onDone?.()
        }, 1250)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(exitT)
      clearTimeout(doneT)
      document.documentElement.classList.remove('booting')
    }
  }, [onDone])

  const r = 84
  const circ = 2 * Math.PI * r
  const angle = p * 3.6

  return (
    <div className={`boot ${out ? 'is-out' : ''}`} aria-hidden="true">
      <div className="boot-glow"/>
      <div className="boot-stage">
        <div className="boot-dial">
          <div className="boot-ticks">
            {Array.from({length: 60}, (_, i) => (
              <span
                key={i}
                className={i % 5 === 0 ? 'major' : ''}
                style={{transform: `rotate(${i * 6}deg)`}}
              />
            ))}
          </div>
          <svg viewBox="0 0 200 200" className="boot-svg">
            <circle cx="100" cy="100" r={r} className="boot-track"/>
            <circle
              cx="100" cy="100" r={r}
              className="boot-arc"
              strokeDasharray={circ}
              strokeDashoffset={circ * (1 - p / 100)}
            />
          </svg>
          <div className="boot-needle" style={{transform: `rotate(${angle}deg)`}}>
            <i/>
          </div>
          <div className="boot-core">
            <small>SS MOBILE</small>
            <strong>{String(Math.round(p)).padStart(3, '0')}</strong>
            <em>systems online</em>
          </div>
        </div>
      </div>
    </div>
  )
}
