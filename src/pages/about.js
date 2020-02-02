import React from "react"
import { withStyles } from "@material-ui/core/styles"
import Layout from "../components/layout"

const About = props => {
  const { classes } = props
  return (
    <Layout>
      <div className={classes.wrapper}>
        <p className={classes.title}>ABOUT</p>
        <div className={classes.dlWrapper}>
          <dl className={classes.dl}>
            <dt className={classes.dt}>サロン名</dt>
            <dd className={classes.dd}>COCOPURE 凪</dd>
            <dt className={classes.dt}>電話番号</dt>
            <dd className={classes.dd}>050-3709-1376</dd>
            <dt className={classes.dt}>メールアドレス</dt>
            <dd className={classes.dd}>nagi.j.esthe@gmail.com</dd>
            <dt className={classes.dt}>営業時間</dt>
            <dd className={classes.dd}>月曜日 〜 日曜日（不定休）</dd>
            <dt className={classes.dt}>所在地</dt>
            <dd className={classes.dd}>
              東京都大田区仲六郷（詳細は予約完了後にメールにてご連絡いたします）
            </dd>
            <dt className={classes.dt}>アクセス</dt>
            <dd className={classes.dd}>
              JR蒲田駅より徒歩12分、京浜急行線京急蒲田駅より徒歩15分
            </dd>
          </dl>
        </div>
        <div className={classes.lineWrapper}>
          <p>LINE@でもご予約を承っております。</p>
          <p>
            お知らせやキャンペーンのご案内もさせていただきますので、ぜひご登録ください。
          </p>
          <a href="https://lin.ee/jEsRNiR">
            <img
              height="36"
              border="0"
              src="https://scdn.line-apps.com/n/line_add_friends/btn/ja.png"
              className={classes.lineImg}
            />
          </a>
        </div>
      </div>
    </Layout>
  )
}

const styles = theme => ({
  wrapper: {
    maxWidth: "1000px",
    margin: "0 auto",
    padding: "120px 16px 104px",
    [theme.breakpoints.down("xs")]: {
      padding: "120px 30px 104px",
    },
  },
  title: {
    fontSize: 25,
    marginBottom: "50px",
  },
  dlWrapper: {
    maxWidth: "700px",
    marginBottom: "30px",
    lineHeight: "25px",
  },
  dl: {
    display: "flex",
    flexWrap: "wrap",
  },
  dt: {
    width: "30%",
    fontWeight: "bold",
  },
  dd: {
    width: "70%",
    marginBottom: "30px",
  },
  lineWrapper: {
    lineHeight: "30px",
  },
  lineImg: {
    marginTop: "15px",
  },
})

export default withStyles(styles)(About)
