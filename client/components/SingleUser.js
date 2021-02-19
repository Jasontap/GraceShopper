import React from "react";
import { connect } from "react-redux";
import { fetchUsers } from "../store/users";


export class SingleUser extends React.Component {
  componentDidMount() {
    this.props.getUsers();
  }
  
  render() {
    const { user } = this.props;

    return (
      <div>
        <div className='container' >
          <div>
            <p>User Name: { user.name }</p>
            <p>User Email: { user.email }</p>
            <p>User Github ID: { user.githubId ? user.githubId : 'No linked Github account.'}</p>
            <p>Admin? { user.adminAuth ? 'Yes' : 'No' }</p>
          </div>
        </div>
      </div>
    );
  }
}

const mapState = (state, { match }) => {
  const user = state.users.find( user => user.id === match.params.id * 1 ) || {};
  return { user };
};

const mapDispatch = (dispatch) => {
  return {
    getUsers: () => dispatch(fetchUsers())
  };
};

export default connect(mapState, mapDispatch)(SingleUser);
