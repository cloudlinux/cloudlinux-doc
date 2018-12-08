#!/usr/bin/env sh

# abort on errors
set -e

# FIXME: need to use theme from cloudlinux.github.com!
yarn add https://github.com/cloudlinux/cloudlinux-doc-theme

# build
yarn docs:build

# navigate into the build output directory
cd docs/.vuepress/dist

# if you are deploying to a custom domain
echo 'docs-dev.cloudlinux.com' > CNAME

git config --global user.email "telepenin.nikolay@gmail.com"
git config --global user.name "circle-ci"

git init
git add -A
git commit -m 'deploy'

# if you are deploying to https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:cloudlinux/cloudlinux-doc.git master:gh-pages

cd -