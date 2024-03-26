### Deploying to Github

1. `git init`       transform this folder into Git Repository (Track every single change in every single file)
2. `git status`     show all files condition (untracked or else)
3. `git add .`      add all files also have `git add -A`      
4. `git commit -m "first version"`
5. Ve bundan sonra eger hansisa falyinde deyisiklik olduqunu bilmek isteyirikse `git status` qirmizidirsa `git add .` yaslidirsa hazirdir -> `git commit -m 'commit'`
6. `git branch -M main`
7. `git remote add origin https://github.com/FuadBabayev/FastPizza.git`
8. `git push -u origin main`


# …or create a new repository on the command line
```bash
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/FuadBabayev/FastPizza.git
git push -u origin main
```


# …or push an existing repository from the command line
```bash
git remote add origin https://github.com/FuadBabayev/FastPizza.git
git branch -M main
git push -u origin main
```

# When we have change any file
```bash
git status
git add . 
git commit -m "Update fileName"
git push -u origin main 
```