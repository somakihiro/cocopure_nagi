import React from "react"
import { Link } from "gatsby"
import Button from "@material-ui/core/Button"
import { withStyles } from "@material-ui/core/styles"
import Layout from "../components/layout"
import News from "../components/news"
import topImg from "../images/top.jpg"

const Top = props => {
  const { classes } = props
  return (
    <Layout>
      <div>
        <div className={classes.topImg}>
          <div className={classes.maskTopImg}>
            <div className={classes.topTextWrapper}>
              <p className={classes.topTitle}>COCOPURE 凪</p>
              <p className={classes.topDescription}>
                女性限定・完全予約制のプライベートサロン
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.mainWrapper}>
        <p className={classes.text}>
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
        <div className={classes.buttonWrapper}>
          <Link to="/menus" className={classes.link}>
            <Button className={classes.button}>空席確認・予約する</Button>
          </Link>
        </div>
        <News />
      </div>
    </Layout>
  )
}

const styles = theme => ({
  topImg: {
    height: "600px",
    backgroundImage: `url(${topImg})`,
    backgroundSize: "cover",
    background: "20% 75% no-repeat",
  },
  maskTopImg: {
    height: "100%",
    background: "rgba(0, 0, 0, 0.3)",
  },
  topTextWrapper: {
    position: "absolute",
    top: "180px",
    left: 0,
    maxWidth: "1080px",
    margin: "0 auto",
    right: 0,
    textAlign: "center",
    fontFamily: "serif",
    color: "#fff",
    [theme.breakpoints.down("xs")]: {
      top: "150px",
    },
  },
  topTitle: {
    fontSize: "60px",
    [theme.breakpoints.down("xs")]: {
      fontSize: "45px",
    },
  },
  topDescription: {
    fontSize: "20px",
    paddingTop: "20px",
    fontWeight: "bold",
  },
  mainWrapper: {
    padding: "50px 16px 104px",
    maxWidth: "1000px",
    maxHeight: "800px",
    margin: "0 auto",
    [theme.breakpoints.down("xs")]: {
      padding: "50px 30px 104px",
    },
  },
  buttonWrapper: {
    marginTop: "50px",
    textAlign: "center",
    [theme.breakpoints.down("xs")]: {
      marginTop: "40px",
    },
  },
  button: {
    background: "#ED7483",
    color: "white",
    height: 55,
    padding: "0 30px",
    width: "35%",
    "&:hover": {
      background: "#ED7483",
      opacity: 0.7,
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      height: 48,
    },
  },
  link: {
    textDecoration: "none",
    margin: "0 auto",
  },
  text: {
    lineHeight: 2.5,
  },
})

export default withStyles(styles)(Top)
