import localForage from "localforage";

const opts: LocalForageOptions = {
  driver: localForage.INDEXEDDB,
  name: "myApp",
  version: 1.0,
  size: 4980736, // Size of database, in bytes. WebSQL-only for now.
  storeName: "qidientDb",
  description: "Qidient Local storage",
};

interface iCredentials {
  token: string;
  uid: string;
}

export const setCredentials = (token: string, uid: string) => {
  const p: Storage = window.localStorage;

  p.setItem("t", token);
  p.setItem("u", uid);
};

export const resetCredentials = () => {
  const p: Storage = window.localStorage;

  p.removeItem("t");
  p.removeItem("u");
};

export const getCredentials = (): iCredentials => {
  const p: Storage = window.localStorage;

  return {
    token: p?.getItem("t") ?? "",
    uid: p?.getItem("u") ?? "",
  };
};

export const persistence = localForage.createInstance(opts);
