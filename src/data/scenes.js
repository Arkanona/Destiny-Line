import storyData from '../../situations.json';

// BACK-END : à terme, ce tableau pourra venir d’un fetch vers l’API au lieu du fichier JSON local.
export const scenes = storyData.situations.map((situation) => ({
  id: situation.id,
  eyebrow: `Chapitre ${String(situation.order).padStart(2, '0')} · Destiny Line`,
  title: situation.title,
  description: situation.description,
  image: situation.image,
  imageAlt: `Illustration de la situation : ${situation.title}`,
  crystal: situation.id === 'crystal-ball',
  choices: [
    {
      label: situation.heroChoice.title,
      detail: situation.heroChoice.description,
      score: situation.heroChoice.score,
      tone: 'hero',
    },
    {
      label: situation.villainChoice.title,
      detail: situation.villainChoice.description,
      score: situation.villainChoice.score,
      tone: 'villain',
    },
  ],
}));
