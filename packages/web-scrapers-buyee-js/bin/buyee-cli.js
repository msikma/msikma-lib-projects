#!/usr/bin/env node

// Determine whether to run pre-transpiled code or to transpile on the fly.
// The latter is useful for testing and will be activated if the WEB_SCRAPERS_USE_SRC envvar is set.
require(`../${process.env.WEB_SCRAPERS_USE_SRC === '1' ? 'src' : 'dist'}/bin/buyee-cli.js`)
