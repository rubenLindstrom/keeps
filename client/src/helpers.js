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
    0: {
      title: "Test",
      createdAt: new Date().toISOString(),
      body: "Today is good",
      id: uuid(),
      sharedWith: [],
      owner: uuid()
    },
    1: {
      title: "Frankrike",
      createdAt: new Date().toISOString(),
      body: "Viva la france",
      id: uuid(),
      sharedWith: [],
      owner: uuid()
    },
    2: {
      title: "Schweiz",
      createdAt: new Date().toISOString(),
      body: "Long walks and nice cheese",
      id: uuid(),
      sharedWith: [],
      owner: uuid()
    },
    3: {
      title: "Jempa",
      createdAt: new Date().toISOString(),
      body: "Ja må hon leva uti hundrade år",
      id: uuid(),
      sharedWith: [],
      owner: uuid()
    }
  }
};
