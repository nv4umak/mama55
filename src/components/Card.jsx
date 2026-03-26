import { useState, useEffect } from 'react'
import './Card.css'

const PARAGRAPHS = [
  'Мама и бабушка, с юбилеем тебя!',
  'Мы тебя очень любим и желаем тебе здоровья, радости и как можно больше счастливых моментов рядом с нами.',
  'Сильно по тебе скучаем. И скоро увидимся!',
]

const TOTAL_CHARS = PARAGRAPHS.reduce((s, p) => s + p.length, 0)
const CHAR_DELAY  = Math.round(5000 / TOTAL_CHARS) // ~27ms per char

export default function Card({ enabled, onFlip }) {
  const [flipped,   setFlipped]   = useState(false)
  const [charCount, setCharCount] = useState(0)

  useEffect(() => {
    if (flipped) return
    const t = setTimeout(() => setCharCount(0), 0)
    return () => clearTimeout(t)
  }, [flipped])

  useEffect(() => {
    if (!flipped || charCount >= TOTAL_CHARS) return
    const t = setTimeout(() => setCharCount(c => c + 1), CHAR_DELAY)
    return () => clearTimeout(t)
  }, [flipped, charCount])

  const handleFlip = () => {
    if (!enabled) return
    const next = !flipped
    setFlipped(next)
    onFlip?.(next)
  }

  const isDone = charCount >= TOTAL_CHARS

  // Distribute charCount across paragraphs
  const paras = PARAGRAPHS.reduce((acc, text) => {
    const used = acc.reduce((s, p) => s + p.vis, 0)
    const vis = Math.min(Math.max(0, charCount - used), text.length)
    return [...acc, { text, vis }]
  }, [])

  // First paragraph still being typed
  const activeIdx = paras.findIndex(({ text, vis }) => vis < text.length)

  return (
    <div
      className={`card-scene${flipped ? ' is-flipped' : ''}`}
      onClick={handleFlip}
      role="button"
      tabIndex={enabled ? 0 : -1}
      aria-label={flipped ? 'Перевернуть обратно' : 'Перевернуть открытку'}
      onKeyDown={e => e.key === 'Enter' && handleFlip()}
    >
      <div className="card-body">

        {/* Front: photo */}
        <div className="card-face card-face--front">
          <img src={`${import.meta.env.BASE_URL}card.png`} alt="С Юбилеем!" className="card-photo" />
        </div>

        {/* Back: greeting text */}
        <div className="card-face card-face--back">
          <span className="card-heart card-heart--tl" aria-hidden="true">♡</span>
          <span className="card-heart card-heart--tr" aria-hidden="true">♡</span>
          <span className="card-heart card-heart--bl" aria-hidden="true">♡</span>
          <span className="card-heart card-heart--br" aria-hidden="true">♡</span>
          <div className="card-back-inner">
            <p className="card-back-ornament" aria-hidden="true">♡</p>
            {paras.map(({ text, vis }, i) => (
              <p key={i} className={`card-para card-para--${i + 1}`}>
                {text.slice(0, vis)}
                {!isDone && i === activeIdx && vis > 0 && (
                  <span className="card-cursor" aria-hidden="true">|</span>
                )}
              </p>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
