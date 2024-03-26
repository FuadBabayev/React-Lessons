# Start
1. npx create-react-app@5 name   or   npx create-react-app name     (name: all letters should be small)

PROPS: are used to pass data from PARENT Components to CHILD Components, Props are read-only (Only can change from parent component and it reflect to all child component) And you cant use PROPS between sibling components. ONLY DOWN THE TREE (parent -> child)
STATE: If you need to change props you should need STATE

# General JSX Rules
1. JSX works essentially like HTML, but we can enter **"JavaScript mode"** by using **{}** (for text or attributes) 
2. We can place ***JavaScript expressions** inside {}. Examples: reference variables, create arrays or objects, [].map(), ternary operator (? : )
3. Statements are not allowed (if/else, for, switch) 
4. A piece of JSX can only have **one root element**. If you need more, use <React.Fragment> (or the short **<></> JSX Fragremnt**)


# DIFFERENCES BETWEEN & JSX AND HTML
1. **className** instead of HTML's class and **htmlFor** instead of HTML's for
2. Every tag needs to be **closed**. Examples: < img / > or ‹br /> 
3. All event handlers and other properties (CSS property names) need to be **camelCased**. Examples: **onClick**, **onMouseOver**, **backgroundColor**
4. CSS inline styles are written like this: {{<style>}} (to reference a variable, and then an object {JSX{object}}) 
5. Comments need to be in **{}** (because they are JS)