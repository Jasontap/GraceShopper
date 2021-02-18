import React from "react";
import { connect } from "react-redux";
import { fetchUsers } from "../store/users";
import { Link } from "react-router-dom";

export class EditUser extends React.Component {
  constructor () {
    super();
    this.state = {
      name: '',
      email: '',
      githubId: 0,
      adminAuth: false
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
    this.props.addBook({...this.state})
  }

  componentDidMount() {
    this.props.getUsers();
  }
  
  render() {
    const { name, email, githubId, adminAuth } = this.state;
    const { user } = this.props;
    const { handleChange, handleSubmit } = this;

    return (
      <div>
        <div className='container' >
          <div>
            <form onSubmit={ handleSubmit }>
            <div>
              <label>Name:</label>
              <input name='name' onChange={ handleChange } value={ user.name } />
            </div>
            <div>
              <label>Email:</label>
              <input name='email' onChange={ handleChange } value={ user.email } />
            </div>
            <div>
              <label>Github ID:</label>
              <input name='githubId' onChange={ handleChange } value={ user.githubId ? user.githubId : 'No linked Github account.' } />
            </div>
            <div>
              <label>Admin:</label>
              <input name='adminAuth' onChange={ handleChange } value={ user.adminAuth } />
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
    getUsers: () => dispatch(fetchUsers())
  };
};

export default connect(mapState, mapDispatch)(EditUser);
