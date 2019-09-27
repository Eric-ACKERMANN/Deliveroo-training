import React from "react";
import axios from "axios";
import Header from "./components/Header";
import Restaurant from "./components/Restaurant";
import Menus from "./components/Menus/Menus";
import PopUpMenu from "./components/PopUpMenu";
import Loading from "./components/Loading";
import PopUp from "./components/PopUp";
import { DELIVERY_COST, OPERATING_COST } from "./constants/price";

class App extends React.Component {
  state = {
    restaurantInfo: null,
    menus: null,
    menusElement: null,
    infoLoading: true,
    popUp: {
      display: false,
      dish: { picture: "", title: "", dsecription: "" }
    },
    popUpMenu: { display: false },
    quantity: 1,
    basket: [],
    price: {
      deliveryCost: DELIVERY_COST,
      operatingCost: OPERATING_COST,
      tips: 0,
      rawPrice: null
    }
  };

  fetchAPI = async () => {
    const response = await axios.get("https://deliveroo-api.now.sh/menu");

    // const menuTitles = Object.keys(response.data.menu);
    // for (let i = 0; i < menuTitles.length; i++) {
    //   if (response.data.menu[menuTitles[i]].length < 1) {
    //     delete response.data.menu[menuTitles[i]];
    //   }
    // }
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

  calculRawPrice = array => {
    let priceRaw = 0;
    array.forEach(element => {
      let elementPrice = Number(element.quantity * element.price);
      priceRaw += elementPrice;
    });

    return priceRaw.toFixed(2);
  };

  handleClickValidation = dish => {
    // Copy of the state
    let arr = [...this.state.basket];
    let position;
    arr.forEach((e, index) => {
      e = { ...this.state.basket[index] };
    });

    // Determine if dish is already selected
    if (arr.length > 0) {
      position = arr
        .map(e => {
          return e.id;
        })
        .indexOf(dish.id);
    }
    // if new entry
    if (position === -1 || arr.length < 1) {
      dish.quantity = this.state.quantity;
      arr.push(dish);

      // if already selected
    } else {
      arr[position].quantity += Number(this.state.quantity);
    }

    // calcul new total price
    let price = { ...this.state.price };
    price.rawPrice = this.calculRawPrice(arr);

    this.setState({
      basket: arr,
      popUp: { display: false },
      quantity: 1,
      price: price
    });
  };

  /********** POPUP MENU ***********/

  setPopUpMenu = () => {
    this.setState({ popUpMenu: { display: true } });
  };

  cancelPopUpMenu = () => {
    this.setState({ popUpMenu: { display: false } });
  };

  /****** BASKET ********/

  modifyQuantity = (e, id) => {
    // Copy of the state
    let arr = [...this.state.basket];
    arr.forEach((e, index) => {
      e = { ...this.state.basket[index] };
    });

    // Search the modified item
    let index = arr
      .map(e => {
        return e.id;
      })
      .indexOf(id);

    // increment or decrement the quantity
    arr[index].quantity += e;

    // Case quantity drops to 0
    if (arr[index].quantity === 0) arr.splice(index, 1);

    // calcul new total price
    let price = { ...this.state.price };
    price.rawPrice = this.calculRawPrice(arr);

    // Set new State
    this.setState({ basket: arr, price: price });
  };

  handleClickTipsQuantity = e => {
    let price = { ...this.state.price };
    price.tips = price.tips + e;
    if (price.tips >= 0) this.setState({ price: price });
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
    const { deliveryCost, operatingCost, rawPrice, tips } = this.state.price;
    let totalPrice;
    if (rawPrice > 0) {
      totalPrice =
        Number(deliveryCost) + Number(operatingCost) + Number(rawPrice) + tips;
    } else {
      totalPrice = 0;
    }
    const headerButtons = [
      {
        className: "btn-header",
        children: [
          <i key={0} className="fas fa-shopping-basket" />,
          <span key={1}>{`${totalPrice
            .toFixed(2)
            .toString()
            .replace(".", ",")} €`}</span>
        ]
      },
      {
        className: "btn-header",
        children: [
          <i key={0} className="fas fa-bars" />,
          <span key={1}>Menu</span>
        ],
        handleClickButton: this.setPopUpMenu
      }
    ];

    return (
      <div ref={ref => (this._app = ref)}>
        <Header
          img={
            "https://consumer-component-library.roocdn.com/11.3.1/static/images/logo-teal.64a39561252047a022e5ce0929c75374.svg"
          }
          alt={"Deliveroo logo"}
          buttons={headerButtons}
          totalPrice={this.state.price}
        />

        <PopUp
          plateId={this.state.popUp.plateId}
          dish={this.state.popUp.dish}
          quantity={this.state.quantity}
          setQuantity={this.handleClickQuantity}
          togglePopUp={this.togglePopUp}
          popUpDisplayBoolean={this.state.popUp.display}
          setValidation={this.handleClickValidation}
        />

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
          price={this.state.price}
          modifyQuantity={this.modifyQuantity}
          setTips={this.handleClickTipsQuantity}
        />
      </div>
    );
  }
  componentDidMount() {
    this.fetchAPI();
  }
}
// Fin du render et de la class
export default App;
