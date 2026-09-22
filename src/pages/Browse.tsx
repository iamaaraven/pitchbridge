import { useMemo, useState } from 'react'
import { IdeaCard } from '../components/IdeaCard'
import { CATEGORIES, type Category, type Idea } from '../types'
import { formatFunding } from '../utils/storage'

type SortKey = 'newest' | 'ask-asc' | 'ask-desc' | 'interest'

interface BrowseProps {
  ideas: Idea[]
  interestCount: (id: string) => number
}

export function Browse({ ideas, interestCount }: BrowseProps) {
  const [category, setCategory] = useState<Category | 'All'>('All')
  const [sort, setSort] = useState<SortKey>('newest')
  const [maxAsk, setMaxAsk] = useState<number | ''>('')

  const filtered = useMemo(() => {
    let list = [...ideas]
    if (category !== 'All') {
      list = list.filter((i) => i.category === category)
    }
    if (maxAsk !== '') {
      list = list.filter((i) => i.fundingAsk <= maxAsk)
    }
    list.sort((a, b) => {
      switch (sort) {
        case 'ask-asc':
          return a.fundingAsk - b.fundingAsk
        case 'ask-desc':
          return b.fundingAsk - a.fundingAsk
        case 'interest':
          return interestCount(b.id) - interestCount(a.id)
        case 'newest':
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      }
    })
    return list
  }, [ideas, category, sort, maxAsk, interestCount])

  return (
    <div className="page browse-page">
      <header className="page-header">
        <div>
          <h1>Browse ideas</h1>
          <p>Filter by category or funding ask. Open a card to read the full pitch.</p>
        </div>
      </header>

      <div className="filters">
        <label>
          Category
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as Category | 'All')}
          >
            <option value="All">All categories</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
        <label>
          Max funding ask
          <select
            value={maxAsk === '' ? '' : String(maxAsk)}
            onChange={(e) =>
              setMaxAsk(e.target.value === '' ? '' : Number(e.target.value))
            }
          >
            <option value="">Any amount</option>
            <option value="200000">{formatFunding(200000)} or less</option>
            <option value="300000">{formatFunding(300000)} or less</option>
            <option value="500000">{formatFunding(500000)} or less</option>
            <option value="1000000">{formatFunding(1000000)} or less</option>
          </select>
        </label>
        <label>
          Sort by
          <select value={sort} onChange={(e) => setSort(e.target.value as SortKey)}>
            <option value="newest">Newest</option>
            <option value="ask-asc">Funding ask ↑</option>
            <option value="ask-desc">Funding ask ↓</option>
            <option value="interest">Most interest</option>
          </select>
        </label>
      </div>

      <p className="result-count">
        {filtered.length} idea{filtered.length === 1 ? '' : 's'}
      </p>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <p>No ideas match these filters. Try widening the ask or category.</p>
        </div>
      ) : (
        <div className="idea-grid">
          {filtered.map((idea) => (
            <IdeaCard
              key={idea.id}
              idea={idea}
              interestCount={interestCount(idea.id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
