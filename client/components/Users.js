import React from "react";
import { connect } from "react-redux";
import { fetchUsers } from "../store/users";
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';


export class Users extends React.Component {
  componentDidMount() {
    this.props.getUsers();
  }
  
  render() {
    const { users } = this.props;

    return (
      <div>
        <div className='container' >
          {
            users.map((user) => {
              return (
                <div key={user.id}>
                  <p>User Name: {<Link to={`/users/${user.id}`}> { user.name }</Link>}</p>
                  <p>User Email: { user.email }</p>
                  <p>User Github ID: { user.githubId ? user.githubId : 'No linked Github account.'}</p>
                  <p>Admin? { user.adminAuth ? 'Yes' : 'No' }</p>
                  <div>
                    <Button>
                      <Link to={`/users/edit/${user.id}`}>Edit This User</Link>
                    </Button>
                  </div>
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
  return { 
    users
  };
};

const mapDispatch = (dispatch) => {
  return {
    getUsers: () => dispatch(fetchUsers())
  };
};

export default connect(mapState, mapDispatch)(Users);
