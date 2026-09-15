import {useEffect, useRef} from 'react'

const SEGMENTS = 18
const TRAIL = 0.42
const PALETTE = ['#e8f7ff', '#4de0ff', '#1ad4ff', '#0b7dff', '#c8d5e2']

function mixColor(index, total) {
  const t = (index / total) * (PALETTE.length - 1)
  const i = Math.floor(t)
  const j = Math.min(i + 1, PALETTE.length - 1)
  const f = t - i
  const hex = p => [
    parseInt(p.slice(1, 3), 16),
    parseInt(p.slice(3, 5), 16),
    parseInt(p.slice(5, 7), 16),
  ]
  const a = hex(PALETTE[i])
  const b = hex(PALETTE[j])
  return `rgb(${Math.round(a[0] + (b[0] - a[0]) * f)},${Math.round(a[1] + (b[1] - a[1]) * f)},${Math.round(a[2] + (b[2] - a[2]) * f)})`
}

const HOVER = 'a, button, .btn, .pay-btn, .nav-cta, .drop-btn, .icon-btn, .service-card, .project-card, .feature-card, .menu-btn, label, [role="button"]'

export default function CustomCursor() {
  const svgRef = useRef(null)
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const coarse = window.matchMedia('(pointer: coarse)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (coarse || reduce || window.innerWidth < 768) return

    const svg = svgRef.current
    const dot = dotRef.current
    const ring = ringRef.current
    if (!svg || !dot || !ring) return

    document.documentElement.classList.add('has-cursor')

    const mouse = {x: window.innerWidth / 2, y: window.innerHeight / 2}
    const lag = {x: mouse.x, y: mouse.y}
    const pts = Array.from({length: SEGMENTS}, () => ({x: mouse.x, y: mouse.y}))
    const NS = 'http://www.w3.org/2000/svg'
    const lines = []

    for (let i = 0; i < SEGMENTS; i++) {
      const line = document.createElementNS(NS, 'line')
      line.setAttribute('stroke', mixColor(i, SEGMENTS))
      line.setAttribute('stroke-opacity', String(0.18 + 0.28 * (1 - i / SEGMENTS)))
      line.setAttribute('stroke-width', String(10 - (i / SEGMENTS) * 7))
      line.setAttribute('stroke-linecap', 'round')
      svg.appendChild(line)
      lines.push(line)
    }

    let hovering = false
    let typing = false
    let frame = 0

    const move = e => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    const over = e => {
      typing = Boolean(e.target.closest('input, textarea, [contenteditable="true"]'))
      hovering = !typing && Boolean(e.target.closest(HOVER))
      ring.classList.toggle('is-hover', hovering)
      dot.classList.toggle('is-hover', hovering)
      document.documentElement.classList.toggle('cursor-type', typing)
    }
    const down = () => {
      ring.classList.add('is-click')
      dot.classList.add('is-click')
    }
    const up = () => {
      ring.classList.remove('is-click')
      dot.classList.remove('is-click')
    }

    const tick = () => {
      lag.x += (mouse.x - lag.x) * 0.16
      lag.y += (mouse.y - lag.y) * 0.16
      dot.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0)`
      ring.style.transform = `translate3d(${lag.x}px, ${lag.y}px, 0)`

      let tx = mouse.x
      let ty = mouse.y
      for (let i = 0; i < SEGMENTS; i++) {
        const p = pts[i]
        p.x += (tx - p.x) * TRAIL
        p.y += (ty - p.y) * TRAIL
        lines[i].setAttribute('x1', String(p.x))
        lines[i].setAttribute('y1', String(p.y))
        lines[i].setAttribute('x2', String(tx))
        lines[i].setAttribute('y2', String(ty))
        tx = p.x
        ty = p.y
      }
      frame = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', move, {passive: true})
    window.addEventListener('mouseover', over, {passive: true})
    window.addEventListener('mousedown', down)
    window.addEventListener('mouseup', up)
    frame = requestAnimationFrame(tick)

    return () => {
      document.documentElement.classList.remove('has-cursor', 'cursor-type')
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
      window.removeEventListener('mousedown', down)
      window.removeEventListener('mouseup', up)
      cancelAnimationFrame(frame)
      lines.forEach(line => line.remove())
    }
  }, [])

  return (
    <>
      <svg ref={svgRef} className="cursor-trail" aria-hidden="true"/>
      <div className="c-ring" ref={ringRef} aria-hidden="true"/>
      <div className="c-dot" ref={dotRef} aria-hidden="true"/>
    </>
  )
}
