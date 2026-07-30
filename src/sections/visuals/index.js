import ChaosToOrder from './ChaosToOrder'
import ResolvingGrid from './ResolvingGrid'
import AxisShield from './AxisShield'
import NetworkLattice from './NetworkLattice'

/**
 * Hero visual registry. Switch the active visual by changing
 * `heroVisual` in src/config/site.js — no component edits needed.
 */
export const HERO_VISUALS = {
  'chaos-to-order': {
    component: ChaosToOrder,
    name: 'Chaos to Order',
    blurb:
      'Scattered points and tangled links migrate into a clean lattice, an emerald trend emerging as structure resolves — then slowly loops.',
  },
  'resolving-grid': {
    component: ResolvingGrid,
    name: 'Resolving Field',
    blurb:
      'A coordinate grid over which scattered data points settle into an ascending trend — clarity emerging from noise.',
  },
  'axis-shield': {
    component: AxisShield,
    name: 'Axis Shield',
    blurb:
      'A shield drawn in precise line-work from measured axes and contours — governance, protection, engineered rigour.',
  },
  'network-lattice': {
    component: NetworkLattice,
    name: 'Network Lattice',
    blurb:
      'An interconnected lattice of exposures with one critical path illuminated — dependency mapping and systems thinking.',
  },
}

export function getHeroVisual(key) {
  return (HERO_VISUALS[key] || HERO_VISUALS['chaos-to-order']).component
}
