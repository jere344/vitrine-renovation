# Guide de Démarrage Rapide - Campilongo Frères Rénovation

## 🚀 Comment utiliser votre nouveau site web

### 1. Accès au Panneau d'Administration

**URL** : `https://api.campilongofreres.fr/admin` (après déploiement)

**Identifiants** : Créés lors de l'installation initiale

### 2. Ajouter vos Réalisations

1. Connectez-vous au panneau d'administration
2. Cliquez sur **"Projects"** (Projets)
3. Cliquez sur **"Add Project"** (Ajouter un projet)
4. Remplissez les informations :
   - **Titre** : Nom du projet (ex: "Rénovation cuisine moderne")
   - **Slug** : Généré automatiquement depuis le titre
   - **Service** : Sélectionnez le service associé (Cuisine, Salle de bain, etc.)
   - **Location** : Ville (ex: "Lattes", "Montpellier")
   - **Short description** : Description courte (2-3 phrases)
   - **Description** : Description détaillée du projet
   - **Featured image** : Image principale (format recommandé : 1920x1080px)
   - **Is featured** : Cochez pour afficher le badge "Avant/Après"
   - **Completion date** : Date de fin du projet
5. Cliquez sur **"Save"** (Enregistrer)

### 3. Ajouter vos Services

1. Dans le panneau admin, cliquez sur **"Services"**
2. Cliquez sur **"Add Service"**
3. Remplissez :
   - **Titre** : Nom du service (ex: "Plomberie générale")
   - **Description** : Détails du service
   - **Short description** : Résumé court
   - **Image** : Photo représentative
   - **Is active** : Cochez pour publier
4. Cliquez sur **"Save"**

### 4. Ajouter des Témoignages

1. Dans le panneau admin, cliquez sur **"Testimonials"**
2. Cliquez sur **"Add Testimonial"**
3. Remplissez :
   - **Client name** : Nom du client
   - **Client location** : Ville du client
   - **Content** : Le témoignage
   - **Rating** : Note sur 5
   - **Is active** : Cochez pour publier
4. Cliquez sur **"Save"**

### 5. Modifier les Informations de l'Entreprise

1. Dans le panneau admin, cliquez sur **"Company Info"**
2. Modifiez :
   - **Nom de l'entreprise**
   - **Tagline** (slogan)
   - **Description**
   - **Téléphone**
   - **Email**
   - **Adresse**
   - **Liens réseaux sociaux** (Facebook, Instagram, LinkedIn)
3. Cliquez sur **"Save"**

---

## 📧 Recevoir les Messages du Formulaire de Contact

Les messages envoyés via le formulaire de contact sont automatiquement transmis à :
**thomascampilongo@yahoo.fr**

Vérifiez régulièrement votre boîte de réception et vos spams !

---

## 🎨 Conseils pour les Photos

### Format Recommandé
- **Format** : JPG ou PNG
- **Résolution** : Minimum 1920x1080px
- **Poids** : Optimisé pour le web (< 500 KB par image)

### Types de Photos
1. **Projets** : Avant/après, différentes étapes, résultat final
2. **Services** : Photos illustrant chaque type de service
3. **Équipe** : Photo des propriétaires pour la section "Notre Histoire"

### Outils de Compression (gratuits)
- TinyPNG : https://tinypng.com
- Squoosh : https://squoosh.app
- ImageOptim : https://imageoptim.com (Mac)

---

## 🔄 Mettre à Jour le Site

### Option 1 : Via le Panneau Admin
Pour le contenu (projets, services, témoignages) : utilisez le panneau d'administration Django.

### Option 2 : Via cPanel
Pour les mises à jour techniques :
1. Connectez-vous à cPanel
2. Allez dans **"Git Version Control"**
3. Cliquez sur **"Pull or Deploy"**
4. Le site sera automatiquement mis à jour

---

## 📱 Vérifier votre Site

### URLs à Tester
- **Site principal** : https://campilongofreres.fr
- **API** : https://api.campilongofreres.fr/api/
- **Admin** : https://api.campilongofreres.fr/admin

### Test sur Différents Appareils
- ✅ Smartphone (iPhone / Android)
- ✅ Tablette (iPad / Android)
- ✅ Ordinateur (Windows / Mac)

### Test de Fonctionnalités
- ✅ Navigation entre les pages
- ✅ Filtres sur la page Réalisations
- ✅ Formulaire de contact
- ✅ Liens réseaux sociaux
- ✅ Responsive (rotation de l'écran mobile)

---

## 🆘 Problèmes Courants

### "Le site n'affiche rien"
1. Vérifiez que le domaine est bien configuré
2. Attendez la propagation DNS (24-48h)
3. Videz le cache de votre navigateur (Ctrl+F5)

### "Je ne reçois pas les emails du formulaire"
1. Vérifiez votre boîte spam
2. Vérifiez que l'email `contact@campilongofreres.fr` existe
3. Vérifiez les paramètres SMTP dans le fichier `.env`

### "Les images ne s'affichent pas"
1. Vérifiez que les images sont au bon format (JPG, PNG)
2. Vérifiez que les images ne sont pas trop lourdes (< 5 MB)
3. Re-téléchargez l'image dans le panneau admin

### "Je ne peux pas me connecter à l'admin"
1. Vérifiez vos identifiants
2. Essayez de réinitialiser le mot de passe via SSH :
   ```bash
   cd ~/campilongo_api
   python manage.py changepassword votre_username
   ```

---

## 📞 Support Technique

### Développeur
**Guerin**
- LinkedIn : [Profil LinkedIn](https://www.linkedin.com/in/jérémy-guerin-b9019b255/)
- GitHub : [jere344](https://github.com/jere344)
- Email : (contactez via LinkedIn)

### Documentation Complète
- **DEPLOYMENT.md** : Guide de déploiement détaillé
- **PROJET_RESUME.md** : Résumé du projet et fonctionnalités

---

## 🎯 Checklist de Lancement

Avant de lancer officiellement le site :

- [ ] Ajouter au moins 6 réalisations avec photos
- [ ] Ajouter tous vos services avec descriptions
- [ ] Ajouter 2-3 témoignages clients
- [ ] Remplir les informations de l'entreprise
- [ ] Ajouter vos liens réseaux sociaux
- [ ] Tester le formulaire de contact
- [ ] Vérifier sur mobile et tablette
- [ ] Installer le certificat SSL (HTTPS)
- [ ] Configurer l'email contact@campilongofreres.fr
- [ ] Faire tester le site par quelques personnes
- [ ] Annoncer le lancement sur vos réseaux sociaux !

---

## 📈 Prochaines Étapes

Une fois le site lancé :

1. **Référencement (SEO)**
   - Inscrivez votre site sur Google Search Console
   - Créez un compte Google My Business
   - Demandez à vos clients de laisser des avis

2. **Marketing**
   - Partagez vos réalisations sur les réseaux sociaux
   - Ajoutez l'URL du site sur vos cartes de visite
   - Incluez le lien dans votre signature email

3. **Maintenance**
   - Ajoutez régulièrement de nouvelles réalisations
   - Mettez à jour vos services si besoin
   - Répondez rapidement aux messages du formulaire

4. **Évolution**
   - Blog (actualités, conseils rénovation)
   - Calculateur de devis en ligne
   - Galerie avant/après interactive
   - Système de prise de rendez-vous en ligne

---

**Félicitations pour votre nouveau site web ! 🎉**

Vous êtes maintenant équipé pour gérer votre présence en ligne de manière professionnelle et élégante.

---

*Dernière mise à jour : Octobre 2025*
