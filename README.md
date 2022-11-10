**Création d'un site fonctionnel E-commerce opérationnel**

# Dependencies
/node_modules
Quand on configure une API d'abord l'action ( avec les constantes ) puis le reducer pour ensuite l'ajouter au store

# Pour deployer sur heroku
git add .
git commit -am "make it better"
git push heroku master
(Maintenant , il faut mettre sur la branche production et faire le deploy)
# Lancer en local
- Back : nest start
- Front : npm start

# TODO : 
- Styliser  le menu du haut
Color to change : 
- Background
- Background Items
- Mettre arondi su le design item
- Espacer les Items
- Arranger l'icone de chargement

# ISSUES/EVO resolved ✅✅✅

- Probleme H10 ou autres , bien s'assurer que toute nouvelle librairie est dans TOUS les package.json
- Problème SOIS DISANT de dev @types, il fallait supprimer les package-lock du repo...
- Déploiement en prod avec Nest + typescript ( il fallait indiquer le lien du build, mette les deux package.json égaux fiiiiouu)
- Supprimer la notification Card is empty 
- Supprimer backend node et touche push sur production
- Loading Composant mal placé
- Connecter back et front , corriger erreur et boucles
- Gestion Erreur : adapter le front dans les pages
- Style/Menu :
    Créer composant à part
    Changer style carré
    Regarder orthographe
    Uniformiser gestion couleurs
- Rajouter un Layout pour chaque page
- Rajouter un Layout pour chaque page
- Gestion des images ( passage en base 64)
- Système pour ajouter les images depuis la production
- Gestion de catégories

# Evo 💨💨💨💨
Implémenter le système d'erreurs
- Tests unitaires

- Actualiser la page quand c'est payé
- Faire un Icone d'onglet adéquates ( to define )
- Rajouter un système de navigation sur le WF ( pas sur car static )
- Créer chemin pour update livraison et la valider ( back & front )
- Mettre un mode sombre
- Changer thème couleur du site
- Améliorer la gestion de l'history

# En cours / Bug : 
 - display product ( espacer , couleur , style ) 
 - Passer sur chaque page et réfléchir aux changements
 - Rajouter des vetements



