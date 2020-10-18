import React from "react"
import { withStyles } from "@material-ui/core/styles"
import Layout from "../components/layout"
import instaQrImg from "../images/instagram_qr.jpg"

const About = props => {
  const { classes } = props
  return (
    <Layout>
      <div className={classes.wrapper}>
        <p className={classes.title}>ABOUT</p>
        <div className={classes.contentWrapper}>
          <div className={classes.block}>
            <div className={classes.subH}>サロン名</div>
            <div className={classes.text}>COCOPURE 凪</div>
          </div>
          <div className={classes.block}>
            <div className={classes.subH}>電話番号</div>
            <div className={classes.text}>050-3709-1376</div>
          </div>
          <div className={classes.block}>
            <div className={classes.subH}>メールアドレス</div>
            <div className={classes.text}>nagi.j.esthe@gmail.com</div>
          </div>
          <div className={classes.block}>
            <div className={classes.subH}>営業時間</div>
            <div className={classes.text}>月曜日 〜 日曜日（不定休）</div>
          </div>
          <div className={classes.block}>
            <div className={classes.subH}>所在地</div>
            <div className={classes.text}>
              東京都大田区仲六郷（詳細は予約完了後にメールにてご連絡いたします）
            </div>
          </div>
          <div className={classes.block}>
            <div className={classes.subH}>アクセス</div>
            <div className={classes.accessText}>
              <p style={{ marginBottom: 15 }}>・電車</p>
              <p>JR蒲田駅より徒歩12分、京浜急行線京急蒲田駅より徒歩15分</p>
            </div>
            <div className={classes.accessText}>
              <p style={{ marginBottom: 15 }}>・バス</p>
              <p>蒲田本町より徒歩3分</p>
            </div>
          </div>
        </div>
        <div className={classes.snsWrapper}>
          <p>LINE@でもご予約を承っております。</p>
          <p>
            お知らせやキャンペーンのご案内もさせていただきますので、ぜひご登録ください。
          </p>
          <p>
            ＊LINEご登録で「5年先も老けない美肌を作り出す4ステップ」プレゼント中🎁
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
        <div className={classes.snsWrapper}>
          <p>
            Instagramではスキンケアについてのお役立ち情報などを投稿していますので、良かったらフォローしてください。
          </p>
          <img src={instaQrImg} className={classes.instaImg} />
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
    fontSize: 35,
    marginBottom: "50px",
    background: "#F3ABB3",
    color: "#fff",
    fontFamily: "serif",
    fontWeight: "bold",
    padding: "25px",
  },
  contentWrapper: {
    marginBottom: "40px",
  },
  block: { marginBottom: "40px" },
  subH: {
    fontSize: 20,
    marginBottom: "15px",
    fontWeight: "bold",
    color: "#2b546a",
  },
  text: {
    fontSize: 16,
    color: "#8491a5",
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
  accessText: {
    fontSize: 16,
    color: "#8491a5",
    marginBottom: 20,
  },
  snsWrapper: {
    lineHeight: "30px",
    color: "#8491a5",
    marginBottom: "30px",
  },
  lineImg: {
    marginTop: "15px",
  },
  instaImg: {
    marginTop: "15px",
    width: "20%",
    [theme.breakpoints.down("xs")]: {
      width: "50%",
    },
  },
})

export default withStyles(styles)(About)
