# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

Création d'un site fonctionnel E-commerce opérationnel

# dependencies

/node_modules

Quand on configure une API d'abord l'action ( avec les constantes ) puis le reducer pour ensuite l'ajouter au store

# Pour deployer sur heroku

git add .
git commit -am "make it better"
git push heroku master

# Lancer en local

Back : npm run start
Front : npm start

# TODO

Mettre une variable pour montrer qu'on est connecté avec google , pour gérer les endroit de user
Faire un achat complet et analyser les endroit ou le compte Google pose soucis
Voir si on peut fusionner les .env

--->

Le isAuth reconnait mnt Google Auth, il va falloir passer dans toutes les démarches et adapter quand un user google fait les actions et utiliser son hub et placer à chaque fois le sub (FAIT 👌)

# ISSUES resolved

Probleme H10 ou autres , bien s'assurer que toute nouvelle librairie est dans TOUS les package.json

# Evo

Implémenter le système d'erreurs
Tests unitaires
Rajouter les vetement avec gestion de catégories
Refaire une passe complète
Retirer Stripe en terme d'option de paiement

- Faire un Icone d'onglet adéquates
