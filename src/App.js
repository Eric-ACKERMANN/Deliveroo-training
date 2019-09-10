import React from "react";
import axios from "axios";
import Header from "./components/Header";
import Restaurant from "./components/Restaurant";
import Menus from "./components/Menus";
import PopUpScreen from "./components/popUpScreen";

class App extends React.Component {
  state = {
    restaurantInfo: null,
    menus: null,
    infoLoading: true,
    popUpScreen: { display: false, plateId: null },
    quantity: 1,
    basket: []
  };
  render() {
    if (this.state.infoLoading === true) {
      return <div>Fetching todos...</div>;
    }
    if (this.state.popUpScreen.display === true) {
      document.body.classList.add("fixedScreen");
    } else {
      document.body.classList.remove("fixedScreen");
    }
    return (
      <div>
        <PopUpScreen
          popUpScreen={this.state.popUpScreen}
          menus={this.state.menus}
          quantity={this.state.quantity}
          quantityClick={q => {
            this.setState({ quantity: this.state.quantity + q });
          }}
          cancelClick={() => {
            this.setState({ popUpScreen: { display: false } });
          }}
          plateValidation={toto => {
            let isFound = false;
            let arr = [...this.state.basket];
            toto.quantity = this.state.quantity;
            console.log("selectedPlate :", toto);
            console.log("basket", arr);
            if (this.state.basket.length > 0) {
              for (let i = 1; i < arr.length; i++) {
                arr[i] = this.state.basket[i];
                if (arr[i].id === toto.id) {
                  console.log("hey");
                  isFound = true;
                  arr[i].quantity = arr[i].quantity + this.state.quantity;
                }
              }
              if (isFound === false) {
                arr.push(toto);
              }
            } else {
              arr.push(toto);
              this.setState({ basket: arr });
            }
            this.setState({ basket: arr });
          }}
        />
        <Header
          img={
            "https://consumer-component-library.roocdn.com/11.3.1/static/images/logo-teal.64a39561252047a022e5ce0929c75374.svg"
          }
          alt={"Deliveroo logo"}
        />
        <Restaurant
          img={this.state.restaurantInfo.picture}
          alt={`${this.state.restaurantInfo.name} image`}
          name={this.state.restaurantInfo.name}
          description={this.state.restaurantInfo.description}
        />
        <Menus
          menus={this.state.menus}
          popUpScreen={id => {
            this.setState({
              popUpScreen: { display: true, plateId: id }
            });
          }}
          basket={this.state.basket}
        />
      </div>
    );
  }
  async componentDidMount() {
    axios.get("https://deliveroo-api.now.sh/menu").then(response => {
      this.setState({
        restaurantInfo: response.data.restaurant,
        menus: response.data.menu,
        infoLoading: false
      });
    });
  }
}
// Fin du render et de la class
export default App;
