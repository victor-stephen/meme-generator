import { useState, useEffect } from "react";
export default function Main() {
  const [meme, setMeme] = useState({
    topText: "One deos not simply",
    bottomText: "Walk into Mordor",
    imageUrl: "http://i.imgflip.com/1bij.jpg",
  });
  const [allMemes, setAllMemes] = useState(null);

  useEffect(() => {
    fetch(`https://api.imgflip.com/get_memes`)
      .then((res) => res.json())
      .then((data) => {
        setAllMemes(data.data.memes);
      })
      .catch((error) => console.error("Fetch Error", error.message));
  }, []);

  function getMemeImage() {
    if (allMemes && allMemes.length > 0) {
      const idx = Math.floor(Math.random() * allMemes.length);
      setMeme((prevMeme) => ({
        ...prevMeme,
        imageUrl: allMemes[idx].url,
      }));
    }
  }

  function handleChange(event) {
    const { value, name } = event.currentTarget;
    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value,
    }));
  }

  return (
    <main>
      <div className="form">
        <label>
          Top Text
          <input
            type="text"
            placeholder={meme.topText}
            name="topText"
            onChange={handleChange}
            value={meme.topText}
          />
        </label>

        <label>
          Bottom Text
          <input
            type="text"
            placeholder={meme.bottomText}
            name="bottomText"
            onChange={handleChange}
            value={meme.bottomText}
          />
        </label>
        <button onClick={getMemeImage}>Get a new meme image </button>
      </div>
      <div className="meme">
        <img src={meme.imageUrl} />
        <span className="top">{meme.topText}</span>
        <span className="bottom">{meme.bottomText}</span>
      </div>
    </main>
  );
}
