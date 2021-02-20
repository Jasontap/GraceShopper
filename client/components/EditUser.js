import React from "react";
import { connect } from "react-redux";
import { fetchUsers, updateUser } from "../store/users";
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

export class EditUser extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      name: this.props.user.name,
      email: this.props.user.email,
      githubId: this.props.user.githubId,
      adminAuth: this.props.user.adminAuth,
      id: this.props.user.id
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange (evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  handleSubmit (evt) {
    evt.preventDefault();
    this.props.editUser({...this.state})
  }
  
  render() {
    const { name, email, githubId, adminAuth } = this.state;
    const { admin, user } = this.props;
    const { handleChange, handleSubmit } = this;

    return (
      <div className='single-item-container'>
        <div>
          <form onSubmit={ handleSubmit } className='single-item-container'>
            <div>
              <label htmlFor='name' ><h1>Name:</h1></label>
              <input name='name' onChange={ handleChange } value={ name ? name : '' }/>
            </div>
            <div>
              <label htmlFor='email' ><h3>Email: </h3></label>
              <input name='email' onChange={ handleChange } value={ email ? email : '' }/>
            </div>
            <div>
              <label htmlFor='githubIde' ><h3>Github ID: </h3></label>
              <input name='githubId' onChange={ handleChange } value={ githubId ? githubId : '' }/>
            </div>
            {
              admin ? (
                <div>
                  <label htmlFor='adminAuth' ><h3>Admin: </h3></label>
                  <input name='adminAuth' onChange={ handleChange } value={ adminAuth } size='7'/>
                </div>
              ) : (
                ''
              )
            }
            <div className='container'>
              <div className='close-buttons'>
                <Button type="submit">Save</Button>
              </div>
              {
                admin ? (
                  <div className='close-buttons'>
                    <Button>
                      <Link to='/users'>View all Users</Link>
                    </Button>
                  </div>
                ) : (
                  ''
                )
              }
              <div className='close-buttons'>
                <Button>
                  <Link to={`/users/${ user.id }`}>View Account</Link>
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapState = (state, { match }) => {
  const user = state.users.find( user => user.id === match.params.id * 1 ) || {};
  return { 
    user,
    admin: state.auth.adminAuth
  };
};

const mapDispatch = (dispatch) => {
  return {
    getUsers: () => dispatch(fetchUsers()),
    editUser: (user) => dispatch(updateUser(user))
  };
};

export default connect(mapState, mapDispatch)(EditUser);
