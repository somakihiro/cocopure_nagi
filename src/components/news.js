import React from "react"
import moment from "moment"
import Button from "@material-ui/core/Button"
import Skeleton from "@material-ui/lab/Skeleton"
import DescriptionIcon from "@material-ui/icons/Description"
import { withStyles } from "@material-ui/core/styles"

class News extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      news: [],
      loading: true,
    }
  }

  componentDidMount() {
    const CORS_PROXY = "https://cors-anywhere.herokuapp.com/"
    let xhr = new XMLHttpRequest()
    xhr.open("GET", CORS_PROXY + "https://note.com/cocopure_nagi/rss")
    xhr.responseType = "document"
    xhr.send()
    xhr.onload = () => {
      const rss_data = xhr.response
      let items = rss_data.getElementsByTagName(`item`)
      items = Array.prototype.slice.call(items)
      items = items.slice(0, 4)
      const news = items.map(item => {
        const img = item.getElementsByTagName("media:thumbnail")[0]
        return {
          title: item.getElementsByTagName("title")[0].textContent,
          content: item
            .getElementsByTagName("description")[0]
            .textContent.replace(/<[^>]*>?|/gm, "")
            .replace("続きをみる", "..."),
          link: item.getElementsByTagName("link")[0].textContent,
          pubDate: moment(
            new Date(item.getElementsByTagName("pubDate")[0].textContent)
          ).format("YYYY.M.D"),
          imgSrc: img ? img.textContent : "",
        }
      })
      this.setState({ news, loading: false })
    }
  }

  render() {
    const { news, loading } = this.state
    const { classes } = this.props
    const skeletons = [1, 2]
    return (
      <div className={classes.newsWrapper}>
        <p className={classes.title}>News</p>
        <div>
          {loading ? (
            skeletons.map(s => (
              <div key={s} className={classes.newsContainer}>
                <div className={{ display: "flex" }}>
                  <Skeleton variant="rect" className={classes.skeletonImage} />
                  <div className={classes.textContainer}>
                    <Skeleton
                      variant="text"
                      className={classes.skeletonNewsTitle}
                    />
                    <Skeleton
                      variant="text"
                      className={classes.skeletonContent}
                    />
                    <Skeleton
                      variant="text"
                      className={classes.skeletonContent}
                    />
                    <Skeleton
                      variant="text"
                      className={classes.skeletonContent}
                    />
                    <Skeleton
                      variant="text"
                      className={classes.skeletonContent}
                    />
                  </div>
                </div>
              </div>
            ))
          ) : news.length > 0 ? (
            <div>
              {news.map(n => {
                return (
                  <div key={n.title} className={classes.newsContainer}>
                    <a
                      href={n.link}
                      className={classes.link}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {n.imgSrc && (
                        <img className={classes.image} src={n.imgSrc} alt="" />
                      )}
                      <div className={n.imgSrc ? classes.textContainer : {}}>
                        <p
                          className={
                            n.imgSrc
                              ? classes.newsTitle
                              : classes.noImageNewsTitle
                          }
                        >
                          {n.title}
                        </p>
                        <p
                          className={
                            n.imgSrc ? classes.pubDate : classes.noImagePubDate
                          }
                        >
                          {n.pubDate}
                        </p>
                        <p className={classes.content}>{n.content}</p>
                      </div>
                    </a>
                  </div>
                )
              })}
              <div className={classes.buttonWrapper}>
                <a
                  href="https://note.com/cocopure_nagi"
                  rel="noopener noreferrer"
                  target="_blank"
                  style={{ textDecoration: "none" }}
                >
                  <Button className={classes.button}>もっと見る</Button>
                </a>
              </div>
            </div>
          ) : (
            <div className={classes.noNewsContainer}>
              <DescriptionIcon
                color="disabled"
                className={classes.descriptionIcon}
              />
              <p className={classes.noNewsText}>まだNewsはありません</p>
            </div>
          )}
        </div>
      </div>
    )
  }
}

const styles = theme => ({
  newsWrapper: {
    marginTop: "50px",
  },
  title: {
    fontSize: "30px",
    marginBottom: "30px",
    borderLeft: "solid 3px #F3ABB3",
    paddingLeft: "16px",
  },
  newsContainer: {
    padding: "25px 0",
    borderBottom: "1px solid #e7e7e7",
  },
  link: {
    display: "flex",
    textDecoration: "none",
    [theme.breakpoints.down("xs")]: {
      display: "block",
    },
  },
  image: {
    width: "25%",
    display: "inline-block",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      display: "block",
    },
  },
  skeletonImage: {
    width: "25%",
    display: "inline-block",
    height: "140px",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      display: "block",
      height: "120px",
    },
  },
  textContainer: {
    display: "inline-block",
    width: "70%",
    lineHeight: "45px",
    paddingLeft: "35px",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      display: "block",
      paddingLeft: 0,
    },
  },
  newsTitle: {
    fontSize: "17px",
    color: "#2D2926",
    letterSpacing: "0.8px",
  },
  skeletonNewsTitle: {
    width: "35%",
  },
  noImageNewsTitle: {
    fontSize: "17px",
    color: "#2D2926",
    letterSpacing: "0.8px",
    margin: "0 0 15px",
  },
  pubDate: {
    fontSize: "13px",
    marginTop: "-15px",
    color: "rgb(70, 70, 70)",
  },
  noImagePubDate: {
    fontSize: "13px",
    color: "rgb(70, 70, 70)",
    marginBottom: "15px",
  },
  content: {
    fontSize: "14px",
    color: "#666",
    letterSpacing: "0.8px",
    margin: "8 0 12px",
    lineHeight: "20px",
  },
  skeletonContent: {
    margin: "8 0 12px",
    lineHeight: "25px",
  },
  buttonWrapper: {
    textAlign: "center",
    marginTop: "25px",
  },
  button: {
    background: "#F3ABB3",
    color: "white",
    height: 48,
    padding: "0 30px",
    width: "20%",
    "&:hover": {
      background: "#F3ABB3",
      opacity: 0.7,
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  circularProgressWrapper: {
    textAlign: "center",
    marginTop: "100px",
  },
  noNewsContainer: {
    textAlign: "center",
    margin: "100px 0",
  },
  descriptionIcon: {
    fontSize: "70px",
    marginBottom: "30px",
  },
  noNewsText: {
    fontSize: "17px",
    color: "#a8abb1",
  },
})

export default withStyles(styles)(News)
