import React from "react"
import "../styles/layout.css"
import Header from "./header"

export default ({ children }) => {
  const now = new Date()
  const campaignStartTime = new Date(2020, 1, 29)
  const campaignEndTime = new Date(2020, 2, 31, 23, 59, 59)
  const isCampaign = now > campaignStartTime && now < campaignEndTime
  return (
    <div>
      <Header isCampaign={isCampaign} />
      <div style={isCampaign ? { paddingTop: "50px" } : {}}>{children}</div>
    </div>
  )
}
