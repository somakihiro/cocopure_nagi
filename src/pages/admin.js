import React from "react"
// import Helmet from "react-helmet"
import { withStyles } from "@material-ui/core/styles"
import CircularProgress from "@material-ui/core/CircularProgress"
import firebase from "../../firebase-config"
import AdminSignIn from "../components/admin_signIn"
import AdminReservation from "../components/admin_reservation"
import AdminMenus from "../features/admin_menus"

class Admin extends React.Component {
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
      <div style={styles.wrapper}>
        {/* <Helmet title="COCOPURE 凪 - 管理画面" /> */}
        {loading ? (
          <CircularProgress />
        ) : isSignedIn ? (
          <div>
            <AdminReservation />
            {/* <AdminMenus /> */}
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
    padding: "0 16px",
    maxWidth: "1000px",
    maxHeight: "800px",
    margin: "0 auto",
  },
}

export default withStyles(styles)(Admin)
