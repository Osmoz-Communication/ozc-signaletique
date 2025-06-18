# Stratégies d'Upsell - OZC Signalétique

## Vue d'ensemble

Ce document détaille les stratégies d'upsell et de cross-selling implémentées sur le site OZC Signalétique pour maximiser la valeur moyenne des commandes et améliorer l'expérience client.

## 1. Stratégies par Page

### 1.1 Page d'Accueil (HomePage.tsx)
**Objectif :** Attirer l'attention sur les offres spéciales et créer un sentiment d'urgence

**Implémentations :**
- **Section "Offres Spéciales"** avec 3 packs promotionnels :
  - Pack Sécurité Incendie (-20%) : 156.90€ au lieu de 196.13€
  - Pack Signalétique Complète (-15%) : 234.50€ au lieu de 275.88€
  - Pack Accessibilité PMR (-10%) : 89.90€ au lieu de 99.89€

**Techniques utilisées :**
- Prix barrés pour montrer l'économie réalisée
- Pourcentages de réduction visibles
- Boutons d'action clairs "Profiter de l'offre"
- Design avec gradient pour attirer l'œil

### 1.2 Page Produit (ProductDetailPage.tsx)
**Objectif :** Augmenter la valeur du panier avec des produits complémentaires

**Implémentations :**
- **Section "Complétez votre achat"** avec 3 produits recommandés
- **Bundle promotion** avec réduction de 10%
- Calcul automatique des économies
- Sélection intelligente basée sur la catégorie du produit principal

**Techniques utilisées :**
- Algorithme de recommandation par catégorie
- Affichage des prix individuels vs prix bundle
- Économies calculées et mises en évidence
- Interface de sélection intuitive

### 1.3 Page Panier (CartPage.tsx)
**Objectif :** Maximiser la valeur avant le checkout et encourager l'achat

**Implémentations :**
- **Recommandations intelligentes** basées sur le contenu du panier
- **Alerte livraison gratuite** pour encourager l'ajout d'articles
- **Seuil de livraison gratuite** à 75€
- **Cross-selling** avec produits complémentaires

**Techniques utilisées :**
- Barre de progression vers la livraison gratuite
- Calcul dynamique du montant manquant
- Recommandations contextuelles
- Urgence créée par le seuil de livraison

### 1.4 Page Détail de Commande (OrderDetailPage.tsx)
**Objectif :** Fidéliser et générer des commandes répétées

**Implémentations :**
- **Articles cliquables** redirigeant vers les fiches produits
- **Bouton "Commander à nouveau"** sur chaque article
- **Section "Complétez votre équipement"** avec recommandations personnalisées
- **Pack Maintenance** avec offre spéciale (-15%)

**Techniques utilisées :**
- Facilitation de la recommande
- Recommandations basées sur l'historique d'achat
- Offres exclusives post-achat
- Stratégie de maintenance et d'entretien

## 2. Algorithmes de Recommandation

### 2.1 Recommandations par Catégorie
```typescript
const getRecommendationsByCategory = (category: string) => {
  switch (category) {
    case 'Signalisation de sécurité':
      return ['Kit de fixation', 'Éclairage LED', 'Nettoyant'];
    case 'Signalétique interne':
      return ['Support mural', 'Adhésif renforcé', 'Outils de pose'];
    // ...
  }
};
```

### 2.2 Recommandations par Panier
- Analyse du contenu actuel du panier
- Suggestion de produits complémentaires
- Calcul de la compatibilité des produits
- Optimisation pour atteindre le seuil de livraison gratuite

### 2.3 Recommandations Post-Achat
- Basées sur l'historique d'achat
- Produits d'entretien et de maintenance
- Accessoires et extensions
- Renouvellement de stock

## 3. Techniques Psychologiques Utilisées

### 3.1 Ancrage de Prix
- Affichage du prix original barré
- Mise en évidence des économies réalisées
- Comparaison prix unitaire vs prix bundle

### 3.2 Urgence et Rareté
- Offres limitées dans le temps
- Stock limité affiché
- Compteurs de quantité disponible

### 3.3 Preuve Sociale
- Mentions "Recommandé pour vous"
- "Autres clients ont aussi acheté"
- Évaluations et avis clients

### 3.4 Facilitation de l'Achat
- Boutons d'ajout au panier omniprésents
- Processus de commande simplifié
- Options de paiement multiples

## 4. Métriques et KPIs

### 4.1 Métriques à Suivre
- **Taux de conversion des upsells** : % de clients qui achètent un produit recommandé
- **Valeur moyenne du panier** : Augmentation due aux upsells
- **Taux de clic sur les recommandations** : Engagement avec les suggestions
- **Taux de conversion des bundles** : Succès des offres groupées

### 4.2 Tests A/B Recommandés
- Position des recommandations sur la page
- Nombre de produits recommandés (3 vs 5)
- Formulation des offres ("Économisez" vs "Réduction")
- Couleurs et design des boutons d'action

## 5. Optimisations Futures

### 5.1 Intelligence Artificielle
- Machine Learning pour les recommandations
- Analyse comportementale avancée
- Personnalisation en temps réel

### 5.2 Segmentation Client
- Recommandations basées sur le profil client
- Historique d'achat personnalisé
- Préférences de catégories

### 5.3 Gamification
- Programme de fidélité avec points
- Défis d'achat mensuels
- Récompenses pour les gros volumes

## 6. Bonnes Pratiques d'Implémentation

### 6.1 UX/UI
- Intégration naturelle dans le parcours utilisateur
- Design cohérent avec l'identité visuelle
- Chargement rapide des recommandations

### 6.2 Performance
- Cache des recommandations
- Chargement asynchrone
- Optimisation mobile

### 6.3 Éthique
- Transparence sur les prix
- Valeur réelle pour le client
- Pas de manipulation abusive

## 7. Exemples de Prompts pour l'IA

### 7.1 Ajout de Nouvelles Recommandations
```
"Ajoute une section d'upsell sur la page [X] avec les produits complémentaires suivants : [liste]. Utilise le design cohérent avec les autres sections d'upsell du site et inclus une réduction de [X]% pour encourager l'achat."
```

### 7.2 Optimisation des Conversions
```
"Améliore le taux de conversion de la section upsell en [page] en ajoutant [technique psychologique] et en modifiant [élément visuel]. Assure-toi que cela reste cohérent avec l'expérience utilisateur globale."
```

### 7.3 Nouveaux Bundles
```
"Crée un nouveau bundle pour la catégorie [X] incluant [produits] avec une réduction attractive. Ajoute-le sur les pages [liste des pages] avec le design et les techniques d'upsell établies."
```

## 8. Résultats Attendus

### 8.1 Objectifs Quantitatifs
- **+25% de valeur moyenne du panier** grâce aux upsells
- **+15% de taux de conversion** sur les produits recommandés
- **+30% de commandes répétées** via la page de détail de commande

### 8.2 Objectifs Qualitatifs
- Amélioration de l'expérience client
- Augmentation de la satisfaction
- Renforcement de la fidélité à la marque

---

*Document créé le : Mars 2024*
*Dernière mise à jour : Mars 2024*
*Version : 1.0* 