# Guide SEO - OZC Signalétique

## Vue d'ensemble

Ce document présente la stratégie SEO complète pour le site OZC Signalétique, spécialisé en signalétique et communication visuelle. Il couvre l'optimisation technique, le contenu, et les stratégies de référencement naturel.

## 1. Analyse des Mots-Clés

### 1.1 Mots-Clés Principaux (High Volume)
- **"signalétique"** (5400 recherches/mois)
- **"panneau signalétique"** (3600 recherches/mois)
- **"signalisation de sécurité"** (2900 recherches/mois)
- **"panneau sortie de secours"** (2400 recherches/mois)
- **"signalétique entreprise"** (1900 recherches/mois)

### 1.2 Mots-Clés Longue Traîne (Conversion élevée)
- **"panneau sortie de secours LED prix"**
- **"signalétique interne bureau"**
- **"panneau interdiction de fumer personnalisé"**
- **"signalisation PMR handicapé"**
- **"enseigne façade commerciale"**

### 1.3 Mots-Clés Locaux
- **"signalétique Paris"**
- **"panneau signalétique Île-de-France"**
- **"signalisation de sécurité près de moi"**
- **"fabricant signalétique France"**

### 1.4 Mots-Clés Sectoriels
- **"signalétique hôpital"**
- **"signalisation école"**
- **"panneau sécurité entreprise"**
- **"signalétique commerce"**
- **"signalisation industrielle"**

## 2. Architecture du Site et URLs

### 2.1 Structure Recommandée
```
ozc-signaletique.fr/
├── /signalisation-securite/
│   ├── /securite-incendie/
│   ├── /panneaux-interdiction/
│   ├── /panneaux-danger/
│   └── /epi-obligatoire/
├── /signaletique-interne/
│   ├── /orientation-wayfinding/
│   ├── /identification-locaux/
│   └── /information-generale/
├── /signaletique-externe/
│   ├── /enseignes-facades/
│   ├── /parking-circulation/
│   └── /identification/
├── /accessibilite/
│   ├── /pmr-handicap/
│   └── /signalisation-tactile/
└── /blog/
    ├── /guides/
    ├── /actualites/
    └── /conseils/
```

### 2.2 URLs Optimisées
- **Produits** : `/produit/panneau-sortie-secours-led-sec-001`
- **Catégories** : `/signalisation-securite/securite-incendie`
- **Articles** : `/blog/guide-choix-panneau-sortie-secours-2024`
- **Pages** : `/devis-signalisation-gratuit`

## 3. Optimisation On-Page

### 3.1 Balises Title (Exemples)
```html
<!-- Page d'accueil -->
<title>OZC Signalétique - Spécialiste Signalisation & Panneaux de Sécurité</title>

<!-- Page catégorie -->
<title>Signalisation de Sécurité | Panneaux Incendie & Évacuation | OZC</title>

<!-- Page produit -->
<title>Panneau Sortie de Secours LED - SEC-001 | 45,90€ | OZC Signalétique</title>

<!-- Page blog -->
<title>Guide 2024 : Comment Choisir ses Panneaux de Sortie de Secours</title>
```

### 3.2 Meta Descriptions (Exemples)
```html
<!-- Page d'accueil -->
<meta name="description" content="OZC Signalétique : fabricant français de panneaux de signalisation, signalétique de sécurité et communication visuelle. Devis gratuit, livraison rapide. ✓ Conformité réglementaire">

<!-- Page catégorie -->
<meta name="description" content="Signalisation de sécurité professionnelle : panneaux incendie, évacuation, interdiction. Conformes aux normes EN ISO. Livraison 48h. Prix fabricant.">

<!-- Page produit -->
<meta name="description" content="Panneau Sortie de Secours LED SEC-001 à 45,90€. Éclairage LED intégré, conforme NF. Livraison gratuite dès 75€. Stock disponible.">
```

