import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import ReactAudioPlayer from 'react-audio-player';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    backgroundColor: '#2f4858',
    color: '#a6bac9'
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
    width: 151,
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

export default function MediaControlCard({handlePlay}) {
  const classes = useStyles();

  

      
    return (
    
            <Card className={classes.root}>
            <div className={classes.details}>
                <CardContent className={classes.content}>
                <Typography component="h5" variant="h5" className={classes.content}>
                    Station:
                </Typography>
                <Typography variant="subtitle1" className={classes.content}>
                    Country:
                </Typography>
                <Typography variant="subtitle2" className={classes.content}>
                    Genre:
                </Typography>
                </CardContent>
                <div className={classes.controls}>
                <IconButton onClick={handlePlay} aria-label="play/pause">
                
                    <PlayArrowIcon 
                    className={classes.playIcon}
                    
                    
                    
                    />
                </IconButton>

                </div>
            </div>
            <CardMedia
                className={classes.cover}
                image="/static/images/cards/live-from-space.jpg"
                title="Live from space album cover"
            />
            </Card>
        
    );

}
