import React from 'react';
import {
    Avatar, Button,
    Card,
    CardActions, CardContent, CardHeader, CardMedia,
    Collapse, IconButton,
    ImageList, ImageListItem, List, ListItem, ListItemText,
    Typography
} from '@material-ui/core';
import './userPhotos.css';
import {Comment, ExpandMore, SportsHockey} from "@material-ui/icons";
import {red} from "@material-ui/core/colors";
import {Link} from "react-router-dom";


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
            <div>
                {photos.map((photo) => {
                    return (
                        <Card sx={{maxWidth: 345}}>
                            <CardHeader
                                // avatar={
                                //     <Avatar component={Button} sx={{bgcolor: red[500]}} aria-label="recipe">
                                //         {`${photo.user.first_name} ${photo.user.last_name}`}
                                //     </Avatar>
                                // }
                                // title="Shrimp and Chorizo Paella"
                                subheader={photo.date_time}
                            />
                            <CardMedia
                                component="img"
                                height="194"
                                image={`../images/${photo.file_name}`}
                                alt=""
                            />
                            <CardContent>
                                <Typography variant="body2" color="text.secondary">
                                    {/*<SelfComment comment = {photo.comments.comment}/>*/}
                                    {/*{console.log(`<SelfComment comment = ${photo.comments.comment}/>`)}*/}
                                </Typography>
                            </CardContent>
                            <Comments comments = {photo.comments} onClick={() => this.props.onClick(photo.comments.user)}/>
                        </Card>
                    );
                })}</div>
        ) : <div></div>;
        return retHtml;
    }
}

export default UserPhotos;

function Comments(props){
    return props.comments?(
        props.comments.map((comment) => {
            return(
            <CardContent>
                <Button  onClick={props.onClick}>
                    <Link to={`/users/${comment.user._id}`}>
                        {`${comment.user.first_name} ${comment.user.last_name}`}
                    </Link>
                </Button>

                <Typography paragraph>
                    {comment.comment}
                </Typography>

                <Typography paragraph>
                    {comment.date_time}
                </Typography>
            </CardContent>
            );})):<CardContent></CardContent>;

}
// function SelfComment(props){
//     console.log("props comment" + props.comment);
//     return props.comment?<div>{props.comment}</div>:<div></div>;
// }