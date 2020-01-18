import React from "react"

export default props => (
  <div>
    <p>ご予約が完了しました。</p>
    <p>
      お客様のメールアドレス（{props.email}）に予約確認メールを送信しました。
    </p>
    <p>
      メールが届いていない場合には、お手数ですが以下のメールアドレスにお問い合わせください。
    </p>
    <p>ご来店お待ちしております。</p>
  </div>
)
