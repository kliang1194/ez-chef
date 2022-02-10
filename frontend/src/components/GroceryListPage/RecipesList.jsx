import React from "react";
import axios from "axios";
import {
  Button,
  CssBaseline,
  Grid,
  Typography,
  CardContent,
  Link,
  CardActions,
  Card,
} from "@mui/material";

const RecipesList = ({ myGroceryList, user }) => {
  const deleteGroceryList = (id) => {
    const url = `/groceries/${user}/${id}`;
    axios
      .delete(url)
      .then(function (response) {
        window.location.reload();
        console.log("response from delete", response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Grid>
      <CssBaseline />
      <Grid
        container
        p={2}
        // width="50vw"
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        {myGroceryList.length ? (
          <Typography variant="h5">List of Recipes</Typography>
        ) : null}

        <Grid
          container
          p={2}
          spacing={{ xs: 2, md: 2 }}
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          {myGroceryList.length
            ? myGroceryList.map((groceryList) => {
                let url = "";
                if (groceryList.grocery_list_recipeID.length <= 10) {
                  url += `/search/${groceryList.grocery_list_recipeID}`;
                } else {
                  url += `/myRecipes/${groceryList.grocery_list_recipeID}`;
                }
                return (
                  <Grid item key={groceryList.grocery_list_recipeID}>
                    <Card
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        ":hover": {
                          boxShadow: 10,
                        },
                      }}
                    >
                      <CardContent
                        sx={{
                          flexGrow: 1,
                          paddingLeft: 2,
                          paddingRight: 2,
                          paddingTop: 1,
                          paddingBottom: 1,
                        }}
                      >
                        <Link
                          style={{
                            color: "black",
                            textDecoration: "none",
                          }}
                          href={url}
                        >
                          <Typography fontSize={18}>
                            {groceryList.grocery_list_title}
                          </Typography>
                        </Link>
                      </CardContent>
                      <CardActions>
                        <Button
                          color="error"
                          onClick={() => {
                            deleteGroceryList(
                              groceryList.grocery_list_recipeID
                            );
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
            : null}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default RecipesList;
