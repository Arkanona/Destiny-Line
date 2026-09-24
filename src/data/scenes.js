export const scenes = [
  {
    id: 'bank',
    eyebrow: 'Chapitre 01 · Zones d’ombre',
    title: 'Braquage à la banque',
    description: 'Des criminels braquent une banque. Des otages sont toujours à l’intérieur.',
    image: '/assets/bank.webp',
    imageAlt: 'Une banque dans une ville futuriste sous les néons',
    choices: [
      { label: 'Sauver les otages', detail: 'Protéger les civils et arrêter les criminels.', score: 20, tone: 'hero' },
      { label: 'Prendre une partie de l’argent', detail: 'Laisser les otages et repartir avec le butin.', score: -20, tone: 'villain' },
    ],
  },
  {
    id: 'enemy',
    eyebrow: 'Chapitre 02 · Ligne rouge',
    title: 'Ennemi vaincu',
    description: 'Après un combat difficile, ton adversaire est à terre et ne peut plus se défendre.',
    image: '/assets/enemy.webp',
    imageAlt: 'Un adversaire vaincu dans une ruelle éclairée par des gyrophares',
    choices: [
      { label: 'Le remettre aux autorités', detail: 'Choisir la justice plutôt que la vengeance.', score: 20, tone: 'hero' },
      { label: 'Se venger', detail: 'Rendre le coup reçu, sans témoin.', score: -20, tone: 'villain' },
    ],
  },
  {
    id: 'crystal',
    eyebrow: 'Événement spécial · Destin',
    title: 'La boule de cristal',
    description: 'Une mystérieuse boule de cristal apparaît devant toi. Elle prétend pouvoir révéler ton avenir.',
    image: '/assets/crystal.webp',
    imageAlt: 'Une boule de cristal violette posée dans une pièce sombre',
    crystal: true,
  },
  {
    id: 'city',
    eyebrow: 'Chapitre 03 · Ville en danger',
    title: 'Ville en danger',
    description: 'Un quartier est en danger, mais ton ennemi tente de s’enfuir.',
    image: '/assets/city.webp',
    imageAlt: 'Une ville futuriste sous une menace dans le ciel',
    choices: [
      { label: 'Sauver les civils', detail: 'Mettre les habitants à l’abri en priorité.', score: 20, tone: 'hero' },
      { label: 'Poursuivre le criminel', detail: 'Ne pas laisser ta cible s’échapper.', score: -20, tone: 'villain' },
    ],
  },
  {
    id: 'power',
    eyebrow: 'Chapitre 04 · Pouvoir absolu',
    title: 'Pouvoir absolu',
    description: 'La ville souhaite faire de toi son protecteur officiel. Tu comprends que cette position pourrait aussi te permettre de la contrôler.',
    image: '/assets/power.webp',
    imageAlt: 'Un héros observant une ville illuminée depuis les hauteurs',
    choices: [
      { label: 'Protéger la ville', detail: 'Porter le symbole et servir ceux qui comptent sur toi.', score: 25, tone: 'hero' },
      { label: 'Prendre le contrôle', detail: 'Utiliser ce pouvoir pour imposer ton propre ordre.', score: -25, tone: 'villain' },
    ],
  },
];
