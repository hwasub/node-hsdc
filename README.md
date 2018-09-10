[![CircleCI](https://circleci.com/gh/hwasub/node-hsdc/tree/master.svg?style=shield)](https://circleci.com/gh/hwasub/node-hsdc/tree/master) [![codecov](https://codecov.io/gh/hwasub/node-hsdc/branch/master/graph/badge.svg)](https://codecov.io/gh/hwasub/node-hsdc)

# hsdc-js

> port of HSDeckCode (previously written in PHP) to node.js

## Build

``` bash
# Build a Docker image
$ docker build -t hsdcjs .

# Run, or Deploy
$ docker run --rm -it -d -p 80:3000 hsdcjs

# then navigate to http://localhost:80
```

OR,

``` bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000, including api server
$ yarn run dev

# serving only api server at localhost:3000
$ yarn run api

# build for production and launch server
$ yarn build && yarn serve
# OR
$ yarn start # (it will build then serve)

 # then navigate to http://localhost:3000
```

## License

(c) 2018 Hwasub Lee. All rights reserved. This software is released under the Mozilla Public Lincense 2.0. See LICENSE for futher information.

## Disclaimer

Hearthstone is a trademark or registered trademark of Blizzard Entertainment, Inc., in the U.S. and/or other countries. I and other contributors are not affiliated with Blizzard Entertainment. Some files in this software may contain data that are copyrighted by Blizzard Entertainment.
