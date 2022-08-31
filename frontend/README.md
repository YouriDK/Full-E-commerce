# Notions à comprendre :

- dispatch ( Done ✅ )
- useSelector ( Done ✅ )

Default font size in browser is 16 px so 16 \* 62.5% = 10 px = 1rem

Pour connecter à la base de données en local:
Il faut définir l'url donc :

1 - New file : .env ( file de config )
2 - Mettre le lien de la base
3 - install dotenv
4 - New file : config.js
5 - Mettre le lien de la base aussi
6 - Rajouter le tout dans server.js pour import config
7 - En utlisang aussi dotenv.config
8 - Téléchargement de MobgoCompass
9 - Ensuite on crée le schema de construction
10 - Puis la Route

# Comprendre :
- Ce que ça change de mettre HtmlFor (Done✅)
- Comment fonctionne flex (Done✅)
- Prodiver dans index et à quoi sert store exactement (Done✅)


# Redux fonctionnement :

Fichiers nécéssaire : Store, constant, action , reducers, components(Screen)

# Dans le store :

La création du middleware

* InitialState : Permet de stocker des informations qui sont disponibles dans toutes les couches de l'application
* Reducer : Va faire le lien entre l'appel dans la partie actions et la fonction reducer associé Front -> Actions -> Reducers
* Quand une action est capturé : store.dispatch(actionCreator(payload))
* store.dispatch représente dispath = useDispatch()
* actionCreator est une des actions dans le dossier actions qui crée justement la payload
* A partir du type il va passer dans toutes les fonctions reducers et cherchers celui qui lui correspond
* useEffect a le meme effect que componentDidmount il va se charger avant et s'actualiser en fonction de certaines circonstances.
* Le dispatch passe dans toutes fonctions du reducers


# Deploy

- Bien regarder les élements dans le package.json ( les build et scripts)
- Il a fallu rajouter Amazona dans le chemin ( server.js) , je pense que c'est parce là j'ai connecté avec Git en non en CLI (FINI ça )
- Prévoir bien une config dev et une config prod

# Push

git add .
git push heroku master

# Todo
cf ReadMe principal



- Fonctionnels
Système de livraison et validation de livraison



