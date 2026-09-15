import {useEffect, useRef} from 'react'

export default function HeroDeck(){
  const root = useRef(null)
  const world = useRef(null)

  useEffect(() => {
    const wrap = root.current
    const el = world.current
    if (!wrap || !el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let tx = 0, ty = 0, cx = 0, cy = 0, raf = 0
    const fine = window.matchMedia('(pointer: fine)').matches
    const move = e => {
      if (!fine) return
      const b = wrap.getBoundingClientRect()
      tx = ((e.clientX - b.left) / b.width - 0.5) * 2
      ty = ((e.clientY - b.top) / b.height - 0.5) * 2
    }
    const leave = () => { tx = 0; ty = 0 }
    const tick = () => {
      cx += (tx - cx) * 0.08
      cy += (ty - cy) * 0.08
      el.style.transform = `rotateX(${(18 - cy * 10).toFixed(2)}deg) rotateY(${(-26 + cx * 18).toFixed(2)}deg)`
      wrap.style.setProperty('--mx', `${50 + cx * 30}%`)
      wrap.style.setProperty('--my', `${40 + cy * 24}%`)
      raf = requestAnimationFrame(tick)
    }
    wrap.addEventListener('pointermove', move, {passive: true})
    wrap.addEventListener('pointerleave', leave)
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      wrap.removeEventListener('pointermove', move)
      wrap.removeEventListener('pointerleave', leave)
    }
  }, [])

  return (
    <div className="hero-deck" ref={root}>
      <div className="hero-world" ref={world}>
        <div className="hw-glow" aria-hidden="true"/>
        <div className="hw-rings" aria-hidden="true"><i/><i/><i/></div>
        <div className="hw-grid" aria-hidden="true"/>

        <div className="hw-cube" aria-hidden="true">
          <span className="cf f1"/><span className="cf f2"/><span className="cf f3"/>
          <span className="cf f4"/><span className="cf f5"/><span className="cf f6"/>
        </div>

        <div className="hw-phone">
          <div className="phone-shell">
            <div className="phone-notch"/>
            <div className="phone-ui">
              <p>SS Console</p>
              <div className="phone-stat"><b>98.4</b><small>uptime %</small></div>
              <div className="phone-list">
                <i/><i/><i/>
              </div>
              <div className="phone-pulse"/>
            </div>
          </div>
        </div>

        <div className="hw-laptop">
          <div className="lap-lid">
            <div className="lap-screen">
              <div className="lap-chrome">
                <em/><em/><em/>
                <span>studio.ssmobile.in</span>
              </div>
              <div className="lap-dash">
                <div className="kpi">
                  <strong>120+</strong>
                  <small>products live</small>
                </div>
                <div className="kpi">
                  <strong>IST</strong>
                  <small>same-day overlap</small>
                </div>
                <div className="bars" aria-hidden="true">
                  <i style={{'--h':'46%'}}/><i style={{'--h':'72%'}}/><i style={{'--h':'38%'}}/>
                  <i style={{'--h':'88%'}}/><i style={{'--h':'60%'}}/><i style={{'--h':'78%'}}/>
                </div>
                <div className="lap-line" aria-hidden="true"/>
              </div>
            </div>
          </div>
          <div className="lap-base"/>
        </div>

        <div className="g-ai">
          <div className="hw-glass">
            <b>AI Engine</b>
            <span>models in production</span>
          </div>
        </div>
        <div className="g-iot">
          <div className="hw-glass">
            <b>IoT Mesh</b>
            <span>live device graph</span>
          </div>
        </div>
        <div className="g-cloud">
          <div className="hw-glass">
            <b>Cloud APIs</b>
            <span>secure · scalable</span>
          </div>
        </div>
      </div>
    </div>
  )
}
