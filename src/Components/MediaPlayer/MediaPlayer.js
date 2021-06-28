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
import CancelIcon from '@material-ui/icons/Cancel';
import AppBar from '@material-ui/core/AppBar';



const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'flex-start',
    backgroundColor: '#2f4858',
    color: '#a6bac9',
    boxShadow: '-8px 14px 4.1px 0 rgba(0, 0, 0, 0.225)',
    position: 'fixed',
    zIndex: '3000',
    width: '100%',
    height: '15%',
  },
  details: {
    display: 'flex',
    justifyContent: 'flex-start',
    marginTop: theme.spacing(6),
  },
  content: {
    // transform: 'translateY(-30%)',
    color: '#a6bac9',
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  cover: {
    width: 50,
    height: 50,
    marginRight: theme.spacing(1),
  },
  presses: {
    display: 'flex',
    flexDirection: 'column',
  },
  playControls: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: theme.spacing(2),
    transform: 'translateY(10%)',
  },
  playIcon: {
    height: 52,
    width: 52,
    color: '#a6bac9',
  },
  favControls: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: theme.spacing(2),
    transform: 'translate(2.5%, -15%)',
  },
  addFavorite: {
    color: '#a6bac9',
  },
  button: {
    color: '#a6bac9',
  }
}));


export default function MediaControlCard({handlePlay, currentStation, currentCountry, currentGenre, currentId, currentFavicon, handleFavoriteAdd, initPause }) {
  const classes = useStyles();

    return (
    
            <AppBar className={classes.root}>
            <div className={classes.details}>
                <div className={classes.presses}>
                  <div className={classes.playControls}>
                  <IconButton onClick={handlePlay} aria-label="play/pause">
                  {/* allow for UI to update play state */}
                  <>{!initPause ? 
                      <PauseCircleFilledIcon className={classes.playIcon}/>
                  : 
                      <PlayCircleFilledIcon className={classes.playIcon}/>
                  }</>
                  </IconButton>
                  </div>
                  <div className={classes.favControls}>
                  <IconButton>
                    <PlaylistAddIcon
                      className={classes.addFavorite}
                      currentId={currentId}
                      onClick={()=>{
                        handleFavoriteAdd()
                      }}
                    />
                    </IconButton>
                  </div> 
                </div>
                <CardContent className={classes.info}>
                  <Typography component="h5" variant="h6" className={classes.content}>
                      Station: {currentStation}
                  </Typography>
                  <Typography variant="subtitle2" className={classes.content}>
                      Country: {currentCountry}
                  </Typography>
                  <Typography variant="subtitle2" className={classes.content}>
                      Genre: {currentGenre}
                  </Typography>
                  <CardMedia
                      className={classes.cover}
                      image={currentFavicon}
                      title="Radio_Icon"
                  />
                </CardContent>
            </div>
            </AppBar>
        
    );

}
