import {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import Typography from '@material-ui/core/Typography';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';



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
    width: 120,
    height: 80,
    marginTop: theme.spacing(6),
    marginRight: theme.spacing(3),
  },
  controls: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: theme.spacing(2),
    // paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 52,
    width: 52,
    color: '#a6bac9'
  },
  button: {
    color: '#a6bac9',
  }
}));

// add a handlePLayPause function to control icon button play vs pause 

export default function MediaControlCard({handlePlay, currentStation, currentCountry, currentGenre, currentId, currentFavicon, handleFavoriteAdd, initPause, setInitPause}) {
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
                <>{!initPause ? 
                    <PlayCircleFilledIcon className={classes.playIcon}/>
                : 
                    <PauseCircleFilledIcon className={classes.playIcon}/>
                }</>
                </IconButton>
                </div>
                <div className={classes.controls}>
                <IconButton>
                  <PlaylistAddIcon
                    className="add-favorite"
                    currentId={currentId}
                    onClick={()=>{
                      handleFavoriteAdd()
                    }}
                  />
                  </IconButton>
                </div> 
            </div>
            <CardMedia
                className={classes.cover}
                image={currentFavicon}
                title="Radio_Icon"
            />
            </Card>
        
    );

}
