import {useEffect, useRef} from 'react'
import '../site-backdrop.css'

export default function SiteBackdrop(){
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = canvas.getContext('2d', {alpha: true})
    let w = 0, h = 0, raf = 0, dots = []

    const count = () => window.innerWidth < 760 ? 26 : window.innerWidth < 1100 ? 42 : 64

    const spawn = () => {
      const n = count()
      dots = Array.from({length: n}, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        r: Math.random() * 1.5 + 0.5,
        a: Math.random() * 0.45 + 0.25,
      }))
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75)
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      spawn()
    }

    const tick = () => {
      ctx.clearRect(0, 0, w, h)
      const max = window.innerWidth < 760 ? 90 : 128

      for (let i = 0; i < dots.length; i++) {
        const p = dots[i]
        p.x += p.vx
        p.y += p.vy
        if (p.x < -20) p.x = w + 20
        if (p.x > w + 20) p.x = -20
        if (p.y < -20) p.y = h + 20
        if (p.y > h + 20) p.y = -20

        for (let j = i + 1; j < dots.length; j++) {
          const q = dots[j]
          const dx = p.x - q.x
          const dy = p.y - q.y
          const d = Math.hypot(dx, dy)
          if (d < max) {
            ctx.strokeStyle = `rgba(26,212,255,${(1 - d / max) * 0.16})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(q.x, q.y)
            ctx.stroke()
          }
        }

        ctx.beginPath()
        ctx.fillStyle = `rgba(77,224,255,${p.a})`
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }
      raf = requestAnimationFrame(tick)
    }

    const onVis = () => {
      if (document.hidden) cancelAnimationFrame(raf)
      else raf = requestAnimationFrame(tick)
    }

    resize()
    raf = requestAnimationFrame(tick)
    window.addEventListener('resize', resize)
    document.addEventListener('visibilitychange', onVis)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [])

  return (
    <div className="site-bg" aria-hidden="true">
      <div className="site-bg-aurora"/>
      <div className="site-bg-grid"/>
      <canvas ref={ref} className="site-bg-canvas"/>
    </div>
  )
}
