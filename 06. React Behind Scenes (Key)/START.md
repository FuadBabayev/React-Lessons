# Components
**Components** are what we write in order to describe a piece of User Interface (UI). Component is just regular JavaScript Function but it is a function returns
React elements.

# Render
**Rendering** take place 2 times
1. When first page uplaod **Initial Render**
2. When state updates **Re-render**

# Key (Resetting State with the KEY Prop)
**Key** property multiple instance Componentlere verilmelidir ve unique olmalidir. Cunki render (Reset State) edir her componenti. Eger key olmasa eyni ana componentden instance alan child componentlerde deyisiklik olmaz eyni olar. Key ile yazaraq heresi ucun ayri ayri deyisiklikler qeyd olunur  ***Always use KEYS***

# HINT
If we have the same element (component) at the same position in the tree, **the DOM element and state** will be kept. Yeni hec bir deyisiklik olmuyacaq eyni olacaq
<TabContent item={content.at(activeTab)} /> defelerle eyni componenti render etsek DOM deyismez ve eyni qalar baxmayaraqki ferqli ferqli datalar gonderirik.

Qarsisini almaq ucun **KEY** istifade edirik
<TabContent item={content.at(activeTab)} key={uniqueID} /> eyni datalar gondersek bele her zaman key muxtelif olduqu ucun STATEni render (reset) edecek ve deyisecekler 

# HINT 2
If we need to update state **based on previous update** we use setState with callback (setAnswer(answer)=>..)