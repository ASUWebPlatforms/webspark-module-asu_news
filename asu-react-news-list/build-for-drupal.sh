#!/bin/sh
cd build 
mkdir static/drupal-build
cat static/css/main.*.chunk.css static/css/main.*.chunk.css.map >> static/drupal-build/style.css
cat ../src/drupal-resources/start.js  static/js/main.*.chunk.js static/js/2.93*.chunk.js >> static/drupal-build/main.js
cp ../src/drupal-resources/index.html static/drupal-build/