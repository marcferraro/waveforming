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
        <Grid className={classes.root} container direction="row" alignItems="flex-start" justify="center">
            <Grid item>
                <Grid container>
                        <Typography variant="h5">
                            Waveforming uses the
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
                            in an image being deconstructed into many small pieces, while higher values create more uniform outputs. A value of 3 is a good starting point for msot patterns.
                        </Typography>
                        <Typography paragraph>
                            Symmetry: The Symmetry value can be set between 1-8 and controls to what degree the program will flip and twist the input pattern.
                        </Typography>
                        <Typography paragraph>
                            Ground: This value will scan the bottom of the input for a consistent surface across it's width, and try to apply it in the output. It can be pretty tricky to find
                            the correct value as it is not as simple as counting the number of ground rows you might include. Values between -1 and -4, and 100 and 102 tend to work well. Make sure
                            to keep it at zero if you don't want it on.
                        </Typography>
                        <Typography paragraph>
                            Periodic Inout: Toggling this on will allow the function to tile your pattern over the edges of the canvas, allowing it to
                            exit through an edge and enter on another. It is reccomended that you only toggle this off if creating a pattern that fills
                            the entire input canvas, or with an n value or 2-3.
                        </Typography>
                    </Grid>
                </Grid>
            <Grid item>
                <Grid container>
                    <Grid item>
                        test
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default HowTo

// style={{marginLeft: 180, marginRight: 'auto'}}