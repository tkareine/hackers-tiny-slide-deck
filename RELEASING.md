# Releasing

1. Check that [CI] is green.

2. Double check that tests pass:

    ``` shell
    npm ci && npm test
    ```

3. Check that the example slides work:

    ``` shell
    npm run example:build && npm run lib:serve
    open http://localhost:8080/example.html
    ```

4. Check that the difference of the current production build
   (`build/htsd.min.js`) compared to the previous build available at
   GitHub Pages (`origin/gh-pages`) is sensible:

    ``` shell
    NODE_ENV=production npm run lib:build
    npm run lib:diffBuild
    ```

   The aim here is to skim the differences between the builds for any
   unexpected changes.

5. Update version number:

    ``` shell
    $EDITOR package.json
    ```

6. Describe a summary of changes since the last release:

    ``` shell
    $EDITOR CHANGELOG.md
    ```

7. Review your changes, commit them, tag the release:

    ``` shell
    git diff
    git add -p
    git commit -m 'Release version $version'
    git tag v$version
    git push origin master --tags
    ```

8. Update and publish example:

    ``` shell
    npm run example:publish
    ```

9. Publish npm package:

    ``` shell
    npm publish
    ```

[CI]: https://github.com/tkareine/hackers-tiny-slide-deck/actions?workflow=CI
