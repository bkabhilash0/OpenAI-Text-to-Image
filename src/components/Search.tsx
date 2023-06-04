"use client";

import { FormEvent, useState } from "react";
import Spinner from "./Spinner";
import axios from "axios";
import Image from "next/image";

const Search = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState("");
  const [image, setImage] = useState("");
  const [imageLoading, setImageLoading] = useState(false);

  const fetchImage = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post("/api/image_gen", {
        word: value,
      });
      setImage(res.data.data);
      setIsLoading(false);
      setImageLoading(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center max-w-4xl mx-auto p-4 gap-5 h-full">
      <form
        className="flex gap-2 w-full flex-col  md:flex-row "
        onSubmit={fetchImage}
      >
        <input
          type="text"
          className="border-gray-300 border-2 outline-none py-3 px-3 text-lg block rounded-md md:flex-1"
          placeholder="Enter the Description of the Image to Generate"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button
          className="bg-violet-600 text-white text-lg self-center py-2 px-16 rounded-[30px] hover:bg-violet-700 transition-all md:rounded-md md:py-3"
          type="submit"
        >
          {isLoading
            ? "Generating Image..."
            : imageLoading
            ? "Loading Image..."
            : "Search"}
        </button>
      </form>
      <div
        className={`${
            (!isLoading && image.length != 0) ? "bg-transparent" : "bg-black"
        } w-full h-full relative max-w-2xl max-h-[500px] mt-14`}
      >
        {(isLoading || imageLoading) && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Spinner />
          </div>
        )}
        {!isLoading && image.length != 0 && (
          <Image
            src={image}
            fill
            alt="My Image"
            style={{
              objectFit: "contain",
              // display: `${imageLoading ? "none" : "block"}`,
            }}
            onLoadingComplete={() => {
              console.log("Loading Complete");
              setImageLoading(false);
            }}
          />
        )}
      </div>
    </div>
  );
};
export default Search;
