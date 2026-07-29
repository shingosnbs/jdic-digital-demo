"use client";

import { useMemo, useState } from "react";

type MarketKey = "gold" | "palladium" | "silver";

const marketSeries: Record<
  MarketKey,
  { label: string; unit: string; color: string; values: number[]; summary: string }
> = {
  gold: {
    label: "黄金合金指数",
    unit: "架空pt",
    color: "#c84b31",
    values: [18, 27, 23, 41, 38, 57, 51, 73, 66, 88],
    summary:
      "空想中央銀行による月面準備金の積み増しを背景に、指数は7777.7架空ptまで上昇しました。",
  },
  palladium: {
    label: "未来パラジウム指数",
    unit: "架空pt",
    color: "#315a7d",
    values: [74, 62, 69, 53, 58, 44, 51, 37, 42, 31],
    summary:
      "空飛ぶ自動車向け需要が一巡し、指数は4321.0架空ptへ。数字も出来事も完全な創作です。",
  },
  silver: {
    label: "銀河シルバー指数",
    unit: "架空pt",
    color: "#6c7a89",
    values: [24, 31, 36, 33, 48, 55, 61, 58, 72, 81],
    summary:
      "透明歯科材料への採用期待から、指数は8888.8架空ptへ。実際の相場とは関係ありません。",
  },
};

const newMembers = [
  {
    initials: "AM",
    name: "天川 まどか",
    company: "ルミナス歯創株式会社",
    role: "代表取締役",
    note: "光で磨く、未来の診療体験を研究しています。",
    color: "member-blue",
  },
  {
    initials: "KS",
    name: "風見 奏太",
    company: "空色デンタルデザイン株式会社",
    role: "未来事業室長",
    note: "地域と技術を結ぶ、新しい学びの場をつくります。",
    color: "member-green",
  },
  {
    initials: "TR",
    name: "月島 凛",
    company: "オーロラ歯科出版株式会社",
    role: "編集発行人",
    note: "専門知を、誰にでも届く言葉へ変えていきます。",
    color: "member-rust",
  },
  {
    initials: "SN",
    name: "白波 直樹",
    company: "ネクストバイト株式会社",
    role: "代表取締役",
    note: "ものづくりの面白さを次世代へ手渡します。",
    color: "member-gold",
  },
];

const notices = [
  ["20XX.04.01", "架空入会", "雲上デンタル株式会社が正会員として加わりました"],
  ["20XX.03.88", "架空変更", "虹色歯科流通株式会社の代表者名義が変更されました"],
  ["20XX.02.30", "架空行事", "第999回 月面デンタルフォーラムを開催します"],
];

function MarketChart({ active }: { active: MarketKey }) {
  const series = marketSeries[active];
  const points = useMemo(
    () =>
      series.values
        .map((value, index) => `${index * 11.1},${100 - value}`)
        .join(" "),
    [series],
  );

  return (
    <div className="chart-wrap" id="fictional-market-index">
      <div className="chart-meta">
        <div>
          <span className="eyebrow">FICTIONAL MARKET DATA</span>
          <h3>{series.label}</h3>
        </div>
        <strong>7,777.7 <small>{series.unit}</small></strong>
      </div>
      <svg
        className="market-chart"
        viewBox="0 0 100 100"
        role="img"
        aria-label={`${series.label}の完全に架空の推移`}
        preserveAspectRatio="none"
      >
        {[20, 40, 60, 80].map((y) => (
          <line key={y} x1="0" x2="100" y1={y} y2={y} className="grid-line" />
        ))}
        <polyline
          key={active}
          points={points}
          fill="none"
          stroke={series.color}
          strokeWidth="2.2"
          vectorEffect="non-scaling-stroke"
          className="chart-line"
        />
        {series.values.map((value, index) => (
          <circle
            key={`${active}-${index}`}
            cx={index * 11.1}
            cy={100 - value}
            r="1.7"
            fill={series.color}
            vectorEffect="non-scaling-stroke"
          >
            <title>{`架空値 ${value * 111.1} ${series.unit}`}</title>
          </circle>
        ))}
      </svg>
      <div className="chart-years" aria-hidden="true">
        <span>20XA</span><span>20XB</span><span>20XC</span><span>20XD</span>
      </div>
      <p className="chart-summary">{series.summary}</p>
    </div>
  );
}

