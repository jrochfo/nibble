# Link preview image

`og.html` draws `public/og.jpg` (1200x630): a paper card punched over two photos, with the site's
shadows and texture.

Regenerate:

```sh
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --hide-scrollbars \
  --window-size=1200,630 --force-device-scale-factor=2 --virtual-time-budget=30000 \
  --screenshot=og@2x.png "file://$PWD/tools/og/og.html"
python3 -c "from PIL import Image; Image.open('og@2x.png').convert('RGB').resize((1200,630), Image.LANCZOS).save('public/og.jpg', quality=90)"
```

Photos (Wikimedia Commons):
- [Cherry blossom buds 1](https://commons.wikimedia.org/wiki/File:Cherry_blossom_buds_1.jpg) by W.carter, public domain
- [Green leaf with sunlight](https://commons.wikimedia.org/wiki/File:Green_leaf_with_sunlight.jpg) by Joselodos, CC0
