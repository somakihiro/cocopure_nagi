import React from "react"
import Helmet from "react-helmet"
import "../styles/layout.css"
import Header from "./header"
import Footer from "./footer"

export default ({ children }) => {
  const now = new Date()
  const campaignStartTime = new Date(2020, 1, 29)
  const campaignEndTime = new Date(2020, 2, 31, 23, 59, 59)
  const isCampaign = now > campaignStartTime && now < campaignEndTime
  const isCommingSoon = campaignStartTime > now
  const bannerContent = isCommingSoon
    ? "2/29(土)　OPEN"
    : isCampaign
    ? "開店キャンペーン実施中！ 2/29(土) ー 3/31(火)"
    : ""
  return (
    <div>
      <Helmet title="COCOPURE 凪" />
      <Header
        isCampaign={isCampaign}
        isCommingSoon={isCommingSoon}
        bannerContent={bannerContent}
      />
      <div style={isCampaign || isCommingSoon ? { paddingTop: "50px" } : {}}>
        {children}
      </div>
      <Footer />
    </div>
  )
}
