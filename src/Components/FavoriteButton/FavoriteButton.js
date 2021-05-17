import IconButton from '@material-ui/core/IconButton';

export default function FavoriteButton({currentId, handleFavoriteAdd}){

    return(
        <IconButton
            onClick={() => {
                console.log("This works!");
                console.log({currentId});
                handleFavoriteAdd();
            }}
        >
            Add Favorite
        </IconButton>
    )
}