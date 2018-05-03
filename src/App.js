import React, { Component } from 'react';
import { View, Text} from 'react-native';
import firebase from 'firebase';
import { Header, Button, CardSection, Spinner } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {

  state = { loggedIn: null };

  componentWillMount() {
    firebase.initializeApp({
      apiKey: "AIzaSyDXlNr4m2x87logQF2Q19wkvzxICFTNnxs",
      authDomain: "auth-f59a7.firebaseapp.com",
      databaseURL: "https://auth-f59a7.firebaseio.com",
      projectId: "auth-f59a7",
      storageBucket: "auth-f59a7.appspot.com",
      messagingSenderId: "517477381897"
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <CardSection>
            <Button onPress={ () => firebase.auth().signOut() }>Log Out</Button>
          </CardSection>
        )
      case false:
        return (
          <LoginForm />
        )
      default:
        return (
            <View style={{alignSelf: 'center', justifyContent: 'center'}}>
              <Spinner size="large" />
            </View>
        )
      }
  }

  render() {
    return (
      <View>
        <Header headerText="Authentication" />
        {this.renderContent()}
      </View>
    );
  };
}

export default App;
