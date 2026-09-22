import type { FormEvent } from 'react'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import type { Idea, Interest } from '../types'
import { formatDate, formatFunding, uid } from '../utils/storage'

interface IdeaDetailProps {
  getIdea: (id: string) => Idea | undefined
  getInterests: (id: string) => Interest[]
  displayName: string
  onInterest: (interest: Interest) => void
}

export function IdeaDetail({
  getIdea,
  getInterests,
  displayName,
  onInterest,
}: IdeaDetailProps) {
  const { id } = useParams<{ id: string }>()
  const idea = id ? getIdea(id) : undefined
  const interests = id ? getInterests(id) : []

  const [name, setName] = useState(displayName)
  const [amount, setAmount] = useState('')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)

  if (!idea) {
    return (
      <div className="page">
        <div className="empty-state">
          <h1>Idea not found</h1>
          <p>This pitch may have been removed or the link is wrong.</p>
          <Link to="/browse" className="btn btn-primary">
            Back to browse
          </Link>
        </div>
      </div>
    )
  }

  function validate(): boolean {
    const next: Record<string, string> = {}
    if (!name.trim()) next.name = 'Name is required'
    if (amount && (Number.isNaN(Number(amount)) || Number(amount) <= 0)) {
      next.amount = 'Enter a positive number or leave blank'
    }
    setErrors(next)
    return Object.keys(next).length === 0
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!idea || !validate()) return
    onInterest({
      id: uid('int'),
      ideaId: idea.id,
      name: name.trim(),
      amount: amount ? Number(amount) : undefined,
      message: message.trim(),
      createdAt: new Date().toISOString(),
    })
    setSubmitted(true)
    setMessage('')
    setAmount('')
  }

  return (
    <div className="page detail-page">
      <Link to="/browse" className="back-link">
        ← Back to browse
      </Link>

      <article className="pitch">
        <div className="pitch-header">
          <span className="chip">{idea.category}</span>
          <h1>{idea.title}</h1>
          <p className="pitch-byline">
            by <strong>{idea.founderName}</strong> · {formatDate(idea.createdAt)} ·
            asking <strong>{formatFunding(idea.fundingAsk)}</strong>
          </p>
        </div>

        <section className="pitch-section">
          <h2>Problem</h2>
          <p>{idea.problem}</p>
        </section>
        <section className="pitch-section">
          <h2>Solution</h2>
          <p>{idea.solution}</p>
        </section>
        <section className="pitch-section">
          <h2>Target market</h2>
          <p>{idea.targetMarket}</p>
        </section>
        <section className="pitch-section">
          <h2>How it makes money</h2>
          <p>{idea.monetization}</p>
        </section>
        <section className="pitch-section ask-block">
          <h2>Funding ask</h2>
          <p className="big-ask">{formatFunding(idea.fundingAsk)}</p>
        </section>
      </article>

      <aside className="interest-panel">
        <h2>I&apos;m interested in funding</h2>
        <p className="panel-note">
          Demo only — this stores a pledge in localStorage. No payment is processed.
        </p>

        {submitted ? (
          <div className="success-box" role="status">
            Thanks — your interest was recorded for this pitch.
          </div>
        ) : null}

        <form className="interest-form" onSubmit={handleSubmit} noValidate>
          <label>
            Your name *
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              aria-invalid={!!errors.name}
            />
            {errors.name ? <span className="field-error">{errors.name}</span> : null}
          </label>
          <label>
            Amount you might fund (optional)
            <input
              type="number"
              min="1"
              step="1000"
              placeholder="e.g. 25000"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              aria-invalid={!!errors.amount}
            />
            {errors.amount ? (
              <span className="field-error">{errors.amount}</span>
            ) : null}
          </label>
          <label>
            Message
            <textarea
              rows={3}
              placeholder="Why this idea resonates…"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              maxLength={500}
            />
          </label>
          <button type="submit" className="btn btn-primary btn-block">
            Fund interest
          </button>
        </form>

        <div className="interest-list">
          <h3>
            {interests.length} interest{interests.length === 1 ? '' : 's'} so far
          </h3>
          {interests.length === 0 ? (
            <p className="muted">Be the first to signal interest.</p>
          ) : (
            <ul>
              {interests.map((i) => (
                <li key={i.id}>
                  <strong>{i.name}</strong>
                  {i.amount ? ` · ${formatFunding(i.amount)}` : ''}
                  {i.message ? <span className="msg">{i.message}</span> : null}
                  <span className="when">{formatDate(i.createdAt)}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </aside>
    </div>
  )
}
