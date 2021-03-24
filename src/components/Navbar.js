import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
// import CssBaseline from '@material-ui/core/CssBaseline';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Avatar from '@material-ui/core/Avatar';
import { Grid } from '@material-ui/core';
import komet from '../images/komet.jpeg'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../actions'
import { Link }  from 'react-router-dom'


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



export default function Navbar(){
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const classes = useStyles();
    
    const handleLogout = () => {
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
            <Grid container justify="center">
                <Avatar alt="Remy Sharp" src={komet} />
                <p>{auth ? auth.username : null}</p>
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
                <Link to='/login' style={{ textDecoration: 'none', color: 'inherit' }}>
                  <ListItem onClick={handleLogout} button>
                    <ListItemText primary="Logout" />
                  </ListItem>
                </Link>
              </List>
            </Drawer>
            
        </div>
    )
}