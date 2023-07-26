import React from "react";
import Select from "./Selector";

export default function LandingPage(props) {
  const handleClick = (event) => {
    props.play();
  };

  return (
    <div className="parent">
      <div className="div1"> Quizzly </div>
      <div className="div2">
        {" "}
        Test your knowledge on 10 different trivia questions selected at random
        from a database of over 550,000 questions!
        <div className="form">
          <Select setCat={props.setCat} setData={props.setData} />
        </div>
      </div>

      <div className="div3">
        <button className="button-start" onClick={handleClick}>
          Play now!
        </button>{" "}
      </div>
    </div>
  );
}
