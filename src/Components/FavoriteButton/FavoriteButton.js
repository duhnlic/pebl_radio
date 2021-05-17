import IconButton from '@material-ui/core/IconButton';

export default function FavoriteButton(){

    return(
        <IconButton
            onClick={() => {
                console.log("This works!")
            }}
        >
            Add Favorite
        </IconButton>
    )
}