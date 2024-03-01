import { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Container, Divider, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';


export default function DataTable() {
  const [coinsData, setCoinsData] = useState([]);

  useEffect(() => {
    let coins = localStorage.getItem("myCoins");
    coins = JSON.parse(coins);
    if (coins.length > 0) {
      let coins_query = coins.join(",");
      const api_key = process.env.REACT_APP_API_KEY

      axios.get("https://api.coingecko.com/api/v3/coins/markets", {
          params: {
            vs_currency: "usd",
            per_page: 10,
            page: 1,
            x_cg_demo_api_key: api_key,
            ids: coins_query,
          },
        })
        .then(function (response) {
          console.log(response.data);
          setCoinsData(response.data);
        });
    }
  }, []);

  const deleteCoin = (id) => {
    let coins = localStorage.getItem("myCoins");
    coins = JSON.parse(coins);
    let index = coins.indexOf(id);
    coins.splice(index, 1);
    localStorage.setItem("myCoins", JSON.stringify(coins));

    let newCoinData = coinsData.filter((coin) => coin.id !== id);
    setCoinsData(newCoinData);
    NotificationManager.error("Deleted the coin","", 3000)
  };

  const columns = [
    { field: "id", headerName: "ID", width: 160 },
    { field: "name", headerName: "Coin Name", width: 160 },
    {
      field: "current_price",
      headerName: "Price",
      width: 160,
      sortable: false,
    },
    { field: "symbol", headerName: "Symbol", width: 160, sortable: false },
    {
      field: "market_cap",
      headerName: "Market Cap",
      width: 160,
      sortable: false,
    },
    { field: "ath", headerName: "ath", width: 160 },
    {
      field: "delete",
      headerName: "Delete",
      width: 160,
      sortable: false,
      renderCell: (params) => {
        return (
          <Button
            onClick={() => deleteCoin(params.id)}
            variant="contained"
            color="error"
          >
            Delete
          </Button>
        );
      },
    },
  ];

  return (
    <Container sx={{ marginTop: "30px" }}>
      <Box
        maxWidth="10%"
        sx={{
          padding: "10px 20px",
          background: "#f8f8fa",
          borderBottom: "1px solid grey",
          borderRadius: "5px",
          marginBottom: "30px",
        }}
      >
        <Typography variant="h5" sx={{ justifyContent: "center" }}>
          My Coins{" "}
        </Typography>
      </Box>

      <div style={{ height: 400, width: "100%" }}>
        {coinsData.length !== 0 && (
          <DataGrid
            rows={coinsData}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            pageSizeOptions={[10]}
          />
        )}
        {coinsData.length === 0 && (
          <>
            <Typography>You don't have any Saved coins</Typography>
            <Typography>
              {" "}
              Head over to{" "}
              <Link to={"home/cryptocurrencies"}> Cryptocurrencies </Link> to
              save them
            </Typography>
          </>
        )}
      </div>

      <Box sx={{ margin: "30px" }}>
        <Divider />
      </Box>
      <NotificationContainer/>
    </Container>
  );
}
