import React from "react"
import { Link } from "gatsby"
import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"
import Button from "@material-ui/core/Button"
import Modal from "@material-ui/core/Modal"
import CloseIcon from "@material-ui/icons/Close"
import { withStyles } from "@material-ui/core/styles"
import { separate } from "../lib/utils/number_util"

class MenuCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isShowDetailModal: false,
    }
  }

  showMenuDetailModal(menuId) {
    this.setState({ isShowDetailModal: true, detailMenuId: menuId })
  }

  hideMenuDetailModal() {
    this.setState({ isShowDetailModal: false })
  }

  render() {
    const { isShowDetailModal } = this.state
    const { classes, menu } = this.props
    const now = new Date()
    const campaignStartTime = new Date(2020, 1, 29)
    const campaignEndTime = new Date(2020, 2, 31, 23, 59, 59)
    const isCampaign = now > campaignStartTime && now < campaignEndTime
    return (
      <div>
        <Modal
          open={isShowDetailModal}
          onClose={this.hideMenuDetailModal.bind(this)}
        >
          {/* {detailMenu && ( */}
          <Card className={classes.detailModal}>
            <CardContent className={classes.detailCardContent}>
              <CloseIcon
                className={classes.closeIcon}
                onClick={this.hideMenuDetailModal.bind(this)}
              />
              <div className={classes.detailMenuTop}>
                <img src={menu.image_url} className={classes.detailMenuImg} />
                <div className={classes.detailMenuCardRightContent}>
                  <p style={{ fontWeight: "bold" }}>{menu.title}</p>
                  <p>所要時間: {menu.treatment_time}分</p>
                  {isCampaign && menu.campaign_price ? (
                    <div>
                      <span className={classes.beforeCampaignPrice}>
                        ¥{separate(menu.price)}
                      </span>
                      <span className={classes.menuPrice}>
                        ¥{separate(menu.campaign_price)}
                      </span>
                    </div>
                  ) : (
                    <div>
                      <p className={classes.menuPrice}>
                        ¥{separate(menu.price)}
                      </p>
                      {menu.campaign_price && (
                        <p className={classes.menuPrice}>
                          初回限定価格: ¥{separate(menu.campaign_price)}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className={classes.detailMenuBottom}>
                <p className={classes.detailMenuBottomTitle}>メニュー内容</p>
                <p
                  className={classes.detailMenuDescription}
                  dangerouslySetInnerHTML={{ __html: menu.description }}
                />
                <p
                  className={classes.detailMenuTreatmentContent}
                  dangerouslySetInnerHTML={{
                    __html: menu.treatment_content,
                  }}
                />
              </div>
              <p style={{ fontSize: 14, marginTop: 20 }}>
                ※効果・体感には個人差があります。
              </p>
            </CardContent>
          </Card>
          {/* )} */}
        </Modal>
        <Card className={classes.card} raised={true}>
          <CardMedia image={menu.image_url} className={classes.menuImg} />
          <CardContent className={classes.cardContent}>
            <div className={classes.menuCardRightContent}>
              <p style={{ fontWeight: "bold" }}>{menu.title}</p>
              <p>所要時間: {menu.treatment_time}分</p>
              {isCampaign && menu.campaign_price ? (
                <div>
                  <span className={classes.beforeCampaignPrice}>
                    ¥{separate(menu.price)}
                  </span>
                  <span className={classes.menuPrice}>
                    ¥{separate(menu.campaign_price)}
                  </span>
                </div>
              ) : (
                <div>
                  <p className={classes.menuPrice}>¥{separate(menu.price)}</p>
                  {menu.campaign_price && (
                    <p className={classes.menuPrice}>
                      初回限定価格: ¥{separate(menu.campaign_price)}
                    </p>
                  )}
                </div>
              )}
              <p
                className={classes.menuDetail}
                onClick={this.showMenuDetailModal.bind(this, menu.id)}
              >
                詳細を見る
              </p>
            </div>
          </CardContent>
          <CardActions className={classes.cardAction}>
            <Link
              to="/reservation"
              className={classes.link}
              state={{ selectedMenuIdForMenus: menu.id }}
            >
              <Button className={classes.button}>空席確認・予約する</Button>
            </Link>
          </CardActions>
        </Card>
      </div>
    )
  }
}

const styles = theme => ({
  card: {
    minWidth: 275,
    marginTop: 40,
    display: "flex",
    [theme.breakpoints.down("xs")]: {
      display: "block",
    },
  },
  cardContent: {
    width: "33%",
    [theme.breakpoints.down("xs")]: {
      width: "90%",
    },
  },
  menuImg: {
    width: "33%",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      height: "200px",
    },
  },
  menuCardRightContent: {
    paddingLeft: "30px",
    lineHeight: "40px",
    [theme.breakpoints.down("xs")]: {
      paddingLeft: 0,
    },
  },
  beforeCampaignPrice: {
    fontSize: "14px",
    textDecoration: "line-through",
    marginRight: "10px",
  },
  menuPrice: {
    color: "#F3ABB3",
    fontWeight: "bold",
    letterSpacing: "3px",
  },
  menuDetail: {
    fontSize: "13px",
    color: "#06c",
    "&:hover": {
      cursor: "pointer",
    },
  },
  detailCardContent: {
    maxHeight: "500px",
    overflow: "scroll",
  },
  cardAction: {
    width: "33%",
    [theme.breakpoints.down("xs")]: {
      width: "auto",
      display: "block",
    },
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
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  link: {
    textDecoration: "none",
    margin: "0 auto",
  },
  detailModal: {
    position: "relative",
    clear: "both",
    margin: "30px auto",
    width: "50%",
    [theme.breakpoints.down("xs")]: {
      width: "95%",
    },
  },
  closeIcon: {
    float: "right",
    cursor: "pointer",
  },
  detailMenuTop: {
    display: "flex",
  },
  detailMenuImg: {
    width: "25%",
    height: "25%",
    [theme.breakpoints.down("xs")]: {
      width: "30%",
    },
  },
  detailMenuCardRightContent: {
    paddingLeft: "30px",
    lineHeight: "30px",
  },
  detailMenuBottom: {
    marginTop: "20px",
  },
  detailMenuBottomTitle: {
    marginBottom: "15px",
    borderLeft: "3px solid #F3ABB3",
    padding: "5px 10px",
  },
  detailMenuDescription: {
    lineHeight: "28px",
    fontSize: "14px",
    letterSpacing: "0.5px",
    paddingBottom: "15px",
  },
  detailMenuTreatmentContent: {
    lineHeight: "28px",
    fontSize: "14px",
    letterSpacing: "0.5px",
  },
})

export default withStyles(styles)(MenuCard)
