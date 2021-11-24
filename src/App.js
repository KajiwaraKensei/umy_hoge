import React from "react";
import "./App.css";
import Confirm from "./confirm/select";
import Sub from "./confirm/sub";

import {
  getFirestore,
  collection,
  getDocs,
  query,
  startAfter,
} from "firebase/firestore";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

// async function update(id, data) {
//   const db = getFirestore();

//   const ref = doc(db, "account", "J39OYR3xpzUwqU21DihQ2tc1Inu2");
//   return updateDoc(ref, data);
// }
async function get(docName, lastVisible) {
  const db = getFirestore();
  const list = [];
  const params = [collection(db, docName)];
  lastVisible && params.push(startAfter(lastVisible));
  const first = query(...params);
  const querySnapshot = await getDocs(first);
  querySnapshot.forEach((doc) => {
    list.push({ id: doc.id, ...doc.data() });
  });
  console.log(list);
  const nextVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
  return { list, lastVisible: nextVisible };
}

function App() {
  const [list, setData] = React.useState([]);
  const [toggle, setToggle] = React.useState(true);
  const [docName, setDocName] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [lastVisible, setLastVisible] = React.useState();
  React.useEffect(() => {
    docName.length && setLoading(true);
    docName.length &&
      get(docName)
        .then((res) => {
          setLoading(false);
          setData(res.list);
          setLastVisible(res.lastVisible);
        })
        .catch((err) => {
          setLoading(false);
          alert(err);
        });
  }, [docName]);

  const close = () => {
    setToggle(false);
  };
  const open = () => {
    setToggle(true);
  };

  const handleSubmitDocName = (nextDocName) => {
    close();
    setDocName(nextDocName);
  };

  return (
    <div className="App">
      <div>{loading && "通信中"}</div>
      <h2>{docName}</h2>
      {!toggle && <button onClick={open}>変更</button>}
      <Sub data={list} />
      {toggle && (
        <Confirm
          init={docName}
          label="コレクション名"
          submit={handleSubmitDocName}
          close={close}
        />
      )}
    </div>
  );
}

export default App;
