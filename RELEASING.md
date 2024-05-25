# Releasing

1. Check that [CI] is green.

2. Double check that tests pass:

    ``` shell
    npm ci && npm test
    ```

3. Check that the example slides work:

    ``` shell
    npm run example:build && npm run lib:serve
    open http://127.0.0.1:8080/example.html
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
    git commit --all --message="Release v$version"
    git tag v$version
    git push origin master v$version
    ```

   Make sure the version string in `package.json` and git tag name
   match. Note that the git tag name uses the `v` prefix.

   After pushing, the [CI] publishes npm package automatically.

8. Bump development version:

    ``` shell
    $EDITOR package.json
    ```

   Increase the patch version and add the `-dev` label. For example:
   `0.3.2-dev`.

   Commit and push:

    ``` shell
    git diff
    git commit --all --message='Bump development version'
    git push origin master
    ```

9. Update and publish example:

    ``` shell
    npm run example:publish
    ```

[CI]: https://github.com/tkareine/hackers-tiny-slide-deck/actions/workflows/ci.yml
