import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {Paper, TextField} from '@material-ui/core'
const useStyle = makeStyles(theme => ({
    padding:{
        padding:20 
      },
      TextField:{
        width:'80%',
      },
}))
export default function LongQuestion(props){
    const classes = useStyle()

    return(
        <Paper className={classes.padding}>
                <p>{props.question}</p>
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