# Guide de Gestion des Images - Campilongo Frères Rénovation

## 📸 Vue d'Ensemble

Votre site web contient maintenant **150+ images** réparties en :
- **8 projets** avec galeries complètes
- **5 projets avant/après** avec comparaisons interactives
- **3 images héro** pour la page d'accueil

Toutes les images sont **facilement modifiables** depuis le panneau d'administration Django.

---

## 🎯 Accès aux Images

### 1. Connexion au Panneau d'Administration

1. Allez sur : `http://localhost:8000/admin` (en développement)
2. Connectez-vous avec vos identifiants

### 2. Navigation dans les Sections

Le panneau admin contient maintenant ces sections pour les images :

#### **PROJETS**
- **Projects** : Gérer tous les projets avec leurs images principales et "avant"
- **Images de projet** : Galeries complètes pour chaque projet

#### **GALERIE**
- **Images de galerie** : Images de mise en valeur pour la page d'accueil

---

## 🖼️ Gestion des Images de Projets

### Modifier un Projet

1. Cliquez sur **"Projects"** dans l'admin
2. Cliquez sur le projet que vous voulez modifier
3. Vous verrez 3 sections d'images :

#### **A. Image Principale (Après)**
- L'image qui représente le projet terminé
- Affichée dans la liste des projets et en haut de la page détail
- **Conseil** : Choisissez votre meilleure photo !

#### **B. Image Avant (optionnel)**
- Pour les projets "avant/après"
- Active automatiquement la comparaison interactive
- Vérifiez que la case **"Afficher avant/après"** est cochée

#### **C. Galerie d'Images**
- En bas de la page, section **"Images de projet"**
- Vous pouvez :
  - ✅ Ajouter de nouvelles images
  - ✅ Supprimer des images
  - ✅ Réorganiser l'ordre (champ "Ordre")
  - ✅ Masquer temporairement (décochez "Visible")
  - ✅ Ajouter des légendes

### Aperçu des Images

✨ **Nouveau** : Les images ont maintenant des aperçus visuels dans l'admin !
- Aperçu miniature dans la liste
- Aperçu agrandi dans le formulaire d'édition

---

## 🎨 Gestion des Images de Galerie (Page d'Accueil)

### Ajouter/Modifier une Image Héro

1. Cliquez sur **"Images de galerie"** dans l'admin
2. Pour une nouvelle image : cliquez **"Add Gallery Image"**
3. Remplissez :
   - **Titre** : Nom descriptif (ex: "Cuisine Moderne")
   - **Image** : Téléchargez votre photo
   - **Catégorie** : Sélectionnez **"Image héro (homepage)"**
   - **Légende** : Texte qui s'affiche au survol (optionnel)
   - **Ordre** : Numéro pour l'ordre d'affichage (1 = premier)
   - **Actif** : Coché pour publier

### Catégories d'Images de Galerie

- **Image héro** : Affichées dans la section "Notre Savoir-Faire" de la page d'accueil
- **Vitrine** : Réservé pour futures fonctionnalités
- **Équipe** : Pour photos de l'équipe
- **Autre** : Usage général

---

## 🔄 Workflow Recommandé pour Gérer les Images

### Scénario 1 : "Je veux retirer une photo qui ne me plaît pas"

1. Allez dans **Projects** ou **Gallery Images**
2. Trouvez l'image concernée
3. Option A : **Supprimer** l'image complètement
4. Option B : **Décocher "Visible"** ou **"Actif"** pour la masquer temporairement

### Scénario 2 : "Je veux ajouter de nouvelles photos à un projet"

1. Allez dans **Projects**
2. Cliquez sur le projet
3. Scrollez jusqu'à la section **"Images de projet"**
4. Cliquez sur **"Add another Image de projet"**
5. Téléchargez votre image
6. Définissez l'ordre (ex: 99 pour la mettre en dernier)
7. Sauvegardez

### Scénario 3 : "Je veux réorganiser l'ordre des photos"

1. Chaque image a un champ **"Ordre"**
2. Les images sont triées par ce numéro (1, 2, 3...)
3. Modifiez les numéros et sauvegardez
4. L'ordre sera mis à jour automatiquement

### Scénario 4 : "Je veux changer l'image principale d'un projet"

