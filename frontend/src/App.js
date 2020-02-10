import React from 'react';
//import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
//import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Container from '@material-ui/core/Container';
import Slide from '@material-ui/core/Slide';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Divider from '@material-ui/core/Divider'
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select'
import FormControl from '@material-ui/core/FormControl';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper'
import Rating from '@material-ui/lab/Rating';
import Button from '@material-ui/core/Button'
import {AppBar, Typography} from '@material-ui/core'
import client from './feathers'
import LongQuestion from './Components/longQuestion'
import StarQuestion from './Components/StarQuestion'
const styles = theme => ({
  ratingItem:{
    width:150
  },
  topMargin:{
    marginTop:50
  },
  centerItem:{
    textAlign:'center',
    marginTop:5,
    marginBottom:5
  },
  bottomMargin:{
    marginBottom:30
  },
  topPadding:{
    paddingTop:30
  },
  topPaddingSmall:{
    paddingTop:5
  },
  padding:{
    padding:20 
  },
  TextField:{
    width:'80%',
  },
  margin:{
    margin:3
  },
  paddingMarginTop:{
    padding:20,
    marginTop:20
  },
  markDiv:{
    float:'left',
    marginTop:5,
    marginLeft:20,
    width:200
  },
  topMarginSmall:{
    marginTop:20
  }
});

function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

class App extends React.Component {
  constructor(props){
    super(props)
    this.state={}
  }

  async handleChangeValue(event,value,name){
    this.setState({[name]:value})    
  }

  filterStar = (num, name) => {
      const state = this.state
      const mark5 = []
      for(var i in state){
        if(state[i] === num){
          mark5.push(i)
        }
      }
      this.setState({[name]:mark5})
  }

  handleChange = (ev,name) => {
    this.setState({[name]:ev.target.value})
    console.log(this.state)
  }
  
  handleContinue = () => {
    this.filterStar(5, 'important')
    this.filterStar(4,'star4')
    this.filterStar(3,'star3')
    this.filterStar(2,'star2')
    this.filterStar(1, 'unimportant')
    this.setState({continue:true})
  }

  handleSubmit = () => {
    client.service('feedback')
    .create({
      important   : this.state.important,
      star4       : this.state.star4,
      unimportant : this.state.unimportant,

    })
    .then(r => {
      console.log(r)
      alert('Your Response Has Been Recorded')
      console.log('state: ',this.state)
    })
    .catch(e => {
      console.log(e)
      alert('Error Occured')
    })
  }

  logState = () => {
    console.log(this.state)
  }

