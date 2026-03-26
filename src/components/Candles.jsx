import { useState } from 'react'
import BgPattern from './BgPattern'
import './Candles.css'

const CANDLES = [
  { h: 44, color: '#d93535', delay: '0.10s' },
  { h: 56, color: '#4060cc', delay: '0.25s' },
  { h: 48, color: '#d4920a', delay: '0.00s' },
  { h: 60, color: '#b83090', delay: '0.18s' },
  { h: 40, color: '#209060', delay: '0.08s' },
]

export default function Candles({ onComplete, entering }) {
  const [blown,   setBlown]   = useState(false)
  const [exiting, setExiting] = useState(false)

  const handleBlow = () => {
    if (blown) return
    setBlown(true)
    setTimeout(() => {
      setExiting(true)
      setTimeout(onComplete, 550)
    }, 1100)
  }

  return (
    <div className={[
      'candles-scene',
      entering ? 'is-entering' : '',
      exiting  ? 'is-exiting'  : '',
    ].filter(Boolean).join(' ')}>
      <BgPattern />

      <div className="candles-stage">
        <p className="candles-title">Загадай желание...</p>

        <div className="cake-wrap">
          <div className="candles-row">
            {CANDLES.map((c, i) => (
              <div
                key={i}
                className="candle"
                style={{ '--ch': c.h + 'px', '--cc': c.color, '--cd': c.delay }}
              >
                <div className={`candle-flame${blown ? ' is-blown' : ''}`} />
                <div className="candle-wick" />
                <div className="candle-body" />
              </div>
            ))}
          </div>

          <div className="cake">
            <div className="cake-frosting" />
            <div className="cake-layer cake-layer--top" />
            <div className="cake-stripe" />
            <div className="cake-layer cake-layer--bot" />
            <div className="cake-plate" />
          </div>
        </div>
      </div>

      <div className="candles-footer">
        {!blown && (
          <button className="candles-btn" onClick={handleBlow}>
            Задуть свечи
          </button>
        )}
      </div>
    </div>
  )
}