1. Allez dans **Projects**
2. Cliquez sur le projet
3. Section **"Images"**
4. Cliquez sur **"Parcourir"** à côté de "Image principale"
5. Sélectionnez la nouvelle image
6. Sauvegardez

---

## 💡 Conseils et Bonnes Pratiques

### Qualité des Images

Les images fournies par le client sont de qualité moyenne (photos WhatsApp), donc :

✅ **À FAIRE**
- Utiliser les images dans des formats raisonnables (pas de zoom excessif)
- Privilégier les galeries avec plusieurs photos
- Mettre les meilleures photos en "image principale"

❌ **À ÉVITER**
- Afficher en très grand format sur la page d'accueil
- Zoomer excessivement sur les détails
- Utiliser comme fond d'écran plein écran

### Organisation des Projets

Pour chaque projet, essayez d'avoir :
- ✅ 1 image principale de qualité
- ✅ 5-10 images de galerie minimum
- ✅ Pour les avant/après : photos prises du même angle si possible

### Noms de Fichiers

Lors du téléchargement manuel de nouvelles images :
- Utilisez des noms descriptifs : `cuisine-moderne-ilot-central.jpg`
- Évitez les espaces : utilisez des tirets `-`
- Gardez les noms courts et clairs

### Formats Recommandés

- **Format** : JPG (pour les photos)
- **Poids** : Idéalement < 500 KB par image
- **Résolution** : 1920x1080 maximum

---

## 🚀 Fonctionnalités Avancées

### Comparaison Avant/Après

Pour activer la comparaison interactive :
1. Le projet doit avoir une **"Image principale"** (après)
2. Le projet doit avoir une **"Image avant"**
3. La case **"Afficher avant/après"** doit être cochée

La comparaison s'affichera automatiquement sur la page détail du projet avec :
- 🖱️ Slider interactif
- 📱 Compatible mobile et tactile
- 🎨 Animation fluide

### Lightbox Galerie

Toutes les galeries de projet ont maintenant :
- 🔍 Zoom en plein écran au clic
- ⬅️➡️ Navigation avec flèches
- 📊 Compteur d'images
- ⌨️ Navigation au clavier (flèches, Échap)

---

## 📊 Résumé des Projets Importés

Voici les 8 projets créés automatiquement :

| # | Titre | Service | Avant/Après | Images |
|---|-------|---------|-------------|--------|
| 1 | Rénovation Cuisine Moderne | Cuisine | ✅ | 5 après, 3 avant |
| 2 | Salle de Bain Contemporaine | Salle de Bain | ✅ | 5 après, 5 avant |
| 3 | Aménagement Rangement Sur-Mesure | Rangement | ✅ | ~10 après, ~5 avant |
| 4 | Cuisine Ouverte avec Verrière | Cuisine | ✅ | ~8 après, ~5 avant |
| 5 | Salle de Bain Luxe | Salle de Bain | ✅ | ~10 après, ~8 avant |
| 6 | Rénovation Multi-Pièces | Rénovation Générale | ❌ | ~29 images |
| 7 | Aménagement Combles | Rénovation Générale | ❌ | ~55 images |
| 8 | Cuisine Moderne Épurée | Cuisine | ❌ | ~17 images |

**Total : ~150+ images importées**

---

## 🔧 Dépannage

### "Je ne vois pas l'aperçu des images"

- Vérifiez que le serveur Django est démarré
- Actualisez la page avec Ctrl+F5
- Vérifiez que les fichiers sont bien dans `backend/media/`

### "Les images ne s'affichent pas sur le site"

- Vérifiez que l'image est bien téléchargée
- Vérifiez que "Actif" ou "Visible" est coché
- Videz le cache du navigateur
- Vérifiez que le serveur backend est lancé

### "Je veux revenir aux images d'origine"

Les images originales sont toujours dans :
```
media_to_import/
├── 1a/ (projet 1 - après)
├── 1b/ (projet 1 - avant)
├── 2a/
├── 2b/
...
```

Vous pouvez toujours les re-télécharger depuis ces dossiers.

---

## 📞 Support

Pour toute question ou assistance :

**Développeur** : Guerin
- LinkedIn : [Profil LinkedIn](https://www.linkedin.com/in/jérémy-guerin-b9019b255/)
- GitHub : [jere344](https://github.com/jere344)

---

**Dernière mise à jour** : Décembre 2025
**Version** : 2.0 - Gestion d'images avancée
