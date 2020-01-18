import React from "react"
import { Link } from "gatsby"
import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import Button from "@material-ui/core/Button"
import { makeStyles } from "@material-ui/core/styles"

export default props => {
  const styles = useStyles()
  return (
    <Card className={styles.card} raised={true}>
      <CardContent>
        <span className={styles.title}>{props.courseName}</span>
        <span className={styles.treatmentTime}>{props.treatmentTime}m</span>
        <span className={styles.price}>¥{props.price}</span>
        <p className={styles.description}>{props.description}</p>
      </CardContent>
      <CardActions className={styles.cardAction}>
        <Link
          to="/reservation"
          className={styles.link}
          state={{ selectedMenuIdForMenus: props.menuId }}
        >
          <Button className={styles.button}>空席確認・予約する</Button>
        </Link>
      </CardActions>
    </Card>
  )
}

const useStyles = makeStyles({
  card: {
    minWidth: 275,
    marginTop: 40,
    padding: "15px 15px 5px",
  },
  title: {
    fontSize: 20,
    borderRight: "1px solid #dcdcdc",
    paddingRight: 22,
  },
  treatmentTime: {
    paddingLeft: 20,
    fontSize: 17,
  },
  price: {
    float: "right",
    fontSize: 18,
  },
  description: {
    marginTop: 30,
    marginBottom: 12,
    lineHeight: 1.8,
  },
  cardAction: {
    float: "right",
    margin: 10,
  },
  button: {
    background: "#42c7c1",
    color: "white",
    height: 48,
    padding: "0 30px",
    "&:hover": {
      background: "#42c7c1",
      opacity: 0.7,
    },
  },
  link: {
    textDecoration: "none",
  },
})
