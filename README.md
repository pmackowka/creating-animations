# Creating Animations

Projekt do tworzenia animowanych wideo z wykorzystaniem Remotion.

## Technologia

- [Remotion](https://www.remotion.dev/) – framework do tworzenia wideo w React
- React 19
- Tailwind CSS v4
- JetBrains Mono (Google Fonts)
- @remotion/transitions

## Setup

```bash
cd video
npm install
```

Dodatkowe pakiety (użyte w animacjach):
```bash
npx remotion add @remotion/google-fonts @remotion/transitions
```

## Polecenia

```bash
# Start dev server
npm run dev

# Render still (pojedyncza klatka)
npx remotion still [composition-id] --frame=30 --scale=0.25

# Render wideo
npx remotion render [composition-id]

# Lint + typecheck
npm run lint

# Upgrade Remotion
npm run upgrade
```

## Struktura

```
video/
├── src/
│   ├── Root.tsx           # Rejestracja kompozycji
│   ├── ExplainerDemo.tsx  # Przykładowa animacja
│   ├── Composition.tsx    # Pusta kompozycja
│   ├── index.ts           # Entry point
│   └── index.css         # Style
├── out/                  # Wyrenderowane wideo
├── package.json
├── remotion.config.ts
└── tsconfig.json
```

## Dokumentacja

- https://www.remotion.dev/docs/the-fundamentals
- https://www.remotion.dev/docs/

---

## Jak stworzyć animację - case study: ExplainerDemo

### Prompt użytkownika

> Stwórz nową animację z jedną kompozycją "ExplainerDemo".
>
> Animacja po polsku, pokazująca workflow tworzenia wideo w Claude Code z Remotion:
>
> SCENA 1: Tytuł "Od promptu do wideo w 5 minut" z spring animation od dołu. Pod spodem subtitle "Claude Code + Remotion". Pulsujący glow za tytułem.
>
> SCENA 2: Flow diagram – 5 kroków pojawiających się sekwencyjnie co 20 klatek, połączonych strzałkami:
> 💬 "Prompt" → 🤖 "Claude Code" → ⚛️ "Kod React" → 👀 "Podgląd" → 🎬 "MP4"
>
> Każdy krok to box z border #FFB700, tło primary z 15% opacity. Aktywny krok podświetlony pełnym primary.
>
> SCENA 3: Fade out z tekstem "Żadnego After Effects." po środku.
>
> Design system:
>
> - Tło: #000B14
> - Accent: #FFB700
> - Tekst: #F7F7F7 / #C2C2C2
> - Font: JetBrains Mono (z @remotion/google-fonts)
> - Spring: damping 12, stiffness 100
> - Bez audio/SFX

### Wykonane kroki

1. **Dodanie zależności**
   ```bash
   npx remotion add @remotion/google-fonts @remotion/transitions
   ```

2. **Załadowanie reguł Remotion** - przeczytano dokumentację:
   - `animations.md` - podstawowe animacje z useCurrentFrame()
   - `timing.md` - interpolate, Easing, spring
   - `fonts.md` - ładowanie Google Fonts
   - `sequencing.md` - Sequence, Series

3. **Stworzenie kompozycji** - plik `src/ExplainerDemo.tsx`:
   - Zdefiniowano colors: background #000B14, accent #FFB700, text #F7F7F7 / #C2C2C2
   - Załadowano JetBrains Mono przez `@remotion/google-fonts/JetBrainsMono`
   - Zaimplementowano spring animation z Easing.bezier (odpowiednik damping 12, stiffness 100)
   - SCENA 1 (0-60 klatek): Title z translateY od dołu + glow pulsujący
   - SCENA 2 (60-160 klatek): 5 FlowStepów pojawiających się co 20 klatek
   - SCENA 3 (160-180 klatek): Fade out tekstu

4. **Rejestracja kompozycji** - plik `src/Root.tsx`:
   ```tsx
   <Composition
     id="ExplainerDemo"
     component={ExplainerDemo}
     durationInFrames={180}
     fps={30}
     width={1280}
     height={720}
   />
   ```

5. **Lint & typescheck**:
   ```bash
   npm run lint
   ```

6. **Render still (test)**:
   ```bash
   npx remotion still ExplainerDemo --frame=30 --scale=0.25
   ```

7. **Render wideo**:
   ```bash
   npx remotion render ExplainerDemo
   ```
   Wyjście: `out/ExplainerDemo.mp4`

### Jak powtórzyć

1. Dodaj nową kompozycję w nowym pliku w `video/src/`
2. Zarejestruj ją w `Root.tsx`
3. Uruchom `npm run lint`
4. Preview: `npm run dev`
5. Render: `npx remotion render [nazwa-kompozycji]`