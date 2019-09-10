import React from "react";
import axios from "axios";
import Header from "./components/Header";
import Restaurant from "./components/Restaurant";
import Menus from "./components/Menus";
import PopUpMenu from "./components/PopUpMenu";
import Loading from "./components/Loading";
import PopUp from "./components/PopUp";

class App extends React.Component {
  state = {
    restaurantInfo: null,
    menus: null,
    infoLoading: true,
    popUp: { display: false, dish: null },
    popUpMenu: { display: false },
    quantity: 1,
    basket: []
  };

  fetchAPI = async () => {
    const response = await axios.get("https://deliveroo-api.now.sh/menu");
    // On met les prix a 2 après la virgule
    if (response.data) {
      let menuTitle = Object.keys(response.data.menu);

      menuTitle.forEach(title => {
        let meal = response.data.menu[title];
        if (meal.length > 0) {
          meal.forEach(e => {
            console.log(e);
            e.price = Number(e.price)
              .toFixed(2)
              .toString();
          });
        }
      });
    }

    this.setState({
      restaurantInfo: response.data.restaurant,
      menus: response.data.menu,
      infoLoading: false
    });
  };

  /*********  POP UP *********/
  togglePopUp = e => {
    this.setState({
      popUp: { display: !this.state.popUp.display, dish: e }
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
    }
    this.setState({ basket: arr, popUp: { display: false } });
  };

  /********** POPUP MENU ***********/

  setPopUpMenu = () => {
    this.setState({ popUpMenu: { display: true } });
  };

  cancelPopUpMenu = () => {
    this.setState({ popUpMenu: { display: false } });
  };

  render() {
    console.log(this.state.menus);
    if (this.state.infoLoading === true) {
      return <Loading />;
    }
    if (this.state.popUp.display === true) {
      document.body.classList.add("fixedScreen");
    } else {
      document.body.classList.remove("fixedScreen");
    }

    const headerButtons = [
      {
        className: "nav-btn",
        children: [
          <i className="fas fa-shopping-basket" />,
          <span>0,00 €</span>
        ]
      },
      {
        className: "nav-btn",
        children: [<i className="fas fa-bars" />, <span>Menu</span>],
        handleClickButton: this.setPopUpMenu
      }
    ];

    return (
      <div>
        <Header
          img={
            "https://consumer-component-library.roocdn.com/11.3.1/static/images/logo-teal.64a39561252047a022e5ce0929c75374.svg"
          }
          alt={"Deliveroo logo"}
          buttons={headerButtons}
        />
        {this.state.popUp.display && (
          <PopUp
            plateId={this.state.popUp.plateId}
            dish={this.state.popUp.dish}
            quantity={this.state.quantity}
            setQuantity={this.handleClickQuantity}
            togglePopUp={this.togglePopUp}
            setValidation={this.handleClickValidation}
          />
        )}
        {this.state.popUpMenu.display && (
          <PopUpMenu
            popUpMenu={this.state.popUpMenu}
            cancelPopUpMenu={this.cancelPopUpMenu}
          />
        )}
        <Restaurant
          img={this.state.restaurantInfo.picture}
          alt={`${this.state.restaurantInfo.name} image`}
          name={this.state.restaurantInfo.name}
          description={this.state.restaurantInfo.description}
        />
        <Menus
          menus={this.state.menus}
          setPopUp={id => this.togglePopUp(id)}
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
