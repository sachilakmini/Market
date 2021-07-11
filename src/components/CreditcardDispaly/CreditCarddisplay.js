import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from "axios";
import CreditCardUpdate from "../Creditcardupdate/CreditCardUpdate";

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  
  root: {
    maxWidth: "100%",
  },
  media: {
    height: 140,
  },
  rootGrid: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));



export default function CreditCarddisplay() {
  const classes = useStyles();

  const [card, setCard] = useState([]); 
  const [dele, setDele] = useState(""); 

  const fetchResults = async () => {
    try {
      const { data } = await axios.get("/creditCard/get");
      setCard(data)
      console.log("data test 1", data) 
    } catch (error) {
      console.log(error);
    }
  };

  const deletecard = async (_id) => {
    try {
        const { data } = await axios.post("/creditCard/delete", {
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
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          CreditCard Number : {data.card}
                        </Typography>
                        <Typography gutterBottom variant="h5" component="h2">
                          User Name : {data.name}
                        </Typography>
                        <Typography gutterBottom variant="h5" component="h2">
                          CreditCard CVV : {data.cvv}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <Button size="small" color="secondary" variant="outlined" color="secondary" onClick={() => deletecard(data._id)}>
                        Delete
                      </Button>
                      <CreditCardUpdate update = {data}/>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
      </Grid>
    </div>


  );
}