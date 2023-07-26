import React from "react";
import parse from "html-react-parser";
/**
 * Create a feature that stores all the correct answers in one array, and all of the wrong answers in another array.
 *
 * Pass down the array from the app component to this component
 * then mao through both arrays and dynamically add the contents into
 * asthetically pleasing displys
 * correct answers on the top
 * wrong answers on the bottom
 * restart button all the way at the bottom
 *
 **/

export default function Answers(props) {
  return (
    <div className="holder-answers">
      {props.array.map((curr) => {
        return (
          <li
            className={"end-game-answer-list"}
            style={
              curr.answer === "correct"
                ? { background: "rgba(5, 255, 5, 0.413)" }
                : { background: "  rgba(255, 0, 0, 0.491)" }
            }
          >
            <div>Question: {parse(curr.question)}</div>

            <div>Answer: {parse(curr.text)}</div>
          </li>
        );
      })}
    </div>
  );
}
