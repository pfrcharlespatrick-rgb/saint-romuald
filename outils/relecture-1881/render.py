import sys, pypdfium2 as pdfium
from functools import lru_cache
from PIL import Image
from sources import D2
_P = D2()
P1, P2 = _P[0], _P[1]

Image.MAX_IMAGE_PIXELS = None



def locate(ms):
    # partie 1 (ms 1-29): first half of PDF page 1 is blank -> idx = ms+1
    # partie 2 (ms 30-59): idx = ms-29
    if ms <= 29: path, idx = P1, ms + 1
    else:        path, idx = P2, ms - 29
    return path, (idx - 1) // 2, ("top" if idx % 2 == 1 else "bot")

@lru_cache(maxsize=4)
def half_image(ms, dpi):
    path, pi, half = locate(ms)
    img = pdfium.PdfDocument(path)[pi].render(scale=dpi/72).to_pil()
    w, h = img.size
    return img.crop((0, 0, w, h//2) if half == "top" else (0, h//2, w, h))

if __name__ == "__main__":
    ms  = int(sys.argv[1])
    dpi = int(sys.argv[2]) if len(sys.argv) > 2 else 150
    img = half_image(ms, dpi)
    out = f"ms{ms:02d}_full.png"; img.save(out)
    print(out, img.size, locate(ms))
