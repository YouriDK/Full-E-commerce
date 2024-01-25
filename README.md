# XshopX Project

### Stack

```
> Database : MongoDB
> Backend : NestJS - Typescript
> Frontend : React - Typescript - Redux
> Deployment environnement : Heroku

```

### Main evolutions througth time

```
 > Javascript to Typescript
 > Redesign of the graphic
 > Google authentification
 > From NodeJS to NestJS
 > Refactoring code's strucutre
 > Storage of product's pictures directly in database
 > Optimisation database queries
 > Restructure of the database
 > Implement basic responsive
 > Add Documentation (swagger)
 > Upgrade libraries package.json (ex : React 18)


```

### More infos

To get more technicals infos about this project :
Check the two others readMe available the folders frontend & backend

### Main Features

```
> E-commercer Website feature
```

### Currently

```
> Adding payment system (stripe)
> Refacto data table

```

### Next Features

```
Stock Management (to be put in the dashboard, look for a lib: React Flow?)
Category and filter system
```

# Pour deployer sur heroku

> git add .
> git commit -am "make it better"
> git push heroku master
> (Maintenant , il faut mettre sur la branche production et faire le deploy)

# Lancer en local

> Back : npm run start:dev
> Front : npm start

# Upgrade lib

> npm i -g npm-check-updates
> ncu -u
> npm install

# Issues

> Bien regarder les élements dans le package.json (les builds et scripts)
> Prévoir bien une config dev et une config prod

--- To clean

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
