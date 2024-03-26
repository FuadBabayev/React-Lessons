# Creating React Vite Js
1. ```npm create vite@latest``` or ```npm create vite@4```   Create React Folder with Vite
2. Open Folder and write in terminal ```npm install``` or ```npm i```
3. ```npm run dev``` in order to launch Project
4. Copy link Local: ```http://localhost:5173/``` or press ```o + Enter``` to open in browser or click http://localhost:5173/ with ```Alt + Click```


# Donwload ESLint
1. ```npm install eslint vite-plugin-eslint eslint-config-react-app --save-dev``` in another terminal because Vite are launching
2. Create ```.eslintrc.json``` file in main part (in the same direction with index.html) and this file must be like:
```bash
{
    "extends" : "react-app"
}
```
3. After that ```vite.config.js``` file mustb be like: NOTE THAT: it will give a lots of error sometimes it is good to be as default
```bash
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import eslint from 'vite-plugin-eslint'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint()],
})
```
4. And all are finished whenever eslint encounter a problem it will immediately shout screende hecne gorsenmeyecek eger eslint qaydalarindan 1-i pozulsa
bunun qarsisini almaq ucun **.eslintrc.cjs** filesini sil


# Setting up React Router 
1. ```npm install react-router-dom``` or ```npm i react-router-dom@6``` in new terminal because Vite are launching


# Server
1. ```npm i json-server```
2. Create **Data** folder with **cities.json** file then
3. Make some changes in package.json **"server": "json-server --watch data/cities.json --port 8000"** and also yo can set to edge **--delay 500**
4. The **npm run server** in order to Launch Server