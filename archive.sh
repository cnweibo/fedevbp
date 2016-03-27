mkdir ../archive
git archive master | tar -x -C  ../archive
git checkout gh-pages
cp -R -f ../archive/* .
git add .
git commit -m"arhive gh-page"
git push
rm -rf ../archive
