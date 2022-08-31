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

Back : nest start
Front : npm start

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
- - Style/Menu :
    Créer composant à part
    Changer style carré
    Regarder orthographe
    Uniformiser gestion couleurs

# Evo 💨💨💨💨


Implémenter le système d'erreurs
- Tests unitaires
- Rajouter les vetements avec gestion de catégories
- Actualiser la page quand c'est payé
- Faire un Icone d'onglet adéquates ( to define )
- Système pour ajouter les images depuis la production
- Rajouter un système de navigation sur le WF
- Créer chemin pour update livraison et la valider ( back & front )
- Mettre un mode sombre
- Mettre un layout (Menu , Content ,  Footer)
- Changer thème couleur du site
- Améliorer la gestion de l'history

# En cours / Bug : 
 - display product ( espacer , couleur , style ) 




