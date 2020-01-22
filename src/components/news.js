import React from "react"
import moment from "moment"
import Button from "@material-ui/core/Button"
import Skeleton from "@material-ui/lab/Skeleton"
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
    xhr.open("GET", CORS_PROXY + "https://note.com/soma_ch/rss")
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
    const skeletons = [1, 2]
    return (
      <div style={styles.newsWrapper}>
        <p style={styles.title}>News</p>
        <div>
          {loading ? (
            skeletons.map(s => (
              <div style={styles.newsContainer}>
                <div style={{ display: "flex" }}>
                  <Skeleton variant="rect" style={styles.skeletonImage} />
                  <div style={styles.textContainer}>
                    <Skeleton variant="text" style={styles.skeletonNewsTitle} />
                    <Skeleton variant="text" style={styles.skeletonContent} />
                    <Skeleton variant="text" style={styles.skeletonContent} />
                    <Skeleton variant="text" style={styles.skeletonContent} />
                    <Skeleton variant="text" style={styles.skeletonContent} />
                  </div>
                </div>
              </div>
            ))
          ) : news.length > 0 ? (
            <div>
              {news.map(n => {
                return (
                  <div key={n.title} style={styles.newsContainer}>
                    <a
                      href={n.link}
                      style={styles.link}
                      rel="noreferrer"
                      target="_blank"
                    >
                      {n.imgSrc && <img style={styles.image} src={n.imgSrc} />}
                      <div style={n.imgSrc ? styles.textContainer : {}}>
                        <p
                          style={
                            n.imgSrc
                              ? styles.newsTitle
                              : styles.noImageNewsTitle
                          }
                        >
                          {n.title}
                        </p>
                        <p
                          style={
                            n.imgSrc ? styles.pubDate : styles.noImagePubDate
                          }
                        >
                          {n.pubDate}
                        </p>
                        <p style={styles.content}>{n.content}</p>
                      </div>
                    </a>
                  </div>
                )
              })}
              <div style={styles.buttonWrapper}>
                <a
                  href="https://note.com/soma_ch"
                  rel="noreferrer"
                  target="_blank"
                  style={{ textDecoration: "none" }}
                >
                  <Button style={styles.button}>もっと見る</Button>
                </a>
              </div>
            </div>
          ) : (
            <p>Newsはまだありません</p>
          )}
        </div>
      </div>
    )
  }
}

const styles = {
  newsWrapper: {
    marginTop: "50px",
  },
  title: {
    fontSize: "30px",
    marginBottom: "30px",
    borderLeft: "solid 3px #0bc8b6",
    paddingLeft: "16px",
  },
  newsContainer: {
    padding: "25px 0",
    borderBottom: "1px solid #e7e7e7",
  },
  link: {
    display: "flex",
    textDecoration: "none",
  },
  image: {
    width: "25%",
    display: "inline-block",
  },
  skeletonImage: {
    width: "25%",
    display: "inline-block",
    height: "140px",
  },
  textContainer: {
    display: "inline-block",
    width: "70%",
    lineHeight: "45px",
    paddingLeft: "35px",
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
    background: "#42c7c1",
    color: "white",
    height: 48,
    padding: "0 30px",
    width: "20%",
    "&:hover": {
      background: "#42c7c1",
      opacity: 0.7,
    },
  },
  circularProgressWrapper: {
    textAlign: "center",
    marginTop: "100px",
  },
}

export default withStyles(styles)(News)
