### Deploying to Netlify

1. Try to us **Vite JS**
2. `npm run build` automatically Create **dist** folder
3. Crate `dist/netlify.toml` file and fill it below
```bash
[[redirects]]
from = "/*"
to = "/index.html"
status = 200
```
4. Also COPY this file into main part of APP stay in the same with **index.html** (We dont lose it in case of build our application)
5. `https://app.netlify.com/teams/fuad-babayev19/overview` -> Add new Site -> Deploy manually and **DRAG DROP DIST folder** into that area