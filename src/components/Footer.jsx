import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <span className="footer-logo">crittr</span>
          <p>Built with care for pets<br />and the people who love them.</p>
        </div>
        <div className="footer-links">
          <div className="footer-col">
            <span className="footer-col-title">Product</span>
            <a href="#features">Features</a>
            <a href="#pricing">Pricing</a>
            <a href="#pricing">Download</a>
          </div>
          <div className="footer-col">
            <span className="footer-col-title">Support</span>
            <a href="#">Help Center</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Send Feedback</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Crittr. All rights reserved.</span>
        <span>iOS & Android</span>
      </div>
    </footer>
  )
}