  render(){
    const { classes } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <HideOnScroll >
          <AppBar>
            <Toolbar>
              <Typography variant="h6">C++ Survey</Typography>
            </Toolbar>
          </AppBar>
        </HideOnScroll>
        <Toolbar />
        <Container>
          <div className={classes.topMargin}/>

          <Grid container className={classes.centerItem}>
            <Grid item md={3} xs={1}/>
            <Grid item md={6} xs={10} >
              <Paper className={classes.padding}>
                <TextField 
                  className={classes.TextField} 
                  label="Your Name"
                  onChange={ev => this.handleChangeValue(ev, 'name')}
                />
                <div/>
                <TextField 
                  className={classes.TextField} 
                  label="Organization/Company"
                  onChange={ev => this.handleChangeValue(ev, 'company')}
                />
                <div/>
                <TextField
                  className={classes.TextField}
                  label='Time of being a Developer'
                  onChange={ev => this.handleChangeValue(ev, 'time-being-developer')}
                  placeholder='How many years'
                />
                <div/>
                  <FormControl className={classes.TextField}>
                    <InputLabel htmlFor="position-selecter">Your Job Position</InputLabel>
                    <Select
                      native
                      onChange={ev => this.handleChange(ev,'position')}
                      inputProps={{
                        name: 'position',
                        id: 'position-selecter',
                      }}
                    > 
                      <option value=''></option>
                      {jobPositions.map(elem => (
                        <option key={elem} value={elem}>{elem}</option>
                      ))}
                    </Select>
                  </FormControl>
                  <div/>
                  {this.state.position === 'Other'
                  ?
                  <div>
                    <TextField 
                      className={classes.TextField} 
                      label="Your Position"
                      onChange={ev => this.handleChangeValue(ev, 'other-position')}
                    />                 
                  </div>
                  :
                  <div/>}
              </Paper>
              
            </Grid>
            <Grid item md={3} xs={1}/>
          </Grid>

          <Divider/>
          
          <Grid container className={classes.centerItem}>
                <Grid item md={3} xs={1}/>
                <Grid item md={6} xs={10} >
                  <Paper className={classes.centerItem}>
                        <div className={classes.padding }>
                          <b>Please mark the level of importance that you think for
                            the following topics. 5 stars means the most important, 1 star
                            means the least important. You can skip topics if you don't know/not 
                            sure about the topics.
                          </b>
                        </div>
                  </Paper>
                  <Grid item md={3} xs={10}/>
                </Grid>
            </Grid>
           
          <Grid container className={classes.centerItem}>
              <Grid item md={3} xs={1}/>
                <Grid item md={6} xs={10}>
                  <Paper className={classes.centerItem}>
                        {questions.map(q => (
                          <div className={classes.centerItem}>
                            <div className={classes.markDiv}>{q}</div>
                            <Rating
                              name={q}
                              onChange={(event, value) => this.handleChangeValue(event,value,q)}
                              defaultValue={0}
                            />
                          </div>
                        ))}
                  </Paper>
                <Grid item md={3} xs={10}/>
              </Grid>
          </Grid>
        
            {this.state.continue
            ?
            <div>
              <Divider/>
          
          <Grid container className={classes.centerItem}>
            <Grid item md={3} xs={1}/>
            <Grid item md={6} xs={10}>

              <StarQuestion
                topics={this.state.important}
                question='For the topics that you gave 5 stars, 
                could you briefly explain the reason 
                why you think they are so important?'
                supplement='The topics you gave 5 stars are:'
                onChange={ev => this.handleChange(ev, 'importantReason')}
              />

              <div className={classes.topMarginSmall}/>

              <StarQuestion
                topics={this.state.unimportant}
                question='For the topics that you gave 1 star, 
                could you briefly explain the reason 
                why you think they are not so important?'
                supplement='The topics you gave 1 star are:'
                onChange={ev => this.handleChange(ev, 'unimportantReason')}
              />

              <div className={classes.topMarginSmall}/>

              <LongQuestion
                question='What are the features in C++ 
                that you use the most often on the daily basis?'
                onChange={ev => this.handleChange(ev, 'Q3')}
              />

              <div className={classes.topMarginSmall}/>


              <LongQuestion
                question='Could you briefly explain 
                why you use these features the most often?'
                onChange={ev => this.handleChange(ev, 'Q4')}
              />

              <div className={classes.topMarginSmall}/>

              <LongQuestion
                question='If you are invited to teach C++ at a university
                , what topics/knowledges will you cover in class?'
                onChange={ev => this.handleChange(ev ,'Q5')}
              />

              <div className={classes.topMarginSmall}/>

              <LongQuestion
                question='If you have learnt C++ in college: 
                did the knowledge of C++ you learnt 
                helped you a lot in you job? Why or why not?'
                onChange={ev => this.handleChange(ev, 'Q6')}
              />

              <div className={classes.topMarginSmall}/>

              <LongQuestion
                question='Do you have any opinions 
                about the current way of how 
                universities are teaching C++?'
                onChange={ev => this.handleChange(ev, 'Q7')}
              />

              <div className={classes.topMarginSmall}/>

              <LongQuestion
                question='Is there any C++ topics that 
                you find import to your job, but not listed above?'
                onChange={ev => this.handleChange(ev, 'Q8')}
              />

              <div className={classes.topMarginSmall}/>

              <Button 
                className={classes.margin} 
                variant='contained' 
                color='primary' 
                onClick={ev => this.handleSubmit()}
              >Submit</Button>

                </Grid>
              <Grid item md={6} xs={1}/>
            <Grid item md={3} xs={1}/>
          </Grid>
            </div>
            :
            <div className={classes.centerItem}>
             <Button 
              onClick={ev => this.handleContinue()} 
              variant='contained' 
              color='primary'>Continue</Button>
            </div>
            }

        </Container>
      </React.Fragment>
    );
  }

}

export default withStyles(styles)(App);

const jobPositions = [
  'Web Programmer',
  'System Programmer',
  'Game Programmer',
  'Application Programmer',
  'Artificial Intelligence Developer',
  'Database Developer',
  'Other'
]

const questions = [
  'Raw Pointers',
  'Raw Arrays',
  'C Strings',
  'C Structs',
  'Const Variables',
  'Functions',
  'Pointer Arithmetic',
  'C Primitive Types',
  'Headers',
  'Preprocessor',
  'Static Local Variables',
  'Control Statement',
  'Enumerations',
  'Function Pointers',
  'Stages of Compilation',
  'Bitwise Operators',
  'Global Variables',
  'Local Variables',
  'Memory Layout',
  'Separate Compilation',
  'C Error Handling',
  'Expressions',
  'Extern Declarations',
  'Statements',
  'Storage Classes',
  'Variable Scope',
  'Booleans',
  'Macros',
  'Volatile Declarations',
  'C Dynamic Allocation',
  'C I/O',
  'Classes',
  'Templates',
  'Operator Overloading',
  'Polymorphism',
  'C++98 Dynamic Allocation',
  'Static Members',
  'Virtual Functions',
  'Constructors',
  'Copying',
  'References',
  'Destructors',
  'Rule of Three',
  'Const Member Functions',
  'Member Initializer Lists',
  'C++98 Structs',
  'Multiple Inheritance',
  'Friend Declarations',
  'Functors',
  'RAII',
  'Namespaces',
  'Exceptions',
  'Template Specialization',
  'Function Overloading',
  'Const Interface',
  'Conversion Operators',
  'Incomplete Class Decl\' s',
  'Nested Classes',
  'Object Slicing',
  'Objects',
  'Private Inheritance',
  'Const Return Types',
  'C++98 Value Categories',
  'SFINAE',
  'Lambdas',
  'Variadic Templates',
  'Range-based For Loops',
  'Type Deduction',
  'C++11',
  'C++14',
  'Constexpr',
  'Moving',
  'STL (Standard Library)',
  'STL Sequence Containers',
  'STL Iterators',
  'C++98 I/O',
  'STL Associative Containers',
  'STL Containers',
  'Smart Pointers',
  'STL Algorithms',
  'STL Iterator Types',
  'C++98 Strings',
  'std::stringstream',
  'STL Container Adapters',
  'Erase-Remove Idiom',
  'Reference Wrappers',
  'std::enable_if',
  'Threads',
  'Type Traits'
]
