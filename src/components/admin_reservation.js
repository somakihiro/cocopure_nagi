import React from "react"
import _ from "lodash"
import moment from "moment"
import { withStyles } from "@material-ui/core/styles"
import Modal from "@material-ui/core/Modal"
import ExpansionPanel from "@material-ui/core/ExpansionPanel"
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails"
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import DateFnsUtils from "@date-io/date-fns"
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers"
import Button from "@material-ui/core/Button"
import { db } from "../../firebase-config"

class AdminReservation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      reservations: [],
      expanded: false,
      selectedDate: new Date(),
      // isEditModalOpen: false,
      // editReservation: {},
    }
  }

  componentDidMount() {
    this.getReservations()
  }

  getReservations() {
    const reservations = []
    db.collection("reservations")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const document = doc.data()
          if (
            document &&
            moment(document.date.toDate())
              .add(6, "h")
              .toDate() > new Date()
          ) {
            document.id = doc.id
            reservations.push(document)
          }
        })
      })
      .then(res =>
        this.setState({
          reservations: _.sortBy(reservations, r => r.date),
        })
      )
      .catch(e => console.log(e))
  }

  handleChange(panel, _event, isExpanded) {
    this.setState({ expanded: isExpanded ? panel : false })
  }

  handleDateChange(date) {
    this.setState({ selectedDate: date })
  }

  addReservation() {
    db.collection("reservations")
      .add({
        date: this.state.selectedDate,
        reserved_flag: false,
        name: "",
        email: "",
        menu: {},
        option_menus: {},
      })
      .then(() => this.getReservations())
      .catch(e => console.log(e))
  }

  cancel(reservationId) {
    db.collection("reservations")
      .doc(reservationId)
      .update({
        reserved_flag: false,
        name: "",
        email: "",
        menu: {},
        option_menus: {},
      })
      .then(() => this.getReservations())
      .catch(e => console.log(e))
  }

  deleteReservation(reservationId) {
    db.collection("reservations")
      .doc(reservationId)
      .delete()
      .then(() => this.getReservations())
      .catch(e => console.log(e))
  }

  // openEditModal(reservationId) {
  //   const { reservations } = this.state
  //   const reservation = reservations.find(r => r.id === reservationId)
  //   this.setState({ editReservation: reservation, isEditModalOpen: true })
  // }

  // closeEditModal() {
  //   this.setState({ isEditModalOpen: false })
  // }

  render() {
    const { reservations, expanded, selectedDate } = this.state
    return (
      <div>
        {/*
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={isEditModalOpen}
          onClose={this.closeEditModal.bind(this)}
        >
          <div style={styles.modal}>
            <h2 id="simple-modal-title">Text in a modal</h2>
            <p id="simple-modal-description">
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </p>
          </div>
        </Modal>
        */}
        <p>営業日の追加</p>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            variant="inline"
            format="yyyy/MM/dd"
            margin="normal"
            id="date-picker-inline"
            label="Date picker inline"
            value={selectedDate}
            onChange={this.handleDateChange.bind(this)}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
          <KeyboardTimePicker
            margin="normal"
            id="time-picker"
            label="Time picker"
            value={selectedDate}
            onChange={this.handleDateChange.bind(this)}
            KeyboardButtonProps={{
              "aria-label": "change time",
            }}
          />
        </MuiPickersUtilsProvider>
        <Button onClick={this.addReservation.bind(this)}>追加</Button>
        <p>予約一覧</p>
        {reservations.map(r => {
          const date = moment(r.date.toDate()).format("YYYY/M/D (ddd) HH:mm")
          return (
            <ExpansionPanel
              key={r.date}
              expanded={expanded === r.date}
              onChange={this.handleChange.bind(this, r.date)}
            >
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <p>{date}</p>
                <p>予約状況 {r.reserved_flag ? "○" : "×"}</p>
              </ExpansionPanelSummary>
              {r.reserved_flag ? (
                <div>
                  <ExpansionPanelDetails>
                    <p>予約者氏名:　{r.name}</p>
                  </ExpansionPanelDetails>
                  <ExpansionPanelDetails>
                    <p>メールアドレス:　{r.email}</p>
                  </ExpansionPanelDetails>
                  <ExpansionPanelDetails>
                    <p>
                      メニュー:　{r.menu.title} {r.menu.treatmentTime}m
                    </p>
                  </ExpansionPanelDetails>
                  <ExpansionPanelDetails>
                    <p>オプション:　</p>
                    {r.option_menus.massageMenus.length > 0 ? (
                      <p>
                        {r.option_menus.massageMenus
                          .map(m => m.title)
                          .join("、 ")}
                      </p>
                    ) : (
                      <p>なし</p>
                    )}
                  </ExpansionPanelDetails>
                  <ExpansionPanelDetails>
                    <p>
                      使用パック:　
                      {r.option_menus.pack && r.option_menus.pack.title}
                    </p>
                  </ExpansionPanelDetails>
                </div>
              ) : (
                <ExpansionPanelDetails>
                  <p>予約なし</p>
                </ExpansionPanelDetails>
              )}
              <ExpansionPanelDetails>
                {/*
                <Button onClick={this.openEditModal.bind(this, r.id)}>
                  編集
                </Button>
                */}
                {r.reserved_flag && (
                  <Button onClick={this.cancel.bind(this, r.id)}>
                    キャンセル
                  </Button>
                )}
                <Button onClick={this.deleteReservation.bind(this, r.id)}>
                  削除
                </Button>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          )
        })}
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
  // modal: {
  //   position: "absolute",
  //   width: "400px",
  //   top: "10%",
  //   left: "50%",
  //   marginLeft: "-200px",
  //   backgroundColor: "#fff",
  //   borderRadius: "3px",
  //   padding: "10px",
  // },
}

export default withStyles(styles)(AdminReservation)
