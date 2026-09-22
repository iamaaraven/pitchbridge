import type { FormEvent } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CATEGORIES, type Category, type Idea } from '../types'
import { uid } from '../utils/storage'

interface SubmitIdeaProps {
  displayName: string
  onSubmit: (idea: Idea) => void
}

interface FormState {
  title: string
  problem: string
  solution: string
  targetMarket: string
  monetization: string
  fundingAsk: string
  category: Category
  founderName: string
}

const INITIAL: FormState = {
  title: '',
  problem: '',
  solution: '',
  targetMarket: '',
  monetization: '',
  fundingAsk: '',
  category: 'SaaS',
  founderName: '',
}

export function SubmitIdea({ displayName, onSubmit }: SubmitIdeaProps) {
  const navigate = useNavigate()
  const [form, setForm] = useState<FormState>({
    ...INITIAL,
    founderName: displayName,
  })
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  function validate(): boolean {
    const next: Partial<Record<keyof FormState, string>> = {}
    if (form.title.trim().length < 4) next.title = 'At least 4 characters'
    if (form.problem.trim().length < 20) next.problem = 'Describe the problem (20+ chars)'
    if (form.solution.trim().length < 20) next.solution = 'Describe the solution (20+ chars)'
    if (form.targetMarket.trim().length < 10)
      next.targetMarket = 'Who is this for? (10+ chars)'
    if (form.monetization.trim().length < 10)
      next.monetization = 'How do you make money? (10+ chars)'
    const ask = Number(form.fundingAsk)
    if (!form.fundingAsk || Number.isNaN(ask) || ask < 1000)
      next.fundingAsk = 'Enter a funding ask of at least $1,000'
    if (!form.founderName.trim()) next.founderName = 'Founder name is required'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!validate()) return
    const idea: Idea = {
      id: uid('idea'),
      title: form.title.trim(),
      problem: form.problem.trim(),
      solution: form.solution.trim(),
      targetMarket: form.targetMarket.trim(),
      monetization: form.monetization.trim(),
      fundingAsk: Number(form.fundingAsk),
      category: form.category,
      founderName: form.founderName.trim(),
      createdAt: new Date().toISOString(),
    }
    onSubmit(idea)
    navigate(`/idea/${idea.id}`)
  }

  return (
    <div className="page submit-page">
      <header className="page-header">
        <div>
          <h1>Submit an idea</h1>
          <p>
            Structure your pitch so funders can judge problem, solution, and path to
            revenue. Saved in this browser only.
          </p>
        </div>
      </header>

      <form className="submit-form" onSubmit={handleSubmit} noValidate>
        <label>
          Title *
          <input
            value={form.title}
            onChange={(e) => update('title', e.target.value)}
            placeholder="Short, memorable name"
            maxLength={80}
            aria-invalid={!!errors.title}
          />
          {errors.title ? <span className="field-error">{errors.title}</span> : null}
        </label>

        <label>
          Category *
          <select
            value={form.category}
            onChange={(e) => update('category', e.target.value as Category)}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>

        <label>
          Problem *
          <textarea
            rows={4}
            value={form.problem}
            onChange={(e) => update('problem', e.target.value)}
            placeholder="What pain exists today?"
            aria-invalid={!!errors.problem}
          />
          {errors.problem ? (
            <span className="field-error">{errors.problem}</span>
          ) : null}
        </label>

        <label>
          Solution *
          <textarea
            rows={4}
            value={form.solution}
            onChange={(e) => update('solution', e.target.value)}
            placeholder="How do you solve it?"
            aria-invalid={!!errors.solution}
          />
          {errors.solution ? (
            <span className="field-error">{errors.solution}</span>
          ) : null}
        </label>

        <label>
          Target market *
          <textarea
            rows={3}
            value={form.targetMarket}
            onChange={(e) => update('targetMarket', e.target.value)}
            placeholder="Who buys, and how big is the opportunity?"
            aria-invalid={!!errors.targetMarket}
          />
          {errors.targetMarket ? (
            <span className="field-error">{errors.targetMarket}</span>
          ) : null}
        </label>

        <label>
          How it makes money *
          <textarea
            rows={3}
            value={form.monetization}
            onChange={(e) => update('monetization', e.target.value)}
            placeholder="Pricing, fees, subscriptions…"
            aria-invalid={!!errors.monetization}
          />
          {errors.monetization ? (
            <span className="field-error">{errors.monetization}</span>
          ) : null}
        </label>

        <div className="form-row">
          <label>
            Funding ask (USD) *
            <input
              type="number"
              min="1000"
              step="1000"
              value={form.fundingAsk}
              onChange={(e) => update('fundingAsk', e.target.value)}
              placeholder="250000"
              aria-invalid={!!errors.fundingAsk}
            />
            {errors.fundingAsk ? (
              <span className="field-error">{errors.fundingAsk}</span>
            ) : null}
          </label>
          <label>
            Founder name *
            <input
              value={form.founderName}
              onChange={(e) => update('founderName', e.target.value)}
              aria-invalid={!!errors.founderName}
            />
            {errors.founderName ? (
              <span className="field-error">{errors.founderName}</span>
            ) : null}
          </label>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            Publish pitch
          </button>
          <Link to="/browse" className="btn btn-ghost">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}
