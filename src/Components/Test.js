import React from 'react';

export default class Button extends React.Component {
  constructor(){
    super();
    this.state = {
      isOnList: false,
    }
    this.handleAddClick = this.handleAddClick.bind(this);
    this.handleRemoveClick = this.handleRemoveClick.bind(this);
  }

  handleAddClick() {
    this.setState({
      isOnList: true,
    })
  }

  handleRemoveClick() {
    this.setState({
      isOnList: false,
    })
  }

  render() {
    let button;

    if (this.state.isOnList) {
      button = <Remove onClick={this.handleRemoveClick}/>;
    } else {
      button = <Add onClick={this.handleAddClick}/>;
    }

    return (
      <div>
        {button}
      </div>
    );
  }
}

function Add(props) {
  return (
    <button className="btn btn-success" onClick={props.onClick}>
      Add to List
    </button>
  );
}

function Remove(props) {
  return (
    <button className="btn btn-warning" onClick={props.onClick}>
      Remove from List
    </button>
  );
}

// export default class LoginControl extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       isLoggedIn: false,
//     };
//     this.handleLoginClick = this.handleLoginClick.bind(this);
//     this.handleLogoutClick = this.handleLogoutClick.bind(this);
//   }
//
//   handleLoginClick() {
//     this.setState({isLoggedIn: true});
//   }
//
//   handleLogoutClick() {
//     this.setState({isLoggedIn: false});
//   }
//
//   render() {
//     const isLoggedIn = this.state.isLoggedIn;
//     let button;
//     if (isLoggedIn) {
//       button = <LogoutButton onClick={this.handleLogoutClick} />;
//     } else {
//       button = <LoginButton onClick={this.handleLoginClick} />;
//     }
//
//     return (
//       <div>
//         {button}
//       </div>
//     );
//   }
// }
//
// // function Greeting(props) {
// //   const isLoggedIn = props.isLoggedIn;
// //   if (isLoggedIn) {
// //     return <UserGreeting />;
// //   }
// //   return <GuestGreeting />;
// // }
// //
// // function UserGreeting(props) {
// //   return <h1>Welcome back!</h1>;
// // }
// //
// // function GuestGreeting(props) {
// //   return <h1>Please sign up.</h1>;
// // }
//
// function LoginButton(props) {
//   return (
//     <button onClick={props.onClick}>
//       Login
//     </button>
//   );
// }
//
// function LogoutButton(props) {
//   return (
//     <button onClick={props.onClick}>
//       Logout
//     </button>
//   );
// }