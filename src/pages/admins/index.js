import React from "react"
import AdminLayout from "../../features/admins/layout"
import AdminReservation from "../../features/admins/reservation"

class Admin extends React.Component {
  render() {
    return (
      <AdminLayout>
        <AdminReservation />
      </AdminLayout>
    )
  }
}

export default Admin
