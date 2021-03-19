import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 200;

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
        <div>
            <Drawer
                variant="permanent"
                anchor="left"
            >hello</Drawer>
        </div>
    )
}