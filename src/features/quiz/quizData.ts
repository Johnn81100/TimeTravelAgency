export interface QuizQuestion {
  id: number
  question: string
  options: string[]
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Quel type d\'expérience recherchez-vous ?',
    options: ['Culturelle et artistique', 'Aventure et nature', 'Élégance et raffinement'],
  },
  {
    id: 2,
    question: 'Votre période préférée ?',
    options: ['Histoire moderne (XIXe-XXe siècle)', 'Temps anciens et origines', 'Renaissance et classicisme'],
  },
  {
    id: 3,
    question: 'Vous préférez…',
    options: ['L\'effervescence urbaine', 'La nature sauvage', 'L\'art et l\'architecture'],
  },
  {
    id: 4,
    question: 'Votre activité idéale ?',
    options: ['Visiter des monuments', 'Observer la faune', 'Explorer des musées'],
  },
]
