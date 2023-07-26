import logo from "./logo.svg";
import "./App.css";
import react from "react";
import React from "react";
import { nanoid } from "nanoid";
import LandingPage from "./LandingPage";
import loading from "./Pulse-1s-200px (1).gif";
import parse from "html-react-parser";
import Select from "./Selector";
import Answers from "./Answers";

function App() {
  //correct and incorrect state array
  const [answers, setAnswers] = React.useState([]);

  //Category state
  const [select, setSelect] = React.useState(9);

  //Want to play
  const [playing, setPlaying] = React.useState(false);
  //Round count
  const [round, setRound] = React.useState(0);
  //data
  const [data, setData] = React.useState({
    isLoading: true,
    data: [],
  });
  //score
  const [score, setScore] = React.useState(0);

  React.useEffect(() => {
    function GetRandomDifficulty() {
      const array = ["easy", "medium", "hard", "hard", "medium"];
      const shuffledArray = array.sort((a, b) => 0.5 - Math.random());
      return shuffledArray;
    }

    fetch(
      `https://opentdb.com/api.php?amount=1&category=${select}&difficulty=${
        GetRandomDifficulty()[0]
      }&type=multiple`
    )
      .then((res) => res.json())
      .then((data) =>
        setData((prev) => {
          return {
            ...prev,
            data: data.results[0],
            isLoading: !prev.isLoading,
          };
        })
      );
  }, [round, select]);
  //console.log(data);

  //creating an array to randmize displayed selection
  function renderElements() {
    const array = [];
    if (data.isLoading) {
      <li>
        <img src={loading} alt="...Loading" />
      </li>;
    } else {
      array.push(data.data.correct_answer);
      data.data.incorrect_answers.map((curr) => {
        return array.push(curr);
      });
      for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
      return array;
    }
  }

  //Check for win/loss/new round
  function logId(event) {
    if (event.target.outerText === data.data.correct_answer) {
      setAnswers((prev) => [
        ...prev,
        {
          answer: "correct",
          text: data.data.correct_answer,
          question: data.data.question,
        },
      ]);
      setScore((prev) => prev + 1);
      setRound((prev) => prev + 1);
      setData((prev) => {
        return {
          ...prev,
          isLoading: !prev.isLoading,
        };
      });
    } else {
      setAnswers((prev) => [
        ...prev,
        {
          answer: "incorrect",
          text: event.target.outerText,
          question: data.data.question,
        },
      ]);
      setRound((prev) => prev + 1);
      setData((prev) => {
        return {
          ...prev,
          isLoading: !prev.isLoading,
        };
      });
    }
  }
  //Play Game
  function begin() {
    setPlaying((prev) => !prev);
  }
  //restart game
  function restart() {
    if (round == 0) {
      alert("You need to play atleast one round to restart the game!");
    } else {
      setRound((prev) => (prev = 0));
      setData((prev) => {
        return {
          ...prev,
          isLoading: !prev.isLoading,
        };
      });
      setScore((prev) => (prev = 0));
      setPlaying((prev) => !prev);
      setAnswers((prev) => (prev = []));
    }
  }
  //resetting score
  function resetScore() {
    if (round < 1) {
      alert("Cant reset the furst round!");
    } else {
      setRound((prev) => (prev = 0));
      setScore((prev) => (prev = 0));
      setData((prev) => {
        return {
          ...prev,
          isLoading: !prev.isLoading,
        };
      });
    }
  }
  //console.log(select);
  console.log(answers);
  return (
    <div className="App">
      <img className="image-1" src="./blob 5 (1).png" />
      <img className="image-2" src="./blob 5 (2).png" />
      {playing ? (
        <div>
          {round < 10 ? (
            <div className="questions-container">
              <div className="title-container">
                <h4>
                  {data.isLoading ? <div></div> : parse(data.data.question)}
                </h4>
              </div>
              <div className="container-list">
                <ul>
                  {data.isLoading ? (
                    <img
                      className="loading-ani"
                      src={loading}
                      alt="...Loading"
                    />
                  ) : (
                    renderElements().map((curr) => {
                      return (
                        <li
                          value={curr}
                          name={curr}
                          onClick={(event) => logId(event)}
                          key={nanoid()}
                          className="list-items"
                        >
                          {parse(curr)}
                        </li>
                      );
                    })
                  )}
                </ul>
              </div>
              {data.isLoading ? (
                ""
              ) : (
                <button className="restart-btn" onClick={() => resetScore()}>
                  Restart
                </button>
              )}
              <h1 className="score">
                {score} / {round}
              </h1>
            </div>
          ) : (
            // This is where correct and incorrect answers will display at the end
            <div className="end-container">
              <div className="end-game">
                Game over, you scored %{Math.trunc((score / round) * 100)}
              </div>
              <Answers array={answers} />
              <div className="end-btn">
                <button className="restart-btn" onClick={() => restart()}>
                  Play Again
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div>
          <LandingPage
            play={() => begin()}
            setCat={setSelect}
            setRound={setRound}
            setData={setData}
          />
        </div>
      )}
    </div>
  );
}

export default App;
