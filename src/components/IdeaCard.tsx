import { Link } from 'react-router-dom'
import type { Idea } from '../types'
import { formatFunding } from '../utils/storage'

interface IdeaCardProps {
  idea: Idea
  interestCount: number
}

export function IdeaCard({ idea, interestCount }: IdeaCardProps) {
  const snippet =
    idea.problem.length > 120 ? `${idea.problem.slice(0, 117)}…` : idea.problem

  return (
    <article className="idea-card">
      <div className="card-top">
        <span className="chip">{idea.category}</span>
        <span className="ask">{formatFunding(idea.fundingAsk)}</span>
      </div>
      <h3>
        <Link to={`/idea/${idea.id}`}>{idea.title}</Link>
      </h3>
      <p className="snippet">{snippet}</p>
      <div className="card-meta">
        <span>{idea.founderName}</span>
        <span className="interest-pill">
          {interestCount} interest{interestCount === 1 ? '' : 's'}
        </span>
      </div>
    </article>
  )
}
