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
    const { handleChange, handleSubmit } = this;

    return (
      <div>
        <div className='container' >
          <div>
            <form onSubmit={ handleSubmit }>
              <div>
                <label htmlFor='name' >Name:
                <input name='name' onChange={ handleChange } value={ name }/>
                </label>
              </div>
              <div>
                <label htmlFor='email' >Email:
                <input name='email' onChange={ handleChange } value={ email }/>
                </label>
              </div>
              <div>
                <label htmlFor='githubIde' >Github ID:
                <input name='githubId' onChange={ handleChange } value={ githubId ? githubId : '' }/>
                </label>
              </div>
              <div>
                <label htmlFor='adminAuth' >Admin:
                <input name='adminAuth' onChange={ handleChange } value={ adminAuth } size='7'/>
                </label>
              </div>
              <div>
                  <Button type="submit">Submit Changes</Button>
                  <Button><Link to='/users'>Return to Users</Link></Button>
              </div>
            </form>
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
    getUsers: () => dispatch(fetchUsers()),
    editUser: (user) => dispatch(updateUser(user))
  };
};

export default connect(mapState, mapDispatch)(EditUser);
