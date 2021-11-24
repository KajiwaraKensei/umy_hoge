import React from "react";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Input from "@mui/material/Input";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

const Component = (props) => {
  const mapData = Object.keys(props.data).map((key) => {
    const type = typeof props.data[key];
    if (type === "object") {
      return (
        <div className="map_i_value" key={key}>
          <p>{key}</p>
          <Component data={props.data[key]}></Component>
        </div>
      );
    }
    if (type === "string" || type === "number") {
      return (
        <div className="map_i_value" key={key}>
          <FormControl fullWidth sx={{ m: 1 }} variant="standard">
            <InputLabel htmlFor={"standard-" + key}>{key}</InputLabel>
            <Input id={"standard-" + key} value={props.data[key]} />
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
          />
        </div>
      );
    }
  });
  return <div>{mapData}</div>;
};

export default Component;
