# ニコ動いいねリストアップツール

ニコニコ動画において、自身の動画についた「いいね」のユーザーをリストアップするツール。  
Chrome拡張機能/Firefoxアドオンとして開発する。

## イメージ・アイデア

- 動画のアナリティクスの「いいね！したユーザー」ボタンの隣に「いいね！したユーザーをコピー」ボタンを追加
- ボタンを押すとダイアログでプレ垢優先ソートを有効にするか聞かれる
- ダイアログに回答するとユーザー名の羅列をクリップボードに入れる
- 広告みたいに、各動画のいいねをマージして「〇〇さん x3」みたいな形式にしてみたい(気が向いたら実装)

## ストア説明文

Chromeウェブストア: (申請中)  
Firefoxアドオンセンター: (申請中)

ニコニコ動画において、自身の動画に「いいね！」をしてくれたユーザーをリストアップ、コピーするツールです。  
デフォルトではプレミアム会員を先頭にする順番になっていますが、本ツールでは会員の種別を無視した日時順にソートし直すことも可能です。

導入すると、動画のアナリティクスの「いいね！したユーザー」の隣に「いいね！したユーザーをコピー」というボタンが現れます。  
そのボタンをクリックするとニコニコのサーバーからいいねしたユーザーを取得し、クリップボードに書き込みます。  
その際、ソートを選択するとプレミアム会員かどうかを無視した純粋な日時順に並び替えることができます。

※ 本ツールはいいねしたユーザーが20件ずつしか取得できない関係上、ニコニコのサーバーとの通信を何度も行います。サーバーに負荷をかけることを理解し、むやみに使わないようにお願いいたします。
また、いいねしたユーザーが多ければ多いほど取得には時間がかかります。気長にお待ち下さい。
