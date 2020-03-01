import React, { useState, useMemo, useRef, useEffect } from "react";
import { usePagination } from "../Pagination/usePagination";
import { cache } from "../utils";
import theme from "../app.css";
import styles from "./styles.css";
import Poster from "../Poster/poster.js";

async function fectMovies() {
  const data = await fetch(
    "https://cdn-discover.hooq.tv/v1.2/discover/feed?region=ID&page=1&perPage=20"
  ).then(response => response.json());
  return Promise.resolve(data);
}

function Home({ history, location, ...props }) {
  const [campaigns, setCampaigns] = useState([]);
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState("");
  const [page, setPage, paginator] = usePagination(history, location);

  useEffect(() => {
    (async function run() {
      const data = await cache("home", fectMovies);
      setCampaigns(prevState => prevState.concat(data.data));
    })();
  }, []);

  const filterResults = useMemo(() => {
    return campaigns
      .filter(item => item.type === "Multi-Title-Manual-Curation")
      .filter(cmp => {
        return cmp.row_name.includes(filter);
      });
  }, [campaigns, filter]);

  const [pageItems, pages] = useMemo(() => {
    const tmp = paginator(filterResults);
    if (tmp[0][0]) setSelected(tmp[0][0].data[0].id);
    return tmp;
  }, [filterResults, page]);

  const containerRef = useRef(window.innerWidth);
  return (
    <>
      <div className="App">
        <table className="Title">
          <tbody>
            <tr>
              <td>
                <img alt="icon" width="50" src="images.jpg" />
              </td>
              <td width="7" />
              <td>
                <h1>Movie List Exercise</h1>
              </td>
            </tr>
          </tbody>
        </table>
        {/* {this.state.rows}; */}
      </div>
      <div className="">
        {pageItems.map(item => {
          return (
            <div className="" key={item.row_id}>
              <div className="grid-container">
                <h3>{item.row_name}</h3>
              </div>
              {item.data.map(item => (
                <div className="">
                  <div className="column">
                    <Poster
                      key={item.id}
                      selected={item.id === selected}
                      title={item}
                      handleSelect={setSelected}
                    />{" "}
                  </div>
                </div>
              ))}
            </div>
          );
        })}
        <div className={theme.container}>
          <div className={styles.paginationBar}>
            <button onClick={() => setPage(p => (p <= 2 ? 1 : p - 1))}>
              Prev
            </button>
            <div>
              Page{" "}
              <input
                type="number"
                value={page}
                style={{ width: "3rem" }}
                min={1}
                max={pages}
                onChange={e => setPage(e.target.value)}
              />{" "}
              of {pages}
            </div>
            <button onClick={() => setPage(p => (p < pages ? p + 1 : pages))}>
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default Home;
