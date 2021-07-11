import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from "axios";
import ItemUpdate from "../ItemUpdate/ItemUpdate";

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  rootGrid: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  root: {
    maxWidth: "100%",
  },
  media: {
    height: 140,
  },
}));


export default function ItemDisplay() {
  const classes = useStyles();

  const [card, setCard] = useState([]);
  const [dele, setDele] = useState(""); 

  const fetchResults = async () => {
    try {
      const { data } = await axios.get("/item/get");
      setCard(data)
      console.log("data test", data) 
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchResults();
    
  }, []);

  const deletecard = async (_id) => {
    try {
        const { data } = await axios.post("/item/delete", {
            _id : _id,
        });
        setDele(data)
      } catch (error) {
        console.log(error);
      }  
  }

  useEffect(() => {
    fetchResults();
    
  }, [dele]);

  return (

    <div className={classes.root}>
    <Grid container spacing={3}>
    {card.map((data) => (
      <Grid item xs={6}>
      <Card className={classes.root}>
        
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={data.image}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Item Name : {data.item}
            </Typography>
            <Typography gutterBottom variant="h5" component="h2">
              Price : {data.price}
            </Typography>
            <Typography gutterBottom variant="h5" component="h2">
              Discription : {data.discription}
            </Typography>
            <Typography variant="h5"  component="p">
              Discount : {data.discount}
            </Typography>
            <Typography variant="h5"  component="p">
              ExpireDate : {data.discription}
            </Typography>
            
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="secondary" onClick={() => deletecard(data._id)}>
            delete
          </Button>
          <ItemUpdate update = {data}/>
        </CardActions>
      </Card>
      </Grid>
      ))}
    </Grid>
  </div>

  );
}