const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
const DIST_DIR = __dirname;

function parseRedirects() {
  const redirectsPath = path.join(DIST_DIR, '_redirects');
  if (!fs.existsSync(redirectsPath)) return [];

  const content = fs.readFileSync(redirectsPath, 'utf-8');
  const lines = content.split('\n');
  const redirects = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    const parts = trimmed.split(/\s+/);
    if (parts.length >= 2) {
      const from = parts[0];
      const to = parts[1];
      const status = parts[2] ? parseInt(parts[2]) : 200;
      redirects.push({ from, to, status });
    }
  }

  return redirects;
}

function matchRedirect(pathname, redirects) {
  for (const redirect of redirects) {
    const fromPattern = redirect.from;
    
    // Convert Netlify-style patterns to regex
    let regexPattern = fromPattern
      .replace(/\*/g, '.*')
      .replace(/\?/g, '.')
      .replace(/\$(\d+)/g, '(.*)'); // Handle $1, $2 etc
    
    if (!regexPattern.startsWith('^')) regexPattern = '^' + regexPattern;
    if (!regexPattern.endsWith('$')) regexPattern = regexPattern + '$';

    try {
      const regex = new RegExp(regexPattern);
      const match = pathname.match(regex);

      if (match) {
        let toPath = redirect.to;
        // Replace $1, $2, etc with captured groups
        for (let i = 1; i < match.length; i++) {
          toPath = toPath.replace(new RegExp(`\\$${i}`, 'g'), match[i]);
        }
        // Replace $: and $/ if present
        toPath = toPath.replace(/\$:/g, ':').replace(/\$\//g, '/');
        return { to: toPath, status: redirect.status };
      }
    } catch (e) {
      // Skip invalid regex
      continue;
    }
  }
  return null;
}

const redirects = parseRedirects();
console.log('Loaded redirects:', redirects.length);

// Custom middleware to handle redirects BEFORE static file serving
app.use((req, res, next) => {
  const pathname = req.path;
  const redirect = matchRedirect(pathname, redirects);

  if (redirect) {
    if (redirect.status >= 300 && redirect.status < 400) {
      return res.redirect(redirect.status, redirect.to);
    } else {
      // Rewrite the URL internally
      req.url = redirect.to;
    }
  }
  next();
});

app.use(express.static(DIST_DIR));

// SPA fallback for any unmatched routes
app.use((req, res) => {
  const indexPath = path.join(DIST_DIR, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send('Not found');
  }
});

app.listen(PORT, () => {
  console.log(`Dev server running at http://localhost:${PORT}`);
  console.log('Clean URLs enabled (reads from _redirects)');
});