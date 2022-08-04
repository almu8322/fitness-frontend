import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const createUser = () => {
    fetch("http://fitnesstrac-kr.herokuapp.com/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (!result.error) {
          navigate("/login");
        } else {
          setErrorMessage(result.error);
        }
      })
      .catch(console.error);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <form>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            //   alignItems: "center",
            flexDirection: "column",
            maxWidth: "100%",
          }}
        >
          {errorMessage && <Typography>{errorMessage}</Typography>}
          <TextField
            // helperText="Please enter your name"

            id="demo-helper-text-aligned"
            label="Username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <TextField
            helperText=" "
            id="demo-helper-text-aligned-no-helper"
            label="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <Button
            type="submit"
            variant="contained"
            component="label"
            onClick={createUser}
          >
            Sign Up
          </Button>
        </Box>
      </form>
    </Box>
  );
}