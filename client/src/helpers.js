import uuid from "react-uuid";

export const isEmpty = str => str.length === 0;

export const isEmail = email =>
  email.match(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  )
    ? true
    : false;

export const delay = (v, t) =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(v), t);
  });

export const dummy = {
  notes: {
    0: { title: "Test", date: "2019-12-12", body: "Today is good", id: uuid() },
    1: {
      title: "Frankrike",
      date: "2019-10-12",
      body: "Viva la france",
      id: uuid()
    },
    2: {
      title: "Schweiz",
      date: "2019-09-06",
      body: "Long walks and nice cheese",
      id: uuid()
    },
    3: {
      title: "Jempa",
      date: "2019-03-13",
      body: "Ja må hon leva uti hundrade år",
      id: uuid()
    }
  }
};
