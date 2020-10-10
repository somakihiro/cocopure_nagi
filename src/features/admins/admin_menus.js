import React from "react"
import { withStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import { cloudStorage } from "../../../firebase-config"

class AdminMenus extends React.Component {
  constructor(props) {
    super(props)
    this.state = { file: null, uploading: false }
  }

  onChangeHandler(e) {
    this.setState({ file: e.target.files[0] })
  }

  async uploadImage() {
    const { file } = this.state

    if (file) {
      this.setState({ uploading: true })

      try {
        const ref = cloudStorage.child(file.name)
        await ref.put(file)
      } catch (e) {
        console.log(e)
      }

      this.setState({ uploading: false })
    }
  }

  render() {
    return (
      <div>
        <p>メニュー一覧</p>
        {this.state.uploading ? (
          <p>アップロード中</p>
        ) : (
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={e => this.onChangeHandler(e)}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => this.uploadImage()}
            >
              アップロード
            </Button>
          </div>
        )}
      </div>
    )
  }
}

const styles = {}

export default withStyles(styles)(AdminMenus)
