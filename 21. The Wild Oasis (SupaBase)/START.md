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
4. And all are finished whenever eslint encounter a problem it will immediately shout screende hecne gorsenmeyecek eger eslint qaydalarindan 1-i pozulsa. bunun qarsisini almaq ucun **.eslintrc.cjs** filesini sil


# Donwload The Styled Components Library
1. ```npm i styled-components``` in another terminal because Vite are launching
**The Styled Components** are React Components and **MUST** start with **Uppercase**. Styled Component Library create random className like **CSS Modules**. Ve Unique olduqlari ucunde specific olaraq hemin elemente adi olur. Global olmur. `Tagged Template Literals` daxilinde yazilirlar.
2. Extension olaraq ```vscode-styled-components``` yuklemek olar visual olaraq daha CSS-e benzedir ve auto completion elave edir
```bash
import styled from "styled-components";
const H1 = styled.h1`                // ! adlandirmanin ferqi yoxdur ama styled.h1 burda esasen h1-in default xususiyyetlerini goturur  
  background-color: red;
`
<H1>Hello World</H1>
```
3. Styled Components also are able to receive props as normal Components 


# Setting up React Router 
1. ```npm install react-router-dom``` or ```npm i react-router-dom@6``` in new terminal because Vite are launching


# Donwload React Icons Library
1. ```npm i react-icons```                   All icons can be found in here     https://react-icons.github.io/react-icons/
2. ```import { HiOutlineHome } from "react-icons/hi2";       <HiOutlineHome />``` 
her istediyimiz iconun ailesinin ozune mexsus linki olur     componenti olur biz onu import etmeliyik 