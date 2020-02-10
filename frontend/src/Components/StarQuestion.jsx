import React from  'react'
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Chip, TextField } from '@material-ui/core'
const useStyle = makeStyles(theme => ({
    padding:{
        padding:20 
      },
      TextField:{
        width:'80%',
      },
      margin:{
        margin:3
      },
}))
export default function StarQuestion(props){

    const classes = useStyle()
    return(
        <Paper className={classes.padding}>
                <p>{props.question}</p>
                <div/>
                <p>{props.supplement}</p>
                <div/>
                
                {props.topics.map(elem => (
                  <Chip className={classes.margin} key={elem} label={elem}/>))}
                <div/>
                <div className={classes.padding}>
                  <TextField 
                    className={classes.TextField}
                    onChange={props.onChange} 
                    label="explain"
                    variant="outlined"
                    multiline
                    rows='10'
                  />
                </div>
              </Paper>
    )
}