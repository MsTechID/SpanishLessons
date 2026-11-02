"""Assemble viaje.html from the lesson site's shared CSS/engine + trip content/app."""
import pathlib, sys

src = pathlib.Path(sys.argv[1]).read_text(encoding="utf-8").split("\n")
here = pathlib.Path(__file__).parent
L = lambda a, b: "\n".join(src[a-1:b])   # 1-based inclusive line ranges of index.html

def find(s, start=1):
    for i in range(start-1, len(src)):
        if s in src[i]:
            return i+1
    raise SystemExit("marker not found: " + s)

css_a, css_b = find("<style>")+1, find("</style>")-1
banner_a = find('<div class="banner" id="voiceBanner"'); banner_b = find("</div>", find('id="dismissBanner"'))+1
quiz_a = find('<button id="quizToggle"'); quiz_b = find("</button>", quiz_a+1)
player_a = find('<div id="player"'); panel_b = find("</aside>")
render_a = find("/* ============================================================ SLUG + RENDER"); render_b = find("function renderLesson(L){")-1
engine_a = find("/* ============================================================ AUDIO ="); engine_b = find("loadVoices(); setTimeout(loadVoices")

top = (here/"shell_top.html").read_text(encoding="utf-8")
top = top.replace("/*__BASE_CSS__*/", L(css_a, css_b))
top = top.replace("</header>\n", "</header>\n\n" + L(banner_a, banner_b) + "\n", 1)
top = top.replace("<!--__ENGINE_MARKUP__-->", L(quiz_a, quiz_b) + "\n\n" + L(player_a, panel_b))

js = "\n".join([
    (here/"content.js").read_text(encoding="utf-8"),
    L(render_a, render_b),
    L(engine_a, engine_b),
    (here/"app.js").read_text(encoding="utf-8"),
])
out = top + js + "\n</script>\n</body>\n</html>\n"
pathlib.Path(sys.argv[2]).write_text(out, encoding="utf-8")
print("wrote", sys.argv[2], len(out), "bytes")
