# Aides Agri

## Prérequis

### Python
- Python 3.13
- pipenv (`pip install pipenv`)

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
# Installation des dépendances Python avec pipenv
pipenv install 

# Installation des dépendances de développement (optionnel)
pipenv install --dev
```

### 4. Installation des dépendances Node.js

```bash
# Installation des dépendances Node.js
yarn install
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

### 1. Activation de l'environnement virtuel Python

```bash
pipenv shell
```

### 2. Migrations de la base de données

```bash
python manage.py migrate
```

### 3. Lancement du serveur de développement

```bash
python manage.py runserver
```

Le site sera accessible à l'adresse : http://localhost:8000

### 4. Développement des assets (optionnel)

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
- `python manage.py migrate` : Applique les migrations
- `python manage.py runserver` : Lance le serveur de développement
- `python manage.py createsuperuser` : Crée un compte administrateur

### Yarn
- `yarn build` : Compile tous les assets
- `yarn build:css` : Compile uniquement le CSS
- `yarn build:js` : Compile uniquement le JS
- `yarn watch` : Lance le mode watch pour le CSS et le JS
- `yarn watch:css` : Lance le mode watch pour le CSS uniquement
- `yarn watch:js` : Lance le mode watch pour le JS uniquement