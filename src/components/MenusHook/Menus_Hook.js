import React, { useState, useEffect } from "react";
import Meals from "../Meals";
import Navigator from "../Navigator";

export default function Menu({
  menus,
  setPopUp,
  basket,
  price,
  modifyQuantity,
  setTips
}) {
  const [menuElements, setMenuElements] = useState(null);
  const [positionForced, setPositionForced] = useState({
    bool: false,
    index: null
  });
  const [titlesDOM_R, setTitlesDOM_R] = useState([]);
  const [titlesDOM_L, setTitlesDOM_L] = useState([]);
  const [navDropDown, setNavDropDown] = useState(false);
  const [basketMobileDeployed, setBasketMobileDeployed] = useState(false);

  useEffect(() => {
    async function test() {
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
      await setMenuElements(elementsArray);
    }
    test();
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    window.addEventListener("scroll", handleScrollPosition);
    handleFirstRender();
    return function cleanup() {
      window.removeEventListener("resize", handleWindowResize);
      window.removeEventListener("scroll", handleScrollPosition);
    };
  }, [menuElements]);

  const getMenusDOMElements = () => {
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

    setMenuElements(elementsArray);
  };

  const handleScrollPosition = () => {
    let positionY = window.scrollY;
    let parameter = 100;
    let loli = document.getElementById("loli");
    let hiddenTitleDOMElement = document.getElementById(
      "hiddenTitles-nav-element"
    );

    if (positionForced.bool) {
      let index = positionForced.index;

      if (
        menuElements[index].top - parameter <= positionY &&
        menuElements[index].bottom - parameter >= positionY
      ) {
        setPositionForced({ bool: false, index: null });
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
            container.scrollLeft = titlesDOM_L[i];
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

  const getDOMBorder = (id, border) => {
    const DOM_element = document.getElementById(id);
    return DOM_element.getBoundingClientRect()[border];
  };

  const getDOMBorderRelative = (block, container) => {
    let blockDOMBorder = getDOMBorder(block.id, block.border);
    let containerDOMBorder = getDOMBorder(container.id, container.border);
    return blockDOMBorder - containerDOMBorder;
  };

  const handleClickNavLink = async position => {
    let positionForced = { bool: true, index: position };
    await setPositionForced(positionForced);

    // If window width < 768px
    if (window.innerWidth < 768) {
      let container = document.getElementById("shownTitlesContainer");
      container.scrollLeft = titlesDOM_L[position];
    }

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

  const setStateRightAndLeftLimits = menuTitles => {
    let titlesDOM_Rlocal = [];
    let titlesDOM_Llocal = [];
    // DOM Element of container
    const containerDOM_L = getDOMBorder("shownTitlesContainer", "left");
    for (let i = 0; i < menuTitles.length; i++) {
      // DOM element of a title
      const titleDOM_R = getDOMBorder(`shownTitles_${i}`, "right");
      const titleDOM_L = getDOMBorder(`shownTitles_${i}`, "left");

      titlesDOM_Rlocal.push(10 * i + titleDOM_R - containerDOM_L);
      titlesDOM_Llocal.push(titleDOM_L - containerDOM_L);
    }
    setTitlesDOM_R(titlesDOM_Rlocal);
    setTitlesDOM_L(titlesDOM_Llocal);

    return titlesDOM_Rlocal;
  };

  const handleWindowResize = () => {
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
    const hid_TitlesDOM_L = getDOMBorderRelative(
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

  const handleFirstRender = async () => {
    const menuTitles = Object.keys(menus);
    // Create the state withh all the right limits of blocks
    await setStateRightAndLeftLimits(menuTitles);
    handleWindowResize();
  };

  const toggleNavDropDown = async () => {
    await setNavDropDown(!navDropDown);
    handleWindowResize();
  };

  const toggleBasketMobile = () => {
    setBasketMobileDeployed(!basketMobileDeployed);
  };

  const menuTitles = Object.keys(menus);
  return (
    <div className="menuBlock">
      <Navigator
        menuTitles={menuTitles}
        basket={basket}
        price={price}
        modifyQuantity={modifyQuantity}
        setTips={setTips}
        navDropDown={navDropDown}
        toggleDropDown={toggleNavDropDown}
        handleClickNavLink={handleClickNavLink}
        basketMobileDeployed={basketMobileDeployed}
        toggleBasketMobile={toggleBasketMobile}
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
