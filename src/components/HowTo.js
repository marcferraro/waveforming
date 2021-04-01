import {Typography, Grid, Link} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
      padding: 40,
      paddingLeft: 60,
      paddingRight: 60
    }
  }));

const HowTo = props => {
    const classes = useStyles()

    return(
        <Grid className={classes.root} container>
            <Typography variant="h5">
                
                Waveforming uses the incredible
                <Link href="https://github.com/mxgmn/WaveFunctionCollapse">
                    {' Wave Function Collapse '}
                </Link>
                 algorithm written by
                 <Link href="https://github.com/mxgmn/WaveFunctionCollapse">
                    {' Maxim Gumin. '}
                </Link>
                The function takes in an initial pattern bitmap and creates an output bitmap based on that pattern. This app will riff
                on pixel art created by you.

                You can select colors to draw on the canvas with. There are some additional settings too that will have an impact on the
                output. An explanation for each:
            </Typography>
            <Typography paragraph>
                N: The N value can be set between 2-4(WAIT APPARANTLY IT CAN GO HIGHER??) and controls the size of the patterns the program will look for. Lower values can result
                in an image being deconstructed into many small pieces, while higher values create more uniform outputs.
            </Typography>
            <Typography paragraph>
                Symmetry: The Symmetry value can be set between 1-8 and controls to what degree the program will flip and twist the input pattern.
            </Typography>
        </Grid>
    )
}

export default HowTo

// style={{marginLeft: 180, marginRight: 'auto'}}