import { useState } from 'react'
import BgPattern from './BgPattern'
import './Quiz.css'

export default function Quiz({ onComplete, entering }) {
  const [style55, setStyle55] = useState({
    top: '28px',
    left: 'calc(50% - 40px)',
  })
  const [dodgeCount, setDodgeCount]   = useState(0)
  const [showSecond, setShowSecond]   = useState(false)
  const [answered,   setAnswered]     = useState(false)
  const [flying,     setFlying]       = useState(false)
  const [exiting,    setExiting]      = useState(false)

  const handleDodge = () => {
    const left = 5  + Math.random() * 55
    const top  = 5  + Math.random() * 50
    setStyle55({ top: `${top}%`, left: `${left}%` })
    const next = dodgeCount + 1
    setDodgeCount(next)
    if (next >= 2) setShowSecond(true)
  }

  const handle18 = () => {
    setAnswered(true)
  }

  const handleGetLetter = () => {
    setFlying(true)
    setTimeout(() => setExiting(true), 1500)
    setTimeout(onComplete, 2000)
  }

  return (
    <div className={[
      'quiz-scene',
      entering  ? 'is-entering' : '',
      exiting   ? 'is-exiting'  : '',
    ].join(' ')}>
      <BgPattern />

      <div className="quiz-stage">
        {answered ? (

          <div className="quiz-result">
            <p className="quiz-result__strike">55</p>
            <p className="quiz-result__text">Ну какие 55? Мы-то знаем,<br />что тебе всегда&nbsp;18&nbsp;:)</p>
          </div>

        ) : (
          <>
            <div className="quiz-question">
              <p className="quiz-label">Небольшая проверка&nbsp;:)</p>
              <p className="quiz-text">Сколько тебе сегодня&nbsp;исполняется?</p>
            </div>

            <div className="quiz-arena">

              <button
                className="quiz-btn quiz-btn--55"
                style={style55}
                onClick={handleDodge}
                aria-label="55"
              >
                55
              </button>

              {showSecond && (
                <button
                  className="quiz-btn quiz-btn--18"
                  onClick={handle18}
                  aria-label="18"
                >
                  18
                </button>
              )}

            </div>
          </>
        )}
      </div>

      {flying && (
        <div className="quiz-fly-overlay">
          <div className="quiz-fly-env">
            <div className="quiz-fly-env-fold quiz-fly-env-fold--left" />
            <div className="quiz-fly-env-fold quiz-fly-env-fold--right" />
            <div className="quiz-fly-env-fold quiz-fly-env-fold--bottom" />
            <div className="quiz-fly-env-flap" />
          </div>
          <p className="quiz-fly-text">Письмо летит к тебе!</p>
        </div>
      )}

      <div className="quiz-footer">
        {answered && (
          <button className="quiz-letter-btn" onClick={handleGetLetter}>
            Получить письмо
          </button>
        )}
      </div>
    </div>
  )
}
