import React, { useEffect, useState } from "react";
import axios from "axios";
import NoteContainer from "./NotesContainer";
import Sidebar from "./Sidebar";
import Header from "./Header";

import "./App.css";

function App() {
  const [notes, setNotes] = useState(
    JSON.parse(localStorage.getItem("notes-app")) || []
  );

  const addNote = (color) => {
    const tempNotes = [...notes];

    tempNotes.push({
      id: Date.now() + "" + Math.floor(Math.random() * 78),
      text: "",
      time: Date.now(),
      color,
    });
    setNotes(tempNotes);
  };

  const deleteNote = (id) => {
    const tempNotes = [...notes];

    const index = tempNotes.findIndex((item) => item.id === id);
    if (index < 0) return;

    tempNotes.splice(index, 1);
    setNotes(tempNotes);
  };

  const updateText = (text, id) => {
    const tempNotes = [...notes];

    const index = tempNotes.findIndex((item) => item.id === id);
    if (index < 0) return;

    tempNotes[index].text = text;
    setNotes(tempNotes);
  };

  useEffect(() => {
    localStorage.setItem("notes-app", JSON.stringify(notes));
  }, [notes]);

  const [quote, setQuotes] = useState("hello");
  const [author, setAuthor] = useState();

  const fetchRandomQuote = () => {
    axios
      .get("https://type.fit/api/quotes")
      .then((response) => {
        const randomIndex = Math.floor(Math.random() * response.data.length);
        const randomQuote = response.data[randomIndex];
        setQuotes(randomQuote.text);
        setAuthor(randomQuote.author || "Unknown");
      })
      .catch((error) => {
        console.error("Error fetching quote: ", error);
      });
  };

  useEffect(() => {
    fetchRandomQuote();
  }, []);

  return (
    <div className="main-app">
      <Header />
      <div className="App">
        <Sidebar addNote={addNote} />
        <div className="noteandq">
          <NoteContainer
            notes={notes}
            deleteNote={deleteNote}
            updateText={updateText}
          />
          <div>
            <div className="quotes">
              <h2>{quote}</h2>
              <small>{author}</small>
            </div>
            <br></br>
            <button className="btn" onClick={fetchRandomQuote}>
              Generate New Quotes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
