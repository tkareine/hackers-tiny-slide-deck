# Releasing

1. Check that [CI] is green.

2. Double check that tests pass:

    ``` shell
    npm ci && npm test
    ```

3. Double check that example works:

    ``` shell
    npm run example:build && npm run lib:serve
    open http://localhost:8080/example.html
    ```

4. Update version number:

    ``` shell
    $EDITOR package.json
    ```

5. Describe a summary of changes since the last release:

    ``` shell
    $EDITOR CHANGELOG.md
    ```

6. Review your changes, commit them, tag the release:

    ``` shell
    git diff
    git add -p
    git commit -m 'Release version $version'
    git tag v$version
    git push origin master --tags
    ```

7. Update and publish example:

    ``` shell
    npm run example:publish
    ```

8. Publish npm package:

    ``` shell
    npm publish
    ```

[CI]: https://github.com/tkareine/hackers-tiny-slide-deck/actions?workflow=CI
