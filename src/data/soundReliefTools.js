import {
  Ear,
  Headphones,
  Hand,
  Speaker,
} from 'lucide-react'

export const soundReliefTools = [
  {
    id: 'earplugs',
    title: 'Earplugs',
    description:
      'Options for reducing exposure to surrounding sounds.',
    linkText: 'Explore earplugs',
    path: '/sound-relief/earplugs',
    icon: Ear,
  },
  {
    id: 'headphones',
    title: 'Headphones',
    description:
      'Noise-canceling and sound-isolating options.',
    linkText: 'Explore headphones',
    path: '/sound-relief/headphones',
    icon: Headphones,
  },
  {
    id: 'fidget-tools',
    title: 'Fidget Tools',
    description:
      'Tactile objects and sensory accessories.',
    linkText: 'Explore fidgets',
    path: '/sound-relief/fidget-tools',
    icon: Hand,
  },
  {
    id: 'sound-machines',
    title: 'Sound Machines',
    description:
      'Devices that provide consistent background sound.',
    linkText: 'Explore machines',
    path: '/sound-relief/sound-machines',
    icon: Speaker,
  },
]
