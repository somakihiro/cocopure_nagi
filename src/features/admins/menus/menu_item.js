import React from "react"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import CardActions from "@material-ui/core/CardActions"
import Button from "@material-ui/core/Button"
import { SortableElement } from "react-sortable-hoc"

class AdminMenuItem extends React.Component {
  render() {
    const { menu } = this.props
    return (
      <Card style={{ marginBottom: 15 }}>
        <CardContent>
          <p>{menu.title}</p>
          <p>{menu.treatment_time}分</p>
        </CardContent>
        <CardActions>
          <Button variant="contained" color="primary">
            編集
          </Button>
          <Button variant="contained" color="secondary">
            削除
          </Button>
        </CardActions>
      </Card>
    )
  }
}

export default SortableElement(AdminMenuItem)
