# Releasing

1. Double check that tests pass

    ``` shell
    npm ci && npm test
    ```

2. Double check that example works

    ``` shell
    npm run example:build && npm run lib:serve
    open http://localhost:8080/example.html
    ```

3. Update version number

    ``` shell
    $EDITOR package.json
    ```

4. Describe a summary of changes since the last release

    ``` shell
    $EDITOR CHANGELOG.md
    ```

5. Review your changes, commit them, tag the release:

    ``` shell
    git diff
    git add -p
    git commit -m 'Release version $version'
    git tag v$version
    git push origin master --tags
    ```


6. Update and publish example

    ``` shell
    npm run example:publish
    ```

7. Publish npm package

    ``` shell
    npm publish
    ```
