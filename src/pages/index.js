import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Layout from "../components/layout"
import News from "../components/news"
import topImg from "../images/top.jpg"

export default () => {
  const styles = useStyles()
  return (
    <Layout>
      <div className={styles.topImg} />
      <div className={styles.mainWrapper}>
        <p className={styles.text}>
          日々毎日頑張っているお身体や心は、思っている以上に疲れている事が多くあります。
          <br />
          COCOPURE 〜「ありままの自然な心」で
          <br />
          凪〜「海が一番穏やかな時」の様な癒しの
          <br />
          時間を過ごしていただき、そしてまた明日からの日常でますます輝いた時間を送っていただける為のサポートをさせていただきます。
          <br />
          日常の喧騒を離れ、特別な「お暇(おいとま)」にお越しください。
          <br />
          心よりお待ちしております。
        </p>
        <News />
      </div>
    </Layout>
  )
}

const useStyles = makeStyles({
  topImg: {
    height: "600px",
    backgroundImage: `url(${topImg})`,
    backgroundSize: "cover",
  },
  mainWrapper: {
    padding: "70px 16px 104px",
    maxWidth: "1000px",
    maxHeight: "800px",
    margin: "0 auto",
  },
  text: {
    lineHeight: 2.5,
  },
})
