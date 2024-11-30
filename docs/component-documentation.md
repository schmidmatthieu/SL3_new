# Documentation des Composants

## 📚 Storybook

Notre documentation de composants est construite avec Storybook et accessible à :
```
http://localhost:6006
```

### Structure des composants

```
src/components/
├── auth/                    # Composants d'authentification
│   ├── AuthButtons         # Boutons de connexion OAuth
│   ├── AuthCallback        # Gestion du callback OAuth
│   └── ProtectedRoute      # HOC pour routes protégées
│
├── layout/                  # Composants de mise en page
│   ├── Header             # En-tête de l'application
│   ├── Footer             # Pied de page
│   └── Sidebar            # Barre latérale
│
├── ui/                      # Composants UI réutilisables
│   ├── Button             # Boutons personnalisés
│   ├── Input              # Champs de saisie
│   └── Card               # Cartes
│
└── shared/                  # Composants partagés
    ├── Loading            # Indicateurs de chargement
    └── ErrorBoundary      # Gestion des erreurs
```

### Thèmes et Styles

#### Thème clair/sombre

```tsx
// Exemple d'utilisation du thème
import { useTheme } from 'next-themes';

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  
  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      Toggle Theme
    </button>
  );
};
```

#### Variables CSS personnalisées

```css
:root {
  --primary: #2563eb;
  --secondary: #4f46e5;
  --accent: #0ea5e9;
  --background: #ffffff;
  --text: #0f172a;
}

[data-theme='dark'] {
  --background: #0f172a;
  --text: #ffffff;
}
```

### Animations GSAP

```tsx
// Exemple d'animation avec GSAP
import { useGSAP } from '@gsap/react';

export const AnimatedComponent = () => {
  const containerRef = useRef(null);
  
  useGSAP(() => {
    gsap.from(containerRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
    });
  }, []);

  return <div ref={containerRef}>Contenu animé</div>;
};
```

### Bonnes pratiques

1. **Performance**
   - Utiliser React.memo pour les composants purement présentationnels
   - Lazy loading des composants lourds
   - Optimisation des images avec next/image

2. **Accessibilité**
   - Tous les composants respectent les normes WCAG 2.1
   - Support complet du clavier
   - Labels et ARIA attributes appropriés

3. **Internationalisation**
   - Utilisation de react-i18next
   - Support RTL
   - Messages d'erreur localisés

### Tests

```tsx
// Exemple de test de composant
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
});
```

### Utilisation de shadcn/ui

```tsx
// Exemple d'utilisation de shadcn/ui
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const LoginForm = () => {
  return (
    <form>
      <Input placeholder="Email" type="email" />
      <Button variant="default">Login</Button>
    </form>
  );
};
```
