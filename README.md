[参考](http://qiita.com/ogomr/items/493e10c424e9d6bd2028)
[参考](https://facebook.github.io/react/docs/getting-started-ja-JP.html)

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
- Reactの独自仕様
    - [getInitialState](http://js.studio-kingdom.com/react/component_specs/get_initial_state)
    - [componentDidMount](http://js.studio-kingdom.com/react/component_lifecycle/mounting_componentdidmount)
