import React from "react";
import { connect } from "react-redux";
import { fetchUsers } from "../store/users";
import { Link } from "react-router-dom";
<<<<<<< HEAD

=======
>>>>>>> 3c168ec... Setup view/option switch per admin authorization

export class Users extends React.Component {
  componentDidMount() {
    this.props.getUsers();
  }
  
  render() {
    const { users } = this.props;
    // const userId = this.props.auth.id;
    return (
      <div>
        <div>
          {
            users.map((user) => {
              return (
                <div key={user.id}>
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 7609e2e... Added SingleUser component for admin to view individual user
                  <p>User Name: {<Link to={`/users/${user.id}`}> { user.name }</Link>}</p>
                  <p>User Email: { user.email }</p>
                  <p>User Github ID: { user.githubId ? user.githubId : 'No linked Github account.'}</p>
                  <p>Admin? { user.adminAuth ? 'Yes' : 'No' }</p>
<<<<<<< HEAD
=======
                    <p>User Name: {<Link to={`/users/${user.id}`}> { user.name }</Link>}</p>
                    <p>User Email: { user.email }</p>
                    <p>User Github ID: { user.githubId ? user.githubId : 'No linked Github account.'}</p>
                    <p>Admin? { user.adminAuth ? 'Yes' : 'No' }</p>
>>>>>>> 3c168ec... Setup view/option switch per admin authorization
=======
>>>>>>> 7609e2e... Added SingleUser component for admin to view individual user
                </div>
              );
            })
          }
        </div>
      </div>
    );
  }
}

const mapState = ({ users }) => {
  return { users };
};

const mapDispatch = (dispatch) => {
  return {
    getUsers: () => dispatch(fetchUsers())
  };
};

export default connect(mapState, mapDispatch)(Users);
