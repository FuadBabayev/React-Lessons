# Ways of use State in practice

STATE: data that a component can hold over time. in another words **Component's Memory**
Remember: Updating STATE triggers React to re-render the component

# React Hooks

All hooks in React start with **use** keyword like useState, useEffect and useReducer

1. useState
2. useReducer
3. Context API
4. Redux


# Array.from()
const interval1 = Array.from({ length: 5 }, (item, index) => 'Hello ' + (index + 1))       **(5) ['Hello 1', 'Hello 2', 'Hello 3', 'Hello 4', 'Hello 5']**
const interval2 = Array.from({length: 5}, (_, index) => index + 1);                        **(5) [1, 2, 3, 4, 5]**
