# niconico-garage Favorite and sminfo Getter

ニコ動いいねリストアップツールとして開発されたツールを、Tampermonkeyで使用可能な形式にしてみました。
内容としては、Fork元と同じ仕様ですが、ニコニコ動画において、自身の動画についた「いいね」のユーザーをリストアップするツールです。
また、オリジナル機能として動画のsm IDとタイトルを一緒に出力するようにしました。

従来は、Chrome/FireFoxアドオンで使用できる形式となっていましたが、今回はTampermonkeyにて使用できるようにしました。
※Fork元の、Istallia氏のコードを一部流用しておりますため、版権者様の意向等ございましたら、ご連絡ください。
連絡先: a13x@hdk-atom.jp / Twitter: @a13x_4793_3654

## 使用方法
レポジトリ内にある【niconico-garage Favorite and sminfo Getter.user.js】をダウンロードしていただき、tampermonkeyへインポートしていただければ使えます。

DLするの面倒くさい方や、やり方がわからない方は、以下のURLをインポートすれば使えます
https://github.com/a13x-4793-3654/niconico-garage_Favorite_and_sminfo_Getter/raw/main/niconico-garage%20Favorite%20and%20sminfo%20Getter.user.js

後は、ニコニコガレージから知りたい動画のアナライズを開いてF5を押せば起動します。

# 以下は、Istallia氏の元の説明文です

ニコニコ動画において、自身の動画についた「いいね」のユーザーをリストアップするツール。
Chrome拡張機能/Firefoxアドオンとして開発する。

## イメージ・アイデア

- 動画のアナリティクスの「いいね！したユーザー」ボタンの隣に「いいね！したユーザーをコピー」ボタンを追加
- ボタンを押すとダイアログでプレ垢優先ソートを有効にするか聞かれる
- ダイアログに回答するとユーザー名の羅列をクリップボードに入れる
- 広告みたいに、各動画のいいねをマージして「〇〇さん x3」みたいな形式にしてみたい(気が向いたら実装)

## ストア説明文

Chromeウェブストア: https://chrome.google.com/webstore/detail/accfkkgmbbglammgemoplkjdihanghae  
Firefoxアドオンセンター: https://addons.mozilla.org/ja/firefox/addon/ニコ動いいねリストアップツール/

ニコニコ動画において、自身の動画に「いいね！」をしてくれたユーザーをリストアップ、コピーするツールです。  
デフォルトではプレミアム会員を先頭にする順番になっていますが、本ツールでは会員の種別を無視した日時順にソートし直すことも可能です。

導入すると、動画のアナリティクスの「いいね！したユーザー」の隣に「いいね！したユーザーをコピー」というボタンが現れます。  
そのボタンをクリックするとニコニコのサーバーからいいねしたユーザーを取得し、クリップボードに書き込みます。  
その際、ソートを選択するとプレミアム会員かどうかを無視した純粋な日時順に並び替えることができます。

※ 本ツールはいいねしたユーザーが20件ずつしか取得できない関係上、ニコニコのサーバーとの通信を何度も行います。サーバーに負荷をかけることを理解し、むやみに使わないようにお願いいたします。
また、いいねしたユーザーが多ければ多いほど取得には時間がかかります。気長にお待ち下さい。
