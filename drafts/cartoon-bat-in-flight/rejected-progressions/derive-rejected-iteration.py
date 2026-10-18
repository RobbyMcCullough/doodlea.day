from PIL import Image, ImageDraw, ImageFilter
from pathlib import Path
src=Image.open('drafts/cartoon-bat-in-flight/single-master-source.png').convert('RGB')
master=src.crop((425,695,825,1095))
finish=src.crop((852,695,1252,1095))
blank_strip=src.crop((425,1110,825,1235))
bg=Image.new('RGB',(400,400))
for y in range(400): bg.paste(blank_strip.crop((0,y%125,400,y%125+1)),(0,y))
def layer(head=True,body=False,left=False,right=False,face=False):
    m=Image.new('L',(400,400),0); d=ImageDraw.Draw(m)
    if head:
        d.ellipse((90,102,310,290),fill=255)
        d.rectangle((90,66,190,197),fill=255)
        d.rectangle((210,66,320,197),fill=255)
    if body:
        d.ellipse((153,265,250,366),fill=255)
        d.ellipse((157,344,198,388),fill=255)
        d.ellipse((205,344,248,388),fill=255)
    if left: d.polygon([(0,190),(100,185),(165,260),(178,339),(110,341),(55,336),(0,290)],fill=255)
    if right: d.polygon([(235,260),(300,185),(400,190),(400,290),(345,336),(290,341),(222,339)],fill=255)
    out=Image.composite(master,bg,m.filter(ImageFilter.GaussianBlur(2)))
    if not face:
        pixels=master.load(); fm=Image.new('L',(400,400),0); mp=fm.load()
        rois=[(132,154,207,234),(208,169,278,229),(150,224,274,268)]
        for x1,y1,x2,y2 in rois:
            for yy in range(y1,y2):
                for xx in range(x1,x2):
                    if min(pixels[xx,yy])<105: mp[xx,yy]=255
        fm=fm.filter(ImageFilter.MaxFilter(7)).filter(ImageFilter.GaussianBlur(2))
        out=Image.composite(bg,out,fm)
    return out
frames=[layer(),layer(body=True),layer(body=True,left=True),layer(body=True,left=True,right=True),master,finish]
canvas=Image.new('RGB',(1320,880),(250,247,241))
for i,im in enumerate(frames):
    x=(i%3)*440+20;y=(i//3)*440+20
    canvas.paste(im,(x,y))
out=Path('drafts/cartoon-bat-in-flight/cartoon-bat-in-flight-contact-sheet.png')
canvas.save(out)
print(out)