export default function Home() {
  const [activeMarket, setActiveMarket] = useState<MarketKey>("gold");
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyPage = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  const closeMenu = () => setMenuOpen(false);
  const showMarketIndex = (key: MarketKey) => {
    setActiveMarket(key);
    window.requestAnimationFrame(() => {
      document
        .getElementById("fictional-market-index")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return (
    <main>
      <div className="demo-ribbon">
        <span>FICTIONAL DEMO</span>
        <span aria-hidden="true">／</span>
        <strong>人物・企業・数値・出来事は、すべて架空です</strong>
      </div>

      <header className="site-header">
        <a className="brand" href="#top" aria-label="JDICレポート デモ版トップ">
          <span>JDIC REPORT</span>
          <span className="issue">999</span>
          <small>DIGITAL DEMO<br />20XX SPRING</small>
        </a>
        <button
          className="menu-button"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
          <b>目次</b>
        </button>
        <nav id="main-navigation" className={menuOpen ? "nav-open" : ""} aria-label="メインメニュー">
          <a href="#top" onClick={closeMenu}>TOP</a>
          <a href="#greeting" onClick={closeMenu}>MESSAGE</a>
          <a href="#market" onClick={closeMenu}>MARKET INSIGHT</a>
          <a href="#lifestyle" onClick={closeMenu}>MEMBER LIFE</a>
          <a href="#members" onClick={closeMenu}>NEW MEMBERS</a>
          <a href="#notice" onClick={closeMenu}>NOTICE</a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <span className="section-kicker">JDIC REPORT — DIGITAL EDITION</span>
          <h1>歯科産業の未来を<br />つなぐ、読む体験へ。</h1>
          <p>
            業界の知見と、人の物語を、もっと読みやすく。
            リンク、カラー写真、動く図表でひらく架空のデジタル会報です。
          </p>
          <div className="hero-actions">
            <a className="button primary" href="#greeting">最新号を読む <span>→</span></a>
            <button className="button text-button" type="button" onClick={copyPage}>
              {copied ? "コピーしました" : "このデモのリンクをコピー"}
            </button>
          </div>
          <p className="fiction-note">※第999号および掲載内容は、デジタル化検討のための完全なフィクションです。</p>
        </div>
        <div className="hero-image">
          <img
            src="/images/hero-workshop.png"
            alt="架空の歯科器械メーカーで器具を確認する技術者の手元"
          />
          <div className="image-caption">
            <span>FEATURE</span>
            <b>技術と知恵を、次の世代へ</b>
          </div>
        </div>
        <aside className="issue-index" aria-label="今号の目次">
          <span>IN THIS ISSUE</span>
          <a href="#greeting"><b>01</b> 巻頭メッセージ</a>
          <a href="#market"><b>02</b> 市場インサイト</a>
          <a href="#lifestyle"><b>03</b> 会員のライフスタイル</a>
          <a href="#members"><b>04</b> 新会員のご紹介</a>
        </aside>
      </section>

      <section className="greeting section-shell" id="greeting">
        <div className="portrait-column">
          <img
            src="/images/president-portrait.png"
            alt="架空の会長、星野一道のポートレート"
          />
          <p><span>架空の会長</span><strong>星野 一道</strong><small>未来歯研製作所</small></p>
        </div>
        <article className="greeting-copy">
          <span className="section-number">01 — MESSAGE</span>
          <h2>変化を受け入れることは、<br />積み重ねを未来へ渡すこと。</h2>
          <p className="lead">
            私たちの業界には、長い時間をかけて育まれた知恵があります。
            大切なのは、その価値を守りながら、いま届く方法へ更新していくことではないでしょうか。
          </p>
          <div className="columns">
            <p>
              かつて空想だった「瞬間移動型の歯科訪問」が日常になった20XX年、
              情報の受け取り方も大きく変わりました。PCとスマートフォンは、
              会員企業の日常を支える共通の道具となっています。
            </p>
            <p>
              本デモは、読み手が必要な記事へすぐ移動でき、図表を拡大し、
              関連情報をたどれる会報を想像したものです。記録を残し、
              次世代へ知識をつなぐ新しい入口としてご覧ください。
            </p>
          </div>
          <div className="inline-links">
            <a href="#market">次の記事：市場インサイト <span>→</span></a>
            <button type="button" onClick={copyPage}>記事リンクを共有</button>
          </div>
        </article>
      </section>

      <section className="market-section" id="market">
        <div className="section-shell market-layout">
          <div className="market-copy">
            <span className="section-number light">02 — MARKET INSIGHT</span>
            <h2>貴金属相場の<br />空想回顧と展望</h2>
            <p>
              月面鉱山、空飛ぶ自動車、透明歯科材料。ありそうで存在しない材料市場を題材に、
              デジタル版ならではの切り替え可能な図表を体験できます。
            </p>
            <div className="market-tabs" role="tablist" aria-label="架空の市場指数">
              {(Object.keys(marketSeries) as MarketKey[]).map((key) => (
                <button
                  key={key}
                  type="button"
                  role="tab"
                  aria-selected={activeMarket === key}
                  aria-controls="fictional-market-index"
                  onClick={() => showMarketIndex(key)}
                >
                  {marketSeries[key].label}
                </button>
              ))}
            </div>
            <p className="data-warning">DATA NOTICE<br /><strong>この図表の数値・解説は100%架空です。</strong></p>
          </div>
          <MarketChart active={activeMarket} />
        </div>
      </section>

      <section className="lifestyle section-shell" id="lifestyle">
        <div className="lifestyle-image">
          <img
            src="/images/lifestyle-coast.png"
            alt="海辺でカメラを持つ架空の会員、海野航平"
          />
          <span>MEMBER LIFE / FICTIONAL PERSON</span>
        </div>
        <article className="lifestyle-copy">
          <span className="section-number">03 — MEMBER LIFE</span>
          <h2>会員のライフスタイル</h2>
          <div className="profile-heading">
            <div>
              <span>架空企業：ブルーホライズン歯科産業</span>
              <h3>海野 航平</h3>
              <a
                className="company-site-link"
                href="https://task-ortho-inc.net/"
                target="_blank"
                rel="noopener noreferrer"
              >
                企業サイトを見る（株式会社タスク） ↗
              </a>
            </div>
            <p>仕事も休日も、<br />「よく見る」ことから。</p>
          </div>
          <div className="qa-grid">
            <div><b>Q. 大切にしている時間は？</b><p>朝999分の散歩です。もちろん架空です。</p></div>
            <div><b>Q. 最近始めたことは？</b><p>海辺の光を撮る、銀河カメラ散歩。</p></div>
            <div><b>Q. 仕事で大切なことは？</b><p>使う人の言葉を、設計の最初に置くこと。</p></div>
            <div><b>Q. 次世代へ伝えたいことは？</b><p>技術の理由まで言葉にして残すこと。</p></div>
          </div>
          <a className="read-more" href="#members">新しい仲間を見る <span>→</span></a>
        </article>
      </section>

      <section className="members-section" id="members">
        <div className="section-shell">
          <div className="section-heading">
            <div>
              <span className="section-number">04 — NEW MEMBERS</span>
              <h2>新しい仲間の、<br />新しい視点。</h2>
            </div>
            <p>人物名・企業名・肩書・紹介文はすべて架空です。実在の人物・団体とは関係ありません。</p>
          </div>
          <div className="member-grid">
            {newMembers.map((member, index) => (
              <article className="member-card" key={member.name}>
                <div className={`member-visual ${member.color}`}>
                  <span>{member.initials}</span>
                  <b>0{index + 1}</b>
                </div>
                <div className="member-body">
                  <span>{member.company}</span>
                  <h3>{member.name}</h3>
                  <small>{member.role}</small>
                  <p>{member.note}</p>
                  <a href="#notice" aria-label={`${member.name}の次の記事へ`}>プロフィールを見る <span>→</span></a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="notice-section section-shell" id="notice">
        <div className="notice-title">
          <span className="section-number">05 — NOTICE</span>
          <h2>お知らせ</h2>
          <p>時系列で探しやすく、更新箇所がひと目で分かるデジタル掲示板。</p>
        </div>
        <div className="notice-list">
          {notices.map(([date, tag, title]) => (
            <a href="#top" key={`${date}-${title}`}>
              <time>{date}</time>
              <span>{tag}</span>
              <strong>{title}</strong>
              <b>→</b>
            </a>
          ))}
        </div>
      </section>

      <section className="digital-value">
        <div className="section-shell">
          <span>WHY DIGITAL</span>
          <h2>読む、探す、つながる。<br />記録が、次の知恵になる。</h2>
          <div className="value-grid">
            <div><b>01</b><h3>すぐ読める</h3><p>PCでもスマートフォンでも、配布されたリンクから直接閲覧。</p></div>
            <div><b>02</b><h3>すぐ探せる</h3><p>記事、人物、企業、過去号へ、目次や検索から迷わず移動。</p></div>
            <div><b>03</b><h3>深く分かる</h3><p>カラー写真、拡大できる図表、関連記事で理解を支援。</p></div>
            <div><b>04</b><h3>次へ残せる</h3><p>号をまたいで蓄積し、JDICの知的資産として継承。</p></div>
          </div>
        </div>
      </section>

      <footer>
        <div>
          <a className="footer-brand" href="#top">JDIC REPORT <b>999</b></a>
          <p>デジタル版検討のためのフィクショナル・デモンストレーション</p>
        </div>
        <div className="footer-warning">
          <strong>FICTIONAL DEMO</strong>
          <p>本サイトに掲載されている人物名、企業名、数値、出来事、記事内容はすべて架空です。</p>
        </div>
        <div className="footer-links">
          <a href="https://jdicc.com/" target="_blank" rel="noopener noreferrer">
            日本歯科企業協議会 公式サイト ↗
          </a>
          <a href="#top">ページ上部へ ↑</a>
        </div>
      </footer>
    </main>
  );
}
