# SL3 Project

Une application web moderne et scalable utilisant Next.js, NestJS, et MongoDB.

## 🚀 Technologies

- **Frontend**: Next.js avec Tailwind CSS, shadcn/ui, et GSAP
- **Backend**: NestJS
- **Base de données**: MongoDB
- **Cache**: Redis
- **Monitoring**: Prometheus + Grafana
- **Documentation**: 
  - Swagger (API)
  - Docusaurus (Documentation générale)
  - Storybook (Composants UI)
  - TypeDoc (Documentation du code)
- **Tests**: Jest + Vitest
- **CI/CD**: GitHub Actions

## 🌍 Langues supportées

- Anglais
- Français
- Allemand
- Italien
- Espagnol
- Portugais
- Chinois
- Japonais
- Coréen

## 🛠️ Installation

1. Cloner le repository
```bash
git clone [repository-url]
cd sl3
```

2. Lancer les conteneurs Docker
```bash
docker-compose up -d
```

## 📚 Documentation

- Documentation API: http://localhost:4000/api
- Documentation générale: http://localhost:3002
- Storybook: http://localhost:6006
- Monitoring (Grafana): http://localhost:3001

## 🔒 Authentification

Le projet utilise OAuth 2.0 pour l'authentification.

## 📊 Monitoring

- Prometheus: http://localhost:9090
- Grafana: http://localhost:3001

## 🧪 Tests

```bash
# Frontend tests
cd frontend
npm test

# Backend tests
cd backend
npm test
```

## 🌙 Dark Mode

Le thème sombre est géré via next-themes et peut être activé/désactivé via le bouton dans la navigation.

## 📦 Structure du projet

```
.
├── frontend/               # Application Next.js
├── backend/               # API NestJS
├── docs/                  # Documentation Docusaurus
├── prometheus/           # Configuration Prometheus
└── docker-compose.yml    # Configuration Docker
```
