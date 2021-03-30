import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
// import CssBaseline from '@material-ui/core/CssBaseline';
import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
// import InboxIcon from '@material-ui/icons/MoveToInbox';
// import MailIcon from '@material-ui/icons/Mail';
import Avatar from '@material-ui/core/Avatar';
import { Grid } from '@material-ui/core';
// import komet from '../images/komet.jpeg'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../actions'
import { Link }  from 'react-router-dom'
import { withRouter, Route, Switch } from 'react-router-dom'

import OverlappingWaveformInterface from './OverlappingWaveformInterface'
import Profile from './Profile'
import Dashboard from './Dashboard';
import Gallery from './Gallery';
import Collection from './Collection';
import HowTo from './HowTo';
import CanvasTest from './CanvasTest';


const drawerWidth = 180;

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    }
  }));



const Navbar = props => {
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const classes = useStyles();
    
    const handleLogout = () => {
      props.history.push('/')
      dispatch(logout())
    }

    return(
        <div className={classes.root}>
            {/* <CssBaseline /> */}
            <Drawer
                className={classes.drawer}
                classes={{
                    paper: classes.drawerPaper,
                  }}
                variant="permanent"
                anchor="left"
                open={true}
            >
            <Grid container direction="column" justify="center" alignItems="center" style={{marginTop: 12}}>
              <Grid item>
                <Avatar alt="avatar" src={`http://localhost:3000${auth.avatar}`} />
              </Grid>
              <Grid item>
                <p>{auth ? auth.username : null}</p>
              </Grid>
            </Grid>
            <Divider />
            <div className={classes.toolbar} />
            <List>
                {/* {['Dashboard', 'New Generation', 'Collection', 'How To'].map((text, index) => (
                <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
                </ListItem>
            ))} */}
              <Link to='/profile' style={{ textDecoration: 'none', color: 'inherit' }}>
                  <ListItem button>
                    <ListItemText primary="Profile" />
                  </ListItem>
              </Link>
              <Link to='/dashboard' style={{ textDecoration: 'none', color: 'inherit' }}>
                  <ListItem button>
                    <ListItemText primary="Dashboard" />
                  </ListItem>
              </Link>
              <Link to='/new-overlapping-waveform' style={{ textDecoration: 'none', color: 'inherit' }}>
                  <ListItem button>
                    <ListItemText primary="New Creation" />
                  </ListItem>
              </Link>
              <Link to='/gallery' style={{ textDecoration: 'none', color: 'inherit' }}>
                  <ListItem button>
                    <ListItemText primary="Gallery" />
                  </ListItem>
              </Link>
              <Link to='/collection' style={{ textDecoration: 'none', color: 'inherit' }}>
                  <ListItem button>
                    <ListItemText primary="Collection" />
                  </ListItem>
              </Link>
              <Link to='/how-to' style={{ textDecoration: 'none', color: 'inherit' }}>
                  <ListItem button>
                    <ListItemText primary="How To" />
                  </ListItem>
              </Link>
            </List>
            <Divider />
              <List>
                {/* <Link to='/login' style={{ textDecoration: 'none', color: 'inherit' }}> */}
                  <ListItem onClick={handleLogout} button>
                    <ListItemText primary="Logout" />
                  </ListItem>
                {/* </Link> */}
              </List>
            </Drawer>
            <Switch>
              {/* <Route path='/login' component={Login}/>
              <Route path='/sign-up' component={SignUp}/> */}
              <Route path='/profile' component={Profile}/>
              <Route path='/dashboard' component={Dashboard}/>
              <Route path='/new-overlapping-waveform' component={OverlappingWaveformInterface}/>
              <Route path='/gallery' component={Gallery}/>
              <Route path='/collection' component={Collection}/>
              <Route path='/how-to' component={HowTo}/>
              <Route path='/canvas-test' component={CanvasTest}/>
              {/* <Route exact path='/' component={Welcome}/> */}
      </Switch>
            
        </div>
    )
}

export default withRouter(Navbar)