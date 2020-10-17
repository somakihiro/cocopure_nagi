import React from "react"
import Header from "./header"
import { withStyles } from "@material-ui/core/styles"
import CircularProgress from "@material-ui/core/CircularProgress"
import firebase from "../../../firebase-config"
import AdminSignIn from "./signin"

class AdminLayout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isSignedIn: false,
      loading: true,
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ isSignedIn: true, loading: false })
      } else {
        this.setState({ isSignedIn: false, loading: false })
      }
    })
  }

  render() {
    const { isSignedIn, loading } = this.state
    return (
      <div>
        {loading ? (
          <CircularProgress />
        ) : isSignedIn ? (
          <div>
            <Header />
            <div style={styles.wrapper}>{this.props.children}</div>
          </div>
        ) : (
          <AdminSignIn />
        )}
      </div>
    )
  }
}

const styles = {
  wrapper: {
    maxWidth: "1000px",
    margin: "0 auto",
    padding: "100px 20px 30px",
  },
}

export default withStyles(styles)(AdminLayout)
