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

class Header extends React.Component {
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
    const {
      classes,
      width,
      isCampaign,
      isCommingSoon,
      bannerContent,
    } = this.props
    return (
      <div className={classes.header}>
        {width === "xs" ? (
          <div className={classes.mobileContainer}>
            <Link to="/" className={classes.link}>
              COCOPURE
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
                      <Link to="/" className={classes.link}>
                        HOME
                      </Link>
                    </ListItemText>
                  </ListItem>
                  <ListItem button={true} className={classes.listItem}>
                    <ListItemText>
                      <Link to="/about" className={classes.link}>
                        ABOUT
                      </Link>
                    </ListItemText>
                  </ListItem>
                  <ListItem button={true} className={classes.listItem}>
                    <ListItemText>
                      <Link to="/menus" className={classes.link}>
                        MENU
                      </Link>
                    </ListItemText>
                  </ListItem>
                  <ListItem button={true} className={classes.listItem}>
                    <ListItemText>
                      <Link to="/profile" className={classes.link}>
                        PROFILE
                      </Link>
                    </ListItemText>
                  </ListItem>
                  <ListItem button={true} className={classes.listItem}>
                    <ListItemText>
                      <a
                        href="https://note.com/cocopure_nagi"
                        rel="noopener noreferrer"
                        target="_blank"
                        className={classes.link}
                      >
                        NEWS
                      </a>
                    </ListItemText>
                  </ListItem>
                </List>
              </div>
            </Drawer>
          </div>
        ) : (
          <div className={classes.container}>
            <div className={classes.linkWrapper}>
              <Link to="/" className={classes.link}>
                HOME
              </Link>
            </div>
            <div className={classes.linkWrapper}>
              <Link to="/about" className={classes.link}>
                ABOUT
              </Link>
            </div>
            <div className={classes.linkWrapper}>
              <Link to="/menus" className={classes.link}>
                MENU
              </Link>
            </div>
            <div className={classes.linkWrapper}>
              <Link to="/profile" className={classes.link}>
                PROFILE
              </Link>
            </div>
            <div className={classes.linkWrapper}>
              <a
                href="https://note.com/cocopure_nagi"
                rel="noopener noreferrer"
                target="_blank"
                className={classes.link}
              >
                NEWS
              </a>
            </div>
          </div>
        )}
        {isCampaign ||
          (isCommingSoon && (
            <div className={classes.campaignHeader}>
              <p className={classes.campaignText}>{bannerContent}</p>
            </div>
          ))}
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
      color: "#ed7483",
    },
  },
  campaignHeader: {
    background: "#ed7483",
    height: "50px",
  },
  campaignText: {
    color: "#fff",
    textAlign: "center",
    lineHeight: "50px",
  },
})

export default compose(withWidth(), withStyles(styles))(Header)
