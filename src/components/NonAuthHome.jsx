import {
  Button,
  Grid,
  Typography,
  Box,
  Stack,
  Paper,
  Divider,
} from "@mui/material";
import { Link } from "react-router-dom";
import Navbar from "./NonAuthNavbar";
import { styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#cfe2f3",
  // ...theme.typography,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
  flexGrow: 3,
  height: "220px",
  borderRadius: "20px",
}));

const NonAuthHome = () => {
  return (
    <>
      <Stack>
        <Item sx={{ margin: "50px" }}>
          <Typography
            variant="h2"
            sx={{ paddingTop: "70px", color: "#01174b" }}
          >
            Cryptocurrency
          </Typography>
        </Item>
      </Stack>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={6}>
          <Stack
            direction="row"
            // divider={<Divider orientation="vertical" flexItem />}
          >
            <Item sx={{ margin: "0 25px 50px 50px" }}>
              <Typography
                variant="h4"
                sx={{ paddingTop: "40px", color: "#03396c" }}
              >
                Don't have an account?{" "}
              </Typography>

              <Box sx={{ marginTop: "60px" }}>
                <Link
                  to={"/login"}
                  style={{
                    textDecoration: "none",
                    color: "white",
                    background: "#9fc5e8",
                    padding: "10px 20px",
                    borderRadius: "10px",
                    fontSize: "18px",
                  }}
                >
                  Log In
                </Link>
              </Box>
            </Item>
          </Stack>
        </Grid>

        <Grid item xs={12} md={6} lg={6}>
          <Stack>
            <Item sx={{ margin: "0 50px 50px 25px" }}>
              <Typography
                variant="h4"
                sx={{ paddingTop: "40px", color: "#03396c" }}
              >
                Already have an account?
              </Typography>

              <Box sx={{ marginTop: "60px" }}>
                <Link
                  to={"/register"}
                  style={{
                    textDecoration: "none",
                    color: "white",
                    background: "#9fc5e8",
                    padding: "10px 20px",
                    borderRadius: "10px",
                    fontSize: "18px",
                  }}
                >
                  Register
                </Link>
              </Box>
            </Item>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};
export default NonAuthHome;
