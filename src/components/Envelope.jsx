import { useState } from 'react'
import Card from './Card'
import BgPattern from './BgPattern'
import './Envelope.css'

export default function Envelope({ onComplete }) {
  const [phase,       setPhase]       = useState('closed')
  const [cardFlipped, setCardFlipped] = useState(false)
  const [btnReady,    setBtnReady]    = useState(false)
  const [envHiding,   setEnvHiding]   = useState(false)
  const [exiting,     setExiting]     = useState(false)

  const handleOpen = () => {
    if (phase !== 'closed') return
    setPhase('opening')
    setTimeout(() => setPhase('risen'),  900)
    setTimeout(() => setEnvHiding(true), 1800)
  }

  const handleCardFlip = (flipped) => {
    setCardFlipped(flipped)
    if (flipped) setTimeout(() => setBtnReady(true), 5300)
  }

  const handleNext = () => {
    setExiting(true)
    setTimeout(onComplete, 550)
  }

  const getHint = () => {
    if (phase === 'closed') return 'Нажми, чтобы открыть'
    if (phase === 'risen' && !cardFlipped) return 'Нажми на открытку'
    return '\u00A0'
  }

  return (
    <div className={`env-scene env-scene--${phase}${exiting ? ' env-scene--exiting' : ''}`}>
      <BgPattern />

      <div className="env-stage">

        <div className="env-card-wrap">
          <Card
            enabled={phase === 'risen'}
            onFlip={handleCardFlip}
          />
        </div>

        <div
          className={`env-wrap${envHiding ? ' env-wrap--hidden' : ''}${phase !== 'closed' ? ' env-wrap--open' : ''}`}
          role={phase === 'closed' ? 'button' : undefined}
          tabIndex={phase === 'closed' ? 0 : -1}
          aria-label="Открыть конверт"
          onClick={handleOpen}
          onKeyDown={e => e.key === 'Enter' && handleOpen()}
        >
          <div className="env-body">
            <div className="env-fold env-fold--bottom" />
            <div className="env-fold env-fold--left" />
            <div className="env-fold env-fold--right" />
            <div className="env-flap" />
          </div>
        </div>

      </div>

      <div className="env-hint-area">
        {cardFlipped && btnReady ? (
          <button className="env-next-btn" onClick={handleNext}>
            Получить торт
          </button>
        ) : (
          <p className="env-hint">{getHint()}</p>
        )}
      </div>
    </div>
  )
}
