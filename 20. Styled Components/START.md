# Donwload The Styled Components Library
1. ```npm i styled-components``` in another terminal because Vite are launching
2. Extension olaraq ```vscode-styled-components``` yuklemek olar visual olaraq daha CSS-e benzedir ve auto completion elave edir

**The Styled Components** are React Components and **MUST** start with **Uppercase**. Styled Component Library create random className like **CSS Modules**. Ve Unique olduqlari ucunde specific olaraq hemin elemente adi olur. Global olmur. `Tagged Template Literals` daxilinde yazilirlar.
```bash
import styled from "styled-components";
const H1 = styled.h1`                // ! adlandirmanin ferqi yoxdur ama styled.h1 burda esasen h1-in default xususiyyetlerini goturur  
  background-color: red;
`
<H1>Hello World</H1>
```
3. Styled Components also are able to receive props as normal Components
4. GlobalStyle does not accept any children ```import { createGlobalStyle } from "styled-components"; const GlobalStyles = createGlobalStyle`CSS` ```