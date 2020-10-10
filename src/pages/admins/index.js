import React from "react"
import AdminLayout from "../../features/admins/layout"
import AdminReservation from "../../components/admin_reservation"

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
