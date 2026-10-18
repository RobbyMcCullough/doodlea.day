from PIL import Image
from pathlib import Path
src=Image.open('drafts/cartoon-bat-in-flight/raw-approved-source.png').convert('RGB')
assert src.size==(1536,1024)
out=Image.new('RGB',src.size,(250,249,247))
for row in range(2):
    for col in range(3):
        cell=src.crop((col*512,row*512,(col+1)*512,(row+1)*512))
        dx=[-10,-13,-20][col]; dy=[-11,7][row]
        dest=Image.new('RGB',(512,512),(250,249,247))
        dest.paste(cell,(dx,dy))
        out.paste(dest,(col*512,row*512))
path=Path('drafts/cartoon-bat-in-flight/cartoon-bat-in-flight-contact-sheet.png')
out.save(path)
print(path)
