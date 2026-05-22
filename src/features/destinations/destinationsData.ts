import { Landmark, Trees, Palette, type LucideIcon } from 'lucide-react'

export interface Highlight {
  title: string
  description: string
}

export interface DestinationData {
  id: string
  era: string
  title: string
  shortDescription: string
  longDescription: string
  gradient: string
  tags: string[]
  Icon: LucideIcon
  highlights: Highlight[]
  practical: {
    duration: string
    season: string
    risk: string
    price: string
  }
}

export const DESTINATIONS: DestinationData[] = [
  {
    id: 'paris-1889',
    era: '1889',
    title: 'Paris — Belle Époque',
    shortDescription:
      "Assistez à l'inauguration de la Tour Eiffel, flânez dans les salons de l'Exposition Universelle et découvrez Paris à son apogée artistique.",
    longDescription:
      "Paris, été 1889. La capitale française vit l'un des moments les plus spectaculaires de son histoire : l'Exposition Universelle bat son plein et la Tour Eiffel, flambant neuve, domine le ciel de fer et de lumière. Les rues résonnent de valses, les cafés débordent d'intellectuels et d'artistes, et l'Art Nouveau commence à fleurir sur chaque façade. Notre agence vous propose une immersion totale dans cette époque d'insouciance et de génie, loin des tensions qui couvent déjà sous la surface de l'Europe moderne.",
    gradient: 'radial-gradient(ellipse at top, oklch(0.35 0.12 75) 0%, oklch(0.19 0.02 255) 70%)',
    tags: ['Tour Eiffel', 'Art Nouveau', 'Exposition Universelle'],
    Icon: Landmark,
    highlights: [
      {
        title: "Inauguration de la Tour Eiffel",
        description: "Soyez présent le 31 mars 1889 lors de la cérémonie officielle d'inauguration. Montez au sommet avec Gustave Eiffel lui-même.",
      },
      {
        title: "Nuit au Moulin Rouge",
        description: "Le cabaret vient d'ouvrir ses portes. Vivez la première soirée de french cancan dans une salle encore inconnue du monde entier.",
      },
      {
        title: "Galerie des Machines",
        description: "Parcourez l'immense palais de fer et de verre qui abrite les merveilles industrielles du siècle — vapeur, électricité, mécanique de précision.",
      },
    ],
    practical: {
      duration: '5 jours',
      season: 'Été 1889',
      risk: 'Faible',
      price: '12 400 chronos',
    },
  },
  {
    id: 'cretace',
    era: '-65 000 000',
    title: 'Crétacé — Âge des Dinosaures',
    shortDescription:
      'Observez les derniers titanosaures en toute sécurité depuis notre capsule blindée. Un voyage au cœur de la préhistoire pour les plus audacieux.',
    longDescription:
      "Il y a 65 millions d'années, la Terre appartient aux dinosaures. Les titanosaures font trembler le sol de leur passage, les ptérosaures planent sur des cieux chauds et humides, et la végétation luxuriante d'une forêt crétacée vous enveloppe de sons et de parfums disparus depuis des éons. Notre capsule temporelle blindée de classe ALPHA vous garantit une observation en totale sécurité, avec des écrans panoramiques à 360° et une escorte de nos chronobiologistes certifiés. Le voyage le plus extrême de notre catalogue — réservé aux âmes véritablement aventureuses.",
    gradient: 'radial-gradient(ellipse at top, oklch(0.28 0.08 170) 0%, oklch(0.19 0.02 255) 70%)',
    tags: ['Dinosaures', 'Nature préhistorique', 'Aventure'],
    Icon: Trees,
    highlights: [
      {
        title: "Safari tyrannosaures",
        description: "Observez un T-Rex adulte dans son habitat naturel depuis la sécurité de notre capsule. Distance minimale garantie : 200 mètres.",
      },
      {
        title: "Survol en ptérosaure",
        description: "Notre module de vol discret vous permet de planer aux côtés des ptérosaures géants sur les falaises côtières du Crétacé supérieur.",
      },
      {
        title: "Forêt fossile vivante",
        description: "Marchez (en combinaison pressurisée) dans une forêt de fougères arborescentes et de cycas vieux de 65 millions d'années.",
      },
    ],
    practical: {
      duration: '3 jours',
      season: 'Été crétacé (~28°C)',
      risk: 'Élevé — capsule blindée obligatoire',
      price: '38 900 chronos',
    },
  },
  {
    id: 'florence-1504',
    era: '1504',
    title: 'Florence — Renaissance',
    shortDescription:
      "Côtoyez Michel-Ange dans son atelier, admirez les fresques en cours d'exécution et vivez l'effervescence de la Renaissance italienne.",
    longDescription:
      "Florence, printemps 1504. Michel-Ange vient de terminer le David et commence à préparer la bataille de Cascina. Léonard de Vinci peint encore à quelques rues de là. Les Médicis règnent sur une cité-État qui est le centre intellectuel et artistique du monde occidental. Les palais débordent de mécènes, les ateliers bourdonnent de génies, et les places résonnent de débats philosophiques nourris par les grandes idées de l'Antiquité redécouvertes. Notre agence vous offre un accès exclusif à ce moment unique de l'histoire humaine.",
    gradient: 'radial-gradient(ellipse at top, oklch(0.35 0.1 30) 0%, oklch(0.19 0.02 255) 70%)',
    tags: ['Michel-Ange', 'Art classique', 'Médicis'],
    Icon: Palette,
    highlights: [
      {
        title: "Atelier de Michel-Ange",
        description: "Assistez au travail du maître sur ses esquisses pour la Chapelle Sixtine, dans son atelier florentin, sous la lumière d'une bougie de cire.",
      },
      {
        title: "Galerie des Offices avant l'heure",
        description: "Visitez les collections Médicis dans le palais même des Uffizi, avant qu'elles ne deviennent musée — et marchandisez avec leurs conservateurs.",
      },
      {
        title: "Soirée chez les Médicis",
        description: "Participez à un banquet chez Lorenzo di Pierfrancesco de Médicis, aux côtés des philosophes et artistes qui façonnent la pensée européenne.",
      },
    ],
    practical: {
      duration: '7 jours',
      season: 'Printemps 1504',
      risk: 'Modéré',
      price: '19 700 chronos',
    },
  },
]

export function getDestinationById(id: string): DestinationData | undefined {
  return DESTINATIONS.find((d) => d.id === id)
}
