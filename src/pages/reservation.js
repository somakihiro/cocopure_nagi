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
import Paper from "@material-ui/core/Paper"
import Modal from "@material-ui/core/Modal"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import { withStyles } from "@material-ui/core/styles"
import moment from "moment"
import "moment/locale/ja"
import _ from "lodash"
import Layout from "../components/layout"
import CompletedReservation from "../components/completed_reservation"
import { db } from "../../firebase-config"
import firebase from "../../firebase-config"
import "firebase/functions"
import { Menus } from "../constants/app"

class Reservation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      reservableDateTimes: [],
      oneDayLimitedMenuDateTimes: [],
      selectedDateId: "",
      selectedMenuId: "",
      selectedPackId: 1,
      name: "",
      email: "",
      address: "",
      dateErrorText: "",
      nameErrorText: "",
      emailErrorText: "",
      addressErrorText: "",
      isReserved: false,
      checked: false,
      isMenuChange: false,
      isShowDetailModal: false,
      detailMenuId: "",
      isFirstVisit: "false",
    }

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
    this.getOneDayLimitedMenuDateTimes()
  }

  getReservableDateTimes() {
    const reservableDateTimes = []
    db.collection("reservations")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const document = doc.data()
          if (document) {
            const dateTime = document.date.toDate()
            if (
              document.reserved_flag ||
              moment()
                .add(1, "d")
                .toDate() > dateTime
            )
              return
            reservableDateTimes.push({
              id: doc.id,
              dateTime,
            })
          }
        })
      })
      .then(res =>
        this.setState({
          reservableDateTimes: _.sortBy(reservableDateTimes, d => d.dateTime),
        })
      )
  }

  getOneDayLimitedMenuDateTimes() {
    const oneDayLimitedMenuDateTimes = []
    db.collection("reservations")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const document = doc.data()
          const menu = document && document.menu
          if (menu && menu.id === 8) {
            oneDayLimitedMenuDateTimes.push(document.date.toDate())
          }
        })
      })
      .then(res => this.setState({ oneDayLimitedMenuDateTimes }))
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

  setAddress(event) {
    this.setState({ address: event.target.value })
  }

  handleChangeCheckbox(event) {
    const menu = this.optionMenus.massageMenus.find(
      menu => menu.id === Number(event.target.value)
    )
    menu.checked = !menu.checked
    this.setState({ checked: true })
  }

  onReservation() {
    const { selectedDateId, selectedMenuId, name, email, address } = this.state
    const selectedMenuIdForMenus = this.props.location.state
      ? this.props.location.state.selectedMenuIdForMenus
      : ""
    const menuId = selectedMenuId || selectedMenuIdForMenus
    const menu = Menus.find(menu => menu.id === menuId)
    const optionMenus = this.getSelectedOptionMenus()

    const docRef = db.collection("reservations").doc(selectedDateId)
    docRef
      .update({
        menu,
        name,
        email,
        address,
        reserved_flag: true,
        option_menus: optionMenus,
        isCampaign: this.getIsCampaign(),
      })
      .then(() => {
        this.setState({ isReserved: true })
        try {
          this.sendMailToAdmin(
            name,
            email,
            address,
            menu,
            selectedDateId,
            optionMenus
          )
          this.sendMailToClient(name, email, menu, selectedDateId, optionMenus)
        } catch (e) {
          console.log(e)
        }
      })
      .catch(error => {
        console.error("Error updating document: ", error)
      })
  }

  sendMailToAdmin(name, email, address, menu, dateId, optionMenus) {
    const date = this.state.reservableDateTimes.find(d => d.id === dateId)
    try {
      const sendMailToAdmin = firebase
        .functions()
        .httpsCallable("sendMailToAdmin")
      sendMailToAdmin({
        name,
        email,
        address,
        menu,
        date: moment(date.dateTime).format("YYYY/M/D (ddd) HH:mm"),
        optionMenus,
      })
    } catch (e) {
      console.log(e)
    }
  }

  sendMailToClient(name, email, menu, dateId, optionMenus) {
    const date = this.state.reservableDateTimes.find(d => d.id === dateId)
    const isCampaign = this.getIsCampaign()
    const totalPrice = this.separate(this.getTotalPrice())
    try {
      const sendMailToClient = firebase
        .functions()
        .httpsCallable("sendMailToClient")
      sendMailToClient({
        name,
        email,
        menu,
        date: moment(date.dateTime).format("YYYY/M/D (ddd) HH:mm"),
        optionMenus,
        totalPrice,
        isCampaign,
        isFirstVisit: this.state.isFirstVisit,
      })
    } catch (e) {
      console.log(e)
    }
  }

  getSelectedOptionMenus() {
    const massageMenus = this.optionMenus.massageMenus.filter(m => m.checked)
    const pack = this.optionMenus.packs.find(
      p => p.id === this.state.selectedPackId
    )
    return { massageMenus, pack }
  }

  isValid() {
    const { selectedDateId, selectedMenuId, name, email, address } = this.state
    const selectedMenuIdForMenus = this.props.location.state
      ? this.props.location.state.selectedMenuIdForMenus
      : ""
    const emailFormat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return Boolean(
      selectedDateId !== "" &&
        (selectedMenuId !== "" || selectedMenuIdForMenus !== "") &&
        name.match(/\S/) &&
        address.match(/\S/) &&
        email.match(emailFormat)
    )
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

  onBlurValidateAddress(event) {
    const address = event.target.value
    const addressErrorText = address.match(/\S/) ? "" : "入力してください"
    this.setState({ addressErrorText })
  }

  getTotalPrice() {
    const { selectedMenuId, isFirstVisit } = this.state
    const selectedMenuIdForMenus = this.props.location.state
      ? this.props.location.state.selectedMenuIdForMenus
      : ""
    const menuId = selectedMenuId || selectedMenuIdForMenus
    if (!menuId) return 0
    const menu = Menus.find(menu => menu.id === menuId)
    const isCampaign = this.getIsCampaign()
    const menuPrice =
      (isCampaign || isFirstVisit === "true") && menu.campaignPrice
        ? menu.campaignPrice
        : menu.price
    const optionMenus = this.getSelectedOptionMenus()
    const priceArray = optionMenus.massageMenus.map(m => m.price)
    priceArray.push(menuPrice, optionMenus.pack.price)
    const numberPriceArray = priceArray.map(p => Number(p.split(",").join("")))
    const totalPrice = numberPriceArray.reduce(
      (accumulator, currentValue) => accumulator + currentValue
    )
    return totalPrice
  }

  // 数値を料金表示するためにカンマで区切る
  separate(num) {
    return String(num).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
  }

  getSelectedMenu(id) {
    if (!id) return
    return Menus.find(menu => menu.id === id)
  }

  setIsMenuChange(bool) {
    this.setState({ isMenuChange: bool })
  }

  changeMenu(menuId) {
    this.setState({ isMenuChange: false, selectedMenuId: menuId })
  }

  showMenuDetailModal(menuId, event) {
    event.stopPropagation()
    this.setState({ isShowDetailModal: true, detailMenuId: menuId })
  }

  hideMenuDetailModal() {
    this.setState({ isShowDetailModal: false })
  }

  getIsCampaign() {
    const now = new Date()
    const campaignStartTime = new Date(2020, 1, 29)
    const campaignEndTime = new Date(2020, 2, 31, 23, 59, 59)
    return now > campaignStartTime && now < campaignEndTime
  }

  setIsFirstVisit(event) {
    this.setState({ isFirstVisit: event.target.value })
  }

  render() {
    const {
      oneDayLimitedMenuDateTimes,
      selectedDateId,
      selectedMenuId,
      selectedPackId,
      email,
      dateErrorText,
      nameErrorText,
      emailErrorText,
      addressErrorText,
      isReserved,
      isMenuChange,
      isShowDetailModal,
      detailMenuId,
      isFirstVisit,
    } = this.state

    let { reservableDateTimes } = this.state

    const { classes } = this.props

    const selectedMenuIdForMenus = this.props.location.state
      ? this.props.location.state.selectedMenuIdForMenus
      : ""

    const totalPrice = this.getTotalPrice()

    if (
      selectedMenuId === 8 ||
      (!selectedMenuId && selectedMenuIdForMenus === 8)
    ) {
      if (
        reservableDateTimes.length > 0 &&
        oneDayLimitedMenuDateTimes.length > 0
      ) {
        reservableDateTimes = reservableDateTimes.filter(d => {
          const rMonth = d.dateTime.getMonth()
          const rDay = d.dateTime.getDate()
          const evalArr = oneDayLimitedMenuDateTimes.map(
            limitedMenuDate =>
              rMonth === limitedMenuDate.getMonth() &&
              rDay === limitedMenuDate.getDate()
          )
          return evalArr.indexOf(true) === -1
        })
      }
    }

    const selectedMenu = this.getSelectedMenu(
      selectedMenuId || selectedMenuIdForMenus
    )

    const detailMenu = this.getSelectedMenu(detailMenuId)

    const isCampaign = this.getIsCampaign()

    return (
      <Layout>
        {isReserved ? (
          <CompletedReservation email={email} />
        ) : (
          <div className={classes.wrapper}>
            <p className={classes.title}>予約</p>
            <Paper className={classes.paper} elevation={3}>
              {isMenuChange ? (
                <div>
                  <Modal
                    open={isShowDetailModal}
                    onClose={this.hideMenuDetailModal.bind(this)}
                  >
                    {detailMenu && (
                      <Card className={classes.detailModal}>
                        <CardContent>
                          <div className={classes.detailMenuTop}>
                            <img
                              src={detailMenu.imgSrc}
                              className={classes.menuImg}
                            />
                            <div className={classes.menuCardRightContent}>
                              <p style={{ fontWeight: "bold" }}>
                                {detailMenu.title}
                              </p>
                              <p>所要時間: {detailMenu.treatmentTime}分</p>
                              {isCampaign && detailMenu.campaignPrice ? (
                                <div>
                                  <span className={classes.beforeCampaignPrice}>
                                    ¥{detailMenu.price}
                                  </span>
                                  <span className={classes.menuPrice}>
                                    ¥{detailMenu.campaignPrice}
                                  </span>
                                </div>
                              ) : (
                                <div>
                                  <p className={classes.menuPrice}>
                                    ¥{detailMenu.price}
                                  </p>
                                  {detailMenu.campaignPrice && (
                                    <p className={classes.menuPrice}>
                                      初回限定価格: ¥{detailMenu.campaignPrice}
                                    </p>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className={classes.detailMenuBottom}>
                            <p className={classes.formTitle}>メニュー内容</p>
                            <p className={classes.detailMenuDescription}>
                              {detailMenu.description}
                            </p>
                            <p className={classes.detailMenuTreatmentContent}>
                              {detailMenu.treatmentContent}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </Modal>
                  <p className={classes.formTitle}>メニューの変更</p>
                  {Menus.map(menu => {
                    return (
                      <div
                        key={menu.id}
                        onClick={this.changeMenu.bind(this, menu.id)}
                        className={classes.menuCard}
                      >
                        <img src={menu.imgSrc} className={classes.menuImg} />
                        <div className={classes.menuCardRightContent}>
                          <p style={{ fontWeight: "bold" }}>{menu.title}</p>
                          <p>所要時間: {menu.treatmentTime}分</p>
                          {isCampaign && menu.campaignPrice ? (
                            <div>
                              <span className={classes.beforeCampaignPrice}>
                                ¥{menu.price}
                              </span>
                              <span className={classes.menuPrice}>
                                ¥{menu.campaignPrice}
                              </span>
                            </div>
                          ) : (
                            <div>
                              <p className={classes.menuPrice}>¥{menu.price}</p>
                              {menu.campaignPrice && (
                                <p className={classes.menuPrice}>
                                  初回限定価格: ¥{menu.campaignPrice}
                                </p>
                              )}
                            </div>
                          )}
                          <p
                            onClick={this.showMenuDetailModal.bind(
                              this,
                              menu.id
                            )}
                            className={classes.menuDetail}
                          >
                            詳細を見る
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div>
                  <div className={classes.formContainer}>
                    <p className={classes.formTitle}>ご予約のメニュー</p>
                    <p
                      className={classes.changeMenuTitle}
                      onClick={this.setIsMenuChange.bind(this, true)}
                    >
                      メニューを変更する
                    </p>
                    <div className={classes.reservationMenu}>
                      {selectedMenu ? (
                        <div>
                          <p style={{ fontWeight: "bold" }}>
                            {selectedMenu.title}
                          </p>
                          <p>所要時間: {selectedMenu.treatmentTime}分</p>
                          {isCampaign && selectedMenu.campaignPrice ? (
                            <div>
                              <span className={classes.beforeCampaignPrice}>
                                ¥{selectedMenu.price}
                              </span>
                              <span className={classes.menuPrice}>
                                ¥{selectedMenu.campaignPrice}
                              </span>
                            </div>
                          ) : (
                            <div>
                              <p className={classes.menuPrice}>
                                ¥{selectedMenu.price}
                              </p>
                              {selectedMenu.campaignPrice && (
                                <p className={classes.menuPrice}>
                                  初回限定価格: ¥{selectedMenu.campaignPrice}
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      ) : (
                        <p>メニューを選択してください</p>
                      )}
                    </div>
                  </div>
                  <div className={classes.formContainer}>
                    <p className={classes.formTitle}>来店日時</p>
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
                                  {moment(date.dateTime).format(
                                    "YYYY/M/D (ddd) HH:mm"
                                  )}
                                </MenuItem>
                              )
                            })}
                        </Select>
                        {dateErrorText && (
                          <FormHelperText>{dateErrorText}</FormHelperText>
                        )}
                      </FormControl>
                    ) : (
                      <div>
                        <p style={{ color: "rgba(0, 0, 0, 0.38)" }}>
                          {this.state.reservableDateTimes.length > 0
                            ? "限定メニューに空きがありません。申し訳ございませんが、他メニューのご予約をよろしくお願い致します。"
                            : "現在、空席がありません。申し訳ございませんが、日を改めてのご予約をよろしくお願い致します。"}
                        </p>
                        <FormControl disabled={true}>
                          <Select defaultValue="disabled">
                            <MenuItem value="disabled" />
                          </Select>
                        </FormControl>
                      </div>
                    )}
                  </div>
                  <div className={classes.formContainer}>
                    <p className={classes.formTitle}>ご予約者氏名</p>
                    <TextField
                      error={nameErrorText !== ""}
                      helperText={nameErrorText}
                      onChange={this.setName.bind(this)}
                      onBlur={this.onBlurValidateName.bind(this)}
                    />
                  </div>
                  <div className={classes.formContainer}>
                    <p className={classes.formTitle}>
                      連絡可能なメールアドレス
                    </p>
                    <TextField
                      error={emailErrorText !== ""}
                      helperText={emailErrorText}
                      onChange={this.setEmail.bind(this)}
                      onBlur={this.onBlurValidateEmail.bind(this)}
                    />
                  </div>
                  <div className={classes.formContainer}>
                    <p className={classes.formTitle}>住所</p>
                    <TextField
                      error={addressErrorText !== ""}
                      helperText={addressErrorText}
                      onChange={this.setAddress.bind(this)}
                      onBlur={this.onBlurValidateAddress.bind(this)}
                      className={classes.addressTextField}
                    />
                  </div>
                  <div className={classes.formContainer}>
                    <p className={classes.formTitle}>オプションメニュー</p>
                    <FormGroup>
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
                            label={`${menu.title} ${menu.treatmentTime}分 ¥${menu.price}`}
                          />
                        )
                      })}
                    </FormGroup>
                  </div>
                  <div className={classes.formContainer}>
                    <p className={classes.formTitle}>パックのグレードアップ</p>
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
                  </div>
                  <div className={classes.formContainer}>
                    <p className={classes.formTitle}>
                      ご利用は初めてでしょうか？
                    </p>
                    <FormControl>
                      <RadioGroup
                        value={isFirstVisit}
                        onChange={this.setIsFirstVisit.bind(this)}
                      >
                        <FormControlLabel
                          control={<Radio />}
                          label="いいえ"
                          value="false"
                        />
                        <FormControlLabel
                          control={<Radio />}
                          label="はい"
                          value="true"
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>
                  <p className={classes.totalPriceTitle}>合計金額（税抜き）:</p>
                  <p className={classes.totalPrice}>
                    ¥{this.separate(totalPrice)}
                  </p>
                  <div className={classes.buttonWrapper}>
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
                </div>
              )}
            </Paper>
          </div>
        )}
      </Layout>
    )
  }
}

const styles = theme => ({
  wrapper: {
    maxWidth: "1000px",
    margin: "0 auto",
    padding: "120px 16px 104px",
    [theme.breakpoints.down("xs")]: {
      maxWidth: "1000px",
      margin: "0 auto",
      padding: "100px 15px 0",
    },
  },
  title: {
    fontSize: "30px",
    color: "#ED7483",
    marginBottom: "55px",
    textAlign: "center",
    [theme.breakpoints.down("xs")]: {
      fontSize: "20px",
      marginBottom: "40px",
    },
  },
  paper: {
    padding: "100px",
    [theme.breakpoints.down("xs")]: {
      padding: "20px",
    },
  },
  formContainer: {
    marginBottom: "40px",
  },
  formTitle: {
    marginBottom: "15px",
    borderLeft: "3px solid #ED7483",
    padding: "5px 10px",
  },
  FormControl: {
    width: "100%",
  },
  changeMenuTitle: {
    fontSize: "13px",
    color: "#06c",
    "&:hover": {
      cursor: "pointer",
    },
  },
  reservationMenu: {
    border: "1px solid #ED7483",
    borderRadius: "3px",
    padding: "15px",
    lineHeight: "30px",
    marginTop: "20px",
  },
  menuCard: {
    marginTop: "25px",
    border: "1px solid #ED7483",
    borderRadius: "3px",
    padding: "25px",
    display: "flex",
    "&:hover": {
      cursor: "pointer",
    },
  },
  menuImg: {
    width: "25%",
    height: "25%",
    [theme.breakpoints.down("xs")]: {
      width: "30%",
    },
  },
  menuCardRightContent: {
    paddingLeft: "30px",
    lineHeight: "30px",
  },
  beforeCampaignPrice: {
    fontSize: "14px",
    textDecoration: "line-through",
    marginRight: "10px",
  },
  menuPrice: {
    color: "#ED7483",
    fontWeight: "bold",
    letterSpacing: "3px",
  },
  menuDetail: {
    fontSize: "13px",
    color: "#06c",
  },
  detailModal: {
    position: "relative",
    clear: "both",
    margin: "30px auto",
    width: "50%",
    [theme.breakpoints.down("xs")]: {
      width: "95%",
    },
  },
  detailMenuTop: {
    display: "flex",
  },
  detailMenuBottom: {
    marginTop: "20px",
  },
  detailMenuDescription: {
    lineHeight: "28px",
    fontSize: "14px",
    letterSpacing: "0.5px",
    paddingBottom: "15px",
  },
  detailMenuTreatmentContent: {
    lineHeight: "28px",
    fontSize: "14px",
    letterSpacing: "0.5px",
  },
  addressTextField: {
    width: "50%",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  totalPriceTitle: {
    fontWeight: "bold",
    display: "inline-block",
    paddingRight: "15px",
  },
  totalPrice: {
    display: "inline-block",
    color: "#ED7483",
    fontWeight: "bold",
    letterSpacing: "3px",
  },
  buttonWrapper: {
    marginTop: "20px",
  },
  button: {
    background: "#ED7483",
    color: "white",
    height: 48,
    padding: "0 30px",
    diplay: "block",
    marginTop: "20px",
    "&:hover": {
      background: "#ED7483",
      opacity: 0.7,
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  disabledButton: {
    background: "rgb(240, 244, 249)",
    color: "white",
    height: 48,
    padding: "0 30px",
    diplay: "block",
    marginTop: "20px",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
})

export default withStyles(styles)(Reservation)
