# Tailwind CSS
Main difference between **Bootstrap** and **Tailwind CSS**: a lot of color pattern and custumozation of spacing px, %, rem, em, cm and also VSCode integration is Good

# Installing and Getting up Tailwind CSS
**Documentation Link:**         https://tailwindcss.com/docs/installation

# Install Tailwind CSS with Vite
1. ```npm install -D tailwindcss postcss autoprefixer``` or ```npm install -D tailwindcss@3 postcss autoprefixer``` Install Tailwind CSS
2. ```npx tailwindcss init -p``` create Tailwind and Post CSS config files and **tailwind.config.js** must be like below
```bash
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```
> [!HINT]
> You can also Configure what ever you want (Font-family, Breakpoints, utilities) in **tailwind.config.js**     Look: ```https://tailwindcss.com/docs/configuration```
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    //  Custom CSS we can write whatever we want 
    // (HINT: extend-den kenarda yazidiqimiz butun classlar overwrite edir yeni sifirlayib sirf yazdiqimizi qebul edir, extend icine yazdiqim ise originala elave edir)
    colors: {                          // Direkt theme icinde colors yazsaq butun Tailwind colors-lari itireceksen cunki Artiq Tailwind ancaq bu rengleri taniyir 
      'blue': '#1fb6ff',               // theme/extend icinde yazsaq Tailwind oz colorslarindan elave bu colorlarida taniyacaq
      'purple': '#7e5bef',
      'pink': '#ff49db',
      'orange': '#ff7849',
      'green': '#13ce66',
      'yellow': '#ffc82c',
      'gray-dark': '#273444',
      'gray': '#8492a6',
      'gray-light': '#d3dce6',
    },
    fontFamily : {                             // Font Family-lari link yada download edende index.html-de yaz <style>@font face</style>
      sans : ["Roboto Mono", 'monospace'],     // default fontFamily of Tailwind is SANS if we change it all pages will inherit from it
      serif: ['Merriweather', 'serif'],
      roboto: []
    }
    screens : {
      "sm" : "600px",
      "md" : "768px",
      "lg" : "992px",
      "xl" : "1280px",
      "2xl" : "1550px",
    },
    extend: {                                 // Burada yazilanlar ise Tailwind-in oz daxilinden classlardan elave classlar yaradiqimiz yerdir
      spacing: {
        '8xl': '96rem',
        '9xl': '128rem',
      },
      borderRadius: {
        '4xl': '2rem',
      }
    },
  },
  plugins: [],
}
```


3. Paste 3 Taildwind compositions into index.css to the right above (First line);
```bash
@tailwind base;
@tailwind components;
@tailwind utilities;
```
4. Happy Hacking ```npm run dev```
5. OPTIONAL: If you dont have extensions please download **Tailwind CSS IntelliSense** hansi CSS istifade etdiyimizi gosterecek (show all classes with colors)
6. Install Tailwind Prettier Extension from Github                        https://github.com/tailwindlabs/prettier-plugin-tailwindcss then
```npm install -D prettier prettier-plugin-tailwindcss``` it will sort the order of classes Names in Tailwind CSS recommended ways
7. Create ```prettier.config.cjs``` file and fill it with below then whenn you need clean code press **Shift + Alt + F**
```bash
module.exports = {
    plugins: ['prettier-plugin-tailwindcss'],
    singleQuote: true,
}
```


> [!CAUTION]
> Don’t use sm: to target mobile devices
class="**sm:text-center**" 		                                this will only center text **on screens 640px and wider**, not on **small screens**(mobile) 
class="**text-center sm:text-left**"	                        this will center text **on mobile**, and left align it **on screens 640px and wider** 
class="**max-w-[200px]**"  		                                max-width:200px 	**in all breakpoints** (screens)
class="**md:max-w-[200px]**"     		                          max-width:200px 	**on screens 768px and wider**, not on small screens
class="**max-md:max-w-[200px]**"     	                        max-width:200px   **from mobile screens to 768px**, not on larger screens
class="**md:max-lg:max-w-[200px]**"                           max-width:200px  	**from 768px to 1024px**, not on other screens
class="**min-[320px]:font-bold max-[600px]:bg-sky-300**"     	font-bold **on min screens 320px and wider**, bg-sky **from sm screens till on screens 600px**, not wider
class="**text-blue-600/100**"					                        600-dan sonraki reqem **opacitydi** (100, 75, 50,25,0)
class="**text-[#243c5a]/[.06]**"					                    (1,  0.9  0.8   0.7  0.6  0.5  0.4  0.3  0.2  0.1)
class="**text-sm/[17px]**"						                        sm-dan sonraki 17px **line-height** demekdir



### MAIN PART OF TAILWIND CSS START
**text**                                     [ color, [font-size, line-height], text-align, opacity, vertical-align, text-wrap, text-overflow];
**font**                                     [ font-family, font-weight ];
**block**                                    [ display ];
**absolute**                                 [ position ];
**rounded-sm**                               [ border-radius ]; 
**border-2**                                 [ border-width ]; 
**border-solid**                             [ border-style ]; 
**border-white**                             [ border-color ]; 
**shadow-sm**                                [ box-shadow ]; 
**cursor-pointer**                           [ cursor ]; 
**transition-all**                           [ transition-property ];
**duration-75**                              [ transition-duration ]; 
**z-10**                                     [ z-index ]; 
**box-border**                               [ box-sizing ];
**overflow-hidden**                          [ overflow ];
**uppercase**                                [ text-transform, text-decoration ];
**italic**                                   [ font-style ]; 
**tracking**                                 [ letter-spacing ]; 
**leading-10**                               [ line-height ]; 
**visible**                                  [ visibility ];
**opacity-10**                               [ opacity ]; 
**delay-150**                                [ transition-delay ]; 
**space-x|y-5**                              [ gap without any display: flex; **Tailwind feature** it must situated in parent element]
**divide-x|y => divide-color**               [ border **Tailwind feature** it must situated in parent element]
**ring => ring-color => ring-ofset**         [ gives box-shadow while focusing element **Tailwind feature** ]
**grid-rows-[ auto_1fr_auto ]**              [ grid-template-rows: auto 1fr auto; ]


# Responsive Design
**Breakpoint**      **prefix**	              **Minimum width	CSS**
    sm	              640px	                @media (min-width: 640px)  { ... }        **640px <= width < 768px**           [ 767 ]
    md	              768px	                @media (min-width: 768px)  { ... }        **768px <= width < 1024px**          [ 768-1023 ]
    lg	              1024px	              @media (min-width: 1024px) { ... }       **1024px <= width < 1280px**          [ 1024-1279 ]
    xl	              1280px	              @media (min-width: 1280px) { ... }       **1280px <= width < 1536px**          [ 1280-1535 ]
    2xl	              1536px	              @media (min-width: 1536px) { ... }       **1536px <= width**                   [ 1536 ]


**Modifier**	          **Media query**
  max-sm	           @media max-width: 640px




# Reusing styles with @apply
If you want to reuse some boiling (cox setrli ve tez tez istifade edeceyin) code you can write it in @layer component in **index.css** file same as **MIXIN** in SASS
ve hemin class ya da Id-ni istediyin elementlerde istifade ede bilersen hec bir import olunmadan. ```Bu methoddan cox istifade etme. Cunki CSS yazmis sayilirsan```
Elave olaraq ustunlutu odurki elementde hemin classi cagirdiqdan sonra istediyin qeder yeniden Tailwind classlari yaza bilirsen hemin elementin yanina
```bash
@layer components{
  .className{
    @apply Tailwind Classes
  }
}
```

# Reusing styles with React Components
Yeni component yaradib esas lazim olan classlari ora daxil edecik ve sonra hemin compnenti istediyimiz sehifede isledeceik ```src/ui/Button.jsx or ButtonLink.jsx``` burda var ```Daha cox bu metoddan istifade et```