import { useState } from 'react'
import Intro    from './components/Intro'
import Quiz     from './components/Quiz'
import Envelope from './components/Envelope'
import Candles  from './components/Candles'
import Final    from './components/Final'
import './App.css'

// Each component manages its own exit animation and calls onComplete after it.
// App just switches the screen and triggers the entering animation.
export default function App() {
  const [screen,   setScreen]   = useState('intro')
  const [entering, setEntering] = useState(false)

  const goTo = (next) => {
    setScreen(next)
    setEntering(true)
    setTimeout(() => setEntering(false), 650)
  }

  if (screen === 'intro')    return <Intro    onStart={()    => goTo('quiz')}     />
  if (screen === 'quiz')     return <Quiz     onComplete={() => goTo('envelope')} entering={entering} />
  if (screen === 'envelope') return <Envelope onComplete={() => goTo('candles')}  />
  if (screen === 'candles')  return <Candles  onComplete={() => goTo('final')}    entering={entering} />
  return                            <Final    entering={entering} />
}
