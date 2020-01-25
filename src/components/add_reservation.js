import React from "react"
import _ from "lodash"
import moment from "moment"
import { withStyles } from "@material-ui/core/styles"
import ExpansionPanel from "@material-ui/core/ExpansionPanel"
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails"
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import Button from "@material-ui/core/Button"
import { db } from "../../firebase-config"

class AdminReservation extends React.Component {
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     reservations: [],
  //     expanded: false,
  //     isAddReservationPageOpen: false,
  //   }
  // }

  // componentDidMount() {
  //   this.getReservations()
  // }

  // getReservations() {
  //   const reservations = []
  //   db.collection("reservations")
  //     .get()
  //     .then(querySnapshot => {
  //       querySnapshot.forEach(doc => {
  //         const document = doc.data()
  //         if (document) reservations.push(document)
  //       })
  //     })
  //     .then(res =>
  //       this.setState({
  //         reservations: _.sortBy(reservations, r => r.date),
  //       })
  //     )
  //     .catch(e => console.log(e))
  // }

  // handleChange(panel, event, isExpanded) {
  //   this.setState({ expanded: isExpanded ? panel : false })
  // }

  // setIsAddReservationPageOpen() {
  //   this.setState({ isAddReservationPageOpen: true })
  // }

  render() {
    return <Button>hoge</Button>
  }
}

const styles = {
  wrapper: {
    padding: "70px 16px 104px",
    maxWidth: "1000px",
    maxHeight: "800px",
    margin: "0 auto",
  },
}

export default withStyles(styles)(AdminReservation)