### 3.3 Structure Hn
```html
<h1>Titre Principal avec Mot-Clé Principal</h1>
  <h2>Catégorie ou Section Importante</h2>
    <h3>Sous-section ou Produit Spécifique</h3>
    <h3>Autre Sous-section</h3>
  <h2>Autre Section Importante</h2>
    <h3>Détails ou Spécifications</h3>
```

### 3.4 Données Structurées (Schema.org)

#### Product Schema
```json
{
  "@context": "https://schema.org/",
  "@type": "Product",
  "name": "Panneau Sortie de Secours LED",
  "image": "https://ozc-signaletique.fr/images/panneau-sortie-led.jpg",
  "description": "Panneau de sortie de secours avec éclairage LED intégré",
  "sku": "SEC-LED-001",
  "brand": {
    "@type": "Brand",
    "name": "OZC Signalétique"
  },
  "offers": {
    "@type": "Offer",
    "url": "https://ozc-signaletique.fr/produit/panneau-sortie-secours-led",
    "priceCurrency": "EUR",
    "price": "45.90",
    "availability": "https://schema.org/InStock"
  }
}
```

#### Organization Schema
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "OZC Signalétique",
  "url": "https://ozc-signaletique.fr",
  "logo": "https://ozc-signaletique.fr/logo.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+33-1-23-45-67-89",
    "contactType": "customer service"
  }
}
```

## 4. Contenu SEO

### 4.1 Pages Piliers à Créer
1. **"Guide Complet de la Signalisation de Sécurité 2024"**
2. **"Réglementation Signalétique : Tout ce qu'il faut savoir"**
3. **"Signalétique PMR : Obligations et Solutions"**
4. **"Installation de Panneaux : Guide Technique"**
5. **"Comparatif Matériaux : PVC vs Aluminium vs Inox"**

### 4.2 Articles de Blog Recommandés
- "Les 10 erreurs à éviter en signalisation de sécurité"
- "Comment calculer le nombre de panneaux de sortie nécessaires ?"
- "Signalétique digitale vs traditionnelle : que choisir ?"
- "Maintenance des panneaux LED : conseils d'expert"
- "Tendances 2024 en signalétique d'entreprise"

### 4.3 Pages de Conversion
- **"Devis Signalisation Gratuit"** (Landing page principale)
- **"Signalétique sur Mesure"** (Personnalisation)
- **"Signalisation Urgente 24h"** (Service express)
- **"Pack Signalisation Complète Entreprise"** (Offre globale)

## 5. SEO Technique

### 5.1 Performance et Core Web Vitals
```javascript
// Optimisations à implémenter
- Lazy loading des images
- Compression des images (WebP)
- Minification CSS/JS
- Cache navigateur
- CDN pour les ressources statiques
```

### 5.2 Mobile-First
- Design responsive optimisé
- Vitesse de chargement mobile < 3s
- Navigation tactile intuitive
- Formulaires adaptés mobile

### 5.3 Crawlabilité
```xml
<!-- robots.txt -->
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /panier/
Disallow: /checkout/
Sitemap: https://ozc-signaletique.fr/sitemap.xml
```

### 5.4 Sitemap XML Structure
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://ozc-signaletique.fr/</loc>
    <lastmod>2024-03-20</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://ozc-signaletique.fr/signalisation-securite/</loc>
    <lastmod>2024-03-20</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
</urlset>
```

## 6. SEO Local

### 6.1 Google My Business
- Fiche complète avec photos
- Catégorie : "Fabricant de panneaux"
- Horaires d'ouverture
- Avis clients encouragés
- Posts réguliers

### 6.2 Citations Locales
- Pages Jaunes
- Kompass
- Societe.com
- Annuaires professionnels BTP
- Chambres de Commerce

### 6.3 Contenu Local
- "Signalétique Paris et Île-de-France"
- "Nos références en région Parisienne"
- "Installation rapide en région"
- Témoignages clients locaux

## 7. Link Building

