import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Layout from "../components/layout"
import MenuCard from "../components/menu_card"
import { Menus } from "../constants/app"

export default () => {
  const styles = useStyles()
  return (
    <Layout>
      <div className={styles.menusWrapper}>
        <p style={{ fontSize: 25 }}>MENU</p>
        <p className={styles.category}>フェイシャル</p>
        {Menus.map(menu => {
          if (menu.category !== "facial") return
          return <MenuCard menu={menu} />
        })}
        <p className={styles.category}>ボディ</p>
        {Menus.map(menu => {
          if (menu.category !== "body") return
          return <MenuCard menu={menu} />
        })}
        <p className={styles.category}>1日1名様限定特別コース</p>
        {Menus.map(menu => {
          if (menu.category !== "special") return
          return <MenuCard menu={menu} />
        })}
      </div>
    </Layout>
  )
}

const useStyles = makeStyles({
  menusWrapper: {
    maxWidth: "1000px",
    margin: "0 auto",
    padding: "120px 16px 104px",
  },
  category: {
    borderLeft: "solid 3px #F3ABB3",
    padding: 10,
    marginTop: 40,
    fontSize: 20,
  },
  card: {
    minWidth: 275,
    marginTop: 40,
    padding: "20px 20px 10px",
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
    background: "#F3ABB3",
    color: "white",
    height: 48,
    padding: "0 30px",
    "&:hover": {
      background: "#F3ABB3",
      opacity: 0.7,
    },
  },
})
