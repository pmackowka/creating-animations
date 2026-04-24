

---
name: elevenlabs-audio
description: Generowanie efektów dźwiękowych i muzyki przez ElevenLabs API
metadata:
  tags: elevenlabs, audio, sound-effects, music, sfx, remotion
---

## Kiedy używać

Użyj tego skilla gdy potrzebujesz:
- Efektów dźwiękowych (whoosh, explosion, click, ambient, etc.)
- Krótkich utworów muzycznych (do 30 sekund)
- Audio do animacji Remotion (intro, przejścia, tło)

## Instalacja

1. Stwórz folder w swoim projekcie:

.claude/skills/elevenlabs-audio/

2. Umieść ten plik jako `SKILL.md` w tym folderze.

3. Dodaj klucz API do pliku `.env` w głównym katalogu projektu:

ELEVENLABS_API_KEY=sk_twoj_klucz_api

4. Upewnij się, że `.env` jest w `.gitignore`!

## Skąd wziąć API Key?

1. Zarejestruj się na [elevenlabs.io](https://elevenlabs.io)
2. Wejdź w Settings → API Keys
3. Wygeneruj nowy klucz i wklej do `.env`

## Sound Effects API

Generowanie efektów dźwiękowych z opisu tekstowego.

### Endpoint

POST https://api.elevenlabs.io/v1/music/compose

### **WYMAGANY PLAN**

⚠️ **Music API dostępne TYLKO na płatnych planach!**
- Free plan: `payment_required` - "Music API is not available for free users"
- Musisz mieć paid plan aby generować audio

### **Parametry**
*   `prompt` (required): Opis muzyki (styl, tempo, instrumenty, nastrój)
*   `music_length_ms` (optional): Długość w milisekundach (**min 3000ms**, np. 3000 = 3s)
*   `force_instrumental` (optional): `true` = bez wokalu, `false` = model sam decyduje

### **Przykład - instrumental (do tła wideo)**
```bash
curl -X POST "https://api.elevenlabs.io/v1/music/compose" \
 -H "xi-api-key: $ELEVENLABS_API_KEY" \
 -H "Content-Type: application/json" \
 -d '{
   "prompt": "Upbeat electronic lo-fi track with soft synths and chill drums, 90 bpm",
   "music_length_ms": 15000,
   "force_instrumental": true
 }' \
 --output "music.mp3"
```

### **Przykład - z wokalem**
```bash
curl -X POST "https://api.elevenlabs.io/v1/music/compose" \
 -H "xi-api-key: $ELEVENLABS_API_KEY" \
 -H "Content-Type: application/json" \
 -d '{
   "prompt": "Energetic pop song about summer vibes with catchy vocals, 120 bpm",
   "music_length_ms": 20000
 }' \
 --output "song.mp3"
```

### Użycie w Remotion
```tsx
import { Audio, staticFile } from "remotion";

<Audio src={staticFile("music.mp3")} volume={0.2} />

<Audio src={staticFile("whoosh.wav")} volume={0.5} />

<Audio src={staticFile("sfx-click.mp3")} volume={0.6} startFrom={30} />
```

## Wskazówki
1. Prompty zawsze po angielsku - znacznie lepsze wyniki
2. SFX: krótkie - 0.5-2s dla efektów dźwiękowych (min 3000ms)
3. Ambient: dłuższe - 10-22s dla tła dźwiękowego
4. Testuj prompt_influence - niższe (0.1-0.3) = bardziej kreatywne, wyższe (0.7-1.0) = bliżej opisu
5. Nazywaj pliki opisowo - sfx-whoosh.mp3, sfx-click.mp3, bg-lofi.mp3

## ⚠️ WAŻNE - Wymagania planu
- **Music API wymaga płatnego planu ElevenLabs**
- Free plan zwraca błąd: `{"detail":{"code":"paid_plan_required","message":"Music API is not available for free users..."}}`
- Sprawdź swój plan na https://elevenlabs.io/dashboard

## Limity
- Sound Effects: zależne od Twojego planu ElevenLabs (sprawdź dashboard)
- Music Generation: dostępne na płatnych planach
- Nie używaj nazw artystów ani chronionych utworów w promptach!
