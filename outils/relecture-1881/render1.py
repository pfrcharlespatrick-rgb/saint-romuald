import sys, pypdfium2 as pdfium
from functools import lru_cache
from PIL import Image
from sources import D1
PARTS = D1()

Image.MAX_IMAGE_PIXELS = None

@lru_cache(maxsize=4)
def half_raw(part, idx, dpi):
    """part 0-2, idx = numéro de demi-page 1..30 dans cette partie"""
    doc = pdfium.PdfDocument(PARTS[part])
    img = doc[(idx - 1) // 2].render(scale=dpi/72).to_pil()
    w, h = img.size
    return img.crop((0, 0, w, h//2) if idx % 2 == 1 else (0, h//2, w, h))

if __name__ == "__main__":
    from PIL import ImageOps
    tiles = [(0,1),(0,2),(0,3),(1,1),(2,1),(2,30)]
    ims = []
    for part, idx in tiles:
        im = half_raw(part, idx, 150).convert('L')
        W, H = im.size
        ims.append(im.crop((int(W*0.05), int(H*0.14), int(W*0.60), int(H*0.30))))
    w = max(i.width for i in ims); c = Image.new('L', (w, sum(i.height for i in ims)), 255); y = 0
    for i in ims: c.paste(i, (0, y)); y += i.height
    c.save('d1_entetes.png'); print('d1_entetes.png', c.size, '| ordre :', tiles)
