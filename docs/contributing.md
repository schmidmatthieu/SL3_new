# Guide de Contribution

## 🤝 Comment contribuer

### Prérequis

- Node.js (v18 ou supérieur)
- Docker et Docker Compose
- Git
- Un éditeur de code (VS Code recommandé)

### Installation de l'environnement de développement

1. **Forker le repository**
```bash
git clone https://github.com/votre-username/sl3.git
cd sl3
```

2. **Installer les dépendances**
```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
```

3. **Configurer l'environnement**
```bash
cp frontend/.env.example frontend/.env
cp backend/.env.example backend/.env
```

### Workflow de développement

1. **Créer une nouvelle branche**
```bash
git checkout -b feature/nom-de-la-feature
```

2. **Conventions de nommage**
- Features: `feature/nom-de-la-feature`
- Bugs: `fix/description-du-bug`
- Hotfix: `hotfix/description`

3. **Standards de code**

#### TypeScript
```typescript
// Utiliser des interfaces pour les types
interface User {
  id: string;
  name: string;
}

// Utiliser des types pour les unions/intersections
type Theme = 'light' | 'dark';

// Documenter les fonctions complexes
/**
 * Calcule quelque chose de complexe
 * @param input - Description de l'input
 * @returns Description du retour
 */
function complexFunction(input: string): number {
  // ...
}
```

#### React
```tsx
// Composants fonctionnels avec types
interface Props {
  title: string;
  children: React.ReactNode;
}

export const Component: React.FC<Props> = ({ title, children }) => {
  return (
    <div>
      <h1>{title}</h1>
      {children}
    </div>
  );
};
```

4. **Tests**

Tous les nouveaux composants doivent avoir des tests :
```typescript
describe('Component', () => {
  it('should render correctly', () => {
    // ...
  });

  it('should handle interactions', () => {
    // ...
  });
});
```

5. **Documentation**

- Documenter les nouveaux composants dans Storybook
- Mettre à jour la documentation API si nécessaire
- Ajouter des commentaires pour le code complexe

### Process de Pull Request

1. **Avant de soumettre**
```bash
# Vérifier le linting
npm run lint

# Lancer les tests
npm run test

# Vérifier les types
npm run type-check
```

2. **Template de PR**
```markdown
## Description
Description claire et concise des changements

## Type de changement
- [ ] Nouvelle fonctionnalité
- [ ] Correction de bug
- [ ] Amélioration de performance
- [ ] Refactoring
- [ ] Documentation

## Tests
- [ ] Tests unitaires
- [ ] Tests e2e
- [ ] Tests manuels

## Screenshots (si applicable)

## Checklist
- [ ] J'ai testé mes changements
- [ ] J'ai mis à jour la documentation
- [ ] Mes changements ne créent pas de nouveaux warnings
```

### CI/CD

Notre pipeline GitHub Actions vérifie :
- Linting
- Tests
- Build
- Types
- Couverture de code

### Versioning

Nous suivons le [Semantic Versioning](https://semver.org/) :
- MAJOR.MINOR.PATCH
- Ex: 1.0.0

### Commits

Suivre la convention [Conventional Commits](https://www.conventionalcommits.org/) :
```
feat: ajoute une nouvelle fonctionnalité
fix: corrige un bug
docs: met à jour la documentation
style: changements de formatage
refactor: refactoring du code
test: ajoute ou modifie des tests
```
