import React from "react"
import moment from "moment"
import RSSParser from "rss-parser"
import Button from "@material-ui/core/Button"
import { withStyles } from "@material-ui/core/styles"

class News extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      news: [],
    }
  }

  componentDidMount() {
    const CORS_PROXY = "https://cors-anywhere.herokuapp.com/"

    // const parser = new RSSParser()
    // parser.parseURL(
    //   CORS_PROXY + "https://note.com/soma_ch/rss",
    //   (err, feed) => {
    //     if (err) throw err
    //     console.log(feed.images)
    //     const news = feed.items.map(entry => entry).slice(0, 4)
    //     this.setState({ news })
    //   }
    // )

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
      this.setState({ news })
    }
  }

  render() {
    const { news } = this.state
    return (
      <div style={styles.newsWrapper}>
        <p style={styles.title}>News</p>
        <div>
          {news.length > 0 ? (
            <div>
              {news.map(n => {
                return (
                  <div style={styles.newsContainer}>
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
}

export default withStyles(styles)(News)
