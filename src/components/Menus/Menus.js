import React from "react";
import Meals from "../Meals";
import Navigator from "../Navigator";

export default class Menu extends React.Component {
  state = {
    menuElements: null,
    position: null,
    positionForced: false,
    shownTitles: [],
    hiddenTitles: [],
    titlesDOM_R: [],
    titlesDOM_L: [],
    titlesPosition: null,
    navDropDown: false
  };

  getMenus = menus => {
    const menuTitles = Object.keys(menus);
    let elementsArray = [];
    for (let i = 0; i < menuTitles.length; i++) {
      let DOMelement = document
        .getElementById(menuTitles[i])
        .getBoundingClientRect();
      elementsArray.push({
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
    let positionY = window.scrollY;
    let parameter = 100;

    let position = null;

    if (this.state.positionForced) {
      if (
        this.state.menuElements[this.state.position].top - parameter <=
          positionY &&
        this.state.menuElements[this.state.position].bottom - parameter >=
          positionY
      ) {
        this.setState({ positionForced: false });
      }
    } else {
      for (let i = 0; i < this.state.menuElements.length; i++) {
        if (
          this.state.menuElements[i].top - parameter <= positionY &&
          this.state.menuElements[i].bottom - parameter >= positionY
        ) {
          position = i;
        }
      }
      if (position !== this.state.position) {
        this.setPosition(position);
      }
    }
  };

  handleClickNavLink = position => {
    this.setState({ position: position, positionForced: true });
  };

  getDOMBorder = (id, border) => {
    const DOM_element = document.getElementById(id);
    return DOM_element.getBoundingClientRect()[border];
  };

  setStateRightLimits = menuTitles => {
    let titlesDOM_R = [];
    let titlesDOM_L = [];
    // DOM Element of container
    const containerDOM_L = this.getDOMBorder("shownTitlesContainer", "left");
    for (let i = 0; i < menuTitles.length; i++) {
      // DOM element of a title
      const titleDOM_R = this.getDOMBorder(`shownTitles_${i}`, "right");
      titlesDOM_R.push(8 * i + titleDOM_R - containerDOM_L);
    }

    this.setState({ titlesDOM_R: titlesDOM_R, titlesDOM_L: titlesDOM_L });
    return titlesDOM_R;
  };

  setShownTitles = (titlesDOM_R, menuTitles) => {
    let hid_TitlesDOM_L = this.getDOMBorder(`hiddenTitles`, "left");
    const containerDOM_L = this.getDOMBorder(`shownTitlesContainer`, "left");

    hid_TitlesDOM_L = hid_TitlesDOM_L - containerDOM_L;

    let shownTitles = [];
    let hiddenTitles = [];
    for (let i = 0; i < titlesDOM_R.length; i++) {
      if (titlesDOM_R[i] < hid_TitlesDOM_L) {
        shownTitles.push(menuTitles[i]);
      } else {
        hiddenTitles.push(menuTitles[i]);
      }
    }

    this.setState({
      shownTitles: shownTitles,
      titlesPosition: shownTitles.length,
      hiddenTitles: hiddenTitles
    });
  };

  handleFirstRender = () => {
    const menuTitles = Object.keys(this.props.menus);
    // Create the state withh all the right limits of blocks
    const titlesDOM_R = this.setStateRightLimits(menuTitles);

    // Change the state shownTitles to only show the titles that fit in block
    this.setShownTitles(titlesDOM_R, menuTitles);
  };

  handleWindowResize = () => {
    let hid_TitlesDOM_L = this.getDOMBorder(`hiddenTitles`, "left");
    const containerDOM_L = this.getDOMBorder(`shownTitlesContainer`, "left");
    hid_TitlesDOM_L = hid_TitlesDOM_L - containerDOM_L;

    const titlesDOM_R = this.state.titlesDOM_R;
    const titlesPosition = this.state.titlesPosition;

    const interval = {
      min: titlesPosition > 0 ? titlesDOM_R[titlesPosition - 1] : 0,
      max:
        titlesPosition < titlesDOM_R.length ? titlesDOM_R[titlesPosition] : 1500
    };

    if (hid_TitlesDOM_L <= interval.min || hid_TitlesDOM_L >= interval.max) {
      const menuTitles = Object.keys(this.props.menus);
      this.setShownTitles(titlesDOM_R, menuTitles);
    }
  };

  toggleNavDropDown = () => {
    this.setState({ navDropDown: !this.state.navDropDown });
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
    this.getMenus(this.props.menus);
    this.handleFirstRender();

    document.addEventListener("scroll", this.handleScrollPosition);
    window.addEventListener("resize", this.handleWindowResize);
  }

  componentWillUnmount() {
    document.removeEventListener("scroll");
    window.removeEventListener("resize");
  }
}