### 7.1 Stratégies de Netlinking
- **Partenariats** avec architectes et bureaux d'études
- **Guest posting** sur blogs BTP et sécurité
- **Annuaires professionnels** spécialisés
- **Communiqués de presse** sur nouvelles gammes
- **Sponsoring** d'événements sécurité/BTP

### 7.2 Ancres de Liens Variées
- Marque : "OZC Signalétique"
- Exactes : "signalisation de sécurité"
- Partielles : "spécialiste signalétique"
- Génériques : "cliquez ici", "en savoir plus"
- URL nue : "ozc-signaletique.fr"

## 8. E-commerce SEO

### 8.1 Fiches Produits Optimisées
- Descriptions uniques (min. 300 mots)
- Spécifications techniques détaillées
- Images optimisées avec ALT
- Avis clients intégrés
- FAQ produit

### 8.2 Pages Catégories
- Texte d'introduction (500+ mots)
- Filtres SEO-friendly
- Pagination optimisée
- Breadcrumb complet

### 8.3 Gestion du Stock
- Balises noindex pour produits épuisés
- Redirections 301 pour produits supprimés
- Alertes de retour en stock

## 9. Mesure et Analytics

### 9.1 KPIs SEO à Suivre
- **Trafic organique** (objectif : +30% annuel)
- **Positions moyennes** (top 3 pour mots-clés principaux)
- **Taux de clic** (CTR > 5% en moyenne)
- **Conversions organiques** (objectif : 15% du CA)
- **Temps de chargement** (< 3 secondes)

### 9.2 Outils de Suivi
- Google Analytics 4
- Google Search Console
- SEMrush ou Ahrefs
- PageSpeed Insights
- Screaming Frog

## 10. Planning SEO

### 10.1 Actions Immédiates (Mois 1)
- Audit technique complet
- Optimisation des pages principales
- Installation des outils de tracking
- Création Google My Business

### 10.2 Actions Moyen Terme (Mois 2-6)
- Création de contenu blog (2 articles/mois)
- Optimisation des fiches produits
- Campagne de netlinking
- Amélioration de la vitesse

### 10.3 Actions Long Terme (Mois 6+)
- Expansion sémantique
- SEO international si pertinent
- Optimisations avancées
- Analyse concurrentielle continue

## 11. Prompts IA pour SEO

### 11.1 Création de Contenu
```
"Rédige un article de blog de 1500 mots sur '[sujet]' optimisé pour le mot-clé '[mot-clé]'. Inclus des sous-titres H2/H3, une introduction accrocheuse, et un appel à l'action. Ton : expert mais accessible."
```

### 11.2 Optimisation Technique
```
"Optimise cette page produit pour le SEO : améliore le title, la meta description, et la structure Hn. Produit : [nom du produit]. Mot-clé principal : [mot-clé]."
```

### 11.3 Analyse Concurrentielle
```
"Analyse les 3 premiers concurrents sur '[mot-clé]' et propose des améliorations pour surpasser leur contenu. Focus sur les points différenciants et la valeur ajoutée."
```

## 12. Checklist SEO

### 12.1 Technique
- [ ] Vitesse de chargement < 3s
- [ ] Mobile-friendly
- [ ] HTTPS activé
- [ ] Sitemap XML soumis
- [ ] Robots.txt configuré
- [ ] Données structurées implémentées

### 12.2 Contenu
- [ ] Mots-clés recherchés et mappés
- [ ] Titles uniques et optimisés
- [ ] Meta descriptions rédigées
- [ ] Structure Hn logique
- [ ] Contenu unique et qualitatif
- [ ] Images optimisées avec ALT

### 12.3 Off-Page
- [ ] Google My Business créé
- [ ] Profils réseaux sociaux
- [ ] Stratégie de netlinking
- [ ] Citations locales
- [ ] Monitoring des mentions

---

*Document créé le : Mars 2024*
*Dernière mise à jour : Mars 2024*
*Version : 1.0* 