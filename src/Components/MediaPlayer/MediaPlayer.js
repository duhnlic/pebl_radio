import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    // justifyContent: 'center'
    backgroundColor: '#2f4858',
    color: '#a6bac9',
    boxShadow: '-8px 14px 4.1px 0 rgba(0, 0, 0, 0.225)',
    position: 'fixed',
    zIndex: '3000',
    width: '94%',
    height: 'auto',
    
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
    color: '#a6bac9'
  },
  cover: {
    width: 81,
    height: 81,
    marginTop: theme.spacing(6),
    marginRight: theme.spacing(3),
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 52,
    width: 150,
    color: '#a6bac9'
  },
}));

export default function MediaControlCard({handlePlay, currentStation, currentCountry, currentGenre}) {
  const classes = useStyles();

    return (
    
            <Card className={classes.root}>
            <div className={classes.details}>
                <CardContent className={classes.content}>
                <Typography component="h5" variant="h5" className={classes.content}>
                    Station: {currentStation}
                </Typography>
                <Typography variant="subtitle1" className={classes.content}>
                    Country: {currentCountry}
                </Typography>
                <Typography variant="subtitle2" className={classes.content}>
                    Genre: {currentGenre}
                </Typography>
                </CardContent>
                <div className={classes.controls}>
                <IconButton onClick={handlePlay} aria-label="play/pause">
                    <PlayArrowIcon className={classes.playIcon}/>
                </IconButton>
                </div>
            </div>
            <CardMedia
                // className={classes.cover}
                // image={play}
                // title="Radio_Icon"
            />
            </Card>
        
    );

}
