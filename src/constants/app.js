import specialMenuImg from "../images/special_menu.jpg"
import standardImg from "../images/standard.jpg"
import standardPlusImg from "../images/standard_plus.jpg"
import whiteningImg from "../images/whitening.jpg"
import whiteningPlusImg from "../images/whitening_plus.jpg"
import emsImg from "../images/ems.jpg"
import emsPlusImg from "../images/ems_plus.jpg"
import bodyImg from "../images/body.jpg"

export const Menus = [
  {
    id: 1,
    title: "ファイシャル 美白ケアコース",
    treatmentTime: 70,
    price: "9,500",
    campaignPrice: "6,650",
    description:
      "スタンダード 60分コースにディーポレーション美容液導入をプラスしたコースです。デコルテをしっかりとほぐしながら、クレイパック、顔マッサージで血行促進、代謝UPを促した後、美容液を導入していきます。美容機器を使い表皮・真皮層にまで美容液を浸透させ、お肌の細胞を元気にしムクミ、くすみ改善を促します。",
    treatmentContent:
      "クレンジング→エレクトロクレンジング→クレイパック→デコルテマッサージ→顔マッサージ→ディーポレーション(マシンによる高分子美容有効成分導入)→鎮静パック→頭皮マッサージ or スリーミーによる全身ストレッチ→整肌",
    imgSrc: whiteningImg,
    category: "facial",
  },
  {
    id: 2,
    title: "ファイシャル 美白ケアコース",
    treatmentTime: 100,
    price: "13,500",
    campaignPrice: "9,450",
    description:
      "美白ケア 70分コースに背中〜首筋マッサージをプラスし丹念に凝りをほぐす事で、血行促進、代謝UP、お肌のくすみやムクミをすっきりとさせます。 そして2種の美容機器を使い表皮・皮層にまで美容液を浸透、美白、ハリ、ツヤのあるお肌へと促します。お肌の細胞を元気にし回復力をUP、より透明感・美白効果が期待できます",
    treatmentContent:
      "背中〜首筋マッサージ→クレンジング→エレクトロクレンジング→クレイパック→デコルテマッサージ→顔マッサージ→ディーポレーション(マシンによる高分子美容有効成分導入)→マシンによる可視光線照射→鎮静パック→頭皮マッサージ or スリーミーによる全身ストレッチ→整肌",
    imgSrc: whiteningPlusImg,
    category: "facial",
  },
  {
    id: 3,
    title: "ファイシャル EMSたるみケアコース",
    treatmentTime: 70,
    price: "9,500",
    campaignPrice: "6,650",
    description:
      "スタンダードコースにEMSによる顔筋に働きかける表情筋トレーニングをプラスしたコースです。デコルテをしっかりとほぐしながら、クレイパック、顔マッサージで血行促進、代謝UPを促した後、EMSで表情筋にアプローチをしていきます。シワの改善、リフトアップ、フェイスラインの引き締めに効果的です。",
    treatmentContent:
      "クレンジング→*エレクトロクレンジング→表情筋EMS(マシンにより表情筋を効果的にエクササイズ)→クレイパック→デコルテマッサージ→顔マッサージ→鎮静パック→頭皮マッサージ or スリーミーによる全身ストレッチ→整肌",
    imgSrc: emsImg,
    category: "facial",
  },
  {
    id: 4,
    title: "ファイシャル EMSたるみケアコース",
    treatmentTime: 100,
    price: "13,500",
    campaignPrice: "9,450",
    description:
      "EMSたるみケア 70分コースに背中〜首筋マッサージをプラスし丹念に凝りをほぐす事で、血行促進、代謝UP、お肌のくすみやムクミをすっきりとさせます。そして2種の美容機器(コラーゲンへ働きかける美容機器RF波とEMS)で首筋〜デコルテ・顔までアプローチしていきます。肩まわり、顔まわりがスッキリして私も大好きなコースです。",
    treatmentContent:
      "背中〜首筋マッサージ→クレンジング→エレクトロクレンジング →2種の美容機器による首筋デコルテ・顔まで引き上げ→クレイパック→デコルテマッサージ→顔マッサージ→鎮静パック→頭皮マッサージ or スリーミーによる全身ストレッチ→整肌",
    imgSrc: emsPlusImg,
    category: "facial",
  },
  {
    id: 5,
    title: "ファイシャル スタンダードコース",
    treatmentTime: 45,
    price: "5,500",
    description:
      "肌表面に微電流を流す事で普段のクレンジングや洗顔では落としきれない毛穴、皮溝に入り込んだ汚れを吸着、除去していきます。そして顔マッサージ、クレイパックにより、血行促進、くすみ改善を促します。あまりお時間の取れない方にお薦めのコースです。",
    treatmentContent:
      "クレンジング→エレクトロクレンジング→クレイパック→顔マッサージ→鎮静パック→頭皮マッサージ or スリーミーによる全身ストレッチ→整肌",
    imgSrc: standardImg,
    category: "facial",
  },
  {
    id: 6,
    title: "ファイシャル スタンダードコース",
    treatmentTime: 60,
    price: "7,500",
    description:
      "スタンダード 45分コースにデコルテマッサージをプラスしたコースです。デコルテをしっかり丹念に凝りをほぐす事で、血行促進、代謝UPを促しお肌のくすみやムクミをすっきりとさせます。またクレイパックは、血行促進、細胞、新陳代謝の活性化の効果があり、ニキビ、肌荒れ、シミ、シワ、敏感肌の改善にも期待が持て、リフトアップ、アンチエイジング(老化防止)にはもっとも効果的です。",
    treatmentContent:
      "クレンジング→エレクトロクレンジング→クレイパック→デコルテマッサージ→顔マッサージ→鎮静パック→頭皮マッサージ or スリーミーによる全身ストレッチ→整肌",
    imgSrc: standardPlusImg,
    category: "facial",
  },
  {
    id: 7,
    title: "全身すっきりリンパトリートメント",
    treatmentTime: 70,
    price: "11,000",
    campaignPrice: "7,700",
    description:
      "オールハンドのリンパオイルマッサージにより身体全体をほぐし、溜まった老廃物を流します。血行促進、こり、冷え性、疲労回復、ダイエットなどに効果的です。",
    treatmentContent:
      "脚裏→ヒップ→背中〜首筋→脚表→お腹→腕→ スリーミーによる全身ストレッチ",
    imgSrc: bodyImg,
    category: "body",
  },
  {
    id: 8,
    title: "凪ロイヤルトリートメント フェイシャルパックのお土産付き",
    treatmentTime: 150,
    price: "30,000",
    description:
      "全身フルボディ・フルフェイシャル(美白ケア・たるみケアを兼ね備えた)コースになります。効果を持続できる様にお家でご使用いただけるフェイシャルパックのお土産付きです。全身の血流が良くなり、老廃物の排泄を促す事により、身体が軽くなり美肌効果も♡ 疲れが溜まっている方やお顔のくすみ・たるみにも効果的です。毎日頑張っているご自分へのご褒美にゆったりとリラクゼーションをご堪能ください。",
    treatmentContent:
      "脚裏→ヒップ→背中〜首筋→脚表→お腹→腕→クレンジング→エレクトロクレンジング→2種の美容機器による首筋デコルテ•顔まで引き上げ→クレイパック→デコルテマッサージ→顔マッサージ→ディーポレーション(マシンによる高分子美容有効成分導入)→水素パック→頭皮マッサージ or スリーミーによる全身ストレッチ→整肌",
    imgSrc: specialMenuImg,
    category: "special",
  },
]