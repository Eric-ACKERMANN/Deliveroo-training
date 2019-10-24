import React from "react";
import Meals from "../Meals";
import Navigator from "../Navigator";

export default class Menu extends React.Component {
  state = {
    menuElements: null,
    position: null,
    positionForced: { bool: false, index: null },
    shownTitles: [],
    hiddenTitles: [],
    titlesDOM_R: [],
    titlesDOM_L: [],
    titlesPosition: null,
    navDropDown: false,
    basketMobileDeployed: false
  };

  getMenusDOMElements = menus => {
    const menuTitles = Object.keys(menus);
    let elementsArray = [];
    for (let i = 0; i < menuTitles.length; i++) {
      let DOMelement = document
        .getElementById(menuTitles[i])
        .getBoundingClientRect();
      elementsArray.push({
        title: menuTitles[i],
        top: DOMelement.top + document.documentElement.scrollTop,
        bottom: DOMelement.bottom + document.documentElement.scrollTop
      });
    }
    this.setState({ menuElements: elementsArray });
  };

  setPosition = e => {
    this.setState({ position: e });
  };

  handleScrollPosition = () => {
    const menuElements = this.state.menuElements;
    let positionY = window.scrollY;
    let parameter = 100;
    let loli = document.getElementById("loli");
    let hiddenTitleDOMElement = document.getElementById(
      "hiddenTitles-nav-element"
    );

    if (this.state.positionForced.bool) {
      let index = this.state.positionForced.index;

      if (
        menuElements[index].top - parameter <= positionY &&
        menuElements[index].bottom - parameter >= positionY
      ) {
        this.setState({ positionForced: { bool: false, index: null } });
      }
    } else {
      for (let i = 0; i < menuElements.length; i++) {
        let navTitleDOMElement = document.getElementById(`shownTitles_${i}`);
        if (
          menuElements[i].top - parameter < positionY &&
          menuElements[i].bottom - parameter >= positionY
        ) {
          navTitleDOMElement.classList.add("nav-selected");
          if (window.innerWidth < 768) {
            let container = document.getElementById("shownTitlesContainer");
            container.scrollLeft = this.state.titlesDOM_L[i];
          }

          if (navTitleDOMElement.classList.contains("no-visibility")) {
            loli.innerHTML = menuElements[i].title;
            hiddenTitleDOMElement.classList.add("nav-selected");
          } else {
            loli.innerHTML = "Plus";
            hiddenTitleDOMElement.classList.remove("nav-selected");
          }
        } else {
          navTitleDOMElement.classList.remove("nav-selected");
        }
      }
    }
  };

  getDOMBorder = (id, border) => {
    const DOM_element = document.getElementById(id);
    return DOM_element.getBoundingClientRect()[border];
  };

  getDOMBorderRelative = (block, container) => {
    let blockDOMBorder = this.getDOMBorder(block.id, block.border);
    let containerDOMBorder = this.getDOMBorder(container.id, container.border);
    return blockDOMBorder - containerDOMBorder;
  };

  handleClickNavLink = async position => {
    let positionForced = { bool: true, index: position };
    await this.setState({ positionForced: positionForced });

    // If window width < 768px
    if (window.innerWidth < 768) {
      let container = document.getElementById("shownTitlesContainer");
      container.scrollLeft = this.state.titlesDOM_L[position];
    }

    const menuElements = this.state.menuElements;
    let loli = document.getElementById("loli");
    let hiddenTitleDOMElement = document.getElementById(
      "hiddenTitles-nav-element"
    );
    for (let i = 0; i < menuElements.length; i++) {
      let navTitleDOMElement = document.getElementById(`shownTitles_${i}`);
      if (i === position) {
        navTitleDOMElement.classList.add("nav-selected");
        if (navTitleDOMElement.classList.contains("no-visibility")) {
          loli.innerHTML = menuElements[i].title;
          hiddenTitleDOMElement.classList.add("nav-selected");
        } else {
          loli.innerHTML = "Plus";
          hiddenTitleDOMElement.classList.remove("nav-selected");
        }
      } else {
        navTitleDOMElement.classList.remove("nav-selected");
      }
    }
  };

