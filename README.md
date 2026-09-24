# Destiny Line

Front-end du visual novel interactif **Destiny Line**.

## Back-end

Pour accéder au projet back-end, rendez-vous sur le dépôt suivant :

[DestinyLineBack](https://github.com/lindsayram/DestinyLineBack)

## Lancer le projet front-end

```bash
npm install
npm run dev
```

Le site sera disponible sur l’URL indiquée par Vite, généralement `http://localhost:5173`.

## Configuration du back-end

Copier `.env.example` vers `.env`, puis renseigner l’URL de l’API :

```env
VITE_API_URL=http://localhost:3000
```

Le front utilise ensuite les endpoints :

- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
