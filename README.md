# greyscale-transform
png画像とかjpeg画像をグレースケール化(モノクロ化, 白黒化)してクライアントに返すアプリです。

# 使用した言語
HTML/CSS, Javascript  
バックエンドではJavascriptの実行環境としてNode.js  
docker対応


# 使用したライブラリ
  ### フロントエンド
  React
  ### バックエンド
  Express, Sharp
# 起動方法
  ### 1.フロントエンドのbuild
  buildファイルはignoreしてるので含まれていない
  そのままdocker-composeするとエラーで止まるので packages/frontend に移動して
  ###
    npm run build
  次に, 元の位置に戻って
  ###
    docker-compose up --build
  で起動
