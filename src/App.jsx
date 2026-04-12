import './index.css'
import Hero from './components/Hero'
import Features from './components/Features'
import CoCare from './components/CoCare'
import Pricing from './components/Pricing'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="app">
      <nav className="nav">
        <div className="nav-inner">
          <span className="nav-logo">crittr</span>
          <div className="nav-links">
            <a href="#features">Features</a>
            <a href="#pricing">Pricing</a>
            <a href="#pricing" className="nav-cta">Get Started</a>
          </div>
        </div>
      </nav>
      <Hero />
      <Features />
      <CoCare />
      <Pricing />
      <Footer />
    </div>
  )
}
