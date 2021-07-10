import {useEffect, useState} from 'react';
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
    backgroundColor: '#b8c1ec',
    color: '#a6bac9',
    boxShadow: '-8px 14px 4.1px 0 rgba(0, 0, 0, 0.225)',
    position: 'fixed',
    zIndex: '3000',
    width: '100%',
    height: '15%',
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    alignItems: 'flex-start',
    width: '80vw',
    overflow: 'hidden',
    padding: '0',
    margin: '16px',
  },
  contentTitle: {
    overflow: 'hidden',
    transform: 'translateY(12%)',
    transform: 'translateX(-0.23%)',
    display: 'flex',
    color: '#121629',
    whiteSpace: 'nowrap',
  },
  contentTitleActive: {
    overflow: 'hidden',
    transform: 'translateY(12%)',
    display: 'flex',
    color: '#121629',
    whiteSpace: 'nowrap',
    animation: 'scrolling 25s linear infinite',
  },
  contentCode: {
    transform: 'translateY(5%)',
    display: 'inline-block',
    color: '#121629',
    whiteSpace: 'nowrap',
  },
  contentGenre: {
    transform: 'translateY(5%)',
    display: 'inline-block',
    color: '#121629',
    whiteSpace: 'nowrap',
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
  playIcon: {
    height: 52,
    width: 52,
    color: '#121629',
  },
  addFavorite: {
    color: '#121629',
  },
  button: {
    color: '#a6bac9',
  },
}));

export default function MediaControlCard({ handlePlay, currentStation, currentCountry, currentGenre, currentId, currentFavicon, handleFavoriteAdd, initPause, playPause }) {
  const classes = useStyles();
    return (
            <AppBar className={classes.root}>
            <div className="details">
                <div className={classes.presses}>
                  <div className="playControls">
                  <IconButton onClick={handlePlay} aria-label="play/pause">
                  {/* allow for UI to update play state */}
                  <>{!initPause ? 
                      <PauseCircleFilledIcon className={classes.playIcon}/>
                  : 
                      <PlayCircleFilledIcon className={classes.playIcon}/>
                  }</>
                  </IconButton>
                  </div>
                  <div className="favControls">
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
                <>{!playPause ?
                      <Typography component="h5" variant="h6" className={classes.contentTitle} refresh="true">
                          Station: {currentStation}
                      </Typography>
                  :
                      <Typography component="h5" variant="h6" className={classes.contentTitleActive} refresh="true">
                          Station: {currentStation}
                      </Typography>

                }</>
                  <Typography variant="subtitle2" className={classes.contentCode}>
                      Country: {currentCountry}
                  </Typography>
                  <Typography variant="subtitle2" className={classes.contentGenre}>
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
