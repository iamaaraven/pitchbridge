import { Link } from 'react-router-dom'
import type { Role } from '../types'

interface LandingProps {
  role: Role
  ideaCount: number
}

export function Landing({ role, ideaCount }: LandingProps) {
  return (
    <div className="landing">
      <section className="hero">
        <p className="eyebrow">Two-sided idea marketplace</p>
        <h1>
          Where sharp ideas meet
          <br />
          people ready to fund them
        </h1>
        <p className="hero-lead">
          PitchBridge connects founders who solve real problems with funders who want
          to back the next wave of wealth-creating businesses. Browse pitches, signal
          interest, or submit yours — all in the browser for this demo.
        </p>
        <div className="hero-ctas">
          <Link to="/submit" className="btn btn-primary">
            Submit an idea
          </Link>
          <Link to="/browse" className="btn btn-ghost">
            Browse ideas to fund
          </Link>
        </div>
        <p className="hero-note">
          You are viewing as <strong>{role === 'creator' ? 'Creator' : 'Funder'}</strong>
          {' · '}
          {ideaCount} ideas live
        </p>
      </section>

      <section className="split-panels">
        <div className="panel">
          <span className="panel-label">For creators</span>
          <h2>Pitch the problem, not just the product</h2>
          <ul>
            <li>Frame problem, solution, market, and monetization clearly</li>
            <li>State a funding ask so funders know the scale</li>
            <li>See who expressed interest — no cold outreach needed</li>
          </ul>
          <Link to="/submit" className="text-link">
            Start your pitch →
          </Link>
        </div>
        <div className="panel panel-alt">
          <span className="panel-label">For funders</span>
          <h2>Discover deals worth a conversation</h2>
          <ul>
            <li>Filter by category and funding range</li>
            <li>Read full pitches before you engage</li>
            <li>Pledge interest locally — demo only, no payments</li>
          </ul>
          <Link to="/browse" className="text-link">
            Explore the board →
          </Link>
        </div>
      </section>

      <section className="how-it-works">
        <h2>How it works</h2>
        <ol className="steps">
          <li>
            <strong>1. Submit</strong>
            <span>Founders post a structured pitch with a funding ask.</span>
          </li>
          <li>
            <strong>2. Discover</strong>
            <span>Funders browse, filter, and open ideas that fit.</span>
          </li>
          <li>
            <strong>3. Signal</strong>
            <span>Express interest with an optional amount and message.</span>
          </li>
        </ol>
        <p className="demo-banner">
          Demo mode: interests and new ideas are saved in your browser&apos;s
          localStorage. No accounts, no real money transfers.
        </p>
      </section>
    </div>
  )
}
