import React from 'react';
import {
    Button,
    Card,
    CardContent, CardHeader, CardMedia,
    Typography
} from '@material-ui/core';
import './userPhotos.css';
import {Link} from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";
import axios from "axios";
//TODO: How to combine with link and button A:has be coped. use Button with component={Link}
//TODO: How to remove the outer div, which will worse the experience of surfing website

/**
 * Define UserPhotos, a React componment of CS142 project #5
 */
class UserPhotos extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            photos: '',
        };
        // eslint-disable-next-line no-undef
        // const photos = fetchModel(`http://localhost:3000/photosOfUser/${props.match.params.userId}`)
        //     .then((response) => {this.setState({photos: response.data});});
        // console.log(`http://localhost:3000/photosOfUser/${props.match.params.userId}`);
        // console.log(photos);
    }
    componentDidMount() {
        axios.get(`http://localhost:3000/photosOfUser/${this.props.match.params.userId}`)
            .then((response) => {this.setState({photos: response.data});});
        console.log(`http://localhost:3000/photosOfUser/${this.props.match.params.userId}`);
    }
        // componentDidUpdate() {
    //     let self = this;
    //     if (this.props.match.params.userId !== this.state.photos.user_id) {
    //         const user = fetchModel(`http://localhost:3000/photosOfUser/${this.props.match.params.userId}`)
    //             .then((response) => {
    //                 self.setState({user: response.data});
    //             });
    //         // }
    //         console.log("componentUpdate");
    //     }
    // }
    render() {
        // var photos = window.cs142models.photoOfUserModel(this.props.match.params.userId);
        console.log(this.props.change);
        console.log(this.state.photos);

        // console.log(JSON.stringify(photos));
        var retHtml = this.props.change && this.state.photos !== ''? (
            <div>
                {this.state.photos.map((photo) => {
                    console.log(photo);
                    return (
                        <Card sx={{maxWidth: 345}} key={photo.id}>
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
                                // height="194"
                                image={`../images/${photo.file_name}`}
                                alt=""
                            />
                            <CardContent>
                                <Typography variant="body2" color="text.secondary">
                                    {/*<SelfComment comment = {photo.comments.comment}/>*/}
                                    {/*{console.log(`<SelfComment comment = ${photo.comments.comment}/>`)}*/}
                                </Typography>
                            </CardContent>
                            <Comments comments = {photo.comments} onClick={(user) => this.props.onClick(user)}/>
                        </Card>
                    );
                })}
            </div>
        ) : <div></div>;
        return retHtml;
    }
}

export default UserPhotos;

function Comments(props){
    return props.comments?(
        props.comments.map((comment) => {
            return(
            <CardContent key={comment._id}>
                <Button component={Link} to={`/users/${comment.user._id}`} onClick={() => props.onClick(comment.user)}>
                    {`${comment.user.first_name} ${comment.user.last_name}`}
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