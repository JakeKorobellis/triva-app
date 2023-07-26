import React from "react";

export default function Select(props) {
  function handleChange(event) {
    props.setCat(event.target.value);
    props.setData((prev) => {
      return {
        ...prev,
        isLoading: !prev.isLoading,
      };
    });
  }

  return (
    <div className="select">
      <label htmlFor="categories" id="label">
        Choose a category:
      </label>
      <select name="catgories" id="catagory" onChange={handleChange}>
        <option value="9">General</option>
        <option value="10">Books</option>
        <option value="11">Film</option>
        <option value="12">Music</option>
        <option value="13">Musicals</option>
        <option value="14">TV</option>
        <option value="15">Video Games</option>
        <option value="16">Board Games</option>
        <option value="17">Nature</option>
        <option value="18">Computers</option>
        <option value="19">Math</option>
        <option value="20">Mythology</option>
        <option value="21">Sports</option>
        <option value="22">Geography</option>
        <option value="23">History</option>
        <option value="24">Politics</option>
        <option value="25">Art</option>
        <option value="26">Celeberites</option>
        <option value="27">Animals</option>
        <option value="28">Vehicles</option>
        <option value="29">Comics</option>
        <option value="30">Gadgets</option>
        <option value="31">Anime</option>
        <option value="32">Cartoons</option>
      </select>
    </div>
  );
}
