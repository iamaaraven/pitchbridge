export type Category =
  | 'Fintech'
  | 'Health'
  | 'Climate'
  | 'Education'
  | 'Consumer'
  | 'SaaS'
  | 'Marketplace'
  | 'Other'

export interface Idea {
  id: string
  title: string
  problem: string
  solution: string
  targetMarket: string
  monetization: string
  fundingAsk: number
  category: Category
  founderName: string
  createdAt: string
}

export interface Interest {
  id: string
  ideaId: string
  name: string
  amount?: number
  message: string
  createdAt: string
}

export type Role = 'creator' | 'funder'

export const CATEGORIES: Category[] = [
  'Fintech',
  'Health',
  'Climate',
  'Education',
  'Consumer',
  'SaaS',
  'Marketplace',
  'Other',
]
