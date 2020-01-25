import React from "react"
import { withStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import firebase from "../../firebase-config"

class AdminSignIn extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: "",
    }
  }

  setEmail(event) {
    this.setState({ email: event.target.value })
  }

  setPassword(event) {
    this.setState({ password: event.target.value })
  }

  signIn() {
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(res => {
        console.log("sign in success")
      })
      .catch(error => {
        console.log(error)
      })
  }

  render() {
    return (
      <div style={styles.wrapper}>
        <div style={styles.container}>
          <p style={styles.text}>Admin Sign In</p>
          <div>
            <TextField
              label="メールアドレス"
              style={styles.textField}
              onChange={this.setEmail.bind(this)}
            />
          </div>
          <div>
            <TextField
              label="パスワード"
              style={styles.textField}
              onChange={this.setPassword.bind(this)}
            />
          </div>
          <Button style={styles.button} onClick={this.signIn.bind(this)}>
            ログイン
          </Button>
        </div>
      </div>
    )
  }
}

const styles = {
  wrapper: {
    padding: "70px 16px 104px",
    maxWidth: "1000px",
    maxHeight: "800px",
    margin: "0 auto",
  },
  container: {
    width: "55%",
    margin: "0 auto",
  },
  text: {
    textAlign: "center",
    fontSize: "25px",
  },
  textField: {
    width: "100%",
    margin: "15px 0",
  },
  button: {
    background: "#42c7c1",
    color: "white",
    height: 48,
    padding: "0 30px",
    width: "25%",
    marginTop: "25px",
    "&:hover": {
      background: "#42c7c1",
      opacity: 0.7,
    },
  },
}

export default withStyles(styles)(AdminSignIn)
