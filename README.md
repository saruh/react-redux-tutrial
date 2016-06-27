## 参考
- [Qiita : React Tutorial Example](http://qiita.com/ogomr/items/493e10c424e9d6bd2028)
    - React, Reduxの双方に対して知識がない場合は効率よく覚えられる。
    - 不要な記述がある
    - 不具合が出る
    - babelの設定をしていないので説明通りに実行するとエラーになる
    - socket.io-clientによるコネクションを複数個所で行っているため、サーバ側と複数セッションを持ってしまう。
- [Github : React Getting Started](https://facebook.github.io/react/docs/getting-started-ja-JP.html)
- [Full-Stack Redux Tutorial](http://teropa.info/blog/2015/09/10/full-stack-redux-tutorial.html)
- [Real time data flow with Redux and Socket.io](http://spraso.com/real-time-data-flow-with-redux-and-socket-io/)

## エラー発生
- React Tutorial 20 : コメントの書き込み
    - 普通にpostすると"id"がつかないことが原因
    - サーバ側で保存する前にidをつけるように変更
- Webpackでコンパイルエラー
    - babelの設定がされていない
    - `npm install --save-dev babel-preset-react`
    - package.json もしくは .babelrc で設定
```
# package.jsonであれば
{
  ...
  },
  "babel": {
    "presets": [
      "es2015",
      "react"
    ]
  }
}
```
```
# .babelrcであれば
{
  "presets": [
    "es2015",
    "react"
  ]
}
```

## 気になったこと
- 起動コマンド :
    - `DEBUG=react-tutorial-example:* npm start`  
        - 環境変数の設定は意味あるの？
        - `npm start`じゃダメ？
    - 上記設定をすると
        - 起動時に`react-tutorial-example:server Listening on port 3000 +0ms`と表示される。
        - 即反映はしなかった、、、、。
- これは不要ではないか？
    - views/index.jade
```
extends layout

block content
  #content
  script(type='text/babel', src='/javascripts/example.js')
  script(type='text/babel').      <--- ここ！！
```

## まとめ
- Reactの独自仕様
    - [getInitialState](http://js.studio-kingdom.com/react/component_specs/get_initial_state)
    - [componentDidMount](http://js.studio-kingdom.com/react/component_lifecycle/mounting_componentdidmount)
    - [componentWillMount](http://js.studio-kingdom.com/react/component_lifecycle/mounting_componentwillmount)
- Reduxの構成
    - actions
        - API通信やビジネスロジックなどのロジックを配置
    - components
        - Component(構成部品) を配置
            - Reactコンポーネント
            - CSS Modulesで使用するsassのファイル
        - [Presentational and Container Components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#.dfgmuceav)などの設計議論をふまえて、このフォルダ配下はActionを発行せず下記のみにフォーカスする
            - "受け取ったpropsからの描画"
            - "ユーザ入力を受け付ける"
    - constants
        - Action と Reducer の const を配置
        - 定石ではないかも
        - [参考サイト](http://qiita.com/ogomr/items/493e10c424e9d6bd2028)
    - containers
        - Reactコンポーネント
        - components配下とは逆に極力画面要素の描画はさける
        - "components配下で発生したイベントのハンドリング" -> "Actionのコール" に専念
    - entries
        - ルーティングに関して記述されたファイルを配置
        - 定石ではないかも
        - [参考サイト](http://qiita.com/shimpeiws/items/df31e2d70cc67c68115d)
    - lib/records
        - immutable.jsのRecord型を使い、独自にモデルクラスを作成
        - 定石ではないかも
        - [参考サイト](http://qiita.com/shimpeiws/items/df31e2d70cc67c68115d)
    - reducers
        - ReduxのReducersにあたる部分です。実際にStateを更新します。
        - Action に応じてアプリケーションの状態を変更する機構が設置される。
    - store
        - アプリケーションの状態を保持する機構と状態を更新する機構が設置される。
    - utils
        - DevTools などが設置される。
        - 定石ではないかも
        - [参考サイト](http://qiita.com/ogomr/items/493e10c424e9d6bd2028)
- Middlewareについて
    - [参考](https://hogehuga.com/post-1123/)
- Reducersについて
    - [参考](http://yukidarake.hateblo.jp/entry/2015/09/30/195932)