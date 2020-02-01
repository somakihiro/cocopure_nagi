import React from "react"
import { Link } from "gatsby"
import "../styles/header.css"

export default props => {
  return (
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
        <div className={`link`}>
          <a
            href="https://note.com/cocopure_nagi"
            rel="noopener noreferrer"
            target="_blank"
          >
            News
          </a>
        </div>
      </div>
      {props.isCampaign && (
        <div className={`campaign-header`}>
          <p className={`campaign-text`}>
            開店キャンペーン実施中！ 2/29(土) ー 3/31(火)
          </p>
        </div>
      )}
    </div>
  )
}
