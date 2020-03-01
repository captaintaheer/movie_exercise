import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles.css";

function Poster({ selected, title, handleSelect }) {
  return (
    <div
      className={selected ? styles.posterActive : undefined}
      onMouseOver={() => handleSelect(title.id)}
    >
      <Link to={`/details/${title.id}`}>
        <div className="className=" w-100 mb-2>
          <img
            alt="poster"
            src={title.images.find(item2 => item2.type === "POSTER").url}
          />
        </div>
      </Link>
      <div className="text-light card-title">
        <Link to={`/details/${title.id}`}>{title.title}</Link>
      </div>
    </div>
  );
}

export default Poster;
