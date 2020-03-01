import React, { useState, useEffect } from "react";
import theme from "../app.css";
import styles from "./styles.css";

function TitleDetails({ match, ...props }) {
  const [state, setState] = useState({ people: [], images: [], meta: {} });
  useEffect(() => {
    (async function load() {
      const data = await fetch(
        `https://cdn-discover.hooq.tv/v1.2/discover/titles/${match.params.id}`
      ).then(response => response.json());
      setState(data.data);
    })();
  }, []);

  const casts = state.people.filter(item => item.role === "CAST");
  const directors = state.people.filter(item => item.role === "DIRECTOR");
  const posterImage = state.images.find(image => image.type === "POSTER");
  const { releaseYear, ageRating, running_time_friendly: runtime } = state.meta;

  return (
    <>
      <div className="card card-body bg-dark text-center h-100">
        <div className="container">
          <img
            className="w-100 mb-2"
            src={posterImage ? posterImage.url : undefined}
          />
          <div className="overlay">
            <p className="text-light card-title">
              <h3> Details: </h3> {state.description}
            </p>
          </div>
        </div>
        <div className="new">
          {releaseYear && <div>{releaseYear}</div>}
          {runtime && <div>{runtime}</div>}
          <h3>Casts</h3>
          <p>{joinNames(casts)}</p>
          <h3>Directed by</h3>
          <p>{joinNames(directors)}</p>
        </div>
      </div>
    </>
  );
}

function joinNames(objArray) {
  return objArray.reduce(
    (acc, cur, idx) =>
      `${acc}${cur.name}${idx === objArray.length - 1 ? "" : ", "}`,
    ""
  );
}

export default TitleDetails;
