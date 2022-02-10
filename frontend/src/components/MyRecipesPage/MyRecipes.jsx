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

const MyRecipes = ({ user }) => {
  const [myRecipes, setMyRecipes] = useState([]);

  const navigate = useNavigate();

  const getData = () => {
    axios
      .get(`/recipes/${user}`)
      .then(function (response) {
        setMyRecipes(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const deleteRecipe = (id) => {
    const URL = `/recipes/${user}/${id}`;
    axios
      .delete(URL)
      .then(function (response) {
        getData();
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const editRecipe = (id) => {
    navigate(`/edit/${user}/${id}`);
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
              My Recipes
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
              {myRecipes.length ? (
                myRecipes.map((recip) => {
                  const url = `/myRecipes/${recip._id}`;
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
                            style={{
                              color: "black",
                              textDecoration: "none",
                            }}
                            fontSize={18}
                            href={url}
                          >
                            <Typography
                              fontSize={18}
                              textAlign="center"
                              marginBottom={1}
                            >
                              {recip.title}
                            </Typography>
                            <CardMedia
                              key={recip._id}
                              component="img"
                              src={recip.image_url}
                              alt={recip.title}
                              style={{ height: 250, width: 280 }}
                            />
                          </Link>
                        </CardContent>
                        <CardActions>
                          <Button
                            onClick={() => {
                              editRecipe(recip._id);
                            }}
                            size="medium"
                          >
                            Edit
                          </Button>
                          <Button
                            color="error"
                            onClick={() => {
                              deleteRecipe(recip._id);
                            }}
                            size="medium"
                          >
                            Delete
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
                        navigate("/new");
                      }}
                    >
                      Create New Recipes
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

export default MyRecipes;
