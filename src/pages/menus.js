import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Layout from "../components/layout"
import MenuCard from "../components/menu_card"

export default () => {
  const styles = useStyles()
  return (
    <Layout>
      <div className={styles.menusWrapper}>
        <p style={{ fontSize: 25 }}>メニュー一覧</p>
        <p className={styles.category}>1日1名様限定特別コース！</p>
        <MenuCard
          courseName={"凪ロイヤルトリートメント フェイシャルパックのお土産付き"}
          treatmentTime={150}
          price={"30,000"}
          description={
            "全身フルボディ•フルフェイシャル(美白ケア•たるみケアを兼ね備えた)コースになります。効果を持続できる様にお家でご使用いただけるフェイシャルパックのお土産付きです。全身の血流が良くなり、老廃物の排泄を促す事により、身体が軽くなり美肌効果も♡ 疲れが溜まっている方やお顔のくすみ•たるみにも効果的です。毎日頑張っているご自分へのご褒美にゆったりとリラクゼーションをご堪能ください。"
          }
          menuId={1}
        />
        <p className={styles.category}>フェイシャル</p>
        <MenuCard
          courseName={"スタンダードコース"}
          treatmentTime={45}
          price={"5,500"}
          description={
            "肌表面に微電流を流す事で普段のクレンジングや洗顔では落としきれない毛穴、皮溝に入り込んだ汚れを吸着、除去していきます。そして顔マッサージ、クレイパックにより、血行促進、くすみ改善を促します。"
          }
          menuId={2}
        />
        <MenuCard
          courseName={"スタンダードコース"}
          treatmentTime={60}
          price={"7,500"}
          description={
            "デコルテをしっかり丹念に凝りをほぐす事で、血行促進、代謝UPを促しお肌のくすみやムクミをすっきりとさせます。またクレイパックは、血行促進、細胞、新陳代謝の活性化の効果があり、ニキビ、肌荒れ、シミ、シワ、敏感肌の改善にも期待が持て、リフトアップ、アンチエイジング(老化防止)にはもっとも効果的です。"
          }
          menuId={3}
        />
        <MenuCard
          courseName={"美白ケアコース"}
          treatmentTime={70}
          price={"9,500"}
          description={
            "スタンダード<60m>コースにディーポレーション美容液導入をプラスしたコースです。デコルテをしっかりとほぐしながら、クレイパック、顔マッサージで血行促進、代謝UPを促した後、美容液を導入していきます。美容機器を使い表皮•真皮層にまで美容液を浸透させ、お肌の細胞を元気にしムクミ、くすみ改善を促します。"
          }
          menuId={4}
        />
        <MenuCard
          courseName={"美白ケアコース"}
          treatmentTime={100}
          price={"13,500"}
          description={
            "美白<70m>コースに背中〜首筋マッサージと腕マッサージをプラスし丹念に凝りをほぐす事で、血行促進、代謝UP、お肌のくすみやムクミをすっきりとさせます。そして美容機器を使い表皮•真皮層にまで美容液を浸透、可視光線の照射により美白、ハリ、ツヤのあるお肌へと促します。お肌の細胞を元気にし回復力をUP、より透明感•美白効果が期待できます。"
          }
          menuId={5}
        />
        <MenuCard
          courseName={"EMSたるみケアコース"}
          treatmentTime={70}
          price={"9,500"}
          description={
            "スタンダードコースにEMSによる顔筋に働きかける表情筋トレーニングをプラスしたコースです。デコルテをしっかりとほぐしながら、クレイパック、顔マッサージで血行促進、代謝UPを促した後、EMSで表情筋にアプローチをしていきます。シワの改善、リフトアップ、フェイスラインの引き締めに効果的です。"
          }
          menuId={6}
        />
        <MenuCard
          courseName={"EMSたるみケアコース"}
          treatmentTime={100}
          price={"13,500"}
          description={
            "EMSたるみケア<70m>コースに背中〜首筋マッサージをプラスし丹念に凝りをほぐす事で、血行促進、代謝UP、お肌のくすみやムクミをすっきりとさせます。そして2種の美容機器(コラーゲンへ働きかける美容機器RF波とEMS)で首筋〜デコルテ•顔までアプローチしていきます。肩まわり、顔まわりがスッキリして私も大好きなコースです。"
          }
          menuId={7}
        />
        <p className={styles.category}>ボディ</p>
        <MenuCard
          courseName={"全身すっきりリンパトリートメント"}
          treatmentTime={70}
          price={"11,000"}
          description={
            "オールハンドのリンパオイルマッサージにより身体全体をほぐし、溜まった老廃物を流します。血行促進、こり、冷え性、疲労回復、ダイエットなどに効果的です。"
          }
          menuId={8}
        />
      </div>
    </Layout>
  )
}

const useStyles = makeStyles({
  menusWrapper: {
    maxWidth: "1000px",
    margin: "0 auto",
    padding: "70px 16px 104px",
  },
  category: {
    borderLeft: "solid 3px #0bc8b6",
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
    background: "#42c7c1",
    color: "white",
    height: 48,
    padding: "0 30px",
    "&:hover": {
      background: "#42c7c1",
      opacity: 0.7,
    },
  },
})
