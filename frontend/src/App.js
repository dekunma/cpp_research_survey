import React from 'react';
import Rating from '@material-ui/lab/Rating';
import {AppBar, Typography, Toolbar, CssBaseline,
    useScrollTrigger, Container, Slide, withStyles,
    Grid, TextField, Divider, Paper, Button} from '@material-ui/core'
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
    this.filterStar(5, 'star5')
    this.filterStar(4,'star4')
    this.filterStar(3,'star3')
    this.filterStar(2,'star2')
    this.filterStar(1, 'star1')
    this.setState({continue:true})
  }

  handleSubmit = () => {
    client.service('feedback')
    .create({
      name        : this.state.name,
      company     : this.state.company,
      time        : this.state.time,
      postion     : this.state.position,
      altPosition : this.state.altPosition,
      Q1          : this.state.Q1,
      Q2          : this.state.Q2,
      Q3          : this.state.Q3,
      Q4          : this.state.Q4,
      Q5          : this.state.Q5,
      Q6          : this.state.Q6,
      Q7          : this.state.Q7,
      Q8          : this.state.Q8,
      star5       : this.state.star5,
      star4       : this.state.star4,
      star3       : this.state.star3,
      star2       : this.state.star2,
      star1       : this.state.star1

    })
    .then(r => {
      alert('Thank You! Your Response Has Been Recorded')
      this.setState({submitted:true})
    })
    .catch(e => {
      console.log(e)
      alert('Submission Failed. Please Try Again.')
    })
  }

  logState = () => {
    console.log(this.state)
  }

  render(){
    const { classes } = this.props;
    if(this.state.submitted){
      return(<h2>Thank You!</h2>)
    }
    else{
      return (
        <React.Fragment>
          <CssBaseline />
          <HideOnScroll >
            <AppBar>
              <Toolbar>
                <Typography variant="h6">UCSD C++ Survey</Typography>
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
                    onChange={ev => this.handleChange(ev, 'name')}
                  />
                  <div/>
                  <TextField 
                    className={classes.TextField} 
                    label="Organization/Company"
                    onChange={ev => this.handleChange(ev, 'company')}
                  />
                  <div/>
                  <TextField
                    className={classes.TextField}
                    label='Number of years you have worked as a developer'
                    onChange={ev => this.handleChange(ev, 'time')}
                    placeholder='How many years'
                    multiline
                    rows={2}
                  />
                  <div/>
                  <TextField
                    className={classes.TextField}
                    label='Your Job Position'
                    onChange={ev => this.handleChange(ev, 'position')}
                  />
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
                            <b>Based on your experience working with C++, 
                              please mark the level of importance for the following topics.
                              5 stars means the most important, 
                              1 star means the least important. 
                              You can skip topics if you don't know/not sure about the topics.
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
                            <div key={q} className={classes.centerItem}>
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
                  topics={this.state.star5}
                  question='For the topics that you gave 5 stars, 
                  could you briefly explain the reason 
                  why you think they are so important?'
                  supplement='The topics you gave 5 stars are:'
                  onChange={ev => this.handleChange(ev, 'Q1')}
                />
  
                <div className={classes.topMarginSmall}/>
  
                <StarQuestion
                  topics={this.state.star1}
                  question='For the topics that you gave 1 star, 
                  could you briefly explain the reason 
                  why you think they are not so important?'
                  supplement='The topics you gave 1 star are:'
                  onChange={ev => this.handleChange(ev, 'Q2')}
                />
  
                <div className={classes.topMarginSmall}/>
  
                <LongQuestion
                  question=' What are the features in C++ 
                  that you use most often on a daily basis?'
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
                  question='If you teach C++ at a university, 
                  what topics will you cover in your C++ class?'
                  onChange={ev => this.handleChange(ev ,'Q5')}
                />
  
                <div className={classes.topMarginSmall}/>
  
                <LongQuestion
                  question='If you learnt C++ in college, 
                  did the knowledge of C++ you learnt help you in your current job? Why or why not?'
                  onChange={ev => this.handleChange(ev, 'Q6')}
                />
  
                <div className={classes.topMarginSmall}/>
  
                <LongQuestion
                  question='Do you have any opinions about 
                  how C++ is taught at colleges/universities currently?'
                  onChange={ev => this.handleChange(ev, 'Q7')}
                />
  
                <div className={classes.topMarginSmall}/>
  
                <LongQuestion
                  question='Are there any C++ topics 
                  that you find important to your job, but are not listed above?'
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

}

export default withStyles(styles)(App);

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
