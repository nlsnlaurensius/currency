import React, { useEffect, useState, useContext } from "react";
import { Button, Container, Typography, Grid, Box, TextField, Autocomplete } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import { CurrencyContext } from "./components/context/CurrencyContext";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import "./Currency.css";

function Currency() {
  const { fromCurrency, setFromCurrency, toCurrency, setToCurrency, firstAmount, setFirstAmount } = useContext(CurrencyContext);

  const [resultCurrency, setResultCurrency] = useState(0);
  const [exchangeRate, setExchangeRate] = useState(0);
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    getExchangeRate();
  }, [fromCurrency, toCurrency, firstAmount]);

  const getExchangeRate = async () => {
    const timestamp = new Date().getTime();
    let url = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${fromCurrency.toLowerCase()}.json?_=${timestamp}`;
    const response = await fetch(url);
    const data = await response.json();
    const exchangeRate = data[fromCurrency.toLowerCase()][toCurrency.toLowerCase()];
    setExchangeRate(exchangeRate);
    let lastUpdated = data.date;
    setLastUpdated(lastUpdated);
    setResultCurrency(
      (firstAmount * exchangeRate).toLocaleString("en-US", {
        maximumFractionDigits: 6,
      })
    );
  };

  const handleSwitch = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const boxStyles = {
    background: "#FBF2DE ",
    marginTop: "10rem",
    textAlign: "center",
    color: "#222",
    minHeight: "20rem",
    borderRadius: 5,
    padding: "4rem 2rem",
    border: "2px solid #ddd",
    boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.1)",
    position: "relative",
  };

  const currencyOptions = ["USD", "IDR", "JPY", "BTC"];

  return (
    <Container maxWidth="md" sx={boxStyles}>
      <Typography variant="h5" sx={{ marginBottom: "2rem" }} fontWeight="bold">
        Real Time Currency Converter
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md>
          <TextField
            value={firstAmount}
            onChange={(e) => setFirstAmount(e.target.value)}
            label="Amount"
            fullWidth
            InputProps={{
              type: "number",
              startAdornment: <InputAdornment position="start"></InputAdornment>,
            }}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <Autocomplete
            options={currencyOptions}
            value={fromCurrency}
            disableClearable
            onChange={(e, newValue) => {
              setFromCurrency(newValue);
            }}
            renderInput={(params) => <TextField {...params} label={"From"} />}
          />
        </Grid>
        <Grid item xs={12} md="auto">
          <Button
            onClick={handleSwitch}
            sx={{
              borderRadius: 1,
              height: "100%",
            }}
          >
            <CompareArrowsIcon sx={{ fontSize: 30 }} />
          </Button>
        </Grid>
        <Grid item xs={12} md={3}>
          <Autocomplete
            options={currencyOptions}
            value={toCurrency}
            disableClearable
            onChange={(e, newValue) => {
              setToCurrency(newValue);
            }}
            renderInput={(params) => <TextField {...params} label={"To"} />}
          />
        </Grid>
      </Grid>

      <Box sx={{ textAlign: "center", marginTop: "1rem" }}>
        <Typography>{fromCurrency} =</Typography>
        <Typography variant="h5" sx={{ marginTop: "5px", fontWeight: "bold" }}>
          {resultCurrency} {toCurrency}
        </Typography>
        <Typography textAlign="end" fontSize="small">
          Last Updated ({lastUpdated})
        </Typography>
      </Box>
      <Link to="https://nelsonlaurensius.vercel.app/#projects">
        <Button startIcon={<HomeIcon />} className="back-to-home-button">
          Back to Projects
        </Button>
      </Link>
    </Container>
  );
}

export default Currency;
