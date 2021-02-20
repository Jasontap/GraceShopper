import React from "react";
import { connect } from "react-redux";
import { fetchUsers } from "../store/users";


export class SingleUser extends React.Component {
  componentDidMount() {
    this.props.getUsers();
  }
  
  render() {
    const { name, email, githubId, adminAuth } = this.props.user;

    return (
      <div>
        <div className='container' >
          <div>
            <p>User Name: { name }</p>
            <p>User Email: { email }</p>
            <p>User Github ID: { githubId ? githubId : 'No linked Github account.'}</p>
            <p>Admin? { adminAuth ? 'Yes' : 'No' }</p>
          </div>
        </div>
      </div>
    );
  }
}

const mapState = (state, { match }) => {
  const user = state.users.find( user => user.id === match.params.id * 1 ) || {};
  return { 
    user,
    isLoggedIn: !!state.auth.id
  };
};

const mapDispatch = (dispatch) => {
  return {
    getUsers: () => dispatch(fetchUsers())
  };
};

export default connect(mapState, mapDispatch)(SingleUser);
