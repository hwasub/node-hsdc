# hsdc-js

> port of HSDeckCode (previously written in PHP; closed-source) to node.js

## Build

``` bash
# Build a Docker image
$ docker build -t hsdcjs .

# Run, or Deploy
$ docker run --rm -it -d -p 80:3000 hsdcjs

# then navigate to http://localhost:3000
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

This software is released under the Mozilla Public Lincense 2.0. See LICENSE for futher information.

## Copyright

(c) 2018 Hwasub Lee. All rights reserved.
