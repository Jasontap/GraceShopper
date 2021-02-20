import React from "react";
import { connect } from "react-redux";
import { fetchUsers } from "../store/users";
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';


export class SingleUser extends React.Component {
  componentDidMount() {
    this.props.getUsers();
  }
  
  render() {
    const { name, email, githubId, adminAuth, id } = this.props.user;
    const { isLoggedIn, admin } = this.props;

    return (
      <div>
        <div className='single-item-container' >
          <div>
            <p>User Name: { name }</p>
            <p>User Email: { email }</p>
            <p>User Github ID: { githubId ? githubId : 'No linked Github account.'}</p>
            {
              admin ? (
                <p>Admin User? { adminAuth ? 'Yes' : 'No' }</p>
              ) : (
                ''
              )
            }
          </div>
        </div>
        <div className='container'>
          <div className='close-buttons'>
            <Button>
              <Link to={`/users/edit/${id}`}>Update Your Info</Link>
            </Button>
          </div>
          {
            admin ? (
              <div className='close-buttons'>
                <Button>
                  <Link to='/users'>View All Users</Link>
                </Button>
              </div>
            ) : (
              ''
            )
          }
          <div className='close-buttons'>
            <Button>
              <Link to='/allbooks'>Return to shopping</Link>
            </Button>
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
    isLoggedIn: !!state.auth.id,
    admin: state.auth.adminAuth
  };
};

const mapDispatch = (dispatch) => {
  return {
    getUsers: () => dispatch(fetchUsers())
  };
};

export default connect(mapState, mapDispatch)(SingleUser);
