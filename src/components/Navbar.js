import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import { Grid, Typography } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../actions'
import { fetchInputsSuccess } from '../actions'
import { fetchOoutputsSuccess } from '../actions'
import { Link }  from 'react-router-dom'
import { withRouter, Route, Switch } from 'react-router-dom'
import { useEffect } from 'react';

import OverlappingWaveformInterface from './OverlappingWaveformInterface'
import Profile from './Profile'
import Dashboard from './Dashboard';
import Gallery from './Gallery';
import Collection from './Collection';
import HowTo from './HowTo';
import OOutputShow from './OOutputShow';
import InputShow from './InputShow';

const drawerWidth = 150;

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
      backgroundColor: "#546e7a",
      boxShadow: '2px 2px 6px #aeaeae'
    },
    listItemText: {
      color: "white",
      variant: "h1"
    },
    navText: {
      color: '#ffffff'
    },
    selectedNavText: {
      color: '#ff5f52'
    },
    divider: {
      backgroundColor: "#e0e0e0"
    }
  }));

const Navbar = props => {
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const classes = useStyles();
    
    useEffect(() => {
      fetch('http://localhost:3000/ooutputs')
      .then(resp => resp.json())
      .then(data => dispatch(fetchOoutputsSuccess(data)))

      fetch('http://localhost:3000/inputs')
      .then(resp => resp.json())
      .then(data => dispatch(fetchInputsSuccess(data)))
    })
    
    const handleLogout = () => {
      props.history.push('/')
      dispatch(logout())
    }

    return(
        <div className={classes.root}>
          {/* <Backdrop invisible={true} open={true} > */}
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
                <Avatar alt="avatar" src={auth.avatar} />
              </Grid>
              <Grid item>
                <Typography className={classes.navText} variant="h6">{auth ? auth.username : null}</Typography>
              </Grid>
            </Grid>
            <Divider className={classes.divider} />
            <List>
              <Link to='/profile' style={{ textDecoration: 'none', color: 'inherit' }}>
                  <ListItem button>
                    <ListItemText className={window.location.pathname.includes('profile') ? classes.selectedNavText : classes.navText} primary="Profile" />
                  </ListItem>
              </Link>
              <Divider className={classes.divider} variant="middle"/>
              <Link to='/dashboard' style={{ textDecoration: 'none', color: 'inherit' }}>
                  <ListItem button>
                    <ListItemText className={window.location.pathname.includes('dashboard') ? classes.selectedNavText : classes.navText} primary="Dashboard" />
                  </ListItem>
              </Link>
              <Divider className={classes.divider} variant="middle"/>
              <Link to='/new-overlapping-waveform' style={{ textDecoration: 'none', color: 'inherit' }}>
                  <ListItem button>
                    <ListItemText className={window.location.pathname.includes('new-overlapping-waveform') ? classes.selectedNavText : classes.navText} primary="Create" />
                  </ListItem>
              </Link>
              <Divider className={classes.divider} variant="middle"/>
              <Link to='/gallery' id="gallery" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <ListItem button>
                    <ListItemText className={window.location.pathname.includes('gallery') ? classes.selectedNavText : classes.navText} primary="Gallery" />
                  </ListItem>
              </Link>
              <Divider className={classes.divider} variant="middle"/>
              <Link to='/collection' style={{ textDecoration: 'none', color: 'inherit' }}>
                  <ListItem button>
                    <ListItemText className={window.location.pathname.includes('collection') ? classes.selectedNavText : classes.navText} primary="Collection" />
                  </ListItem>
              </Link>
              <Divider className={classes.divider} variant="middle"/>
              <Link to='/how-to' style={{ textDecoration: 'none', color: 'inherit' }}>
                  <ListItem button>
                    <ListItemText className={window.location.pathname.includes('how-to') ? classes.selectedNavText : classes.navText} primary="How To" />
                  </ListItem>
              </Link>
            </List>
            <Divider className={classes.divider}/>
              <List>
                  <ListItem onClick={handleLogout} button>
                    <ListItemText className={classes.navText} primary="Logout" />
                  </ListItem>
              </List>
            </Drawer>
          {/* </Backdrop> */}
          <Grid container >
            <Switch>
                <Route path='/profile' component={Profile}/>
                <Route path='/dashboard' component={Dashboard}/>
                <Route path='/new-overlapping-waveform' component={OverlappingWaveformInterface}/>
                <Route path='/gallery' component={Gallery}/>
                <Route path='/collection' component={Collection}/>
                <Route path='/how-to' component={HowTo}/>
                <Route path={'/oOutput/:id'} component={OOutputShow}/>
                <Route path={'/input/:id'} component={InputShow}/>
                <Route path={'/'} component={Dashboard}/>
            </Switch>
          </Grid>
        </div>
    )
}

export default withRouter(Navbar)