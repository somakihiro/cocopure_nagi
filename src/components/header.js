import React from "react"
import { Link } from "gatsby"
import "../styles/header.css"

export default props => (
  <div className={`header`}>
    <div className={`container`}>
      <div className={`link`}>
        <Link to="/">HOME</Link>
      </div>
      <div className={`link`}>
        <Link to="/">SALON</Link>
      </div>
      <div className={`link`}>
        <Link to="/menus">MENU</Link>
      </div>
      <div className={`link`}>
        <Link to="/profile">PROFILE</Link>
      </div>
    </div>
  </div>
)
