import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from "axios";
import Film from "./Filmler/Film";
import KaydedilenlerListesi from "./Filmler/KaydedilenlerListesi";
import FilmListesi from "./Filmler/FilmListesi";
export default function App() {
  const [saved, setSaved] = useState([]);
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const FilmleriAl = () => {
      axios
        .get("http://localhost:5001/api/filmler")
        .then((response) => {
          setSaved(response.data);
          setMovieList(response.data);
        })
        .catch((error) => {
          console.error("Sunucu Hatası", error);
        });
    };

    FilmleriAl();
  }, []);

  console.log(saved);

  const KaydedilenlerListesineEkle = (id) => {
    const kaydedilmis = saved.find((film) => film.id === id);
    if (kaydedilmis) {
      console.log("Bu filmi zaten kaydettiniz!");
    } else {
      const secili = movieList.find((film) => film.id === id);
      if (secili) {
        setSaved([...saved, secili]);
      }
    }
  };

  return (
    <Router>
      <div>
        <KaydedilenlerListesi list={[saved]} />
        <Switch>
          <Route path="/" exact>
            <FilmListesi movies={movieList} />{" "}
          </Route>
          <Route path="/filmler/:id">
            {" "}
            <Film id={movieList.id} />{" "}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
