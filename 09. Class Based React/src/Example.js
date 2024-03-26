import React from "react";

class Example extends React.Component {
  // Todo: Funcksiyalar: Constructor ve diger eventler burada yazilir 
  constructor(props) {
    super(props);
    this.state = { count: 0, displayMessage: "Welcome to Our First Class Component" };
    this.handleDecrement = this.handleDecrement.bind(this); // ! Buttonlarin icindeki funksiyalar copyalarin deye this conceptini itirirler ve biz geri qaytaririq
    this.handleIncrement = this.handleIncrement.bind(this);
  }

  handleDecrement() {
    this.setState({ count: this.state.count - 1 })        // ! We just pass new State
  } // ! OR
  handleIncrement() {
    this.setState((curState) => {                           // ! We update state based on current state
      return { count: curState.count + 1 }
    })
  }

  render() {
    // Todo: Deyiskenler ve Propslar(this): Funksiyalardan basqalari burada yazilir 
    const date = new Date('October 23 2024');
    date.setDate(date.getDate() + this.state.count);

    return (
      <>
        <h1>{this.state.displayMessage}</h1>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center', justifyContent: 'center' }}>
          <button onClick={this.handleDecrement} style={{ width: '75px', height: '50px', fontSize: '30px' }}>-</button>
          <h1>{date.toDateString()} [{this.state.count}]</h1>
          <button onClick={this.handleIncrement} style={{ width: '75px', height: '50px', fontSize: '30px' }}>+</button>
        </div>
      </>
    )
  }

}

export default Example;