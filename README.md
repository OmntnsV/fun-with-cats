# Viktor Khakhlov presents "Fun with Cats"

## What to expect?
- Upon starting the project you will be greeted with a home page. Website will be styled according to your device's preferred theme. Navigate further using _facts_ link.
- You will be redirected to login page, because facts are only available for domestic kitties. Simply enter your name (3-15 chars long) with latin symbols.
- Now you can enjoy the archive of interesting cat facts. For your convenience there's a search and sort options.
> _/facts_ page accepts query parameters search and sort. Adding search query will load the page with search filter applied automatically, same for sort, but it only accepts following options: all (default), longer-first, shorter-first, short-only, long-only.
- If you are interested to see the fact in fullscreen then simply click the fact card. You will be redirected to a dedicated fact page.
- Dedicated fact page is also available by navigating through _/facts/**factId**_, where **factId** is an integer.
- When you are done reviewing the facts you can log out by clicking on your avatar in top right corner. You will be redirected back to the login screen.

## Tech stack
- Vue 2
- SCSS
- Axios

## Project reproduction
Install dependencies with your favourite package manager:
``` bash
    bun i
```
Run project on locally
``` bash
    bun run serve
```
