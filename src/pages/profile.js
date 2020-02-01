import React from "react"
import Layout from "../components/layout"
import { makeStyles } from "@material-ui/core/styles"
import profileImg from "../images/profile-image.jpg"
// import "../styles/profile.css"

// export default () => (
//   <Layout>
//     <div className={`profile-wrapper`}>
//       <h1>PROFILE</h1>
//       <div className={`profile-container`}>
//         <div className={`profile-image`} />
//         <div className={`profile-description`}>
//           <p style={{ fontSize: 25, marginBottom: 20, fontWeight: "bold" }}>
//             相馬淳子
//           </p>
//           <p>
//             これまで、主婦として仕事をしながら子育てをするという時間を過ごしてきました。
//             <br />
//             兼ねてより自然派で自分の持つ力を底上げ出来る様な美容や化粧品に興味があり、30代の頃より非石油系の化粧品を使用し時折セミナーなどにも参加していました。
//             <br />
//             2人の子供が成人し独り立ちした時に、今後、自分にもっと出来る事はないか？周りの人に喜んでもらえる事で自分に出来る事は何か？と考えていた時、ありがたいご縁に恵まれエステスクールにて勉強を始めました。無事卒業資格をいただき、この度開業の運びとなります。「今さら」ではなく「今だから」という気持ちで臨み、お客様に素敵な笑顔でお帰りいただける様に日々努力していきたいと思っています。
//             <br />
//             経験が浅い分、心を込めて丁寧にお手入れさせていただきます。
//             <br />
//             どうぞよろしくお願い致します。
//           </p>
//         </div>
//       </div>
//     </div>
//   </Layout>
// )

export default () => {
  const styles = useStyles()
  return (
    <Layout>
      <div className={styles.profileWrapper}>
        <h1 className={styles.profileWrapperH1}>PROFILE</h1>
        <div className={styles.profileContainer}>
          <div className={styles.profileImage} />
          <div className={styles.profileDescription}>
            <p style={{ fontSize: 25, marginBottom: 20, fontWeight: "bold" }}>
              相馬淳子
            </p>
            <p>
              これまで、主婦として仕事をしながら子育てをするという時間を過ごしてきました。
              <br />
              兼ねてより自然派で自分の持つ力を底上げ出来る様な美容や化粧品に興味があり、30代の頃より非石油系の化粧品を使用し時折セミナーなどにも参加していました。
              <br />
              2人の子供が成人し独り立ちした時に、今後、自分にもっと出来る事はないか？周りの人に喜んでもらえる事で自分に出来る事は何か？と考えていた時、ありがたいご縁に恵まれエステスクールにて勉強を始めました。無事卒業資格をいただき、この度開業の運びとなります。「今さら」ではなく「今だから」という気持ちで臨み、お客様に素敵な笑顔でお帰りいただける様に日々努力していきたいと思っています。
              <br />
              経験が浅い分、心を込めて丁寧にお手入れさせていただきます。
              <br />
              どうぞよろしくお願い致します。
            </p>
          </div>
        </div>
      </div>
    </Layout>
  )
}

const useStyles = makeStyles({
  profileWrapper: {
    maxWidth: "1000px",
    margin: "0 auto",
    padding: "120px 16px 104px",
  },

  profileWrapperH1: {
    fontSize: "35px",
    color: "#0bc8b6",
    letterSpacing: "3px",
  },

  profileContainer: {
    paddingTop: "60px",
    // display: "-webkit-box" /*Android4.3*/,
    // display: "-moz-box" /*Firefox21*/,
    // display: "-ms-flexbox" /*IE10*/,
    // display: "-webkit-flex" /*PC-Safari,iOS8.4*/,
    display: "flex",
  },

  profileDescription: {
    width: "50%",
    paddingLeft: "30px",
    lineHeight: 2,
  },

  profileImage: {
    width: "50%",
    height: "530px",
    backgroundImage: `url(${profileImg})`,
    backgroundSize: "cover",
  },
})
