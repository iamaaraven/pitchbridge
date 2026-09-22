import type { Idea } from '../types'

export const SEED_IDEAS: Idea[] = [
  {
    id: 'seed-1',
    title: 'FarmLink Ledger',
    problem:
      'Smallholder farmers in India lose 20–30% of harvest value because buyers delay payments and middlemen control pricing with opaque ledgers.',
    solution:
      'A mobile-first ledger and escrow that records farm-gate deals, releases payment on delivery confirmation, and gives farmers a shareable credit history for input loans.',
    targetMarket:
      '2M+ smallholder farmers in Maharashtra and Punjab initially, expanding across APAC agri-markets.',
    monetization:
      '1.5% transaction fee on escrowed deals; premium analytics for FPOs and agri-lenders.',
    fundingAsk: 250000,
    category: 'Fintech',
    founderName: 'Priya Mehta',
    createdAt: '2026-08-12T10:00:00.000Z',
  },
  {
    id: 'seed-2',
    title: 'CareCircle Remote',
    problem:
      'Rural clinics lack specialists. Patients travel hours for follow-ups that could be done remotely, delaying care and raising costs.',
    solution:
      'A lightweight telehealth kit plus scheduling platform that connects village clinics to city specialists, with offline-first visit notes and prescription workflows.',
    targetMarket:
      'District hospitals and NGO clinic networks across Tier-2/3 India; later SE Asia.',
    monetization:
      'SaaS subscription per clinic + per-consult fee shared with specialists.',
    fundingAsk: 400000,
    category: 'Health',
    founderName: 'Dr. Arjun Nair',
    createdAt: '2026-08-18T14:30:00.000Z',
  },
  {
    id: 'seed-3',
    title: 'CarbonTrace Supply',
    problem:
      'Mid-size manufacturers cannot prove Scope 3 emissions to enterprise buyers, so they lose contracts to greener competitors.',
    solution:
      'Plug-and-play supplier carbon tracing that pulls invoice and logistics data, estimates footprints, and issues buyer-ready reports.',
    targetMarket:
      'SME manufacturers selling into EU and US brands facing CSRD and similar rules.',
    monetization:
      'Annual platform license + paid verification add-ons.',
    fundingAsk: 500000,
    category: 'Climate',
    founderName: 'Sofia Alvarez',
    createdAt: '2026-08-22T09:15:00.000Z',
  },
  {
    id: 'seed-4',
    title: 'SkillSprint Apprentice',
    problem:
      'College grads lack job-ready skills; employers distrust certificates that do not prove project work.',
    solution:
      'Short paid apprenticeships with real company briefs, mentor review, and a portfolio that employers can filter by skill and outcome.',
    targetMarket:
      'Final-year students and early-career hires in tech, design, and ops roles in India and UAE.',
    monetization:
      'Employer placement fees + learner premium mentorship tiers.',
    fundingAsk: 180000,
    category: 'Education',
    founderName: 'Rahul Kapoor',
    createdAt: '2026-08-28T11:45:00.000Z',
  },
  {
    id: 'seed-5',
    title: 'NestShare Local',
    problem:
      'Urban renters underuse spare rooms and tools while neighbors pay full retail for short-term needs.',
    solution:
      'Hyperlocal peer rental for rooms (by the day) and household items, with ID-verified listings and deposit escrow.',
    targetMarket:
      'Young professionals in metro apartments — starting with Bangalore and Hyderabad.',
    monetization:
      '10% take rate on completed rentals; insurance upsell.',
    fundingAsk: 320000,
    category: 'Marketplace',
    founderName: 'Ananya Desai',
    createdAt: '2026-09-02T16:00:00.000Z',
  },
  {
    id: 'seed-6',
    title: 'PulseOps Desk',
    problem:
      'Ops teams drown in Slack alerts from ten tools with no single view of what is truly broken.',
    solution:
      'An ops desk that correlates alerts, suggests runbooks, and tracks MTTR — built for mid-market SaaS companies without a full SRE org.',
    targetMarket:
      '50–500 employee SaaS companies running cloud infra.',
    monetization:
      'Per-seat SaaS pricing with usage-based on-call escalation.',
    fundingAsk: 600000,
    category: 'SaaS',
    founderName: 'Marcus Chen',
    createdAt: '2026-09-05T08:20:00.000Z',
  },
  {
    id: 'seed-7',
    title: 'FlavorRoute Kitchen',
    problem:
      'Home cooks with cult followings cannot scale beyond WhatsApp orders without messy logistics and payments.',
    solution:
      'White-label storefront + local courier routing for micro food brands, with inventory and GST-ready invoicing.',
    targetMarket:
      'Independent cooks and cloud kitchens in 5 Indian metros.',
    monetization:
      'Monthly storefront fee + 4% payment processing margin.',
    fundingAsk: 150000,
    category: 'Consumer',
    founderName: 'Neha Joshi',
    createdAt: '2026-09-10T13:00:00.000Z',
  },
  {
    id: 'seed-8',
    title: 'LegalDraft Assist',
    problem:
      'Startups burn cash on boilerplate contracts and miss risky clauses when using free templates.',
    solution:
      'Guided contract builder for NDAs, MSAs, and founder agreements with jurisdiction packs and lawyer review marketplace.',
    targetMarket:
      'Early-stage startups and freelancers in India, Singapore, and the UK.',
    monetization:
      'Freemium templates; paid packs and optional lawyer review fees.',
    fundingAsk: 275000,
    category: 'SaaS',
    founderName: 'James Okonkwo',
    createdAt: '2026-09-14T17:40:00.000Z',
  },
]
