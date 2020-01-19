import React from "react"
import FormGroup from "@material-ui/core/FormGroup"
import FormControl from "@material-ui/core/FormControl"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Select from "@material-ui/core/Select"
import MenuItem from "@material-ui/core/MenuItem"
import TextField from "@material-ui/core/TextField"
import Checkbox from "@material-ui/core/Checkbox"
import Button from "@material-ui/core/Button"
import FormHelperText from "@material-ui/core/FormHelperText"
import Radio from "@material-ui/core/Radio"
import RadioGroup from "@material-ui/core/RadioGroup"
import { withStyles } from "@material-ui/core/styles"
import moment from "moment"
import "moment/locale/ja"
import Layout from "../components/layout"
import CompletedReservation from "../components/completed_reservation"
import { db } from "../../firebase-config"

class Reservation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      reservableDateTimes: [],
      selectedDateId: "",
      selectedMenuId: "",
      selectedPackId: 1,
      name: "",
      email: "",
      menuErrorText: "",
      dateErrorText: "",
      nameErrorText: "",
      emailErrorText: "",
      isReserved: false,
    }
    this.menus = [
      {
        id: 1,
        title: "凪ロイヤルトリートメント フェイシャルパックのお土産付き",
        treatmentTime: 150,
        price: "30,000",
      },
      {
        id: 2,
        title: "ファイシャル スタンダードコース",
        treatmentTime: 45,
        price: "5,500",
      },
      {
        id: 3,
        title: "ファイシャル スタンダードコース",
        treatmentTime: 60,
        price: "7,500",
      },
      {
        id: 4,
        title: "ファイシャル 美白ケアコース",
        treatmentTime: 70,
        price: "9,500",
      },
      {
        id: 5,
        title: "ファイシャル 美白ケアコース",
        treatmentTime: 100,
        price: "13,500",
      },
      {
        id: 6,
        title: "ファイシャル EMSたるみケアコース",
        treatmentTime: 70,
        price: "9,500",
      },
      {
        id: 7,
        title: "ファイシャル EMSたるみケアコース",
        treatmentTime: 100,
        price: "13,500",
      },
      {
        id: 8,
        title: "全身すっきりリンパトリートメント",
        treatmentTime: 70,
        price: "11,000",
      },
    ]
    this.optionMenus = {
      massageMenus: [
        {
          id: 1,
          title: "脚下マッサージ",
          treatmentTime: 10,
          price: "2,000",
          checked: false,
        },
        {
          id: 2,
          title: "脚全体マッサージ",
          treatmentTime: 20,
          price: "4,000",
          checked: false,
        },
        {
          id: 3,
          title: "腕マッサージ",
          treatmentTime: 10,
          price: "1,500",
          checked: false,
        },
        {
          id: 4,
          title: "背中マッサージ",
          treatmentTime: 20,
          price: "4,000",
          checked: false,
        },
        {
          id: 5,
          title: "デコルテマッサージ",
          treatmentTime: 15,
          price: "3,500",
          checked: false,
        },
        {
          id: 6,
          title: "ヘッドマッサージ",
          treatmentTime: 10,
          price: "2,000",
          checked: false,
        },
        {
          id: 7,
          title: "プラセンタ美容液導入",
          treatmentTime: 10,
          price: "3,000",
          checked: false,
        },
        {
          id: 8,
          title: "EMSたるみケア",
          treatmentTime: 10,
          price: "3,000",
          checked: false,
        },
        {
          id: 9,
          title: "ラジオ波トリートメント",
          treatmentTime: 10,
          price: "3,000",
          checked: false,
        },
        {
          id: 10,
          title: "ラジオ波トリートメント",
          treatmentTime: 20,
          price: "5,500",
          checked: false,
        },
      ],
      packs: [
        { id: 1, title: "鎮静パック", price: "0" },
        { id: 2, title: "炭酸パック", price: "3,000" },
        { id: 3, title: "水素パック", price: "3,000" },
      ],
    }
  }

  componentDidMount() {
    this.getReservableDateTimes()
  }

  getReservableDateTimes() {
    const reservableDateTimes = []
    db.collection("reservations")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const document = doc.data()
          if (document && document.reserved_flag) return
          reservableDateTimes.push({
            id: doc.id,
            dateTime: moment(document.date.toDate()).format(
              "YYYY/M/D (ddd) HH:mm"
            ),
          })
        })
      })
      .then(res => this.setState({ reservableDateTimes }))
  }

  setSelectedMenuId(event) {
    this.setState({ selectedMenuId: event.target.value })
  }

  setSelectedDateId(event) {
    this.setState({ selectedDateId: event.target.value })
  }

  setSelectedPackId(event) {
    const packId = Number(event.target.value)
    if (this.state.selectedPackId === packId) {
      this.setState({ selectedPackId: "" })
    } else {
      this.setState({ selectedPackId: packId })
    }
  }

  setName(event) {
    this.setState({ name: event.target.value })
  }

  setEmail(event) {
    this.setState({ email: event.target.value })
  }

  handleChangeCheckbox(event) {
    const menu = this.optionMenus.massageMenus.find(
      menu => menu.id === Number(event.target.value)
    )
    menu.checked = !menu.checked
  }

  onReservation() {
    const { selectedDateId, selectedMenuId, name, email } = this.state
    const selectedMenuIdForMenus = this.props.location.state
      ? this.props.location.state.selectedMenuIdForMenus
      : ""
    const menuId = selectedMenuId || selectedMenuIdForMenus
    const menu = this.menus.find(menu => menu.id === menuId)
    const option_menus = this.getSelectedOptionMenus()

    const docRef = db.collection("reservations").doc(selectedDateId)
    docRef
      .update({
        menu: `${menu.title} ${menu.treatmentTime}m`,
        name,
        email,
        reserved_flag: true,
        option_menus,
      })
      .then(() => {
        this.setState({ isReserved: true })
      })
      .catch(error => {
        console.error("Error updating document: ", error)
      })
  }

  getSelectedOptionMenus() {
    const massageMenus = this.optionMenus.massageMenus.filter(m => m.checked)
    const pack = this.optionMenus.packs.find(
      p => p.id === this.state.selectedPackId
    )
    return { massage_menus: massageMenus, pack: pack.title }
  }

  isValid() {
    const { selectedDateId, selectedMenuId, name, email } = this.state
    const selectedMenuIdForMenus = this.props.location.state
      ? this.props.location.state.selectedMenuIdForMenus
      : ""
    const emailFormat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return Boolean(
      selectedDateId !== "" &&
        (selectedMenuId !== "" || selectedMenuIdForMenus !== "") &&
        name.match(/\S/) &&
        email.match(emailFormat)
    )
  }

  onBlurValidateMenu(event) {
    const menuId = event.target.value
    const menuErrorText = menuId !== "" ? "" : "選択してください"
    this.setState({ menuErrorText })
  }

  onBlurValidateDate(event) {
    const dateId = event.target.value
    const dateErrorText = dateId !== "" ? "" : "選択してください"
    this.setState({ dateErrorText })
  }

  onBlurValidateName(event) {
    const name = event.target.value
    const nameErrorText = name.match(/\S/) ? "" : "入力してください"
    this.setState({ nameErrorText })
  }

  onBlurValidateEmail(event) {
    const email = event.target.value
    const emailFormat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const emailErrorText = !email.match(/\S/)
      ? "入力してください"
      : !email.match(emailFormat)
      ? "メールアドレスが正しくありません"
      : ""
    this.setState({ emailErrorText })
  }

  render() {
    const {
      reservableDateTimes,
      selectedDateId,
      selectedMenuId,
      selectedPackId,
      email,
      menuErrorText,
      dateErrorText,
      nameErrorText,
      emailErrorText,
      isReserved,
    } = this.state

    const { classes } = this.props

    const selectedMenuIdForMenus = this.props.location.state
      ? this.props.location.state.selectedMenuIdForMenus
      : ""

    return (
      <Layout>
        {isReserved ? (
          <CompletedReservation email={email} />
        ) : (
          <div className={classes.wrapper}>
            <p>メニュー</p>
            <FormControl error={menuErrorText !== ""}>
              <Select
                value={selectedMenuId || selectedMenuIdForMenus}
                onChange={this.setSelectedMenuId.bind(this)}
                onBlur={this.onBlurValidateMenu.bind(this)}
              >
                {this.menus.map(menu => {
                  return (
                    <MenuItem key={menu.id} value={menu.id}>
                      {menu.title} {menu.treatmentTime}m ¥{menu.price}
                    </MenuItem>
                  )
                })}
              </Select>
              {menuErrorText && (
                <FormHelperText>{menuErrorText}</FormHelperText>
              )}
            </FormControl>
            <p>
              希望の来店日時（予約可能日時が表示されますので、選択してください）
            </p>
            {reservableDateTimes.length > 0 ? (
              <FormControl error={dateErrorText !== ""}>
                <Select
                  value={selectedDateId}
                  onChange={this.setSelectedDateId.bind(this)}
                  onBlur={this.onBlurValidateDate.bind(this)}
                >
                  {reservableDateTimes &&
                    reservableDateTimes.map(date => {
                      return (
                        <MenuItem value={date.id} key={date.id}>
                          {date.dateTime}
                        </MenuItem>
                      )
                    })}
                </Select>
                {dateErrorText && (
                  <FormHelperText>{dateErrorText}</FormHelperText>
                )}
              </FormControl>
            ) : (
              <FormControl disabled={true}>
                <Select defaultValue="disabled">
                  <MenuItem value="disabled">
                    現在、空席がありません。申し訳ございませんが、日を改めてのご予約をよろしくお願い致します。
                  </MenuItem>
                </Select>
              </FormControl>
            )}
            <p>ご予約者氏名</p>
            <TextField
              error={nameErrorText !== ""}
              helperText={nameErrorText}
              onChange={this.setName.bind(this)}
              onBlur={this.onBlurValidateName.bind(this)}
            />
            <p>連絡可能なメールアドレス</p>
            <TextField
              error={emailErrorText !== ""}
              helperText={emailErrorText}
              onChange={this.setEmail.bind(this)}
              onBlur={this.onBlurValidateEmail.bind(this)}
            />
            <p>オプションメニュー</p>
            <FormGroup row={true}>
              {this.optionMenus.massageMenus.map(menu => {
                return (
                  <FormControlLabel
                    key={menu.id}
                    control={
                      <Checkbox
                        value={menu.id}
                        onChange={this.handleChangeCheckbox.bind(this)}
                      />
                    }
                    label={`${menu.title} ${menu.treatmentTime}m ¥${menu.price}`}
                  />
                )
              })}
            </FormGroup>
            <p>パックのグレードアップ</p>
            <FormControl>
              <RadioGroup
                value={selectedPackId}
                onChange={this.setSelectedPackId.bind(this)}
              >
                {this.optionMenus.packs.map(p => {
                  return (
                    <FormControlLabel
                      key={p.id}
                      control={<Radio />}
                      label={`${p.title} ¥${p.price}`}
                      value={p.id}
                    />
                  )
                })}
              </RadioGroup>
            </FormControl>
            <Button onClick={this.onHoge.bind(this)}>hoge</Button>
            <Button
              onClick={this.onReservation.bind(this)}
              className={
                this.isValid() ? classes.button : classes.disabledButton
              }
              disabled={!this.isValid()}
            >
              予約する
            </Button>
          </div>
        )}
      </Layout>
    )
  }
}

const styles = {
  wrapper: {
    maxWidth: "1000px",
    margin: "0 auto",
    padding: "70px 16px 104px",
  },
  button: {
    background: "#42c7c1",
    color: "white",
    height: 48,
    padding: "0 30px",
    "&:hover": {
      background: "#42c7c1",
      opacity: 0.7,
    },
  },
  disabledButton: {
    background: "rgb(240, 244, 249)",
    color: "white",
    height: 48,
    padding: "0 30px",
  },
}

export default withStyles(styles)(Reservation)
