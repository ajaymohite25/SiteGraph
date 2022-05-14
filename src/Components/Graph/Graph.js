import { Button, TextField } from "@mui/material";
import "./Graph.css";
import queryString from "query-string";
import cx from "classnames";
import LinearProgress from "@mui/material/LinearProgress";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import React from "react";

function Graph() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const [isTracing, setTracing] = React.useState(false);
  const [traces, setTraces] = React.useState([]);

  const defaultOptions = {
    url: "",
    depth: 2,
    nbrlinks: 10,
    ...queryString.parse(search),
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onFormSubmit = (e) => {
    const stringified = `/?${queryString.stringify(e)}`;
    console.log(stringified);
    navigate(stringified);
    setTracing(true);
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((json) => {
        setTraces(json);
        setTracing(false);
      });
  };

  React.useEffect(() => {
    console.log(defaultOptions);
    //   setTracing(true);
    //   Make a fetch request for intial query params on site load
    //  setTracing(false);
  }, []);

  return (
    <div className="inputFormDiv">
      <form className="form" onSubmit={handleSubmit(onFormSubmit)}>
        <div className="inputCntnr">
          <TextField
            label="Target URL"
            className="inputField"
            variant="outlined"
            {...register("url", { required: true })}
            error={errors.url}
            helperText={errors.url ? "This field is required" : ""}
            placeholder="Enter your link to trace graph..."
            margin="dense"
            defaultValue={defaultOptions.url}
          />
          <TextField
            label="Depth"
            variant="outlined"
            {...register("depth")}
            type="number"
            placeholder="Depth"
            defaultValue={defaultOptions.depth}
            margin="dense"
          />
          <TextField
            label="No. of links"
            variant="outlined"
            {...register("nbrlinks")}
            type="number"
            placeholder="number of links to trace"
            defaultValue={defaultOptions.nbrlinks}
            margin="dense"
          />
        </div>

        <div className="submitBtn">
          {!traces.length ? (
            <Button
              disabled={isTracing}
              size="large"
              type="submit"
              variant="outlined"
            >
              {!isTracing ? "Start Tracing..." : "Tracing..."}
            </Button>
          ) : (
            ""
          )}
        </div>
      </form>
      {isTracing ? (
        <div className="loaderCntnr">
          <LinearProgress />
          <h3>Wait! Your website is being traced...</h3>
        </div>
      ) : (
        ""
      )}
      <div>
        {traces?.map((v, i) => (
          <p>{v.title}</p>
        ))}
      </div>
    </div>
  );
}

export default Graph;
