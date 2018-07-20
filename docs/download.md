Download
========

Precompiled releases
--------------------


Minidi ships with two different files:


### Get the latest release &raquo;[here][release_dl]&laquo;


  [release_dl]: https://github.com/atomixnmc/minidi-dict/releases

* * *

Latest CI build from git
-----------

[![Travis build status](https://api.travis-ci.org/atomixnmc/minidi-dict.png)]()
We use the great [Travis Continuous Integration service](http://www.travis-ci.org) to automatically do builds from our git `master` branch. The builds are automatically uploaded to the Minidi website (that is the `gh-pages` branch of Minidi at GitHub) a few minutes after a commit is checked in.

Attention: To **download** the latest build, you need to right click -> "Save link as". Else you will only visit the Minidi website using the latest build!

Source code
-----------

To download and build from source, `node.js` >= 0.10 is required with installed npm.


```bash
git clone https://github.com/atomixnmc/minidi-dict.git
cd mdwiki

# will fetch deps and build everything (requires automake installed)
make

# now find your local mdwiki.html in the dist/ folder


# for development: Create a debugging friendly, unminified mdwiki-debug.html
# in dist/ with automatic filesystem watcher
./node_modules/.bin/grunt devel

```
