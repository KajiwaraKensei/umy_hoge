import React from "react";
import "./App.css";
import Confirm from "./confirm/select";
import Sub from "./confirm/sub";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import {
  getFirestore,
  collection,
  getDocs,
  limit,
  query,
  doc,
  updateDoc,
} from "firebase/firestore";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

async function update(id, docName, data) {
  const db = getFirestore();
  const ref = doc(db, docName, id);
  delete data.id;
  return updateDoc(ref, data);
}
async function get(docName, limitCount) {
  const db = getFirestore();
  const list = [];
  const params = [collection(db, docName), limit(limitCount)];
  const first = query(...params);
  const querySnapshot = await getDocs(first);
  querySnapshot.forEach((doc) => {
    list.push({ id: doc.id, ...doc.data() });
  });
  const nextVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
  return { list, lastVisible: nextVisible };
}

function App() {
  const [list, setData] = React.useState([]);
  const [toggle, setToggle] = React.useState(true);
  const [docName, setDocName] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [limit, setLimit] = React.useState(5);

  const GetData = () => {
    docName.length && setLoading(true);
    docName.length &&
      get(docName, limit - 0)
        .then((res) => {
          setLoading(false);
          setData(res.list);
        })
        .catch((err) => {
          setLoading(false);
          alert(err);
        });
  };
  React.useEffect(() => {
    GetData();
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

  const handleSave = (saveData) => {
    console.log(saveData);
    update(saveData.id, docName, saveData);
  };

  const createUpdateData = (keys, value, target) => {
    const key = keys.shift();
    if (keys.length) {
      return {
        ...target,
        [key]: createUpdateData(keys, value, target[key]),
      };
    }
    if (!isNaN(key)) {
      let returnData = [];
      Object.keys(target).forEach((index) => {
        const valueData = index === key ? value : target[index];
        returnData.push(valueData);
      });
      return returnData;
    }

    return {
      ...target,
      [key]: value,
    };
  };
  const handleChangeData = (event) => {
    event.keyNames.shift();
    let nextData = JSON.parse(JSON.stringify(list));
    const targetIndex = event.keyNames.shift();
    const target = list[targetIndex];
    const next = createUpdateData(event.keyNames, event.value, target);
    nextData[targetIndex] = next;
    setData(nextData);
  };

  const handleChangeLimit = (event) => {
    setLimit(event.target.value);
  };

  return (
    <div className="App">
      <div>{loading && "通信中"}</div>
      <h2>{docName}</h2>
      {!toggle && <Button onClick={open}>コレクション変更</Button>}

      <div>
        {!toggle && (
          <>
            <TextField
              onChange={handleChangeLimit}
              label="limit"
              value={limit}
            ></TextField>
            <Button onClick={GetData}>変更</Button>
          </>
        )}
      </div>

      <Sub
        data={list}
        onSave={handleSave}
        change={handleChangeData}
        keyName="/"
      />
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
