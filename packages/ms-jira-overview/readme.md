## `ms-jira-overview`

Very simple scraper script for a specific Jira instance. Written for use in a personal script.

The cookies file must be in Netscape format, named `cookies.txt` and placed in `~/.config/ms-jira-js`. You'll need a cookie file that contains at least an `atlassian.xsrf.token` cookie that includes a `seraph.rememberme.cookie`. For example:

```
# Netscape HTTP Cookie File
# http://www.netscape.com/newsref/std/cookie_spec.html
# This is a generated file!  Do not edit.

jira.theorycraft.fi	FALSE	/	FALSE	0	atlassian.xsrf.token	0000-0000-0000-0000%7C0000000000000000000000000000000000000000%7Clout; seraph.rememberme.cookie=10000%3A0000000000000000000000000000000000000000
```

Keep in mind that `%7C` is a `|` (pipe), and `%3A` is a `:` (colon).

### License

MIT license.
