# Site Vitrine - Entreprise de Rénovation

Site web vitrine pour une entreprise de rénovation construit avec Django (backend) et React + Vite (frontend).

## Technologies utilisées

### Backend
- Django 5.2.7
- Django REST Framework
- PostgreSQL
- Pillow (gestion des images)
- django-cors-headers

### Frontend
- React 18
- Vite
- Material-UI (MUI)
- Framer Motion (animations)
- React Router
- Axios

## Structure du projet

```
.
├── backend/              # Application Django
│   ├── backend/         # Configuration Django
│   ├── core/            # Application principale
│   ├── media/           # Fichiers uploadés
│   ├── staticfiles/     # Fichiers statiques collectés
│   └── manage.py
├── frontend/            # Application React
│   ├── src/
│   │   ├── components/  # Composants réutilisables
│   │   ├── pages/       # Pages de l'application
│   │   ├── services/    # Services API
│   │   ├── config/      # Configuration
│   │   └── theme/       # Thème Material-UI
│   └── package.json
└── venv/                # Environnement virtuel Python
```

## Installation

### Prérequis
- Python 3.12+
- Node.js 18+
- PostgreSQL

### 1. Configuration de la base de données

Créez une base de données PostgreSQL :

```bash
sudo -u postgres psql
CREATE DATABASE renovation_db;
CREATE USER postgres WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE renovation_db TO postgres;
\q
```

### 2. Configuration du Backend

```bash
# Activer l'environnement virtuel
source venv/bin/activate

# Installer les dépendances
cd backend
pip install -r requirements.txt

# Configurer les variables d'environnement
# Éditer le fichier .env avec vos paramètres
nano .env

# Effectuer les migrations
python manage.py makemigrations
python manage.py migrate

# Créer un superutilisateur
python manage.py createsuperuser

# Lancer le serveur de développement
python manage.py runserver
```

Le backend sera accessible sur http://localhost:8000
L'admin Django sera sur http://localhost:8000/admin

### 3. Configuration du Frontend

```bash
# Dans un nouveau terminal
cd frontend

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

Le frontend sera accessible sur http://localhost:5173

## Configuration pour la production

### Backend

1. Modifier le fichier `backend/.env` :
```env
DEBUG=False
ALLOWED_HOSTS=votredomaine.com,www.votredomaine.com
SECRET_KEY=votre-clé-secrète-très-longue-et-complexe
```

2. Collecter les fichiers statiques :
```bash
python manage.py collectstatic
```

### Frontend

1. Créer un build de production :
```bash
cd frontend
npm run build
```

2. Les fichiers seront dans `frontend/dist/`

### Déploiement sur cPanel

#### Backend Django
1. Uploader les fichiers du backend via FTP/SFTP
2. Configurer l'application Python dans cPanel :
   - Python App Manager
   - Définir le point d'entrée : `backend/wsgi.py`
   - Installer les dépendances depuis requirements.txt

3. Configurer la base de données PostgreSQL dans cPanel
4. Mettre à jour le fichier `.env` avec les bonnes informations

#### Frontend React
1. Builder le frontend localement : `npm run build`
2. Uploader le contenu du dossier `dist/` dans le répertoire public_html
3. Configurer le fichier `.htaccess` pour React Router :

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

## Utilisation de l'admin Django

1. Connectez-vous à http://localhost:8000/admin (ou votre domaine en production)
2. Ajoutez les informations de l'entreprise dans "Informations de l'entreprise"
3. Créez des services
4. Ajoutez des projets avec leurs images
5. Gérez les témoignages clients
6. Consultez les messages de contact

## Media files (uploads)

During development, uploaded media files are stored in the `media/` folder at the project root (`backend/media/`).

- Use the Django admin to upload images for `Service`, `Project` and `ProjectImage`.
- When serving the site in development, Django will serve files from `MEDIA_URL` (`/media/`) because `DEBUG=True`.
- In production (cPanel or similar), configure `MEDIA_ROOT` to point to a persistent folder outside of your static build and ensure your web server serves that directory. Example in `.env`:

```env
MEDIA_ROOT=/home/username/path/to/app/media
```

If you deploy the Django app behind Apache or Nginx, add a rule to serve `/media/` from that folder.

## Email notifications for contact form

The backend will send an email to `SITE_OWNER_EMAIL` when a new contact message is submitted. By default the project uses the console email backend in development (prints emails to the console).

To enable real SMTP delivery, update `backend/.env` with SMTP settings (an example is in `backend/.env.example`).

## Fonctionnalités

### Backend
- API REST complète
- Admin Django personnalisé en français
- Gestion des images avec upload
- Models :
  - CompanyInfo (informations entreprise - singleton)
  - Service (services proposés)
  - Project (réalisations avec galerie)
  - ProjectImage (images des projets)
  - Testimonial (témoignages clients)
  - ContactMessage (messages de contact)

### Frontend
- Pages :
  - Accueil avec sections services, projets, témoignages
  - Services (liste de tous les services)
  - Projets/Réalisations (galerie de projets)
  - Détail d'un projet (avec galerie photos)
  - À propos
  - Contact (formulaire fonctionnel)
- Design responsive Material-UI
- Animations avec Framer Motion
- SEO optimisé
- Navigation fluide avec React Router

## Scripts utiles

### Backend
```bash
# Créer des migrations
python manage.py makemigrations

# Appliquer les migrations
python manage.py migrate

# Créer un superutilisateur
python manage.py createsuperuser

# Lancer le serveur
python manage.py runserver

# Collecter les fichiers statiques
python manage.py collectstatic
```

### Frontend
```bash
# Développement
npm run dev

# Build production
npm run build

# Preview du build
npm run preview
```

## Variables d'environnement

### Backend (.env)
```env
SECRET_KEY=votre-clé-secrète
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
DB_NAME=renovation_db
DB_USER=postgres
DB_PASSWORD=votre-mot-de-passe
DB_HOST=localhost
DB_PORT=5432
CORS_ALLOWED_ORIGINS=http://localhost:5173,http://localhost:5174
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:8000/api
```

## Support

Pour toute question ou problème, contactez l'équipe de développement.

## Licence

Propriétaire - Tous droits réservés
