// import './App.css';
import Header from './components/header';
import Footer from './components/footer';
import './index.css';


const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];

function App() {
  // const pizzas = [].length;        // ! Ekranda 0 gorsenecek cunki (0) false value-dir ve  short circuiting (&&) sol terefi oxuyacaq ve ekrana 0 yazacaq
  const pizzas = pizzaData;
  return (
    <div className="container">
      <Header />
      <div className='menu'>
        <h2>Our Menu</h2>
        <p>Authentic Italian cuisine. {pizzas.length} creative dishes to choose from. All from our stone oven, all organic, all delicious.</p>
        <main className="pizzas">
          {pizzas && pizzas.map((datas, index) => <Pizza pizzas={datas} key={index} />)}      
          {/* // ! Warning: Each child in a list should have a unique "key" prop. */}
        </main>
      </div>
      <Footer />
    </div>
  );
}
function Pizza(props) {                    // ! Props which sending from Parent class to child <Pizza data={datas} /> class
  console.log(props);              // data : {name: 'Pizza', ingredients: 'Tomato', price: 12, photoName: 'pizzas.jpg', soldOut: false}

  // if(props.pizzas.soldOut) {
  //   return (
  //     null
  //   )
  // }
  // else {
    return (
      <>
        {/* <main className={props.pizzas.soldOut ? 'pizza sold-out' : 'pizza'}> */}
        <main className={`pizza ${props.pizzas.soldOut ? 'sold-out' : null | ''}`}>
          <img src={props.pizzas.photoName} alt={props.pizzas.name} />
          <div>
            <h3>{props.pizzas.name}</h3>
            <p>{props.pizzas.ingredients}</p>
            <span>{props.pizzas.soldOut ? 'SOLD OUT' : props.pizzas.price + 10 + "$"}</span>
          </div>
        </main>
      </>
    )
  // }
}
export default App;