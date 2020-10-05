import React from "react"
import _ from "lodash"
import { withStyles } from "@material-ui/core/styles"
import { db } from "../../firebase-config"
import Layout from "../components/layout"
import MenuCard from "../components/menu_card"

class Menus extends React.Component {
  constructor(props) {
    super(props)
    this.state = { menus: [] }
  }

  async componentWillMount() {
    await this.fetchMenus()
  }

  async fetchMenus() {
    const menus = []
    await db
      .collection("menus")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const document = doc.data()
          menus.push(document)
        })
      })
      .then(() => {
        this.setState({ menus: _.sortBy(menus, "order") })
      })
      .catch(e => console.log(e))
  }

  render() {
    const { menus } = this.state
    const facialMenus = menus.filter(m => m.category === "facial")
    const bodyMenus = menus.filter(m => m.category === "body")
    const specialMenus = menus.filter(m => m.category === "special")
    return (
      <Layout>
        <div style={styles.menusWrapper}>
          <p style={{ fontSize: 25 }}>MENU</p>
          <p style={styles.category}>フェイシャル</p>
          {facialMenus.map(menu => {
            return <MenuCard menu={menu} />
          })}
          <p style={styles.category}>ボディ</p>
          {bodyMenus.map(menu => {
            return <MenuCard menu={menu} />
          })}
          <p style={styles.category}>1日1名様限定特別コース</p>
          {specialMenus.map(menu => {
            return <MenuCard menu={menu} />
          })}
        </div>
      </Layout>
    )
  }
}

const styles = {
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
}

export default withStyles(styles)(Menus)
