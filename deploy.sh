#!/bin/bash
set -eo pipefail

RED="\033[0;31m"
GREEN="\033[0;32m"
NC="\033[0m" # No Color

echo -e "${GREEN}Deploying updates to GitHub...${NC}"

git checkout ./package-lock.json

if [[ $(git status -s) ]]
then
    echo "${RED}The working directory is dirty. Please commit any pending changes.${NC}"
    exit 1;
fi

git config --global user.email "telepenin.nikolay@gmail.com"
git config --global user.name "circle-ci"

echo -e "${GREEN}Deleting old publication${NC}"

rm -rf public
mkdir public
git worktree prune
rm -rf .git/worktrees/public/

echo -e "${GREEN}Checking out master branch into public${NC}"
git worktree add -B master public origin/master

echo -e "${GREEN}Removing existing files${NC}"
rm -rf public/*

echo -e "${GREEN}Generating site${NC}"
vuepress build

#echo -e "${GREEN}Setup domain name${NC}"
#echo allrise.io >> ./public/CNAME

echo -e "${GREEN}Updating master branch${NC}"
cd public
git ls-files -m | xargs | git add . && git commit -m "Publishing to master (deploy.sh) [ci skip]"

echo -e "${GREEN}Pushing to remote${NC}"
git push -f -u origin master
