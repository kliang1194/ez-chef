import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CssBaseline,
  Grid,
  Link,
  Paper,
  Typography,
} from "@mui/material";
import Image from "../../docs/burger.jpeg";
import { useNavigate } from "react-router-dom";

const styles = {
  paperContainer: {
    backgroundImage: `url(${Image})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    width: "100%",
    height: "100%",
  },
};

const Favourites = ({ user }) => {
  const navigate = useNavigate();
  const [myFavs, setMyFavs] = useState([]);

  const getData = () => {
    axios
      .get(`/favourites/${user}`)
      .then(function (response) {
        setMyFavs(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const deleteFavourite = (id) => {
    const url = `/favourites/${user}/${id}`;
    axios
      .delete(url)
      .then(function (response) {
        getData();
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Grid>
      <CssBaseline />
      <Paper style={styles.paperContainer}>
        <Grid container marginTop={8} spacing={4}>
          <Box
            component="main"
            sx={{
              p: 5,
              flexGrow: 1,
              height: "95vh",
              overflow: "auto",
            }}
          >
            <Typography textAlign="center" variant="h4">
              My Favourite Recipes
            </Typography>
            <Grid
              container
              p={5}
              spacing={{ xs: 2, md: 7 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              {myFavs.length ? (
                myFavs.map((recip) => {
                  let url = "";
                  if (recip.favourite_recipeID.length < 10) {
                    url += `/search/${recip.favourite_recipeID}`;
                  } else {
                    url += `/myRecipes/${recip.favourite_recipeID}`;
                  }
                  return (
                    <Grid item key={recip}>
                      <Card
                        sx={{
                          height: "100%",
                          width: 270,
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
                            paddingLeft: 0,
                            paddingRight: 0,
                            paddingBottom: 0,
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
                              fontSize={18}
                              textAlign="center"
                              marginBottom={1}
                            >
                              {recip.favourite_title}
                            </Typography>
                            <CardMedia
                              key={recip.favourite_recipeID}
                              component="img"
                              src={recip.favourite_image}
                              alt={recip.favourite_title}
                              style={{ height: 250, width: 270 }}
                              margin={-1}
                            />
                          </Link>
                        </CardContent>

                        <CardActions>
                          <Button
                            color="error"
                            onClick={() => {
                              deleteFavourite(recip.favourite_recipeID);
                            }}
                            size="medium"
                          >
                            Remove
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  );
                })
              ) : (
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={4}
                  lg={4}
                  style={{
                    textAlign: "center",
                  }}
                >
                  <Box
                    sx={{
                      p: 10,
                      flexGrow: 1,
                      height: "100vh",
                      overflow: "auto",
                    }}
                  >
                    <Button
                      variant="outlined"
                      size="large"
                      onClick={() => {
                        navigate("/search");
                      }}
                    >
                      Search For Recipes
                    </Button>
                  </Box>
                </Grid>
              )}
            </Grid>
          </Box>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default Favourites;
