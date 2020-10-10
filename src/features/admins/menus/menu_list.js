import React from "react"
import { SortableContainer } from "react-sortable-hoc"
import AdminMenuItem from "./menu_item"

class AdminMenuList extends React.Component {
  render() {
    return (
      <div>
        {this.props.menus.map((value, index) => (
          <AdminMenuItem key={value.id} index={index} menu={value} />
        ))}
      </div>
    )
  }
}

export default SortableContainer(AdminMenuList)
