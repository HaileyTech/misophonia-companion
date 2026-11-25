import { Routes, Route, Navigate } from 'react-router-dom'

import SiteLayout from './components/layout/SiteLayout'

import Home from './pages/Home'
import SoundRelief from './pages/SoundRelief'
import Journal from './pages/Journal'
import Learn from './pages/Learn'
import FindSupport from './pages/FindSupport'
import About from './pages/About'
import Privacy from './pages/Privacy'
import Disclaimer from './pages/Disclaimer'
import Sources from './pages/Sources'

function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/sound-relief" element={<SoundRelief />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/find-support" element={<FindSupport />} />
        <Route path="/about" element={<About />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
        <Route path="/sources" element={<Sources />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default App
