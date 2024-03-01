import React, { useState, useEffect } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Container } from "@mui/material";
import User from "./User";


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

const AssetPlatforms = () => {
  const [coinsData, setCoinsData] = useState([]);

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
      });
  }, []);
  return (
    <Container>
      <User />
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 900, marginBottom: "50px" }}
          aria-label="customized table"
        >
          <TableHead sx={{ background: "#e5e6eb" }}>
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
    </Container>
  );
};
export default AssetPlatforms;
