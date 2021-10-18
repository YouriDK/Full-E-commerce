# Notions à comprendre :

- dispatch
- useSelector

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

Comprendre :
ce que ça change de mettre HtmlFor
comment fonctionne flex
Prodiver dans index
et à quoi sert store exactement

# Ne marche pas en déploiement faut remettre : node backend/server.js

# Redux fonctionnement :

Fichiers nécéssaire : Store, constant, action , reducers, components(Screen)

# Dans le store :

La création du middleware

InitialState : Permet de stocker des informations qui sont disponibles dans toutes les couches de l'application
reducer : Va faire le lien entre l'appel dans la partie actions et la fonction reducer associé Front -> Actions -> Reducers
Quand une action est capturé : store.dispatch(actionCreator(payload))
store.dispatch représente dispath = useDispatch()
actionCreator est une des actions dans le dossier actions qui crée justement la payload
A partir du type il va passer dans toutes les fonctions reducers et cherchers celui qui lui correspond

useEffect a le meme effect que componentDidmount il va se charger avant et s'actualiser en fonction de certaines circonstances.
Le dispatch passe dans toutes fonctions du reducers

# Dans le backend

expressAsyncHandler permet de ne pas utiliser de try catch et sauver des lignes quand il faut gérer une erreur
/ -------------------------------------------------------------- \

# Push

git add .
git push heroku master

- Chercher des template pour afficher les produits
- Mettre mes vetements futurs dans le lot
