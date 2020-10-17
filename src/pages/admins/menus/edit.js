import React from "react"
import _ from "lodash"
import { withStyles } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import Select from "@material-ui/core/Select"
import MenuItem from "@material-ui/core/MenuItem"
import Button from "@material-ui/core/Button"
import { db, cloudStorage } from "../../../../firebase-config"
import AdminLayout from "../../../features/admins/layout"

class AdminMenuEdit extends React.Component {
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
    if (this.state.file) {
      await this.uploadImage()
    }

    const updateObj = {
      title: this.state.title,
      description: this.replaceNewLineToBr(this.state.description),
      treatment_content: this.replaceNewLineToBr(this.state.treatmentContent),
      treatment_time: this.state.treatmentTime,
      price: this.state.price,
      campaign_price: this.state.campaignPrice,
      category: this.state.selectedCategory,
      image_url: this.state.imageUrl,
    }

    for (const key in updateObj) {
      if (!updateObj[key]) {
        delete updateObj[key]
      }
    }

    const docRef = db
      .collection("menus")
      .doc(this.props.location.state.menu.documentId)

    if (!_.isEmpty(updateObj)) {
      await docRef.update(updateObj)
    }

    window.location = `${window.origin}/admins/menus`
  }

  replaceNewLineToBr(text) {
    return text.replace(/\n/g, "<br>")
  }

  replaceBrToNewLine(text) {
    return text.replace(/<br>/g, "\n")
  }

  render() {
    const { menu } = this.props.location.state
    const { classes } = this.props

    return (
      <AdminLayout>
        <p style={{ fontSize: 20, marginBottom: 30 }}>メニュー編集</p>
        <div className={classes.formContainer}>
          <p className={classes.label}>メニュー名</p>
          <TextField
            className={classes.extendedTextField}
            defaultValue={menu.title}
            onChange={this.setTitle.bind(this)}
          />
        </div>
        <div className={classes.formContainer}>
          <p className={classes.label}>アイキャッチ画像</p>
          <img
            src={this.state.previewFile || menu.image_url}
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
            defaultValue={this.replaceBrToNewLine(menu.description)}
            multiline={true}
            rows="5"
            onChange={this.setDescription.bind(this)}
          />
        </div>
        <div className={classes.formContainer}>
          <p className={classes.label}>施術内容</p>
          <TextField
            className={classes.extendedTextField}
            defaultValue={this.replaceBrToNewLine(menu.treatment_content)}
            multiline={true}
            rows="5"
            onChange={this.setTreatmentContent.bind(this)}
          />
        </div>
        <div className={classes.formContainer}>
          <p className={classes.label}>施術時間（分）</p>
          <TextField
            defaultValue={menu.treatment_time}
            onChange={this.setTreatmentTime.bind(this)}
          />
        </div>
        <div className={classes.formContainer}>
          <p className={classes.label}>価格</p>
          <TextField
            defaultValue={menu.price}
            onChange={this.setPrice.bind(this)}
          />
        </div>
        <div className={classes.formContainer}>
          <p className={classes.label}>キャンペーン価格</p>
          <TextField
            defaultValue={menu.campaign_price}
            onChange={this.setCampaignPrice.bind(this)}
          />
        </div>
        <div className={classes.formContainer}>
          <p className={classes.label}>カテゴリ</p>
          <Select
            value={this.state.selectedCategory || menu.category}
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
          保存
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

export default withStyles(styles)(AdminMenuEdit)
