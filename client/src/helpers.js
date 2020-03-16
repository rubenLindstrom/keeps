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

const ids = [uuid(), uuid(), uuid(), uuid(), uuid()];

export const dummy = {
  notes: {
    [ids[0]]: {
      title: "Test",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      body: "Today is good",
      id: ids[0],
      sharedWith: [],
      owner: uuid()
    },
    [ids[1]]: {
      title: "Frankrike",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      body: "Viva la france",
      id: ids[1],
      sharedWith: [],
      owner: uuid()
    },
    [ids[2]]: {
      title: "Schweiz",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      body: "Long walks and nice cheese",
      id: ids[2],
      sharedWith: [],
      owner: uuid()
    },
    [ids[3]]: {
      title: "Jempa",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      body: "Ja må hon leva uti hundrade år",
      id: ids[3],
      sharedWith: [],
      owner: uuid()
    }
  }
};
