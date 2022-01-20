# GROUPOMANIA BACKEND
# Node.js Rest APIs with Express, Sequelize & MySQL


## Project setup
```
npm init (put server.js as input)
npm install express sequelize mysql2 cors --save
npm install sequelize-cli -g
npm install --save bcrypt
npm install --save jsonwebtoken
npm install --save multer
npm install --save dotenv

```
## Database mySQL
Créer la database "groupomania_socialnetwork" en amont
Puis aller dans le fichier de configuration "config/db.config/js" pour remplir le user name et le password de myQSL.
```
USER: "", // Remplir
PASSWORD: "", // Remplir
DB: "groupomania_socialnetwork",
```

### Run
```
node server.js
```
