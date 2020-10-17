import React from "react"
import { Link } from "gatsby"
import { withStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import CardActions from "@material-ui/core/CardActions"
import { SortableElement } from "react-sortable-hoc"
import { db } from "../../../../firebase-config"
import Dialog from "../../../components/dialog"

class AdminMenuItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isDeleteDialogOpen: false,
    }
  }

  deleteMenu() {
    db.collection("menus")
      .doc(this.props.menu.documentId)
      .delete()
      .then(() => window.location.reload())
  }

  handleDelete() {
    this.setState({ isDeleteDialogOpen: true })
  }

  closeDialog() {
    this.setState({ isDeleteDialogOpen: false })
  }

  render() {
    const { menu } = this.props
    return (
      <div>
        <Dialog
          open={this.state.isDeleteDialogOpen}
          handleClose={this.closeDialog.bind(this)}
          exec={this.deleteMenu.bind(this)}
          title="メニューの削除"
          contentText="本当に削除しますか？"
        />
        <Card style={{ marginBottom: 15 }}>
          <CardContent>
            <p>{menu.title}</p>
            <p>{menu.treatment_time}分</p>
          </CardContent>
          <CardActions>
            <Link to="/admins/menus/edit" state={{ menu: menu }}>
              <button style={styles.button}>編集</button>
            </Link>
            <button
              style={styles.deleteButton}
              onClick={this.handleDelete.bind(this)}
            >
              削除
            </button>
          </CardActions>
        </Card>
      </div>
    )
  }
}

const styles = {
  button: {
    borderWidth: 0,
    backgroundColor: "#3f51b5",
    color: "#fff",
    padding: "5px 15px",
    borderRadius: 3,
    boxShadow:
      "0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)",
    cursor: "pointer",
  },
  deleteButton: {
    borderWidth: 0,
    backgroundColor: "#f50057",
    color: "#fff",
    padding: "5px 15px",
    borderRadius: 3,
    boxShadow:
      "0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)",
    cursor: "pointer",
  },
}

export default withStyles(styles)(SortableElement(AdminMenuItem))
