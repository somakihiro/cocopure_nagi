import React from "react"
import { Link } from "gatsby"
import _ from "lodash"
import Button from "@material-ui/core/Button"
import Snackbar from "@material-ui/core/Snackbar"
import Alert from "@material-ui/lab/Alert"
import { db } from "../../../../firebase-config"
import AdminLayout from "../../../features/admins/layout"
import AdminMenuList from "../../../features/admins/menus/menu_list"
import arrayMove from "array-move"

class AdminMenus extends React.Component {
  constructor(props) {
    super(props)
    this.state = { menus: [], isOpenSanckBar: false }
  }

  async componentWillMount() {
    await this.fetchMenus()
  }

  async fetchMenus() {
    const menus = []
    await db
      .collection("menus")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const document = doc.data()
          document.documentId = doc.id
          menus.push(document)
        })
      })
      .then(() => {
        this.setState({ menus: _.sortBy(menus, "order") })
      })
      .catch(e => console.log(e))
  }

  onSortEnd({ oldIndex, newIndex }) {
    const sortedMenus = arrayMove(this.state.menus, oldIndex, newIndex)
    this.setState({ menus: sortedMenus })
  }

  saveOrder() {
    this.state.menus.forEach((menu, index) => {
      const newOrder = index + 1
      if (menu.order == newOrder) return

      db.collection("menus")
        .doc(menu.documentId)
        .update({ order: newOrder })
        .catch(e => console.log(e))
    })

    this.toggleIsOpenSnacBar()
  }

  toggleIsOpenSnacBar() {
    this.setState({ isOpenSanckBar: !this.state.isOpenSanckBar })
  }

  render() {
    const { menus, isOpenSanckBar } = this.state
    return (
      <AdminLayout>
        <Snackbar
          open={isOpenSanckBar}
          onClose={this.toggleIsOpenSnacBar.bind(this)}
          autoHideDuration={5000}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert color="success">メニューの並び順を保存しました</Alert>
        </Snackbar>
        <p style={{ fontSize: 20, marginBottom: 20 }}>メニュー一覧</p>
        <Link
          style={{ display: "inline-block", marginBottom: 20 }}
          to="/admins/menus/new"
          state={{ menus: menus }}
        >
          メニューを追加する
        </Link>
        <AdminMenuList menus={menus} onSortEnd={this.onSortEnd.bind(this)} />
        <Button
          variant="contained"
          color="primary"
          onClick={this.saveOrder.bind(this)}
        >
          この並び順で保存する
        </Button>
      </AdminLayout>
    )
  }
}

export default AdminMenus
