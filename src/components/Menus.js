import React from "react";
import Meals from "./Meals";
import Navigator from "./Navigator";

export default class Menu extends React.Component {
  state = {
    menuElements: null,
    position: null
  };

  getMenus = e => {
    this.setState({ menuElements: e });
  };

  setPosition = e => {
    this.setState({ position: e });
  };

  handleScrollPosition = () => {
    let positionY = window.scrollY;
    console.log(positionY, "positionY");
    let parameter = 100;

    let position = null;
    for (let i = 0; i < this.state.menuElements.length; i++) {
      if (
        this.state.menuElements[i].top - parameter <= positionY &&
        this.state.menuElements[i].bottom - parameter > positionY
      ) {
        position = i;
        break;
      }
    }

    if (position !== this.state.position) {
      this.setPosition(position);
    }
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
          menuTitles={menuTitles}
          basket={basket}
          price={price}
          modifyQuantity={modifyQuantity}
          setTips={setTips}
          positionOfWindow={this.state.position}
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
    const menuTitles = Object.keys(this.props.menus);
    let elementsArray = [];
    for (let i = 0; i < menuTitles.length; i++) {
      elementsArray.push({
        top:
          document.getElementById(menuTitles[i]).getBoundingClientRect().top +
          document.documentElement.scrollTop,
        bottom:
          document.getElementById(menuTitles[i]).getBoundingClientRect()
            .bottom + document.documentElement.scrollTop
      });
    }
    this.getMenus(elementsArray);

    document.addEventListener("scroll", this.handleScrollPosition);
  }

  componentWillUnmount() {
    document.removeEventListener("scroll");
  }
}
