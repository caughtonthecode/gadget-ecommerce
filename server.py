import os
import sys
from http.server import HTTPServer, SimpleHTTPRequestHandler
import urllib.parse

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 3000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class CleanUrlHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path.lstrip('/')
        local_path = os.path.join(DIRECTORY, path)

        # If clean URL like /shop-cart or /vendor/1 without .html
        if path and not os.path.exists(local_path):
            if os.path.exists(local_path + '.html'):
                self.path = '/' + path + '.html'
                if parsed.query:
                    self.path += '?' + parsed.query
        super().do_GET()

if __name__ == '__main__':
    httpd = HTTPServer(('0.0.0.0', PORT), CleanUrlHandler)
    print(f"Serving at http://localhost:{PORT}")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        pass
