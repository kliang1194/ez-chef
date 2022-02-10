import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Button,
  ButtonGroup,
  CardMedia,
  ClickAwayListener,
  CssBaseline,
  Grid,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";

const MyRecipeDetailsCard = ({ user }) => {
  const [details, setDetails] = useState({});
  const [serving, setServing] = useState(1);
  const [servingRatio, setServingRatio] = useState(1);
  const [isFav, setIsFav] = useState(false);
  const [isGroceries, setIsGroceries] = useState(false);
  const [addFav, setAddFav] = useState(false);
  const [addGroceries, setAddGroceries] = useState(false);

  let url = window.location.pathname;
  const id = url.split("/myRecipes/")[1];
  const navigate = useNavigate();

  const handleFavouriteTooltipClose = () => {
    setAddFav(false);
  };

  const handleFavouriteTooltipOpen = () => {
    setAddFav(true);
  };

  const handleGroceryTooltipClose = () => {
    setAddGroceries(false);
  };

  const handleGroceryTooltipOpen = () => {
    setAddGroceries(true);
  };

  const myFavouriteFunction = () => {
    onClickFavourite();
    handleFavouriteTooltipOpen();
  };

  const myGroceryFunction = () => {
    onClickGrocery();
    handleGroceryTooltipOpen();
  };

  useEffect(() => {
    console.log("I am my recipeID", id);
    axios
      .get(`/recipes/recipeDetails/${user}/${id}`)
      .then(function (response) {
        setDetails(response.data[0]);
        console.log("response", response.data[0]);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [id]);

  useEffect(() => {
    axios
      .get(`/favourites/check/${user}/${id}`)
      .then((response) => {
        if (response.data) {
          console.log("response.data here", response.data);
          setIsFav(true);
        } else {
          setIsFav(false);
        }
      })
      .catch((error) => {
        setIsFav(false);
      });
  }, [user]);

  useEffect(() => {
    axios
      .get(`/groceries/check/${user}/${id}`)
      .then((response) => {
        if (response.data) {
          console.log("response.data here", response.data);
          setIsGroceries(true);
        } else {
          setIsGroceries(false);
          console.log("no response");
        }
      })
      .catch((error) => {
        setIsGroceries(false);
        console.log("error when checking groceries");
      });
  }, [user]);

  useEffect(() => {
    setServing(details.serving_size);
  }, [details.serving_size]);

  function removeTags(str) {
    if (str === null || str === "") return false;
    else str = str.toString();
    return str.replace(/(<([^>]+)>)/gi, "");
  }

  const onClickEdit = (id) => {
    navigate(`/edit/${user}/${id}`);
  };

  const onClickFavourite = () => {
    if (user) {
      const URL = `/favourites/myRecipes/${user}/${details._id}`;
      axios
        .post(URL, details)
        .then(() => setIsFav(true))
        .catch((err) => deleteFavourite());
    } else {
      navigate("/login");
    }
  };

  const onClickConvert = () => {
    setServingRatio(serving / details.serving_size);
  };

  const onClickGrocery = () => {
    if (user) {
      axios
        .post(`/groceries/myRecipes/${user}/${details._id}`, details)
        .then(() => setIsGroceries(true))
        .catch((err) => {
          deleteGroceryList();
        });
    } else {
      navigate("/login");
    }
  };

  const deleteFavourite = () => {
    const url = `/favourites/${user}/${details._id}`;
    axios
      .delete(url)
      .then(() => {
        setIsFav(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const deleteGroceryList = (id) => {
    const url = `/groceries/${user}/${details._id}`;
    axios
      .delete(url)
      .then(() => {
        setIsGroceries(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Grid>
      <CssBaseline />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          overflow: "auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          marginRight: -4.75,
        }}
      >
        <Typography component="h1" variant="h4" sx={{ p: 1 }}>
          {details.title}
        </Typography>
        <Grid sx={{ p: 2 }}>
          <CardMedia
            component="img"
            src={details.image_url}
            alt={details.title}
            style={{ height: 400, width: 500 }}
          />
        </Grid>
        <ButtonGroup>
          <Button
            onClick={() => {
              onClickEdit(details._id);
            }}
          >
            <EditIcon />
          </Button>

          {isFav ? (
            <ClickAwayListener onClickAway={handleFavouriteTooltipClose}>
              <Tooltip
                title={
                  <Typography fontSize={18} textAlign="center">
                    Added to Favourites
                  </Typography>
                }
                onClose={handleFavouriteTooltipClose}
                open={addFav}
              >
                <Button onClick={myFavouriteFunction}>
                  <StarIcon />
                </Button>
              </Tooltip>
            </ClickAwayListener>
          ) : (
            <ClickAwayListener onClickAway={handleFavouriteTooltipClose}>
              <Tooltip
                title={
                  <Typography fontSize={18} textAlign="center">
                    Removed from Favourites
                  </Typography>
                }
                onClose={handleFavouriteTooltipClose}
                open={addFav}
              >
                <Button onClick={myFavouriteFunction}>
                  <StarBorderIcon />
                </Button>
              </Tooltip>
            </ClickAwayListener>
          )}
          {isGroceries ? (
            <ClickAwayListener onClickAway={handleGroceryTooltipClose}>
              <Tooltip
                title={
                  <Typography fontSize={18} textAlign="center">
                    Added to Groceries
                  </Typography>
                }
                onClose={handleGroceryTooltipClose}
                open={addGroceries}
              >
                <Button onClick={myGroceryFunction}>
                  <ShoppingCartIcon />
                </Button>
              </Tooltip>
            </ClickAwayListener>
          ) : (
            <ClickAwayListener onClickAway={handleGroceryTooltipClose}>
              <Tooltip
                title={
                  <Typography fontSize={18} textAlign="center">
                    Removed from Groceries
                  </Typography>
                }
                onClose={handleGroceryTooltipClose}
                open={addGroceries}
              >
                <Button onClick={myGroceryFunction}>
                  <AddShoppingCartIcon />
                </Button>
              </Tooltip>
            </ClickAwayListener>
          )}
        </ButtonGroup>
        <Grid sx={{ p: 2 }}>
          <Typography variant="h4">Recipe Ingredients</Typography>
          <Grid sx={{ p: 2, paddingLeft: 5, textAlign: "left", fontSize: 18 }}>
            {Object.values(details).length > 0
              ? details.ingredients.map((ing) => {
                  return (
                    <li key={ing.id}>
                      {ing.quantity * servingRatio} {ing.unit} {ing.name}
                    </li>
                  );
                })
              : null}
          </Grid>
          <Grid
            sx={{
              p: 1,
            }}
          >
            <Typography variant="h5" paddingTop={2}>
              Current Servings: {details.serving_size * servingRatio}
            </Typography>
            <Grid
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Typography fontSize={18}>Convert Servings: </Typography>
              <TextField
                style={{
                  width: 70,
                  marginTop: 5,
                  marginLeft: 10,
                  marginRight: 5,
                }}
                size="small"
                type="number"
                value={serving}
                onChange={(e) => setServing(e.target.value)}
                InputProps={{
                  inputProps: { min: 1, style: { textAlign: "center" } },
                }}
              />
              <Button size="medium" onClick={onClickConvert}>
                Convert
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid sx={{ p: 1 }}>
          <Typography variant="h4">Cooking Instructions</Typography>
          <ol type="1">
            <Grid
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                textAlign: "left",
                paddingLeft: 3,
                paddingRight: 5,
                fontSize: 18,
              }}
            >
              {Object.values(details).length ? (
                removeTags(details.instructions)
                  .split(".")
                  .slice(0, -1)
                  .map((each) => {
                    return (
                      <li
                        key={removeTags(details.instructions)
                          .split(".")
                          .indexOf(each)}
                      >
                        {each + "."}
                      </li>
                    );
                  })
              ) : (
                <Typography>You do not have instructions</Typography>
              )}
            </Grid>
          </ol>
        </Grid>
      </Box>
    </Grid>
  );
};

export default MyRecipeDetailsCard;
