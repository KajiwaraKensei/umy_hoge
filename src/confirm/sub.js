import React from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Input from "@mui/material/Input";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";

const Component = (props) => {
  const handleChange = (keyName, type) => (event) => {
    const params = {
      boolean: event.target.checked,
      string: event.target.value,
      number: event.target.value - 0,
    };
    const value = params[type];
    props.change({
      keyNames: [props.keyName, keyName],
      value,
      type,
    });
  };

  const childChange = (child) => {
    props.change({
      keyNames: [props.keyName, ...child.keyNames],
      value: child.value,
      type: child.type,
    });
  };

  const handleSave = (key) => () => {
    props.onSave(props.data[key]);
  };

  const mapData = Object.keys(props.data).map((key) => {
    const type = Array.isArray(props.data[key])
      ? "array"
      : typeof props.data[key];
    if (type === "object" || type === "array") {
      return (
        <div className="map_i_value" key={key}>
          <p>{key}</p>
          <Component
            data={props.data[key]}
            keyName={key}
            change={childChange}
          ></Component>
          {props.keyName === "/" && (
            <Button variant="outlined" onClick={handleSave(key)}>
              更新
            </Button>
          )}
        </div>
      );
    }
    if (type === "string" || type === "number") {
      return (
        <div className="map_i_value" key={key}>
          <FormControl fullWidth sx={{ m: 1 }} variant="standard">
            <InputLabel htmlFor={"standard-" + key}>{key}</InputLabel>
            <Input
              onChange={handleChange(key, type)}
              id={"standard-" + key}
              value={props.data[key]}
            />
          </FormControl>
        </div>
      );
    }

    if (type === "boolean") {
      return (
        <div className="map_i_value" key={key}>
          <FormControlLabel
            control={<Switch checked={props.data[key]} />}
            label={key}
            labelPlacement="start"
            onChange={handleChange(key, type)}
          />
        </div>
      );
    }
    return null;
  });
  return <div>{mapData}</div>;
};

export default Component;
