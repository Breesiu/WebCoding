import React from "react";
import {Button, Grid, Typography} from "@material-ui/core";
import "./userDetail.css";
import {Link} from "react-router-dom";

/**
 * Define UserDetail, a React componment of CS142 project #5
 */
class UserDetail extends React.Component {
  constructor(props) {
    super(props);

  }
  render() {
    var userId = this.props.match.params.userId;
    var user= window.cs142models.userModel(userId);
    var retHtml = this.props.change ? (
      <div></div>
    ) : (
      <Grid container justify="space-evenly" alignItems="center">
        <Grid xs={6} item>
          <Typography variant="h3">
            {`${user.first_name} ${user.last_name}`}
          </Typography>
          <Typography variant="h5">
            {user.occupation} <br />
            based in {user.location}
          </Typography>
          <Typography variant="body1">{user.description}</Typography>
        </Grid>
        <Grid xs={4} item>
          <Button variant="contained" size="large" onClick={() => this.props.onClick()}>
            <Link to={`/photos/${user._id}`}>See photos</Link>
          </Button>
        </Grid>
      </Grid>
    );
    return retHtml;
  }
}

export default UserDetail;
