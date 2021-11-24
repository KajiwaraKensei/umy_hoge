import React from "react";
import "./style.css";
import Input from "@mui/material/Input";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

export const Component = (props) => {
  const [data, setData] = React.useState(props.init);
  const [closeFlg, setCloseFlg] = React.useState(false);

  // 文字変更
  const handleChange = (event) => {
    event.stopPropagation();
    setData(event.target.value);
  };

  // 親要素にクリック伝達をストップ
  const stopPropagation = (event) => {
    closeFlg && setCloseFlg(false);
    event.stopPropagation();
  };

  // 閉じるかのフラグセット
  const handleClose = (flg) => () => setCloseFlg(flg);

  // 親に閉じることを伝える
  const doClose = () => {
    if (closeFlg) {
      props.close();
      setCloseFlg(false);
    }
  };

  // 入力確定
  const handleSubmit = (event) => {
    event.preventDefault();
    props.submit(data);
  };

  return (
    <div
      className="confirm"
      onMouseDown={handleClose(true)}
      onMouseUp={doClose}
    >
      <div onMouseDown={stopPropagation} onMouseUp={stopPropagation}>
        <form onSubmit={handleSubmit}>
          <FormControl fullWidth sx={{ m: 1 }} variant="standard">
            <InputLabel htmlFor={"standard-" + props.label}>
              {props.label}
            </InputLabel>
            <Input
              id={"standard-" + props.label}
              value={data}
              onChange={handleChange}
            />
          </FormControl>
        </form>
      </div>
    </div>
  );
};
export default Component;
