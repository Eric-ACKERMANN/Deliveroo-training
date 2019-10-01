import React from "react";
import Meals from "../Meals";
import Navigator from "../Navigator";
import { callbackify } from "util";

export default class Menu extends React.Component {
  state = {
    menuElements: null,
    position: null,
    positionForced: null,
    shownTitles: [],
    hiddenTitles: [],
    titlesDOM_R: [],
    titlesPosition: null,
    navDropDown: false
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
    let bool = this.state.positionForced.bool;
    for (let i = 0; i < menuElements.length; i++) {
      if (bool) {
        let position = this.state.positionForced.index;
        if (i === position) {
          bool = false;
        } else {
          break;
        }
      }
      let navTitleDOMElement = document.getElementById(`shownTitles_${i}`);
      if (
        menuElements[i].top - parameter <= positionY &&
        menuElements[i].bottom - parameter >= positionY
      ) {
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
  };

  setStateRightLimits = menuTitles => {
    let titlesDOM_R = [];
    // DOM Element of container
    const containerDOM_L = this.getDOMBorder("shownTitlesContainer", "left");
    for (let i = 0; i < menuTitles.length; i++) {
      // DOM element of a title
      const titleDOM_R = this.getDOMBorder(`shownTitles_${i}`, "right");
      titlesDOM_R.push(7 * i + titleDOM_R - containerDOM_L);
    }

    this.setState({ titlesDOM_R: titlesDOM_R });
    return titlesDOM_R;
  };

  handleFirstRender = async () => {
    const menuTitles = Object.keys(this.props.menus);
    // Create the state withh all the right limits of blocks
    await this.setStateRightLimits(menuTitles);
    this.handleWindowResize();
  };

  handleWindowResize = () => {
    const hid_TitlesDOM_L = this.getDOMBorderRelative(
      { id: "hiddenTitles", border: "left" },
      { id: "shownTitlesContainer", border: "left" }
    );

    const titlesDOM_R = this.state.titlesDOM_R;
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

  toggleNavDropDown = async () => {
    await this.setState({ navDropDown: !this.state.navDropDown });
    this.handleWindowResize();
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
        />
        <div className="container menu">
          <div className="leftBlock">
            {menuTitles.map((menuTitle, index) => {
              return (
                <Meals
                  key={index}
                  menuTitle={menuTitle}
                  dishes={menus[menuTitle]}
                  setPopUp={setPopUp}
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

    document.addEventListener("scroll", this.handleScrollPosition);
    window.addEventListener("resize", this.handleWindowResize);
  }

  componentWillUnmount() {
    document.removeEventListener("scroll");
    window.removeEventListener("resize");
  }
}

const setIntersectionObserver = () => {
  let options = {
    options1: { root: null, rootMargin: "-200px 0 0 0", threshold: 0 },
    options2: {
      root: null,
      rootMargin: "0 0 calc(200px-100%) 0",
      threshold: 0
    }
  };

  let callback1 = function(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.intersectionRatio >= 0) {
        entry.target.classList.add("nav-selected");
      } else {
        entry.target.classList.remove("nav-selected");
      }
    });
  };
  let callback2 = function(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.intersectionRatio >= 0) {
        entry.target.classList.add("nav-selected");
      } else {
        entry.target.classList.remove("nav-selected");
      }
    });
  };
  const observer1 = new IntersectionObserver(callback1, options.options1);
  const observer2 = new IntersectionObserver(callback2, options.options2);

  const menuTitles = Object.keys(this.props.menus);
  let menuHTMLElements = [];
  for (let i = 0; i < menuTitles.length; i++) {
    let DOMelement = document.getElementById(menuTitles[i]);
    menuHTMLElements.push(DOMelement);
  }

  observer1.observe(menuHTMLElements);
  observer2.observe(menuHTMLElements);
};
