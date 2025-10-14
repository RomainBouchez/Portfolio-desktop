# Portfolio Desktop - Interface macOS

Portfolio interactif avec une interface type bureau macOS, inspiré de [bychudy.com](https://www.bychudy.com/).

## 🚀 Fonctionnalités

- **Interface Desktop** : Icônes de projets draggables comme sur un bureau
- **Fenêtres Modales** : Fenêtres type macOS pour afficher les détails des projets
- **Dock macOS** : Barre de dock en bas avec accès rapide aux projets
- **Menu Bar** : Barre de menu supérieure avec horloge en temps réel
- **Drag & Drop** : Déplacez les icônes de projets librement
- **Responsive** : Adaptation mobile/tablette/desktop

## 📦 Technologies

- **Next.js 15** avec App Router
- **React 19**
- **TypeScript**
- **Tailwind CSS 4**

## 🛠️ Installation

```bash
cd portfolio-desktop
npm install
```

## 📁 Images

**IMPORTANT** : Vous devez copier le dossier `img/` de votre portfolio existant vers `portfolio-desktop/public/img/`

```bash
# Si vos images sont dans Portfolio/img/
cp -r ../Portfolio/img/* portfolio-desktop/public/img/

# Ou spécifiez le chemin correct
cp -r /chemin/vers/votre/dossier/img/* portfolio-desktop/public/img/
```

Les images attendues :
- `/img/projet_1_acceuil.png`
- `/img/Restaurant-home.png`
- `/img/Form.jpg`
- `/img/Fast-typing-1100x400.webp`
- `/img/Twitthe-icon.png`
- `/img/AICal_Logo_Text.png`
- `/img/ov-amsterdam-map.png`
- `/img/PST4A/chess-robot-preview.png`

## 🚀 Lancement

```bash
cd portfolio-desktop
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 📝 Structure

```
portfolio-desktop/
├── app/
│   ├── layout.tsx        # Layout principal
│   ├── page.tsx          # Page d'accueil avec desktop
│   └── globals.css       # Styles globaux
├── components/
│   ├── DesktopIcon.tsx   # Icône draggable de projet
│   └── ProjectWindow.tsx # Fenêtre modale de projet
├── lib/
│   └── projects.ts       # Données des projets
└── public/
    └── img/              # Images des projets (à copier)
```

## 🎨 Personnalisation

### Modifier les positions des icônes

Dans `app/page.tsx`, modifiez le tableau `iconPositions`.

### Modifier les projets

Éditez `lib/projects.ts` pour ajouter/modifier vos projets.

---

Développé par Romain Bouchez
