# Context API
**Context API**     basically allows components everywhere in the tree to read state that a context shares
1. **Provider**     gives all child components access to value 
2. **Value**        data that we want to make availables usually state and functions
3. **Consumers**    all components that read the provided context value



# PERFORMANCE OPTIMIZATIONS 
**Memoization:** Optimization technique that executes a pure function once, and saves the result in memory. If we try to execute the function again with the same arguments as before, the previously saved result will be returned, without executing the function again.

**memo:**            memoize Components(value)          const Name = memo(function Name() {})
**useMemo:**         memoize Objects                    const Name = useMemo(()=> {return {Object}}, []);
**useCallBack:**     memoize Functions                  const Name = useCallback(function Name() {}, [])

**The MEMO Function**
Used to create a component that **will not re-render when its parent re-renders, as long as the props stay the same** between renders (if prop change it will re-render).
Only affects props! A memoized component will still re-render when its **own state changes or when a context that it's subscribed to changes**.
Only makes sense when the component is heavy (slow rendering), re-renders often, and does so with the same props.


**The USEMEMO and USECALLBACK Functions**  
Used to memoize values (all of things object, num string, except functions) **useMemo** and functions **useCallback** between renders 
Values passed into useMemo and useCallback will be stored in memory ("cached") and returned in subsequent re-renders, as long as dependencies ("inputs") stay the same 
useMemo and useCallback have a **dependency array** (like useEffect): whenever one dependency changes, the value will be re-created 
Only use them for one of the three use cases!
1. Memoizing props to prevent wasted renders (together with memo)
2. Memoizing values to avoid expensive re-calculations on every render
3. Memoizing values that are used in dependency array of another hook
**HINT!** useMemo accept function while useCallback dont

