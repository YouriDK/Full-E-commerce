# Description

```
Interface ReactJS/Typescript en évolution continue avec les dernières bonnes pratiques acquises par le developpeur...

Fonctionnalités du site :
- Système de suivi de livraison
- Vitrine produits
- Gestion de profil
- Système de client/admin
- Achat en ligne
```

# Connection Database :

```
Pour connecter à la base de données en local:
Il faut définir l'url donc :

1 - New file : .env ( file de config )
2 - Mettre le lien **de** la base
3 - install dotenv
4 - New file : config.js
5 - Mettre le lien de la base aussi
6 - Rajouter le tout dans server.js pour import config
7 - En utlisang aussi dotenv.config
8 - Téléchargement de MobgoCompass
9 - Ensuite on crée le schema de construction
10 - Puis la Route
```

# Dans le store :

```
 Création du middleware

 - InitialState : Permet de stocker des informations qui sont disponibles dans toutes les couches de l'application
 - Reducer : Va faire le lien entre l'appel dans la partie actions et la fonction reducer associé Front -> Actions -> Reducers
 - Quand une action est capturé : store.dispatch(actionCreator(payload))
 - store.dispatch représente dispath = useDispatch()
 - actionCreator est une des actions dans le dossier actions qui crée justement la payload
 - A partir du type il va passer dans toutes les fonctions reducers et cherchers celui qui lui correspond
 - useEffect a le meme effect que componentDidmount il va se charger avant et s'actualiser en fonction de certaines circonstances.
 - Le dispatch passe dans toutes fonctions du reducers
```

# Deploy (Issues...)

```
- Bien regarder les élements dans le package.json (les builds et scripts)
- Il a fallu rajouter Amazona dans le chemin ( server.js) , je pense que c'est parce là j'ai connecté avec Git en non en CLI (FINI ça )
- Prévoir bien une config dev et une config prod
```

# Push

```
 - git add .
 - git push heroku master
```

# Todo

```
 - Rediriger après expiration token
```

# Changes

Les lib on changées donc il a fallui adapter les lib et les changement de la lib

###### Release changes

Il a fallut :
npm i -g npm-check-updates
ncu -u
npm install
Pour upgrade toutes les libs

Changer useHistory to useNavigate
Enlever les props de navigation
Refonte du routing
