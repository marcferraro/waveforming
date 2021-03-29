import Typography from '@material-ui/core/Typography';

const HowTo = props => {

    return(
        <div >
            <Typography paragraph>
                What is the WaveFunctionCollapse link to project repo and how are we using it? Created by Maxim Gumin link to github
                the function takes in an initial pattern bitmap and creates an output bitmap based on that pattern. This app will riff
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
        </div>
    )
}

export default HowTo

// style={{marginLeft: 180, marginRight: 'auto'}}