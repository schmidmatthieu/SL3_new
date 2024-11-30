# Documentation API

## 📚 Swagger Documentation

L'API est documentée en utilisant Swagger/OpenAPI. La documentation est accessible à l'URL suivante en développement :
```
http://localhost:4000/api
```

### Endpoints principaux

#### Authentication

```yaml
/auth/google:
  get:
    description: Initie l'authentification Google OAuth
    tags: [Auth]

/auth/github:
  get:
    description: Initie l'authentification GitHub OAuth
    tags: [Auth]

/auth/me:
  get:
    description: Récupère les informations de l'utilisateur connecté
    security:
      - bearerAuth: []
    tags: [Auth]

/auth/logout:
  get:
    description: Déconnecte l'utilisateur
    tags: [Auth]
```

#### Users

```yaml
/users:
  get:
    description: Récupère la liste des utilisateurs (admin seulement)
    security:
      - bearerAuth: []
    tags: [Users]

/users/{id}:
  get:
    description: Récupère un utilisateur par son ID
    security:
      - bearerAuth: []
    tags: [Users]
```

### Modèles de données

#### User

```typescript
interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  picture?: string;
  provider: string;
  providerId: string;
  isActive: boolean;
  roles: string[];
  createdAt: Date;
  updatedAt: Date;
}
```

### Sécurité

Tous les endpoints protégés nécessitent un token JWT valide dans l'en-tête Authorization :
```
Authorization: Bearer <token>
```

### Codes d'erreur

- `400` : Bad Request - La requête est mal formée
- `401` : Unauthorized - Authentication requise
- `403` : Forbidden - Permissions insuffisantes
- `404` : Not Found - Ressource non trouvée
- `429` : Too Many Requests - Rate limit dépassé
- `500` : Internal Server Error - Erreur serveur

### Rate Limiting

L'API implémente un rate limiting de :
- 100 requêtes par minute par IP
- Headers de réponse incluent :
  - `X-RateLimit-Limit`
  - `X-RateLimit-Remaining`
  - `X-RateLimit-Reset`

### Versioning

L'API suit le versioning sémantique. La version actuelle est accessible via l'en-tête :
```
X-API-Version: 1.0.0
```
