import React from "react";
import axios from "axios";
import Header from "./components/Header";
import Restaurant from "./components/Restaurant";
import Menus from "./components/Menus";
import PopUp from "./components/PopUp";
import PopUpMenu from "./components/PopUpMenu";
import Loading from "./components/Loading";

class App extends React.Component {
  state = {
    restaurantInfo: null,
    menus: null,
    infoLoading: true,
    popUp: { display: false, plateId: null },
    popUpMenu: { display: false },
    quantity: 1,
    basket: []
  };

  fetchAPI = () => {
    axios.get("https://deliveroo-api.now.sh/menu").then(response => {
      this.setState({
        restaurantInfo: response.data.restaurant,
        menus: response.data.menu,
        infoLoading: false
      });
    });
  };

  // PopUp
  setPopUp = id => {
    this.setState({
      popUp: { display: true, plateId: id }
    });
  };
  handleClickQuantity = e => {
    this.setState({ quantity: this.state.quantity + e });
  };

  handleClickCancel = () => {
    this.setState({ popUp: { display: false } });
  };

  handleClickValidation = toto => {
    let isFound = false;
    let arr = [...this.state.basket];
    toto.quantity = this.state.quantity;

    if (this.state.basket.length > 0) {
      for (let i = 1; i < arr.length; i++) {
        arr[i] = this.state.basket[i];
        if (arr[i].id === toto.id) {
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
  };

  // PopupMenu

  setPopUpMenu = id => {
    this.setState({
      popUpMenu: { display: true }
    });
  };

  handleClickCancelMenu = () => {
    this.setState({ popUpMenu: { display: false } });
  };

  render() {
    if (this.state.infoLoading === true) {
      return <Loading />;
    }
    if (this.state.popUp.display === true) {
      document.body.classList.add("fixedScreen");
    } else {
      document.body.classList.remove("fixedScreen");
    }
    return (
      <div>
        <Header
          img={
            "https://consumer-component-library.roocdn.com/11.3.1/static/images/logo-teal.64a39561252047a022e5ce0929c75374.svg"
          }
          alt={"Deliveroo logo"}
          setPopUpMenu={this.setPopUpMenu}
        />
        {this.state.popUp.display && (
          <PopUp
            plateId={this.state.popUp.plateId}
            menus={this.state.menus}
            quantity={this.state.quantity}
            setQuantity={this.handleClickQuantity}
            setCancel={this.handleClickCancel}
            setValidation={this.handleClickValidation}
          />
        )}
        {this.state.popUpMenu.display && (
          <PopUpMenu setCancel={this.handleClickCancelMenu} />
        )}
        <Restaurant
          img={this.state.restaurantInfo.picture}
          alt={`${this.state.restaurantInfo.name} image`}
          name={this.state.restaurantInfo.name}
          description={this.state.restaurantInfo.description}
        />
        <Menus
          menus={this.state.menus}
          popUp={id => this.setPopUp(id)}
          basket={this.state.basket}
        />
      </div>
    );
  }
  async componentDidMount() {
    this.fetchAPI();
  }
}
// Fin du render et de la class
export default App;
