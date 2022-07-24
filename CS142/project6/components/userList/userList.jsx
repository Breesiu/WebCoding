import React from "react";
import { HashRouter, Route, Link } from "react-router-dom";
import "./userList.css";
import { Divider, List, ListItem, ListItemText } from "@material-ui/core";
import fetchModel from "../../lib/fetchModelData";

/**
 * Define UserList, a React componment of CS142 project #5
 */
class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      users: '',
    };
    // const userList = fetchModel(`http://localhost:3000/user/list`)
    //     .then(response => {this.setState({users: response.data,});});
  }
  componentDidMount() {
    const userList = fetchModel(`http://localhost:3000/user/list`)
        .then(response => {this.setState({users: response.data,});});
  }
  render() {
    // const users = window.cs142models.userListModel(); //TODO: to Understand window
    // const userList = await fetchModel(`http://localhost:3000/user/list`);//TODO wait fetchModel?
    console.log("asd" + this.state.users);
    // console.error("ad");
    return this.state.users?(
      <div>
        {/* <Typography variant="body1">
          This is the user list, which takes up 3/12 of the window.
          You might choose to use <a href="https://mui.com/components/lists/">Lists</a> and <a href="https://mui.com/components/dividers/">Dividers</a> to
          display your users like so:
        </Typography> */}
        <List component="nav">
          {this.state.users.map((user) => {
            //TODO: to Understand map return
            return (
              <ListItem button component = {Link} to={`/users/${user._id}`} key={user._id} onClick={() => this.props.onClick(user)}>
                <ListItemText primary={`${user.first_name} ${user.last_name}`} />
              </ListItem>
            );
          })}
        </List>
      </div>
    ):(<div></div>);
  }
}

export default UserList;
