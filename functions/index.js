const functions = require("firebase-functions")
const nodemailer = require("nodemailer")
const gmailEmail = functions.config().gmail.email
const gmailPassword = functions.config().gmail.password

// 送信に使用するメールサーバーの設定
const mailTransport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
})

// 管理者用のメールテンプレート
const adminContents = data => {
  return `以下の内容で新しい予約が入りました。

・名前
${data.name}

・メールアドレス
${data.email}

・住所
${data.address}

・メニュー
${data.menu.title} 施術時間:  ${data.menu.treatmentTime}分

・来店日時
${data.date}

・オプション
${data.optionMenus.massageMenus
  .map(m => `${m.title} 施術時間目安: ${m.treatmentTime}分`)
  .join("\n")}
選択したパック:  ${data.optionMenus.pack.title}
  `
}

exports.sendMailToAdmin = functions.https.onCall((data, context) => {
  // メール設定
  let adminMail = {
    from: gmailEmail,
    to: gmailEmail,
    subject: "新しい予約が入りました",
    text: adminContents(data),
  }

  // メール送信
  mailTransport.sendMail(adminMail, (err, info) => {
    if (err) {
      return console.error(`send failed. ${err}`)
    }
    return console.log("send success.")
  })
})

const clientContents = data => {
  return `${data.name}さん

「プライベートサロン COCOPURE 凪」をご利用いただきまして、誠にありがとうございます。

ご予約が確定しました。
下記の内容をご確認いただき、そのまま予約の日時にご来店ください。
住所につきましては、追ってご連絡させていただきます。
※不明な点がございましたら、本メールにご返信ください。
※ご予約をキャンセルされる場合にも、本メールにご返信ください。

・来店日時
${data.date}

・メニュー
${data.menu.title}
メニュー金額:  ${
    (data.isCampaign || data.isFirstVisit) && data.menu.campaignPrice
      ? data.menu.campaignPrice
      : data.menu.price
  }円（税抜き）
施術時間目安:  ${data.menu.treatmentTime}分

・オプション
${data.optionMenus.massageMenus
  .map(
    m =>
      `${m.title} 金額:  ${m.price}円（税抜き） 施術時間目安:  ${m.treatmentTime}分`
  )
  .join("\n")}
使用するパック:  ${data.optionMenus.pack.title} 金額: ${
    data.optionMenus.pack.price
  }円（税抜き）

・合計金額
${data.totalPrice}円（税抜き）
  `
}

exports.sendMailToClient = functions.https.onCall((data, context) => {
  // メール設定
  let clientMail = {
    from: gmailEmail,
    to: data.email,
    subject: "ご予約が確定いたしました",
    text: clientContents(data),
  }

  // メール送信
  mailTransport.sendMail(clientMail, (err, info) => {
    if (err) {
      return console.error(`send failed. ${err}`)
    }
    return console.log("send success.")
  })
})
