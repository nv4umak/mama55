import { useState } from 'react'
import BgPattern from './BgPattern'
import './Intro.css'

const BURSTS = [
  { x: '20%', y: '12%', color: '#e8c040', delay: '0.1s'  },
  { x: '78%', y: '9%',  color: '#e05070', delay: '0.4s'  },
  { x: '50%', y: '20%', color: '#6090e0', delay: '0.7s'  },
  { x: '25%', y: '35%', color: '#e8c040', delay: '1.0s'  },
  { x: '74%', y: '30%', color: '#e05070', delay: '1.3s'  },
]

export default function Intro({ onStart }) {
  const [started, setStarted] = useState(false)
  const [exiting, setExiting] = useState(false)

  const handleSceneClick = () => {
    if (!started) setStarted(true)
  }

  const handleStart = (e) => {
    e.stopPropagation()
    setExiting(true)
    setTimeout(onStart, 550)
  }

  return (
    <div
      className={[
        'intro-scene',
        started   ? 'started'    : '',
        exiting   ? 'is-exiting' : '',
      ].filter(Boolean).join(' ')}
      onClick={handleSceneClick}
    >
      <BgPattern />

      <div className="intro-fireworks" aria-hidden="true">
        {BURSTS.map((b, i) => (
          <div key={i} className="fw-pos" style={{ left: b.x, top: b.y }}>
            <div className="fw-burst" style={{ '--fc': b.color, '--fd': b.delay }} />
          </div>
        ))}
      </div>

      {!started && (
        <div className="intro-tap-hint">
          <span className="intro-tap-hand" aria-hidden="true">👆</span>
          <p>Нажми, чтобы начать</p>
        </div>
      )}

      <div className="intro-content">
        <img src={`${import.meta.env.BASE_URL}intro.png`} className="intro-image" alt="" aria-hidden="true" />
        <h1 className="intro-title">С&nbsp;Юбилеем, любимая мама и&nbsp;бабушка!</h1>
        <p className="intro-body">
          Твои Чумаки тебе приготовили<br />небольшой сюрприз!<br />
          Ты готова? Нажимай!
        </p>
      </div>

      <div className="intro-action">
        <span className="intro-hand" aria-hidden="true">👇</span>
        <button className="intro-btn" onClick={handleStart}>
          Открыть сюрприз &rarr;
        </button>
      </div>
    </div>
  )
}
