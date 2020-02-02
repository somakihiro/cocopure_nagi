import React from "react"
import { Link } from "gatsby"
import { withStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"

const CompletedReservation = props => {
  const { classes, email } = props
  return (
    <div className={classes.wrapper}>
      <p className={classes.title}>ご予約が完了しました。</p>
      <p className={classes.content}>
        お客様のメールアドレス（{email}
        ）に予約確認メールを送信しました。
      </p>
      <p className={classes.content}>
        メールが届いていない場合には、お手数ですが「nagi.j.esthe@gmail.com」にお問い合わせください。
      </p>
      <p className={classes.content}>ご来店お待ちしております。</p>
      <Link to="/" className={classes.link}>
        <Button className={classes.button}>トップに戻る</Button>
      </Link>
    </div>
  )
}

const styles = theme => ({
  wrapper: {
    maxWidth: "1000px",
    margin: "0 auto",
    padding: "120px 16px 104px",
  },
  title: {
    fontSize: "25px",
    color: "#F3ABB3",
    marginBottom: "25px",
  },
  content: {
    lineHeight: "30px",
  },
  link: {
    textDecoration: "none",
  },
  button: {
    background: "#F3ABB3",
    color: "white",
    height: 48,
    padding: "0 30px",
    marginTop: "25px",
    "&:hover": {
      background: "#F3ABB3",
      opacity: 0.7,
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
})

export default withStyles(styles)(CompletedReservation)
