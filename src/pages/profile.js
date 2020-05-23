import React from "react"
import Layout from "../components/layout"
import { withStyles } from "@material-ui/core/styles"
import profileImg from "../images/profile-image.jpg"

const Profile = props => {
  const { classes } = props
  return (
    <Layout>
      <div className={classes.wrapper}>
        <p className={classes.title}>PROFILE</p>
        <div>
          <img src={profileImg} className={classes.img} />
        </div>
        <div className={classes.description}>
          <p>
            これまで、主婦として仕事をしながら子育てをするという時間を過ごしてきました。
            <br />
            <br />
            兼ねてより自然派で自分の持つ力を底上げ出来る様な美容や化粧品に興味があり、30代の頃より非石油系の化粧品を使用し、時折セミナーなどにも参加していました。
            <br />
            <br />
            周りの人に喜んでもらえ、自分に出来る事は何か？と考えていた時、ありがたいご縁に恵まれエステスクールにて勉強を始めました。
            無事卒業資格をいただき、この度開業の運びとなりました。
            <br />
            <br />
            今までの経験や周りの方々のご支援があったからこそスタートラインに立てたと心から感謝の気持ちでいっぱいです。
            そしてその色々な経験を生かし、お客様に寄り添っていける様なサロンでありたいと考えています。
            <br />
            <br />
            お客様に素敵な笑顔でお帰りいただける様に日々努力していきたいと思っており、心を込めて丁寧にお手入れさせていただきます。
            <br />
            <br />
            また、プライベートサロンならではの特性を出来る限り生かし、臨機応変に対応させていただきます。
            皆さまがいつまでも輝き続ける為のお手伝いをさせていただければ幸いです。
            どうぞよろしくお願い致します
          </p>
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
  description: {
    width: "100%",
    lineHeight: 2,
    fontSize: "15px",
  },
  img: {
    width: "40%",
    border: "1px solid #0000000d",
    borderRadius: "24px",
    marginBottom: "25px",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
})

export default withStyles(styles)(Profile)
