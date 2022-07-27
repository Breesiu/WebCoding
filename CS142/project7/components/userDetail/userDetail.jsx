import React from "react";
import {Button, Grid, Typography} from "@material-ui/core";
import "./userDetail.css";
import {Link} from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";
import axios from "axios";
/**
 * Define UserDetail, a React componment of CS142 project #5
 */
class UserDetail extends React.Component  {
  constructor(props) {
    super(props);
    // const userId = props.match.params.userId;
    this.state = {
      user: '',
    };
  }
  //TODO fetchData in the constructor?
  componentDidMount(){
    axios.get(`http://localhost:3000/user/${this.props.match.params.userId}`)
        .then((response) => {
          this.setState({user: response.data});
        });
    console.log(`http://localhost:3000/user/${this.props.match.params.userId}`);
    console.log("getThere!");
  }

  // static getDerivedStateFromProps(props, state){
  //   let self = this;
  //   if (this.props.match.params.userId !== this.state.user._id) {
  //     const user = fetchModel(`http://localhost:3000/user/${this.props.match.params.userId}`)
  //         .then((response) => {
  //           self.setState({user: response.data});
  //         });
  //     // }
  //     console.log("componentUpdate");
  //   }
  // }
  // componentDidUpdate() {
  //   let self = this;
  //   if (this.props.match.params.userId !== this.state.user._id) {
  //     const user = fetchModel(`http://localhost:3000/user/${this.props.match.params.userId}`)
  //         .then((response) => {
  //           self.setState({user: response.data});
  //         });
  //     // }
  //     console.log("componentUpdate");
  //   }
  // }
  render() {
    // var userId = this.props.match.params.userId;
    // var user= fetchModel(`http://localhost:3000/user/${userId}`);
    //     // .then((response) => re)
    console.log(`http://localhost:3000/user/${this.props.match.params.userId}`);
    console.log(`http://localhost:3000/user/${JSON.stringify(this.state.user)}`);
    console.log("this.state.user" + this.state.user);
    var retHtml = !this.props.change && this.state.user !== '' ? (
        <Grid container justifyContent="space-evenly" alignItems="center">
          <Grid xs={6} item>
            <Typography variant="h3">
              {`${this.state.user.first_name} ${this.state.user.last_name}`}
            </Typography>
            <Typography variant="h5">
              {this.state.user.occupation} <br/>
              based in {this.state.user.location}
            </Typography>
            <Typography variant="body1">{this.state.user.description}</Typography>
          </Grid>
          <Grid xs={4} item>
            <Button component={Link} to={`/photos/${this.state.user._id}`} variant="contained" size="large"
                    onClick={() => this.props.onClick()}>
              See my photos!
            </Button>
          </Grid>
        </Grid>
    ) : (
        <div></div>
    );
    return retHtml;
  }
}

export default UserDetail;
