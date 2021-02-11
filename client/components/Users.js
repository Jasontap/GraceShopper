import React from "react";
import { connect } from "react-redux";
import { fetchUsers } from "../store/users";
import { Link } from "react-router-dom";

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
          <h3><Link to='/add-user'>Add a User</Link></h3>
          {
            users.map((user) => {
              return (
                <div key={user.id}>
                    <p>User Name: {<Link to={`/users/${user.id}`}> { user.name }</Link>}</p>
                    <p>User Email: { user.email }</p>
                    <p>User Github ID: { user.githubId ? user.githubId : 'No linked Github account.'}</p>
                    <p>Admin? { user.adminAuth ? 'Yes' : 'No' }</p>
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
