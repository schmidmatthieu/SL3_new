# Guide de Déploiement

## 🚀 Déploiement en Production

### Prérequis

- Serveur Linux (Ubuntu 20.04 LTS recommandé)
- Docker et Docker Compose installés
- Certificat SSL (Let's Encrypt recommandé)
- Nom de domaine configuré

### Architecture de Production

```
                                   ┌─────────────┐
                                   │   Nginx     │
                                   │  (Reverse   │
                                   │   Proxy)    │
                                   └──────┬──────┘
                                          │
                    ┌─────────────────────┴─────────────────────┐
                    │                                           │
              ┌─────┴─────┐                             ┌──────┴─────┐
              │  Frontend │                             │  Backend   │
              │  (Next.js)│                             │  (NestJS)  │
              └─────┬─────┘                             └──────┬─────┘
                    │                                          │
                    │                                   ┌──────┴─────┐
                    │                                   │  MongoDB   │
                    │                                   └──────┬─────┘
                    │                                          │
                    │                                   ┌──────┴─────┐
                    │                                   │   Redis    │
                    │                                   └────────────┘
                    │                                          │
              ┌─────┴──────┐                            ┌─────┴─────┐
              │ Prometheus │                            │  Grafana  │
              └────────────┘                            └───────────┘
```

### Configuration Nginx

```nginx
# /etc/nginx/sites-available/sl3
server {
    listen 80;
    server_name your-domain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com;

    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;

    # Frontend
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:4000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Monitoring
    location /metrics {
        proxy_pass http://localhost:9090;
        auth_basic "Metrics";
        auth_basic_user_file /etc/nginx/.htpasswd;
    }
}
```

### Variables d'environnement de Production

#### Frontend (.env.production)
```env
NEXT_PUBLIC_API_URL=https://api.your-domain.com
NEXT_PUBLIC_APP_URL=https://your-domain.com
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-production-google-client-id
NEXT_PUBLIC_GITHUB_CLIENT_ID=your-production-github-client-id
```

#### Backend (.env.production)
```env
NODE_ENV=production
PORT=4000
FRONTEND_URL=https://your-domain.com

# Utiliser des secrets sécurisés en production
JWT_SECRET=generated-secure-secret
MONGODB_URI=mongodb://mongodb:27017/sl3_prod
REDIS_HOST=redis
REDIS_PORT=6379

# OAuth callbacks avec HTTPS
GOOGLE_CALLBACK_URL=https://api.your-domain.com/auth/google/callback
GITHUB_CALLBACK_URL=https://api.your-domain.com/auth/github/callback
```

### Déploiement avec Docker

1. **Construire les images**
```bash
docker-compose -f docker-compose.prod.yml build
```

2. **Démarrer les services**
```bash
docker-compose -f docker-compose.prod.yml up -d
```

3. **Vérifier les logs**
```bash
docker-compose -f docker-compose.prod.yml logs -f
```

### Sécurité en Production

1. **Pare-feu (UFW)**
```bash
ufw allow 80/tcp
ufw allow 443/tcp
ufw enable
```

2. **Fail2Ban**
```bash
apt-get install fail2ban
```

3. **CORS en Production**
```typescript
// backend/src/main.ts
app.enableCors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
});
```

### Monitoring en Production

1. **Prometheus**
- Métriques personnalisées
- Alerting configuré
- Retention adaptée

2. **Grafana**
- Dashboards de production
- Alerting email/Slack
- Backup automatique

### Backup

1. **MongoDB**
```bash
# Backup automatique quotidien
0 0 * * * docker exec mongodb mongodump --out /backup/$(date +%Y%m%d)
```

2. **Redis**
```bash
# Snapshot automatique
dir /var/lib/redis
dbfilename dump.rdb
save 900 1
save 300 10
save 60 10000
```

### CI/CD avec GitHub Actions

```yaml
name: Production Deployment

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Deploy to production
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.SERVER_HOST }}
          username: ${{ secrets.SERVER_USER }}
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          script: |
            cd /opt/sl3
            git pull
            docker-compose -f docker-compose.prod.yml up -d --build
```

### Rollback

En cas de problème :
```bash
# Revenir à la version précédente
docker-compose -f docker-compose.prod.yml down
git reset --hard HEAD^
docker-compose -f docker-compose.prod.yml up -d --build
```
