import React from "react"
import { makeStyles } from "@material-ui/core/styles"

export default () => {
  const styles = useStyles()
  return (
    <div className={styles.footer}>
      <div className={styles.container}>
        <p>女性限定・完全予約制のプライベートサロン</p>
        <p>COCOPURE 凪</p>
      </div>
    </div>
  )
}

const useStyles = makeStyles({
  footer: {
    padding: "30px 0",
    background: "#fff",
    borderTop: "1px groove rgba(106, 137, 152, 0.2)",
  },
  container: {
    maxWidth: "1000px",
    margin: "0 auto",
    padding: "10px 16px",
    lineHeight: "25px",
  },
})
