# SL3 Project Documentation

## 📚 Table des matières

1. [Vue d'ensemble](#vue-densemble)
2. [Architecture](#architecture)
3. [Installation](#installation)
4. [Configuration](#configuration)
5. [Authentification](#authentification)
6. [Internationalisation](#internationalisation)
7. [Monitoring](#monitoring)

## Vue d'ensemble

SL3 est une application web moderne construite avec les technologies suivantes :
- Frontend: Next.js avec Tailwind CSS, shadcn/ui et GSAP
- Backend: NestJS
- Base de données: MongoDB
- Cache: Redis
- Monitoring: Prometheus + Grafana

## Architecture

```
.
├── frontend/                 # Application Next.js
│   ├── src/
│   │   ├── app/            # Pages et routes Next.js
│   │   ├── components/     # Composants React réutilisables
│   │   ├── hooks/         # Hooks React personnalisés
│   │   └── styles/        # Styles globaux et configurations Tailwind
│   └── public/
│       └── locales/       # Fichiers de traduction
│
├── backend/                 # API NestJS
│   ├── src/
│   │   ├── auth/          # Module d'authentification
│   │   ├── users/         # Module utilisateurs
│   │   └── config/        # Configurations
│   └── test/              # Tests
│
├── docs/                   # Documentation
└── docker-compose.yml      # Configuration Docker
```

## Installation

1. Cloner le repository :
\`\`\`bash
git clone [repository-url]
cd sl3
\`\`\`

2. Copier les fichiers d'environnement :
\`\`\`bash
cp frontend/.env.example frontend/.env
cp backend/.env.example backend/.env
\`\`\`

3. Configurer les variables d'environnement (voir section Configuration)

4. Lancer l'application :
\`\`\`bash
docker-compose up -d
\`\`\`

## Configuration

### Frontend (.env)
\`\`\`env
# Requis
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id
NEXT_PUBLIC_GITHUB_CLIENT_ID=your-github-client-id

# Optionnel
NEXT_PUBLIC_DEFAULT_LOCALE=en
NEXT_PUBLIC_SUPPORTED_LOCALES=en,fr,de,it,es,pt,zh,ja,ko
\`\`\`

### Backend (.env)
\`\`\`env
# Requis
JWT_SECRET=generate-using-openssl-rand-base64-32
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

# Optionnel mais recommandé en production
MONGODB_URI=mongodb://mongodb:27017/sl3
REDIS_HOST=redis
REDIS_PORT=6379
\`\`\`

## Authentification

L'application utilise OAuth 2.0 avec support pour :
- Google
- GitHub

### Configuration OAuth

1. **Google OAuth**
   - Aller sur [Google Cloud Console](https://console.cloud.google.com/)
   - Créer un projet
   - Configurer l'écran de consentement OAuth
   - Créer des identifiants OAuth 2.0
   - Ajouter les URIs de redirection autorisés :
     - http://localhost:4000/auth/google/callback

2. **GitHub OAuth**
   - Aller sur [GitHub Developer Settings](https://github.com/settings/developers)
   - Créer une nouvelle application OAuth
   - Ajouter l'URL de callback :
     - http://localhost:4000/auth/github/callback

### Flux d'authentification

1. L'utilisateur clique sur "Se connecter avec Google/GitHub"
2. Redirection vers le provider OAuth
3. Après authentification, redirection vers le backend
4. Le backend vérifie les informations et crée/met à jour l'utilisateur
5. Génération d'un JWT et redirection vers le frontend
6. Le frontend stocke le token et redirige vers le dashboard

## Internationalisation

L'application supporte les langues suivantes :
- Anglais (en)
- Français (fr)
- Allemand (de)
- Italien (it)
- Espagnol (es)
- Portugais (pt)
- Chinois (zh)
- Japonais (ja)
- Coréen (ko)

Les fichiers de traduction se trouvent dans \`frontend/public/locales/\`.

## Monitoring

### Prometheus
- Endpoint: http://localhost:9090
- Métriques collectées :
  - Performance API
  - Utilisation mémoire
  - Temps de réponse

### Grafana
- URL: http://localhost:3001
- Identifiants par défaut :
  - Username: admin
  - Password: admin (changeable via GRAFANA_ADMIN_PASSWORD)

## Sécurité

- JWT pour l'authentification
- Tokens stockés dans des cookies HTTP-only
- Rate limiting sur l'API
- CORS configuré
- Variables d'environnement pour les secrets
