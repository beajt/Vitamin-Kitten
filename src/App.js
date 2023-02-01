import { useEffect, useState } from "react";
import "./App.css";

import DisplayPhotos from "./components/DisplayPhotos";
import Form from "./components/Form";

function App() {
  const [photos, setPhotos] = useState([]);
  const [filteredPhotos, setFilteredPhotos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const url = new URL("https://api.unsplash.com/search/photos");
      url.search = new URLSearchParams({
        client_id: "QbZeP1mKgcI-uojLz2pmBMVbExJPfBkPnlKS8kh9Kb0",
        query: "kittens",
        per_page: 30,
      });

      try {
        const data = await fetch(url);
        const response = await data.json();

        const photosWithOrientation = response.results.map((photo) => {
          const ratio = photo.width / photo.height;
          let orientation = "square";

          if (ratio < 0.75) {
            orientation = "portrait";
          } else if (ratio > 1.35) {
            orientation = "landscape";
          }

          return {
            ...photo,
            orientation,
          };
        });

        setPhotos(photosWithOrientation);
      } catch (error) {
        // err handle
      }
    };

    fetchData();
  }, []);

  const getPhotos = (userChoice) => {

    const filteredPhotos = photos.filter(
      (photo) => photo.orientation === userChoice 
    );
    setFilteredPhotos(filteredPhotos);
  };

  return (
    <div className="App">
      <h1>Your Daily Dose of Vitamin K(itten)!</h1>
      <Form getPhotos={getPhotos} />
      <DisplayPhotos photos={filteredPhotos} />
    </div>
  );
}

export default App;