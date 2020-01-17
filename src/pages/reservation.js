import React, { Component } from "react"
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"
import MenuItem from "@material-ui/core/MenuItem"
import moment from "moment"
import { makeStyles } from "@material-ui/core/styles"
import Layout from "../components/layout"
import { db } from "../../firebase-config"

export default class Reservation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      reservable_date_time: [],
      selected_date: "",
    }
  }

  componentDidMount() {
    const reservable_date_time = []
    db.collection("reservations")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const document = doc.data()
          if (document && document.reserved_flag) return
          reservable_date_time.push(
            moment(document.date.toDate()).format("M/D HH:mm")
          )
        })
      })
      .then(res => this.setState({ reservable_date_time }))
  }

  handleChange(event) {
    this.setState({ selected_date: event.target.value })
  }

  render() {
    const { reservable_date_time, selected_date } = this.state
    // const styles = useStyles()
    return (
      <Layout>
        <div>
          <p>
            希望の来店日時（予約可能日時が表示されますので、選択してください）
          </p>
          <FormControl>
            <Select
              style={{ marginLeft: 20 }}
              value={selected_date}
              onChange={this.handleChange.bind(this)}
            >
              {reservable_date_time &&
                reservable_date_time.map(date => {
                  return (
                    <MenuItem value={date} key={date}>
                      {date}
                    </MenuItem>
                  )
                })}
            </Select>
          </FormControl>
        </div>
      </Layout>
    )
  }
}

const useStyles = makeStyles({})
