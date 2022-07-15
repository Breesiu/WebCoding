import React from 'react';
import {
    Avatar,
    Card,
    CardActions, CardContent, CardHeader, CardMedia,
    Collapse, IconButton,
    ImageList, ImageListItem, List, ListItem, ListItemText,
    Typography
} from '@material-ui/core';
import './userPhotos.css';
import {ExpandMore} from "@material-ui/icons";
import {red} from "@material-ui/core/colors";


/**
 * Define UserPhotos, a React componment of CS142 project #5
 */
class UserPhotos extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        var photos = window.cs142models.photoOfUserModel(this.props.match.params.userId);
        console.log(this.props.change);
        console.log(JSON.stringify(photos));
        var retHtml = this.props.change ? (
            <div >
                {photos.map((photo) => {
                    return (
                        <div>
                            {/*TODO modify map     need to judge the existence of comments and photos*/}
                            {/*<ImageListItem key={photo._id}>*/}
                            {/*    <img*/}
                            {/*        src={`../images/${photo.file_name}`}*/}
                            {/*        srcSet={`../images/${photo.file_name}`}*/}
                            {/*        alt={photo.date_time}*/}
                            {/*        loading="lazy"*/}
                            {/*    />*/}
                            {/*</ImageListItem>*/}
                            <List sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
                                <img
                                    src={`../images/${photo.file_name}`}
                                    srcSet={`../images/${photo.file_name}`}
                                    alt={photo.date_time}
                                    loading="lazy"
                                />
                                {photo.comments.map((comment) => {return(
                                <ListItem alignItems="flex-start">
                                <ListItemText
                                primary={comment.user._id}
                                secondary={
                                <React.Fragment>
                                <Typography
                                sx={{display: 'inline'}}
                                component="span"
                                variant="body2"
                                color="text.primary"
                                >
                                    {comment.comment}
                                </Typography>
                                    {comment.date_time}
                                </React.Fragment>
                            }
                                />
                                </ListItem>
                                );
                            })}
                                <Card sx={{ maxWidth: 345 }}>
                                    <CardHeader
                                        avatar={
                                            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                                R
                                            </Avatar>
                                        }
                                        action={
                                            <IconButton aria-label="settings">
                                                {/*<MoreVertIcon />*/}
                                            </IconButton>
                                        }
                                        title="Shrimp and Chorizo Paella"
                                        subheader="September 14, 2016"
                                    />
                                    <CardMedia
                                        component="img"
                                        height="194"
                                        image="/static/images/cards/paella.jpg"
                                        alt="Paella dish"
                                    />
                                    <CardContent>
                                        <Typography variant="body2" color="text.secondary">
                                            This impressive paella is a perfect party dish and a fun meal to cook
                                            together with your guests. Add 1 cup of frozen peas along with the mussels,
                                            if you like.
                                        </Typography>
                                    </CardContent>
                                    <CardActions disableSpacing>
                                        <IconButton aria-label="add to favorites">
                                            {/*<FavoriteIcon />*/}
                                        </IconButton>
                                        <IconButton aria-label="share">
                                            {/*<ShareIcon />*/}
                                        </IconButton>
                                        {/*<ExpandMore*/}
                                        {/*    expand={expanded}*/}
                                        {/*    onClick={handleExpandClick}*/}
                                        {/*    aria-expanded={expanded}*/}
                                        {/*    aria-label="show more"*/}
                                        {/*>*/}
                                        {/*    <ExpandMoreIcon />*/}
                                        {/*</ExpandMore>*/}
                                    </CardActions>
                                    <Collapse timeout="auto" unmountOnExit>
                                        <CardContent>
                                            <Typography paragraph>Method:</Typography>
                                            <Typography paragraph>
                                                Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
                                                aside for 10 minutes.
                                            </Typography>
                                            <Typography paragraph>
                                                Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
                                                medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
                                                occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
                                                large plate and set aside, leaving chicken and chorizo in the pan. Add
                                                pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
                                                stirring often until thickened and fragrant, about 10 minutes. Add
                                                saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
                                            </Typography>
                                            <Typography paragraph>
                                                Add rice and stir very gently to distribute. Top with artichokes and
                                                peppers, and cook without stirring, until most of the liquid is absorbed,
                                                15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
                                                mussels, tucking them down into the rice, and cook again without
                                                stirring, until mussels have opened and rice is just tender, 5 to 7
                                                minutes more. (Discard any mussels that don&apos;t open.)
                                            </Typography>
                                            <Typography>
                                                Set aside off of the heat to let rest for 10 minutes, and then serve.
                                            </Typography>
                                        </CardContent>
                                    </Collapse>
                                </Card>
                    );
                })}
        ) : <div></div>;
        return retHtml;
    }
}

export default UserPhotos;
