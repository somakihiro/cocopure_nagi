import React from "react"
import _ from "lodash"
import { withStyles } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import Select from "@material-ui/core/Select"
import MenuItem from "@material-ui/core/MenuItem"
import Button from "@material-ui/core/Button"
import { db, cloudStorage } from "../../../../firebase-config"
import AdminLayout from "../../../features/admins/layout"

class AdminMenuNew extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: "",
      description: "",
      treatmentContent: "",
      treatmentTime: null,
      price: null,
      campaignPrice: null,
      selectedCategory: "",
      file: null,
      previewFile: null,
      imageUrl: "",
    }
  }

  setTitle(event) {
    this.setState({ title: event.target.value })
  }

  setDescription(event) {
    this.setState({ description: event.target.value })
  }

  setTreatmentContent(event) {
    this.setState({ treatmentContent: event.target.value })
  }

  setTreatmentTime(event) {
    this.setState({ treatmentTime: Number(event.target.value) })
  }

  setPrice(event) {
    this.setState({ price: Number(event.target.value) })
  }

  setCampaignPrice(event) {
    this.setState({ campaignPrice: Number(event.target.value) })
  }

  setSelectedCategory(event) {
    this.setState({ selectedCategory: event.target.value })
  }

  onChangeImageHandler(e) {
    const file = e.target.files[0]
    let fileReader = new FileReader()
    fileReader.onload = () => {
      this.setState({ file: file, previewFile: fileReader.result })
    }
    fileReader.readAsDataURL(file)
  }

  async uploadImage() {
    const { file } = this.state

    return await new Promise((resolve, reject) => {
      const ref = cloudStorage.child(file.name)
      ref
        .put(file)
        .then(snapshot => {
          resolve(snapshot.ref.getDownloadURL())
        })
        .catch(e => {
          console.log(e)
          reject(e)
        })
    })
      .then(downloadUrl => this.setState({ imageUrl: downloadUrl }))
      .catch(e => console.log(e))
  }

  async onSave() {
    const { menus } = this.props.location.state

    if (this.state.file) {
      await this.uploadImage()
    }
    console.log(menus)

    db.collection("menus")
      .add({
        id: menus.length + 1,
        title: this.state.title,
        description: this.replaceNewLineToBr(this.state.description),
        treatment_content: this.replaceNewLineToBr(this.state.treatmentContent),
        treatment_time: this.state.treatmentTime,
        price: this.state.price,
        campaign_price: this.state.campaignPrice,
        category: this.state.selectedCategory,
        image_url: this.state.imageUrl,
        order: menus.length + 1,
      })
      .then(() => {
        window.location = `${window.origin}/admins/menus`
      })
      .catch(e => console.log(e))
  }

  replaceNewLineToBr(text) {
    return text.replace(/\n/g, "<br>")
  }

  render() {
    const { classes } = this.props

    return (
      <AdminLayout>
        <p style={{ fontSize: 20, marginBottom: 30 }}>メニュー追加</p>
        <div className={classes.formContainer}>
          <p className={classes.label}>メニュー名</p>
          <TextField
            className={classes.extendedTextField}
            onChange={this.setTitle.bind(this)}
          />
        </div>
        <div className={classes.formContainer}>
          <p className={classes.label}>アイキャッチ画像</p>
          <img
            src={this.state.previewFile}
            width="250"
            style={{ display: "block", marginBottom: 20 }}
          />
          <input
            type="file"
            accept="image/*"
            onChange={e => this.onChangeImageHandler(e)}
          />
        </div>
        <div className={classes.formContainer}>
          <p className={classes.label}>メニュー詳細</p>
          <TextField
            className={classes.extendedTextField}
            multiline={true}
            rows="5"
            onChange={this.setDescription.bind(this)}
          />
        </div>
        <div className={classes.formContainer}>
          <p className={classes.label}>施術内容</p>
          <TextField
            className={classes.extendedTextField}
            multiline={true}
            rows="5"
            onChange={this.setTreatmentContent.bind(this)}
          />
        </div>
        <div className={classes.formContainer}>
          <p className={classes.label}>施術時間（分）</p>
          <TextField onChange={this.setTreatmentTime.bind(this)} />
        </div>
        <div className={classes.formContainer}>
          <p className={classes.label}>価格</p>
          <TextField onChange={this.setPrice.bind(this)} />
        </div>
        <div className={classes.formContainer}>
          <p className={classes.label}>キャンペーン価格</p>
          <TextField onChange={this.setCampaignPrice.bind(this)} />
        </div>
        <div className={classes.formContainer}>
          <p className={classes.label}>カテゴリ</p>
          <Select
            value={this.state.selectedCategory}
            onChange={this.setSelectedCategory.bind(this)}
          >
            <MenuItem value="facial">フェイシャル </MenuItem>
            <MenuItem value="body">ボディ</MenuItem>
            <MenuItem value="special">特別</MenuItem>
          </Select>
        </div>
        <Button
          variant="contained"
          color="primary"
          onClick={this.onSave.bind(this)}
        >
          追加
        </Button>
      </AdminLayout>
    )
  }
}

const styles = theme => ({
  label: {
    marginBottom: 10,
  },
  formContainer: {
    marginBottom: "30px",
  },
  extendedTextField: {
    width: "50%",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
})

export default withStyles(styles)(AdminMenuNew)
