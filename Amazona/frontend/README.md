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

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
