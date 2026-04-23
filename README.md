# Creating Animations

Projekt do tworzenia animowanych wideo z wykorzystaniem Remotion.

## Technologia

- [Remotion](https://www.remotion.dev/) – framework do tworzenia wideo w React
- React 19
- Tailwind CSS v4

## Setup

```bash
cd video
npm install
```

## Polecenia

```bash
# Start dev server
npm run dev

# Build wideo
npm run build

# Lint + typecheck
npm run lint

# Upgrade Remotion
npm run upgrade
```

## Struktura

```
video/
├── src/
│   ├── Root.tsx        # Konfiguracja kompozycji
│   ├── Composition.tsx  # Główna kompozycja
│   ├── index.ts        # Entry point
│   └── index.css       # Style
├── package.json
├── remotion.config.ts
└── tsconfig.json
```

## Dokumentacja

- https://www.remotion.dev/docs/the-fundamentals
- https://www.remotion.dev/docs/