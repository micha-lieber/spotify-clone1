import React, { useState } from "react";
import ResultPage from "./ResultPage";

export default function Searchpage() {
  const [searchValue, setSearchValue] = useState(null);

  const submitHandler = (e) => {
    e.preventDefault();

    console.log("submitted", searchValue);
  };
  const searchHandler = (e) => {
    setSearchValue(e.target.value);
  };
  return (
    <div className="bg-red">
      <form
        className="flex p-4"
        onSubmit={(e) => {
          submitHandler(e);
        }}
      >
        <div className="rounded-full bg-white overflow-hidden relative ">
          <label htmlFor="search" className="absolute right-2 top-2 ">
            <svg
              role="img"
              height="24"
              width="24"
              aria-hidden="true"
              viewBox="0 0 24 24"
              data-encore-id="icon"
            >
              <path
                fill="black"
                d="M10.533 1.279c-5.18 0-9.407 4.14-9.407 9.279s4.226 9.279 9.407 9.279c2.234 0 4.29-.77 5.907-2.058l4.353 4.353a1 1 0 1 0 1.414-1.414l-4.344-4.344a9.157 9.157 0 0 0 2.077-5.816c0-5.14-4.226-9.28-9.407-9.28zm-7.407 9.279c0-4.006 3.302-7.28 7.407-7.28s7.407 3.274 7.407 7.28-3.302 7.279-7.407 7.279-7.407-3.273-7.407-7.28z"
              ></path>
            </svg>
          </label>
          <input
            type="text"
            name="search"
            placeholder="what do you want to listen to?"
            className="text-black p-2"
            value={searchValue}
            onChange={(e) => {
              searchHandler(e);
            }}
          />
        </div>
      </form>
      <ResultPage keyword={searchValue} />
    </div>
  );
}
