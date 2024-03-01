import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  CardMedia,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  AccordionActions,
  Toolbar,
  Container,
  Grid,
  Divider,
  Modal,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
// import MenuIcon from "@mui/icons-material/Menu";
import InputBase from "@mui/material/InputBase";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled, alpha } from "@mui/material/styles";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';



const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "50%",
  },
}));

const styleModal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "50%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "50%",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const Cryptocurrencies = () => {
  const [coinsData, setCoinsData] = useState([]);
  const [coinsData2, setCoinsData2] = useState([]);
  const [coinToAdd, setCoinToadd] = useState("");
  const [page, setPage] = useState(1);
  const [open, setOpen] = React.useState(false);
  const [newDataLenght, setNewDataLenght] = useState(0);

  const handleOpen = (id) => {
    setCoinToadd(id);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  useEffect(() => {
    const api_key = process.env.REACT_APP_API_KEY
    axios.get(
        `https://api.coingecko.com/api/v3/coins/markets`,
        {params: {
          vs_currency: "usd",
          per_page: 10,
          page: 1,
          x_cg_demo_api_key: api_key,
         
        },
    })
      .then(function (response) {
        setCoinsData(response.data);
        setCoinsData2(response.data);
        setNewDataLenght(response.data.length);
      });
  }, []);

  const nextPage = () => {
    const api_key = process.env.REACT_APP_API_KEY
    axios.get(
        `https://api.coingecko.com/api/v3/coins/markets`,
        {params: {
          vs_currency: "usd",
          per_page: 10,
          page: 1,
          x_cg_demo_api_key: api_key,
         
        },
    })
      .then(function (response) {
        setCoinsData([...coinsData, ...response.data]);
        setCoinsData2(response.data);
        setNewDataLenght(response.data.length);
        setPage(page + 1);
      });
  };

  const handleSearch = (event) => {
    if (event.target.value === "") {
      setCoinsData(coinsData2);
    } else {
      let searchedData = coinsData.filter((coin) =>
        coin.name.toLowerCase().includes(event.target.value.toLowerCase())
      );
      setCoinsData(searchedData);
    }
  };

  // Function to scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Optional: Adds smooth scrolling behavior
    });
  };

  const addCoin = (id) => {
    let coins = localStorage.getItem("myCoins");
    if (coins === null) {
      coins = [id];
      localStorage.setItem("myCoins", JSON.stringify(coins));
    } else {
      let coins_arr = JSON.parse(coins);
      coins_arr.push(id);
      coins_arr = [...new Set(coins_arr)];
      localStorage.setItem("myCoins", JSON.stringify(coins_arr));
    }
    handleClose();
    NotificationManager.success("Added to My Coins", "", 3000)
  };

  return (
    <>
      <Container sx={{ marginBottom: "50px" }}>
        <Container maxWidth="80%" sx={{ background: "transparent" }}>
          <Toolbar>
            <Box
              sx={{ width: "80%", display: { xs: "none", md: "flex" } }}
              justifyContent="right"
            >
              <Search>
                <SearchIconWrapper>
                  <SearchOutlinedIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search..."
                  inputProps={{ "aria-label": "search" }}
                  sx={{ borderRadius: "30px", background: "#e4edf2" }}
                  onChange={(event) => handleSearch(event)}
                />
              </Search>
            </Box>
          </Toolbar>
        </Container>

        <Box sx={{ flexGrow: 1, display: "flex" }}>
          <Grid container spacing={2}>
            {coinsData.map((coin) => (
              <Card
                sx={{ width: "260px", margin: "15px", background: "#e4edf2" }}
              >
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    sx={{ textAlign: "center" }}
                  >
                    {coin.name}
                  </Typography>
                </CardContent>
                <CardMedia
                  component="img"
                  img
                  src={coin.image}
                  sx={{ height: "200px" }}
                ></CardMedia>
                <Accordion sx={{ background: "#e4edf2" }}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3-content"
                    id="panel3-header"
                  >
                    Learn More
                  </AccordionSummary>
                  <AccordionDetails>
                    <ul>
                      <li>Market Cap: {coin.market_cap}</li>
                      <li>ATH Price: {coin.ath}</li>
                      <li>
                        Current Price: $<b>{coin.current_price}</b>
                      </li>
                    </ul>
                  </AccordionDetails>
                  <AccordionActions>
                    <Button onClick={() => handleOpen(coin)}>Save</Button>
                  </AccordionActions>
                </Accordion>
              </Card>
            ))}
          </Grid>
        </Box>

        <Divider>
          {newDataLenght.length === 0 && <p>No more data available</p>}
          {newDataLenght.length !== 0 && (
            <Button variant="outlined" onClick={() => nextPage()}>
              Load more...
            </Button>
          )}
        </Divider>
        <Button variant="contained" color="success" onClick={scrollToTop}>
          <ArrowUpwardIcon />
        </Button>
      </Container>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleModal}>
          <CloseIcon onClick={handleClose} />
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure you want to add {coinToAdd.name}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Current Price: $ <b>{coinToAdd.current_price}</b>
          </Typography>
          <Box>
            <Button
              variant="outlined"
              onClick={() => addCoin(coinToAdd.id)}
              sx={{ marginLeft: "150px", marginTop: "30px" }}
            >
              Save Coin
            </Button>
          </Box>
        </Box>
      </Modal>
      <NotificationContainer/>
    </>
  );
};
export default Cryptocurrencies;
