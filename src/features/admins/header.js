import React from "react"
import { Link } from "gatsby"
import MenuIcon from "@material-ui/icons/Menu"
import IconButton from "@material-ui/core/IconButton"
import Drawer from "@material-ui/core/Drawer"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import { withStyles } from "@material-ui/core/styles"
import withWidth from "@material-ui/core/withWidth"
import { compose } from "recompose"

class AdminHeader extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
    }
  }

  toggleDrawer(open) {
    this.setState({ open })
  }

  render() {
    const { open } = this.state
    const { classes, width } = this.props
    return (
      <div className={classes.header}>
        {width === "xs" ? (
          <div className={classes.mobileContainer}>
            <Link to="/admins" className={classes.link}>
              COCOPURE 管理画面
            </Link>
            <IconButton
              className={classes.iconButton}
              onClick={this.toggleDrawer.bind(this, true)}
            >
              <MenuIcon className={classes.menuIcon} />
            </IconButton>
            <Drawer
              anchor="right"
              open={open}
              onClose={this.toggleDrawer.bind(this, false)}
            >
              <div className={classes.listWrapper}>
                <List>
                  <ListItem button={true} className={classes.listItem}>
                    <ListItemText>
                      <Link to="/admins" className={classes.link}>
                        予約一覧
                      </Link>
                    </ListItemText>
                  </ListItem>
                  <ListItem button={true} className={classes.listItem}>
                    <ListItemText>
                      <Link to="/admins/menus" className={classes.link}>
                        メニュー一覧
                      </Link>
                    </ListItemText>
                  </ListItem>
                </List>
              </div>
            </Drawer>
          </div>
        ) : (
          <div className={classes.container}>
            <div className={classes.linkWrapper}>
              <Link to="/admins" className={classes.link}>
                予約一覧
              </Link>
            </div>
            <div className={classes.linkWrapper}>
              <Link to="/admins/menus" className={classes.link}>
                メニュー一覧
              </Link>
            </div>
          </div>
        )}
      </div>
    )
  }
}

const styles = theme => ({
  header: {
    height: "60px",
    lineHeight: "60px",
    background: "#fff",
    borderBottom: "1px groove rgba(106, 137, 152, 0.2)",
    position: "fixed",
    width: "100%",
    zIndex: 10,
    [theme.breakpoints.down("xs")]: {
      height: "50px",
      lineHeight: "50px",
    },
  },
  container: {
    margin: "0 20%",
  },
  mobileContainer: {
    display: "flex",
    justifyContent: "space-between",
    margin: "0 10px",
  },
  iconButton: {
    height: "50px",
  },
  listWrapper: {
    width: "200px",
    margin: "20px 0",
  },
  listItem: {
    textAlign: "center",
    marginBottom: "10px",
  },
  menuIcon: {
    fontSize: "30px",
  },
  linkWrapper: {
    display: "inline-block",
    width: "20%",
    textAlign: "center",
  },
  link: {
    textDecoration: "none",
    fontSize: "14px",
    color: "#534745",
    [theme.breakpoints.down("xs")]: {
      color: "#F3ABB3",
    },
  },
  campaignHeader: {
    background: "#F3ABB3",
    height: "50px",
  },
  campaignText: {
    color: "#fff",
    textAlign: "center",
    lineHeight: "50px",
  },
})

export default compose(withWidth(), withStyles(styles))(AdminHeader)
