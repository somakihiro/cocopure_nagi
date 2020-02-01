import React from "react"
import _ from "lodash"
import moment from "moment"
import { withStyles } from "@material-ui/core/styles"
// import Modal from "@material-ui/core/Modal"
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
import Dialog from "./dialog"

class AdminReservation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      reservations: [],
      expanded: false,
      selectedDate: new Date(),
      isDialogOpenForCancel: false,
      isDialogOpenForDelete: false,
      cancelId: null,
      deleteId: null,
      // isEditModalOpen: false,
      // editReservation: {},
    }
  }

  componentDidMount() {
    this.initFetch()
  }

  async initFetch() {
    await this.getReservations()
    await this.setIsFirstVisit()
  }

  async getReservations() {
    const reservations = []
    await db
      .collection("reservations")
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
      .then(res => {
        this.setState({
          reservations: _.sortBy(reservations, r => r.date),
        })
      })
      .catch(e => console.log(e))
  }

  async setIsFirstVisit() {
    const newReservations = await Promise.all(
      this.state.reservations.map(async r => {
        if (!r.reserved_flag) return r
        return await db
          .collection("reservations")
          .where("email", "==", r.email)
          .get()
          .then(querySnapshot => {
            if (querySnapshot.size > 1) {
              r.isFirstVisit = false
              return r
            } else {
              r.isFirstVisit = true
              return r
            }
          })
          .catch(error => console.log(error))
      })
    )
    this.setState({ reservations: newReservations })
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
        address: "",
        menu: {},
        option_menus: {},
        isCampaign: false,
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
        address: "",
        menu: {},
        option_menus: {},
        isCampaign: false,
      })
      .then(() => {
        this.getReservations()
        this.setState({ isDialogOpenForCancel: false })
      })
      .catch(e => console.log(e))
  }

  deleteReservation(reservationId) {
    db.collection("reservations")
      .doc(reservationId)
      .delete()
      .then(() => {
        this.getReservations()
        this.setState({ isDialogOpenForDelete: false })
      })
      .catch(e => console.log(e))
  }

  handleCancel(reservationId) {
    this.setState({ isDialogOpenForCancel: true, cancelId: reservationId })
  }

  handleDelete(reservationId) {
    this.setState({ isDialogOpenForDelete: true, deleteId: reservationId })
  }

  closeDialog() {
    const { isDialogOpenForCancel } = this.state
    if (isDialogOpenForCancel) {
      this.setState({ isDialogOpenForCancel: false })
    } else {
      this.setState({ isDialogOpenForDelete: false })
    }
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
    const {
      reservations,
      expanded,
      selectedDate,
      isDialogOpenForCancel,
      isDialogOpenForDelete,
      cancelId,
      deleteId,
    } = this.state
    return (
      <div style={styles.wrapper}>
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
        <Dialog
          open={isDialogOpenForCancel || isDialogOpenForDelete}
          handleClose={this.closeDialog.bind(this)}
          exec={
            isDialogOpenForCancel
              ? this.cancel.bind(this, cancelId)
              : this.deleteReservation.bind(this, deleteId)
          }
          title={isDialogOpenForCancel ? "予約のキャンセル" : "予約の削除"}
          contentText={
            isDialogOpenForCancel
              ? "予約のキャンセルをすると、予約内容が削除され空席となります。本当にキャンセルしますか？"
              : "予約を削除すると、該当の予約内容（営業日含める）が全て削除されます。本当に削除しますか？"
          }
        />
        <p style={{ fontSize: "20px" }}>営業日の追加</p>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <div>
            <KeyboardDatePicker
              variant="inline"
              format="yyyy/MM/dd"
              margin="normal"
              id="date-picker-inline"
              label="日付選択"
              value={selectedDate}
              onChange={this.handleDateChange.bind(this)}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </div>
          <div>
            <KeyboardTimePicker
              margin="normal"
              id="time-picker"
              label="時間選択"
              value={selectedDate}
              onChange={this.handleDateChange.bind(this)}
              KeyboardButtonProps={{
                "aria-label": "change time",
              }}
            />
          </div>
        </MuiPickersUtilsProvider>
        <Button
          style={{ marginTop: "15px" }}
          variant="contained"
          color="primary"
          onClick={this.addReservation.bind(this)}
        >
          追加
        </Button>
        <p style={styles.reservationIndexTitle}>予約一覧</p>
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
                <p style={{ paddingLeft: "25px" }}>
                  予約状況 {r.reserved_flag ? "○" : "×"}
                </p>
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
                    <p>住所:　{r.address}</p>
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
                  {r.isCampaign && r.menu.campaignPrice && (
                    <ExpansionPanelDetails>
                      <p>キャンペーン価格:　○</p>
                    </ExpansionPanelDetails>
                  )}
                  <ExpansionPanelDetails>
                    <p>初来店: {r.isFirstVisit ? "○" : "×"}</p>
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
                  <Button
                    style={{ marginRight: "15px" }}
                    variant="contained"
                    color="primary"
                    onClick={this.handleCancel.bind(this, r.id)}
                  >
                    キャンセル
                  </Button>
                )}
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={this.handleDelete.bind(this, r.id)}
                >
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
  reservationIndexTitle: {
    marginTop: "40px",
    marginBottom: "20px",
    fontSize: "20px",
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
