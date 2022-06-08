CommitMsg = "first commit"

all:
	echo "choose: install/commit"

install:
	npm init -y && npm i --save-dev autoprefixer browser-sync cssnano gulp gulp-concat gulp-postcss gulp-replace gulp-sass gulp-sourcemaps gulp-uglify sass

commit:
	cp -r src dist && cp Makefile gulpfile.js ./dist
	cd dist && git add * && git commit -m ${CommitMsg} && git push -u origin master && cd ..

