import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Link,
  Paper,
  Typography,
} from "@mui/material";
import Image from "../docs/user-pages-background.jpg";

const styles = {
  paperContainer: {
    backgroundImage: `url(${Image})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    width: "100vw",
    height: "100vh",
  },
};

const MyRecipes = ({ user }) => {
  const [myRecipes, setMyRecipes] = useState([]);

  const getData = () => {
    axios
      .get(`http://localhost:8000/recipes/${user}`)
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
    const URL = `http://localhost:8000/recipes/${user}/${id}`;
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

  return (
    <Paper style={styles.paperContainer}>
      <Grid>
        <Typography variant="h5">My Recipes</Typography>
        <Grid
          container
          p={5}
          spacing={{ xs: 2, md: 7 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          direction="row"
          justifyContent="center"
          alignItems="center">
          {myRecipes.length ? (
            myRecipes.map((recip) => {
              const url = `http://localhost:3000/myRecipes/${recip._id}`;
              return (
                <Grid item key={recip}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}>
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Link href={url}>{recip.title}</Link>
                    </CardContent>
                    <CardMedia
                      key={recip._id}
                      component="img"
                      src={recip.image_url}
                      alt="recipe"
                      style={{ height: 250, width: 250 }}
                    />
                    <CardActions>
                      <Button
                        onClick={() => {
                          deleteRecipe(recip._id);
                        }}
                        size="small">
                        Delete
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })
          ) : (
            <Typography variant="h5">Add a Recipe</Typography>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default MyRecipes;
