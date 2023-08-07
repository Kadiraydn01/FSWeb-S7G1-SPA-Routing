import React, { useState, useEffect } from "react";
import axios from "axios";
import Film from "./Filmler/Film";
import KaydedilenlerListesi from "./Filmler/KaydedilenlerListesi";

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
    <div>
      <Film id={1} />
      <KaydedilenlerListesi
        list={saved}
        //   [
        //     /* Burası esnek */
        //   ]
        // }
      />

      <div>Routerlar buraya</div>
    </div>
  );
}
