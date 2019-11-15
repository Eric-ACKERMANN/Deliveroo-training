import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./components/Header";
import Restaurant from "./components/Restaurant";
import Menus from "./components/Menus/Menus";
import Menus_Hook from "./components/MenusHook";
import PopUpMenu from "./components/PopUpMenu";
import Loading from "./components/Loading";
import PopUp from "./components/PopUp";
import { DELIVERY_COST, OPERATING_COST } from "./constants/price";

export default function App() {
  const [restaurantInfo, setRestaurantInfo] = useState(null);
  const [menus, setMenus] = useState(null);
  const [infoLoading, setInfoLoading] = useState(true);
  const [popUp, setPopUp] = useState({
    display: false,
    dish: { picture: "", title: "", dsecription: "" }
  });
  const [popUpMenu, setPopUpMenu] = useState({ display: false });
  const [quantity, setQuantity] = useState(1);
  const [basket, setBasket] = useState([]);
  const [price, setPrice] = useState({
    deliveryCost: DELIVERY_COST,
    operatingCost: OPERATING_COST,
    tips: 0,
    rawPrice: null
  });

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("https://deliveroo-api.now.sh/menu");
      setRestaurantInfo(response.data.restaurant);
      setMenus(response.data.menu);
      setInfoLoading(false);
    }
    fetchData();
  }, []);

  /*********  POP UP *********/
  const togglePopUp = e => {
    setPopUp({ display: !popUp.display, dish: e });
  };
  const handleClickQuantity = e => {
    setQuantity(quantity + e);
  };

  const calculRawPrice = array => {
    let priceRaw = 0;
    array.forEach(element => {
      let elementPrice = Number(element.quantity * element.price);
      priceRaw += elementPrice;
    });

    return priceRaw;
  };

  const handleClickValidation = dish => {
    // Copy of the state
    let arr = [...basket];
    let position;
    arr.forEach((e, index) => {
      e = { ...basket[index] };
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
      dish.quantity = quantity;
      arr.push(dish);

      // if already selected
    } else {
      arr[position].quantity += Number(quantity);
    }

    // calcul new total price
    let priceCop = { ...price };
    priceCop.rawPrice = calculRawPrice(arr);

    setBasket(arr);
    setPopUp({ display: false });
    setQuantity(1);
    setPrice(priceCop);
  };

  /********** POPUP MENU ***********/

  const displayPopUpMenu = () => {
    setPopUpMenu({ display: true });
  };

  const cancelPopUpMenu = () => {
    setPopUpMenu({ display: false });
  };

  /****** BASKET ********/

  const modifyQuantity = (e, id) => {
    // Copy of the state
    let arr = [...basket];
    arr.forEach((e, index) => {
      e = { ...basket[index] };
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
    let priceCop = { ...price };
    priceCop.rawPrice = calculRawPrice(arr);

    // Set new State
    setBasket(arr);
    setPrice(priceCop);
  };

  const handleClickTipsQuantity = e => {
    let priceCop = { ...price };
    priceCop.tips = priceCop.tips + e;
    if (priceCop.tips >= 0) setPrice(priceCop);
  };

  if (infoLoading === true) {
    return <Loading />;
  }
  if (popUp.display === true) {
    document.body.classList.add("fixedScreen");
  } else {
    document.body.classList.remove("fixedScreen");
  }
  const { deliveryCost, operatingCost, rawPrice, tips } = price;
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
      handleClickButton: displayPopUpMenu
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

      <PopUp
        plateId={popUp.plateId}
        dish={popUp.dish}
        quantity={quantity}
        setQuantity={handleClickQuantity}
        togglePopUp={togglePopUp}
        popUpDisplayBoolean={popUp.display}
        setValidation={handleClickValidation}
      />

      <PopUpMenu popUpMenu={popUpMenu} cancelPopUpMenu={cancelPopUpMenu} />

      <Restaurant
        img={restaurantInfo.picture}
        alt={`${restaurantInfo.name} image`}
        name={restaurantInfo.name}
        description={restaurantInfo.description}
      />
      <Menus_Hook
        menus={menus}
        setPopUp={id => togglePopUp(id)}
        basket={basket}
        price={price}
        modifyQuantity={modifyQuantity}
        setTips={handleClickTipsQuantity}
      />
    </div>
  );
}
