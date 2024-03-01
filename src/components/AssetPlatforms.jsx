import React, { useState, useEffect } from "react";
import axios from "axios";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Container, Box, Button, Divider, Toolbar } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.purple,
    color: theme.palette.primary.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

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

const AssetPlatforms = () => {
  const [coinsData, setCoinsData] = useState([]);
  const [coinsData2, setCoinsData2] = useState([]);
  const [page, setPage] = useState(1);
  const [newDataLenght, setNewDataLenght] = useState(0);

  useEffect(() => {
    const api_key = process.env.REACT_APP_API_KEY

      axios.get("https://api.coingecko.com/api/v3/coins/markets", {
          params: {
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
        setCoinsData2([...coinsData, ...response.data]);
        setNewDataLenght(response.data.length);
        setPage(page + 1);
      });
  };

  // Function to scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Optional: Adds smooth scrolling behavior
    });
  };

  const handleSearch = (event) => {
    if (event.target.value === "") {
      setCoinsData(coinsData2);
    } 
    else {
      let searchedData = coinsData.filter((coin) =>
        coin.name.toLowerCase().includes(event.target.value.toLowerCase())
      );
      console.log(searchedData);
      setCoinsData(searchedData);
    }
  };

  return (
    <Container sx={{ marginTop: "50px" }}>
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

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 900 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>id</StyledTableCell>
              <StyledTableCell align="right">Coin </StyledTableCell>
              <StyledTableCell align="right">Price</StyledTableCell>
              <StyledTableCell align="right">Symbol</StyledTableCell>
              <StyledTableCell align="right">Market Cap </StyledTableCell>
              <StyledTableCell align="right">All Time High</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {coinsData.map((row, index) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell component="th" scope="row">
                  {index + 1}
                </StyledTableCell>
                <StyledTableCell align="right">{row.name}</StyledTableCell>
                <StyledTableCell align="right">
                  {row.current_price}
                </StyledTableCell>
                <StyledTableCell align="right">{row.symbol}</StyledTableCell>
                <StyledTableCell align="right">
                  {row.market_cap}
                </StyledTableCell>
                <StyledTableCell align="right">{row.ath}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ margin: "30px" }}>
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
      </Box>
    </Container>
  );
};
export default AssetPlatforms;
