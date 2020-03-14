import React from "react";
import uuid from "react-uuid";

// Components
import Note from "./note";

const sidebar = () => {
  const notes = [
    { title: "Test", date: "2019-12-12", body: "Today is good", id: uuid() },
    {
      title: "Frankrike",
      date: "2019-10-12",
      body: "Viva la france",
      id: uuid()
    },
    {
      title: "Schweiz",
      date: "2019-09-06",
      body: "Long walks and nice cheese",
      id: uuid()
    },
    {
      title: "Jempa",
      date: "2019-03-13",
      body: "Ja må hon leva uti hundrade år",
      id: uuid()
    }
  ];
  return (
    <div className="sidebar">
      {notes.map(el => (
        <Note key={el.id} {...el} />
      ))}
    </div>
  );
};

export default sidebar;
