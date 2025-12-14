# Guide de Déploiement - Campilongo Frères Rénovation

Ce guide vous explique comment déployer votre site web sur votre hébergement cPanel étape par étape.

## Table des Matières

1. [Prérequis](#prérequis)
2. [Configuration Git dans cPanel](#configuration-git-dans-cpanel)
3. [Configuration de la Structure des Dossiers](#configuration-de-la-structure-des-dossiers)
4. [Configuration de Python et Django](#configuration-de-python-et-django)
5. [Configuration du Frontend React](#configuration-du-frontend-react)
6. [Configuration du Nom de Domaine](#configuration-du-nom-de-domaine)
7. [Configuration de l'Email](#configuration-de-lemail)
8. [Déploiement Automatique](#déploiement-automatique)
9. [Dépannage](#dépannage)

---

## Prérequis

Avant de commencer, assurez-vous d'avoir:
- Un accès cPanel à votre hébergement
- Les identifiants de votre compte Git (GitHub, GitLab, etc.)
- Node.js installé sur votre machine locale (pour le build du frontend)
- Python 3.12 disponible sur votre hébergement cPanel

---

## 1. Configuration Git dans cPanel

### Étape 1.1 : Créer un dépôt Git

1. Connectez-vous à votre **cPanel**
2. Recherchez et cliquez sur **"Git™ Version Control"**
3. Cliquez sur **"Create"**
4. Remplissez les informations :
   - **Clone URL**: L'URL de votre dépôt (ex: `https://github.com/votrecompte/vitrine-renovation.git`)
   - **Repository Path**: `/home/votrecompte/repositories/vitrine-renovation`
   - **Repository Name**: `vitrine-renovation`
5. Cliquez sur **"Create"**

### Étape 1.2 : Configurer la Clé SSH (optionnel mais recommandé)

1. Dans cPanel, allez dans **"SSH Access"** > **"Manage SSH Keys"**
2. Cliquez sur **"Generate a New Key"**
3. Copiez la clé publique
4. Ajoutez-la à votre compte GitHub/GitLab :
   - GitHub : Settings > SSH and GPG keys > New SSH key
   - GitLab : Settings > SSH Keys

---

## 2. Configuration de la Structure des Dossiers

### Étape 2.1 : Créer les Dossiers Nécessaires

Connectez-vous via SSH ou utilisez le gestionnaire de fichiers cPanel pour créer :

```
/home/votrecompte/
├── repositories/
│   └── vitrine-renovation/
├── campilongo_api/              # Django backend
├── campilongo_app/              # Build temporaire React
├── campilongofreres.fr/         # Dossier public du site
└── virtualenv/
    └── campilongo_api/
        └── 3.12/
```

### Étape 2.2 : Vérifier la Structure

Utilisez le gestionnaire de fichiers ou SSH pour vérifier que tous les dossiers existent.

---

## 3. Configuration de Python et Django

### Étape 3.1 : Créer l'Environnement Virtuel Python

1. Dans cPanel, allez dans **"Setup Python App"**
2. Cliquez sur **"Create Application"**
3. Configurez :
   - **Python version**: 3.12
   - **Application root**: `/home/votrecompte/campilongo_api`
   - **Application URL**: `api.campilongofreres.fr` (ou votre sous-domaine)
   - **Application startup file**: `passenger_wsgi.py`
   - **Application Entry point**: `application`
4. Cliquez sur **"Create"**

### Étape 3.2 : Installer les Dépendances Django

1. Copiez le chemin de l'environnement virtuel affiché (ex: `/home/votrecompte/virtualenv/campilongo_api/3.12/bin/activate`)
2. Connectez-vous via SSH :
   ```bash
   ssh votrecompte@votreserveur.com
   ```
3. Activez l'environnement virtuel :
   ```bash
   source /home/votrecompte/virtualenv/campilongo_api/3.12/bin/activate
   ```
4. Installez les dépendances :
   ```bash
   cd ~/campilongo_api
   pip install -r requirements.txt
   ```

### Étape 3.3 : Configurer les Variables d'Environnement

1. Créez un fichier `.env` dans `/home/votrecompte/campilongo_api` :
   ```bash
   cd ~/campilongo_api
   nano .env
   ```

2. Ajoutez les variables suivantes :
   ```env
   DEBUG=False
   SECRET_KEY=votre-clé-secrète-très-longue-et-aléatoire
   ALLOWED_HOSTS=campilongofreres.fr,www.campilongofreres.fr,api.campilongofreres.fr
   
   # Base de données
   DATABASE_ENGINE=django.db.backends.sqlite3
   DATABASE_NAME=/home/votrecompte/campilongo_api/db.sqlite3
   
   # Email (voir section Email)
   EMAIL_HOST=mail.campilongofreres.fr
   EMAIL_PORT=587
   EMAIL_HOST_USER=contact@campilongofreres.fr
   EMAIL_HOST_PASSWORD=votre-mot-de-passe-email
   EMAIL_USE_TLS=True
   DEFAULT_FROM_EMAIL=contact@campilongofreres.fr
   CONTACT_EMAIL=thomascampilongo@yahoo.fr
   
   # CORS
   CORS_ALLOWED_ORIGINS=https://campilongofreres.fr,https://www.campilongofreres.fr
   ```

3. Sauvegardez et fermez (Ctrl+O, Enter, Ctrl+X)

### Étape 3.4 : Initialiser la Base de Données

```bash
cd ~/campilongo_api
python manage.py migrate
python manage.py collectstatic --noinput
python manage.py createsuperuser
```

---

## 4. Configuration du Frontend React

### Étape 4.1 : Configuration sur Votre Machine Locale

1. Sur votre machine locale, allez dans le dossier frontend :
   ```bash
   cd frontend
   ```

2. Créez un fichier `.env.production` :
   ```env
   VITE_API_URL=https://api.campilongofreres.fr/api
   ```

3. Installez les dépendances :
   ```bash
   npm install
   ```

4. Créez le build de production :
   ```bash
   npm run build
   ```

### Étape 4.2 : Configuration dans Git

1. Assurez-vous que le dossier `dist/` est **exclu** du `.gitignore` temporairement ou utilisez un workflow CI/CD
2. Committez et pushez les changements :
   ```bash
   git add .
   git commit -m "Add production build"
   git push origin main
   ```

**Note**: Pour une meilleure pratique, configurez un workflow GitHub Actions ou GitLab CI pour builder automatiquement le frontend.

---

## 5. Configuration du Nom de Domaine

### Étape 5.1 : Configurer le Domaine Principal

1. Dans cPanel, allez dans **"Domains"**
2. Ajoutez votre domaine principal : `campilongofreres.fr`
3. Pointez le **Document Root** vers : `/home/votrecompte/campilongofreres.fr`

### Étape 5.2 : Configurer le Sous-domaine API

1. Toujours dans **"Domains"**, cliquez sur **"Create A New Domain"**
2. Configurez :
   - **Domain**: `api.campilongofreres.fr`
   - **Document Root**: `/home/votrecompte/campilongo_api`
3. Cliquez sur **"Submit"**

### Étape 5.3 : Configurer les DNS

Chez votre registrar de domaine :
1. Ajoutez un enregistrement **A** :
   - Nom : `@`
   - Type : A
   - Valeur : L'IP de votre serveur cPanel
   - TTL : 3600

2. Ajoutez un enregistrement **CNAME** :
   - Nom : `www`
   - Type : CNAME
   - Valeur : `campilongofreres.fr`
   - TTL : 3600

3. Ajoutez un enregistrement **A** pour l'API :
   - Nom : `api`
   - Type : A
   - Valeur : L'IP de votre serveur cPanel
   - TTL : 3600

### Étape 5.4 : Installer le Certificat SSL

1. Dans cPanel, allez dans **"SSL/TLS Status"**
2. Sélectionnez vos domaines : `campilongofreres.fr`, `www.campilongofreres.fr`, `api.campilongofreres.fr`
3. Cliquez sur **"Run AutoSSL"**
4. Attendez que les certificats soient installés (quelques minutes)

---

## 6. Configuration de l'Email

### Étape 6.1 : Créer un Compte Email

1. Dans cPanel, allez dans **"Email Accounts"**
2. Cliquez sur **"Create"**
3. Configurez :
   - **Email**: `contact@campilongofreres.fr`
   - **Password**: Choisissez un mot de passe fort
   - **Storage Space**: 500 MB (ou selon vos besoins)
4. Cliquez sur **"Create"**

### Étape 6.2 : Configurer les Paramètres SMTP

1. Notez les paramètres SMTP de votre hébergeur (généralement) :
   - **Serveur SMTP**: `mail.campilongofreres.fr`
   - **Port**: 587 (TLS) ou 465 (SSL)
   - **Authentification**: Oui
   - **Username**: `contact@campilongofreres.fr`
   - **Password**: Le mot de passe que vous avez créé

2. Ces paramètres sont déjà dans votre fichier `.env` Django (voir section 3.3)

### Étape 6.3 : Tester l'Envoi d'Email

1. Connectez-vous au panneau d'administration Django : `https://api.campilongofreres.fr/admin`
2. Allez dans la page de contact de votre site
3. Envoyez un message de test
4. Vérifiez la réception sur `thomascampilongo@yahoo.fr`

---

## 7. Déploiement Automatique

### Étape 7.1 : Vérifier le Fichier .cpanel.yml

Le fichier `.cpanel.yml` est déjà configuré à la racine du projet. Il automatise :
- La synchronisation du code depuis Git
- L'installation des dépendances Python
- Les migrations Django
- La collecte des fichiers statiques
- Le déploiement du frontend

### Étape 7.2 : Activer le Déploiement Automatique

1. Dans cPanel, allez dans **"Git™ Version Control"**
2. Cliquez sur **"Manage"** à côté de votre dépôt
3. Activez **"Automatic Deployment"**
4. Sélectionnez la branche : `main` (ou `master`)
5. Cliquez sur **"Update"**

### Étape 7.3 : Déclencher un Déploiement

#### Option 1 : Push depuis votre machine locale
```bash
# Sur votre machine locale
cd frontend
npm run build
cd ..
git add .
git commit -m "Update website"
git push origin main
```

#### Option 2 : Déploiement manuel depuis cPanel
1. Dans cPanel > Git Version Control
2. Cliquez sur **"Pull or Deploy"**
3. Cliquez sur **"Update from Remote"**

### Étape 7.4 : Vérifier le Déploiement

1. Consultez les logs dans cPanel > Git Version Control > Deployment Logs
2. Visitez votre site : `https://campilongofreres.fr`
3. Vérifiez l'API : `https://api.campilongofreres.fr/api/`

---

## 8. Dépannage

### Problème : Le site affiche une page blanche

**Solution** :
1. Vérifiez que le fichier `.htaccess` est présent dans `/home/votrecompte/campilongofreres.fr`
2. Vérifiez les permissions des fichiers : `chmod -R 755 ~/campilongofreres.fr`
3. Vérifiez les logs d'erreur dans cPanel > Errors

### Problème : L'API ne fonctionne pas (500 Error)

**Solution** :
1. Vérifiez les logs Django : `tail -f ~/campilongo_api/logs/error.log`
2. Vérifiez le fichier `.env` :
   ```bash
   cd ~/campilongo_api
   cat .env
   ```
3. Redémarrez l'application Python dans cPanel > Setup Python App

### Problème : Les emails ne sont pas envoyés

**Solution** :
1. Vérifiez les paramètres SMTP dans le `.env`
2. Testez la connexion SMTP depuis le serveur :
   ```bash
   telnet mail.campilongofreres.fr 587
   ```
3. Vérifiez les logs Django pour les erreurs d'email
4. Assurez-vous que le port 587 n'est pas bloqué par le firewall

### Problème : Les fichiers statiques Django ne se chargent pas

**Solution** :
```bash
cd ~/campilongo_api
source ~/virtualenv/campilongo_api/3.12/bin/activate
python manage.py collectstatic --noinput
```

### Problème : Le déploiement automatique échoue

**Solution** :
1. Consultez les logs dans cPanel > Git Version Control > Deployment Logs
2. Vérifiez les chemins dans `.cpanel.yml`
3. Assurez-vous que tous les dossiers existent
4. Vérifiez les permissions : `chmod -R 755 ~/repositories`

---

## 9. Commandes Utiles

### Connexion SSH
```bash
ssh votrecompte@votreserveur.com
```

### Activer l'environnement virtuel Python
```bash
source ~/virtualenv/campilongo_api/3.12/bin/activate
```

### Mettre à jour Django
```bash
cd ~/campilongo_api
source ~/virtualenv/campilongo_api/3.12/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py collectstatic --noinput
```

### Voir les logs Django
```bash
tail -f ~/campilongo_api/logs/error.log
```

### Redémarrer l'application Python
Via cPanel > Setup Python App > Restart

### Vérifier le statut du site
```bash
curl -I https://campilongofreres.fr
curl -I https://api.campilongofreres.fr/api/
```

---

## 10. Maintenance et Mises à Jour

### Mise à Jour du Frontend

1. Sur votre machine locale :
   ```bash
   cd frontend
   # Faites vos modifications
   npm run build
   git add .
   git commit -m "Update frontend"
   git push origin main
   ```

2. Le déploiement automatique se déclenchera

### Mise à Jour du Backend

1. Faites vos modifications en local
2. Testez localement
3. Pushez sur Git :
   ```bash
   git add .
   git commit -m "Update backend"
   git push origin main
   ```

4. Le déploiement automatique s'occupera du reste

### Sauvegarde de la Base de Données

```bash
cd ~/campilongo_api
python manage.py dumpdata > backup_$(date +%Y%m%d).json
```

### Restauration de la Base de Données

```bash
cd ~/campilongo_api
python manage.py loaddata backup_20240101.json
```

---

## Support

Pour toute question ou problème :
- Email technique : thomascampilongo@yahoo.fr
- Développeur : Guerin
  - LinkedIn : https://www.linkedin.com/in/jérémy-guerin-b9019b255/
  - GitHub : https://github.com/jere344

---

**Dernière mise à jour : Octobre 2025**
