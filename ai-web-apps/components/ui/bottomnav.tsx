import React from "react";
import BottomNavButtons from "./bottomNavButtons";

const BottomNav = () => {
  // Create handler that will take the event from a button click
  // and toggle the class of the parent element
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const parent = e.currentTarget.parentElement;
    const buttons = parent?.querySelectorAll("button");
    buttons?.forEach((button) => {
      button.classList.remove("active");
    });
    const element = e.currentTarget;
    const value = element.value;
    if (value) {
      console.log(value);
    }
    element?.classList.toggle("active");
  };

  return (
    <>
      <div className="btm-nav lg:hidden">
        <BottomNavButtons />
      </div>
    </>
  );
};

export default BottomNav;
