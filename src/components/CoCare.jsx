import './CoCare.css'

export default function CoCare() {
  return (
    <section className="cocare">
      <div className="cocare-inner">
        <div className="cocare-visual">
          <div className="cocare-card main-card">
            <div className="cc-header">
              <span className="cc-emoji">🐱</span>
              <div>
                <div className="cc-name">Miso</div>
                <div className="cc-breed">Maine Coon · 5 yrs</div>
              </div>
            </div>
            <div className="cc-carers">
              <div className="cc-carer-label">Co-carers</div>
              <div className="cc-carer-list">
                <div className="cc-carer">
                  <div className="cc-avatar" style={{background:'#C4613A'}}>S</div>
                  <span>Sarah</span>
                  <span className="cc-role">Owner</span>
                </div>
                <div className="cc-carer">
                  <div className="cc-avatar" style={{background:'#3D5A3E'}}>M</div>
                  <span>Marcus</span>
                  <span className="cc-role">Full access</span>
                </div>
                <div className="cc-carer">
                  <div className="cc-avatar" style={{background:'#C9A84C'}}>J</div>
                  <span>Jenny</span>
                  <span className="cc-role">Log only</span>
                </div>
              </div>
            </div>
            <div className="cc-activity">
              <span className="cc-activity-dot" />
              <span>Marcus logged a meal · 2h ago</span>
            </div>
          </div>
          <div className="cocare-notif">
            <span>🔔</span>
            <span>Jenny completed Miso's evening meds</span>
          </div>
        </div>

        <div className="cocare-text">
          <div className="section-label">Co-Care · Pro</div>
          <h2 className="section-title">
            Pet care is<br />
            <em>a team sport.</em>
          </h2>
          <p className="section-sub">
            Invite family members, partners, or trusted sitters by email.
            Set exactly what they can see and do — from full access to log-only.
            Everyone stays in sync without the group chat chaos.
          </p>
          <ul className="cocare-list">
            <li>
              <span className="check">✓</span>
              Invite by email with one tap
            </li>
            <li>
              <span className="check">✓</span>
              Granular permission controls per person
            </li>
            <li>
              <span className="check">✓</span>
              Real-time activity notifications
            </li>
            <li>
              <span className="check">✓</span>
              Share across unlimited people
            </li>
          </ul>
          <a href="#pricing" className="btn-primary">Unlock Co-Care with Pro</a>
        </div>
      </div>
    </section>
  )
}
