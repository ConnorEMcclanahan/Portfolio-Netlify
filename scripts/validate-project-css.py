"""Validate shared project CSS with Python's standard library only."""
import argparse
from functools import partial
from html.parser import HTMLParser
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import re
import subprocess
from threading import Thread
from urllib.parse import urljoin
from urllib.request import urlopen

ROOT = Path(__file__).resolve().parents[1]
ENTRY = ROOT / "components/project-page/project-components.css"
PAGES = ("diplora", "fitphone", "motivate", "phillipswall")
IMPORT = re.compile(r'@import\s+url\("\./([^"\n]+\.css)"\);')


class StylesheetLinks(HTMLParser):
    def __init__(self):
        super().__init__()
        self.hrefs = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "link" and "stylesheet" in attrs.get("rel", "").split():
            self.hrefs.append(attrs.get("href", ""))


class QuietHandler(SimpleHTTPRequestHandler):
    def log_message(self, format, *args):
        pass


def validate(baseline=None):
    entry = ENTRY.read_text(encoding="utf-8")
    imports = IMPORT.findall(entry)
    assert imports, "No stylesheet imports found"
    assert len(imports) == len(set(imports)), "Duplicate imports"
    remaining = re.sub(r"/\*.*?\*/", "", IMPORT.sub("", entry), flags=re.S)
    assert not remaining.strip(), "Entry point must contain only comments/imports"
    chunks = []
    targets = []
    for name in imports:
        path = (ENTRY.parent / name).resolve()
        assert path.parent == ENTRY.parent, f"Import outside component folder: {name}"
        content = path.read_bytes()
        assert content.strip(), f"Empty stylesheet: {name}"
        assert b"@import" not in content, f"Nested import: {name}"
        # Relative assets must be reviewed before moving sheets into subfolders.
        assert not re.search(rb"url\s*\(", content), f"Review relative URLs: {name}"
        chunks.append(content)
        targets.append(path)
    results = [f"PASS: {len(targets)} unique, nonempty stylesheet imports"]

    if baseline:
        old = subprocess.check_output(
            ["git", "show", f"{baseline}:components/project-page/project-components.css"],
            cwd=ROOT,
        )
        # Git may store LF while the Windows checkout uses CRLF.
        normalize = lambda value: value.replace(b"\r\n", b"\n")
        assert normalize(b"".join(chunks)) == normalize(old), "CSS content/order changed"
        results.append(f"PASS: flattened CSS equals {baseline} (line endings normalized)")

    for page in PAGES:
        path = ROOT / "pages" / f"{page}.html"
        parser = StylesheetLinks()
        parser.feed(path.read_text(encoding="utf-8"))
        matches = [href for href in parser.hrefs if (path.parent / href).resolve() == ENTRY]
        assert len(matches) == 1, f"Missing/duplicate entry stylesheet in {page}"
    results.append("PASS: all four case-study pages retain their entry stylesheet")

    server = ThreadingHTTPServer(("127.0.0.1", 0), partial(QuietHandler, directory=str(ROOT)))
    thread = Thread(target=server.serve_forever, daemon=True)
    thread.start()
    try:
        origin = f"http://127.0.0.1:{server.server_port}/"
        paths = [ENTRY, *targets, *(ROOT / "pages" / f"{page}.html" for page in PAGES)]
        for path in paths:
            url = urljoin(origin, path.relative_to(ROOT).as_posix())
            with urlopen(url, timeout=10) as response:
                assert response.status == 200, url
                assert response.read() == path.read_bytes(), f"HTTP content mismatch: {url}"
                if path.suffix == ".css":
                    assert response.headers.get_content_type() == "text/css", url
        results.append(f"PASS: {len(paths)} HTML/CSS resources served successfully over localhost")
    finally:
        server.shutdown()
        server.server_close()
        thread.join()
    return results


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--baseline", help="Git revision containing the pre-split CSS")
    parser.add_argument("--report", type=Path, help="Optional report path for terminal-independent results")
    args = parser.parse_args()
    try:
        report = "\n".join(validate(args.baseline)) + "\n"
    except Exception as error:
        report = f"FAIL: {error}\n"
        if args.report:
            args.report.write_text(report, encoding="utf-8")
        raise
    if args.report:
        args.report.write_text(report, encoding="utf-8")
    print(report, end="")
