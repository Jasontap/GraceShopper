import React from "react";
import { connect } from "react-redux";
import { fetchUsers } from "../store/users";
import { Link } from "react-router-dom";
import { addToCart } from "../store/cart";

export class Users extends React.Component {
  componentDidMount() {
    this.props.getUsers();
  }
  
  render() {
    console.log(this.props.users);
    const { users } = this.props;
    // const userId = this.props.auth.id;
    return (
      <div>
        <div>
          {
            users.map((user) => {
              return (
                <div key={user.id}>
                  {/* <Link to={`/users/${user.id}`}> */}
                    <h3>User Name: { user.name }</h3>
                    <h3>User Email: { user.email }</h3>
                    <h3>User Github ID: { user.githubId }</h3>
                    <h3>Admin? { user.adminAuth ? 'yes' : 'no' }</h3>
                  {/* </Link> */}
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
