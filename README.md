# Aides Agri

## Prérequis

### Python
- `uv`: https://docs.astral.sh/uv/
- `just`: https://just.systems/

### Base de données
- PostgreSQL
- Créer une base de données pour le projet

### Node.js et Yarn
- Node.js ≥ 20.x
- Yarn (voir section installation)

## Installation de l'environnement

### 1. Installation de Node.js

**Ubuntu/Debian :**
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

**macOS avec Homebrew :**
```bash
brew install node
```

### 2. Installation de Yarn

**Ubuntu/Debian :**
```bash
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt update
sudo apt install yarn
```

**macOS avec Homebrew :**
```bash
brew install yarn
```

### 3. Installation des dépendances Python

```bash
# Installation des dépendances Python avec uv, via just
just install-python
```

### 4. Installation des dépendances Javascript

```bash
# Installation des dépendances yarn, via just
just install-js
```

### 5. Configuration de la base de données

Créez un fichier `.env` à la racine du projet avec les variables suivantes :

```env
DB_NAME=your_db_name
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
```

### 6. Build des assets

```bash
# Build des assets (CSS et JS)
yarn build
```

## Lancement du projet en local

### 1. Migrations de la base de données

```bash
just migrate
```

### 2. Lancement du serveur de développement

```bash
just runserver
```

Le site sera accessible à l'adresse : http://localhost:8000

### 3. Développement des assets (optionnel)

Pour travailler sur le CSS et le JS avec rechargement automatique :

```bash
yarn watch
```

## Structure des assets

```
static/
├── src/          # Fichiers source
│   ├── css/
│   │   └── custom.scss
│   └── js/
│       └── main.js
└── vendor/       # Fichiers générés et dépendances
    ├── css/
    │   └── custom.min.css
    └── js/
        ├── jquery.min.js
        └── main.min.js
```

## Commandes disponibles

### Django
- `just migrate` : Applique les migrations
- `just makemigrations` : Crée les migrations selon les changements dans les modèles
- `just runserver` : Lance le serveur de développement
- `just manage createsuperuser` : Crée un compte administrateur

### Yarn
- `yarn build` : Compile tous les assets
- `yarn build:css` : Compile uniquement le CSS
- `yarn build:js` : Compile uniquement le JS
- `yarn watch` : Lance le mode watch pour le CSS et le JS
- `yarn watch:css` : Lance le mode watch pour le CSS uniquement
- `yarn watch:js` : Lance le mode watch pour le JS uniquement
