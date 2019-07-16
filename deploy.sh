#!/usr/bin/env sh

# abort on errors
set -e

# build
yarn docs:build

# navigate into the build output directory
cd docs/.vuepress/dist

if [[ "$CIRCLE_BRANCH" == 'dev' ]]; then
    domain="docs.cloudlinux.com"
    repo="cloudlinux-doc"
else
    domain="docs-dev.cloudlinux.com"
    repo="cloudlinux-doc-test"
fi

# if you are deploying to a custom domain
echo $domain > CNAME

git config --global user.email "telepenin.nikolay@gmail.com"
git config --global user.name "circle-ci"

git init
git add -A
git commit -m 'deploy [skip ci]'

# if you are deploying to https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:cloudlinux/$repo.git master:gh-pages

cd -