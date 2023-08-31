// ==UserScript==
// @name         niconico-garage Favorite and sminfo Getter
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  ニコニコガレージでいいねをしたユーザと動画情報を取得するスクリプトです。
// @author       A13X
// @match        https://www.upload.nicovideo.jp/niconico-garage/video/analytics/videos/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tampermonkey.net
// @grant        GM_setClipboard
// ==/UserScript==

(function () {
    'use strict';

    let A = '';
    let M = ''
    let liked_users = [];
    let retry_count = 0;
    const currentURL = window.location.href;
    const extractedPart = currentURL.match(/videos\/(sm\d+)/)[1];

    const copyLikedUsers = page => {
        /* 引数チェック */
        if ((typeof page).toLowerCase() !== 'number') page = 1;
        /* プログレスバー表示 */
        createProgressbar(false);
        /* 動画のIDを取得 */
        let split_url = location.pathname.split('/');
        let video_id = '';
        do {
            video_id = split_url.pop();
        } while (video_id.slice(0, 2) !== 'sm' && split_url.length > 0);
        if (video_id.slice(0, 2) !== 'sm' && split_url.length === 0) {
            window.alert('URLから動画IDを検出できませんでした。\n一度投稿動画一覧を表示してから、当該動画のアナリティクスを再表示してお試しください。');
            return null;
        }
        const params = {
            _frontendId: 23,
            _frontendVersion: '1.0.0',
            from: '2000-01-01',
            to: '2100-01-01',
            sort: 'premiumPriority',
            pageSize: 20,
            page: page
        };

        fetch('https://nvapi.nicovideo.jp/v2/users/me/videos/' + extractedPart + '/likes?' + encodeHTMLForm(params), {
            mode: 'cors',
            credentials: 'include',
            cache: 'no-cache'
        })
            .catch(err => {
                window.alert('サーバーに接続できませんでした。インターネット接続を確認してください。');
                console.log(err);
                return null;
            })
            .then(response => response.json())
            .then(json => {
                /* エラーチェック */
                if (json.meta.status !== 200) {
                    if (retry_count < 4) {
                        retry_count++;
                        setTimeout(copyLikedUsers, 3000, page);
                    } else {
                        window.alert('ユーザーの取得に失敗しました。間を空けて再試行してください。');
                    }
                    return null;
                }
                /* いいねユーザリストに取得したユーザを追加 */
                json.data.items.forEach(friend => {
                    liked_users.push({
                        name: friend.user.nickname,
                        time: Date.parse(friend.like.likedAt)
                    });
                });
                updateProgressbar(page, Math.ceil(json.data.summary.totalCount / 20));
                /* 続きがあれば次のリクエストへ(再帰) */
                if (json.data.summary.hasNext) {
                    setTimeout(copyLikedUsers, 0, page + 1);
                } else {
                    setTimeout(() => {
                        /* ソート選択 */
                        const exe_sort = window.confirm('「いいね！」ユーザーは、標準ではプレミアム会員を優先した日時順にソートされています。\nプレミアム会員かどうかを無視した通常の日時順にソートし直しますか？');
                        if (exe_sort) liked_users = sortByTime(liked_users);
                        /* コピー */
                        liked_users = liked_users.map(data => data.name);
                        M += '【いいねをした人】\n' + liked_users.join('\n')
                        window.focus();
                        GM_setClipboard(M, "text");
                        window.alert(String(liked_users.length) + '件のユーザー名をコピーしました。');
                        liked_users = [];
                        retry_count = 0;
                    }, 400);
                }
            });
    }

    const createProgressbar = is_reset => {
        /* 要素があれば表示する */
        const footer = document.getElementById('ista-communication');
        if (footer) {
            if (is_reset) footer.querySelector('div.ista-communication-progress').firstChild.style.width = '0px';
            footer.querySelector('div.ista-communication-progress').setAttribute('max', 10);
            footer.classList.add('visible');
            return;
        }
        /* 要素を生成 */
        const parent = document.createElement('div');
        const text = document.createElement('div');
        const progress = document.createElement('div');
        const current = document.createElement('div');
        parent.id = 'ista-communication';
        parent.classList.add('ista-communication', 'visible');
        text.classList.add('ista-communication-text');
        text.innerText = '通信中です……';
        progress.classList.add('ista-communication-progress');
        progress.setAttribute('max', 10);
        /* 要素を追加 */
        progress.appendChild(current);
        parent.appendChild(text);
        parent.appendChild(progress);
        document.body.appendChild(parent);
    };


    /* --- プログレスバーを更新 --- */
    const updateProgressbar = (current_value = 0, max_value = null) => {
        /* 要素を取得 */
        const footer = document.getElementById('ista-communication');
        const progress = footer.querySelector('div.ista-communication-progress');
        const current = progress.firstChild;
        if (max_value) {
            progress.setAttribute('max', max_value);
        } else {
            max_value = Number(progress.getAttribute('max'));
        }
        /* 進捗率を計算 */
        const per = Math.round(current_value * 100 / max_value);
        current.style.width = String(per) + 'vw';
    };

    /* --- 日時(time)でソート --- */
    const sortByTime = list => {
        list.sort((a, b) => {
            if (a.time > b.time) return -1;
            if (a.time < b.time) return 1;
            return 0;
        });
        return list;
    };


    /* --- 連想配列形式のパラメータをHTML Form形式に変換する関数 --- */
    const encodeHTMLForm = data => {
        const params = [];
        for (let name in data) {
            const value = data[name];
            const param = encodeURIComponent(name) + '=' + encodeURIComponent(value);
            params.push(param);
        }
        return params.join('&').replace(/%20/g, '+');
    }

    window.onload = function () {
        const confirm_a = window.confirm('いいねした人のデータを取得しますか？')
        if (confirm_a) {
            // 動画タイトルとURLを取り出し
            const targetElements2 = document.querySelector('#root > div > div.css-1jxefqo > div.css-yadqcc > div > div > div.css-noxjf > div > div.css-uf1ume > div.css-7mtslt > div.css-1gy8121 > div');
            M = '【動画のID】' + extractedPart + '\n'
            M += '【動画のタイトル】' + targetElements2.textContent + '\n'
            copyLikedUsers()
        }
    }

})();