  setStateRightAndLeftLimits = menuTitles => {
    let titlesDOM_R = [];
    let titlesDOM_L = [];
    // DOM Element of container
    const containerDOM_L = this.getDOMBorder("shownTitlesContainer", "left");
    for (let i = 0; i < menuTitles.length; i++) {
      // DOM element of a title
      const titleDOM_R = this.getDOMBorder(`shownTitles_${i}`, "right");
      const titleDOM_L = this.getDOMBorder(`shownTitles_${i}`, "left");

      titlesDOM_R.push(10 * i + titleDOM_R - containerDOM_L);
      titlesDOM_L.push(titleDOM_L - containerDOM_L);
    }

    this.setState({ titlesDOM_R: titlesDOM_R, titlesDOM_L: titlesDOM_L });
    return titlesDOM_R;
  };

  handleWindowResize = () => {
    const titlesDOM_R = this.state.titlesDOM_R;
    if (window.innerWidth < 768) {
      for (let i = 0; i < titlesDOM_R.length; i++) {
        let titleDOM = document.getElementById(`shownTitles_${i}`);
        titleDOM.classList.remove("no-visibility");
      }

      for (let i = 0; i < titlesDOM_R.length; i++) {
        let titleDOM = document.getElementById(`shownTitles_${i}`);
        titleDOM.classList.remove("no-visibility");
      }

      return;
    }
    const hid_TitlesDOM_L = this.getDOMBorderRelative(
      { id: "hiddenTitles", border: "left" },
      { id: "shownTitlesContainer", border: "left" }
    );

    for (let i = 0; i < titlesDOM_R.length; i++) {
      let titleDOM = document.getElementById(`shownTitles_${i}`);
      let hiddenTitleDOM = document.getElementById(`hiddenTitles_${i}`);

      if (hid_TitlesDOM_L - titlesDOM_R[i] < 0) {
        titleDOM.classList.add("no-visibility");
        hiddenTitleDOM && hiddenTitleDOM.classList.remove("no-display");
      } else {
        titleDOM.classList.remove("no-visibility");
        hiddenTitleDOM && hiddenTitleDOM.classList.add("no-display");
      }
    }
  };

  handleFirstRender = async () => {
    const menuTitles = Object.keys(this.props.menus);
    // Create the state withh all the right limits of blocks
    await this.setStateRightAndLeftLimits(menuTitles);
    this.handleWindowResize();
  };

  toggleNavDropDown = async () => {
    await this.setState({ navDropDown: !this.state.navDropDown });
    this.handleWindowResize();
  };

  toggleBasketMobile = () => {
    this.setState({ basketMobileDeployed: !this.state.basketMobileDeployed });
  };

  render() {
    const {
      menus,
      setPopUp,
      basket,
      price,
      modifyQuantity,
      setTips
    } = this.props;

    const menuTitles = Object.keys(menus);
    return (
      <div className="menuBlock">
        <Navigator
          menuTitles={
            this.state.shownTitles.length > 0
              ? this.state.shownTitles
              : menuTitles
          }
          hiddenTitles={this.state.hiddenTitles}
          basket={basket}
          price={price}
          modifyQuantity={modifyQuantity}
          setTips={setTips}
          positionOfWindow={this.state.position}
          navDropDown={this.state.navDropDown}
          toggleDropDown={this.toggleNavDropDown}
          handleClickNavLink={this.handleClickNavLink}
          basketMobileDeployed={this.state.basketMobileDeployed}
          toggleBasketMobile={this.toggleBasketMobile}
        />
        <div className="container menu">
          <div className="leftBlock">
            {menuTitles.map((menu, index) => {
              return (
                <Meals
                  key={index}
                  menu={menu}
                  dishes={menus[menu]}
                  setPopUp={setPopUp}
                  basket={basket}
                />
              );
            })}
            ;
          </div>
          <div className="rightBlock" />
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.getMenusDOMElements(this.props.menus);
    this.handleFirstRender();

    window.addEventListener("resize", this.handleWindowResize);
    window.addEventListener("scroll", this.handleScrollPosition);
  }

  componentWillUnmount() {
    window.removeEventListener("resize");
  }
}
