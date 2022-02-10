import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  CssBaseline,
  Grid,
  IconButton,
  InputBase,
  Link,
  Paper,
  Typography,
  Tooltip,
  ClickAwayListener,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import Image from "../../docs/burger.jpeg";

const styles = {
  paperContainer: {
    backgroundImage: `url(${Image})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    width: "100vw",
    height: "93vh",
  },
};

const SearchResults = () => {
  const [recipeData, setRecipeData] = useState([]);
  const [search, setSearch] = useState("");
  const [searched, setSearched] = useState("");
  const [tooltip, setTooltip] = useState(false);
  const navigate = useNavigate();

  let url = window.location.pathname;
  const results = url.split("/search/results/")[1];

  const handleTooltipClose = () => {
    setTooltip(false);
  };

  const handleTooltipOpen = () => {
    setTooltip(true);
  };

  function handleChange(e) {
    setSearch(e.target.value);
  }

  const replaceString = (search) => {
    return search.replaceAll(" ", "+").replaceAll(",", "+");
  };

  useEffect(() => {
    axios
      .get(`/search/results/${results}`)
      .then(function (response) {
        console.log("response.data hello", response.data);
        // handle success
        setSearched(results);
        setRecipeData(response.data);
        setSearch("");
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, [results]);

  const reloadSearch = () => {
    navigate(`/search/results/${replaceString(search)}`);
  };

  return (
    <Grid>
      <CssBaseline />
      <Paper style={styles.paperContainer}>
        <Grid
          container
          marginTop={8}
          spacing={4}
          sx={{
            p: 2,
            flexGrow: 1,
            overflow: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            component="main"
            sx={{
              p: 5,
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="h3">Search For Recipes</Typography>
            <Paper
              component="form"
              sx={{
                marginTop: 2,
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: 600,
                ":hover": {
                  boxShadow: 20,
                },
              }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Enter Ingredients or Keywords"
                inputProps={{ "aria-label": "search google maps" }}
                value={search}
                onChange={handleChange}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    reloadSearch();
                  }
                }}
              />
              {search && (
                <IconButton
                  onClick={reloadSearch}
                  sx={{ p: "10px" }}
                  aria-label="search"
                >
                  <SearchIcon />
                </IconButton>
              )}
              {!search && (
                <ClickAwayListener onClickAway={handleTooltipClose}>
                  <Tooltip
                    title={
                      <Typography fontSize={20} textAlign="center">
                        Please enter an ingrededient or keyword!
                      </Typography>
                    }
                    onClose={handleTooltipClose}
                    open={tooltip}
                  >
                    <IconButton
                      onClick={handleTooltipOpen}
                      sx={{ p: "10px" }}
                      aria-label="search"
                    >
                      <SearchIcon />
                    </IconButton>
                  </Tooltip>
                </ClickAwayListener>
              )}
            </Paper>
          </Box>
          <Grid paddingBottom={3} marginTop={-2.5}>
            {recipeData.length ? (
              <Typography variant="h5">
                Now displaying results for:{" "}
                {searched.replaceAll("++", "+").replaceAll("+", ", ")}
              </Typography>
            ) : null}
          </Grid>
          <Box
            component="main"
            sx={{
              paddingRight: 8,
              paddingLeft: 10,
              flexGrow: 1,
              height: "61vh",
              overflow: "auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Grid
              container
              paddingRight={4}
              paddingLeft={5}
              paddingTop={2}
              paddingBottom={2}
              spacing={{ xs: 2, md: 8 }}
              columns={{ xs: 4, sm: 8, md: 16 }}
              direction="row"
              justifyContent="center"
              alignItems="center"
              textAlign="center"
            >
              {recipeData.length
                ? recipeData
                    .sort((a, b) =>
                      a.title.toLowerCase().localeCompare(b.title.toLowerCase())
                    )
                    .map((recip, index) => {
                      const url = `/search/${recip.id}`;
                      return (
                        <Grid key={index} item xs={12} sm={12} md={4} lg={4}>
                          <Card
                            sx={{
                              height: 280,
                              width: 260,
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                              alignItems: "center",
                              ":hover": {
                                boxShadow: 20,
                              },
                            }}
                          >
                            <CardContent
                              sx={{
                                flexGrow: 1,
                              }}
                            >
                              <Link
                                href={url}
                                style={{
                                  color: "black",
                                  textDecoration: "none",
                                }}
                              >
                                <Typography
                                  fontSize={17}
                                  paddingTop={7}
                                  paddingBottom={1}
                                  paddingLeft={2}
                                  paddingRight={2}
                                  display="flex"
                                  justifyContent="center"
                                  direction="column"
                                  alignItems="center"
                                >
                                  {recip.title}
                                </Typography>
                                <CardMedia
                                  key={recip.id}
                                  component="img"
                                  src={recip.image}
                                  alt={recip.title}
                                  style={{
                                    height: 260,
                                    width: 280,
                                  }}
                                />
                              </Link>
                            </CardContent>
                          </Card>
                        </Grid>
                      );
                    })
                : null}
            </Grid>
          </Box>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default SearchResults;
