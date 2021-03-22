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
    const classes = useStyles();

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
            </Grid>
            <Divider />
            <div className={classes.toolbar} />
            <List>
                {['Dashboard', 'New Generation', 'Collection', 'How To'].map((text, index) => (
                <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
                </ListItem>
            ))}
            </List>
            <Divider />
              <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                  <ListItem button key={text}>
                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                ))}
              </List>
            </Drawer>
            
        </div>
    )
}