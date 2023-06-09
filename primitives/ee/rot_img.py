#%%
import  svgutils

img_path = "/home/user/git/datacad-primitives/es_primitives/src/primitives/other/Генератор.svg"

# svg_fig =  svgutils.transform.fromfile(img_path)
# svg_fig


# # svg_fig.transform()
# # %%
# # svg_fig.transform()

# #  rotate(angle, x=0, y=0)[source]

# # import svgutils

# dest = img_path + '_r.svg'
# svg = svgutils.transform.fromfile(img_path)
# originalSVG = svgutils.compose.SVG(img_path)
# originalSVG.rotate(90, int(svg.height) / 2., int(svg.width) / 2.)
# # originalSVG.move()

# figure = svgutils.compose.Figure(originalSVG.height, originalSVG.width, originalSVG)
# figure.save(dest)

#%%
from svgmanip import Element
#%%
# output = Element(384, 356)  # size of the output file.

# fate = Element('assets/fate.svg').rotate(-15)
# skip = Element('assets/skip.svg').rotate(-5)
# attack = Element('assets/attack.svg').rotate(5)
# output.placeat(fate, 0.73, 23.55)
# output.placeat(skip, 107.81, 8.76)
# output.placeat(attack, 170.9, 0.08)

# output.dump('output.svg')
# output.save_as_png('output.png', 1024)

imagesdir = "/home/user/git/datacad-primitives/es_primitives/src/images"

#%%
import shutil
src = os.path.join(imagesdir, 'rot', 'to_rot')
dest = os.path.join(imagesdir, 'rot')

# shutil.rmtree(dest)
# os.mkdir(dest)

#%%
import os

for name in os.listdir(src):
    if not name.endswith('svg'):
        continue

    fname = os.path.join(src, name)
    svg = Element(fname)

    output = svg.rotate(90)
    output.dump(os.path.join(dest, 'r_' + name))

    # output = svg.rotate(-90)
    # output.dump(os.path.join(dest, 'l_' + name))
    # # print("write to ",  dest)
    # if (not name.startswith("r")) and (not name.startswith("l")):


# test = Element(img_path)
# output = test.rotate(90)

# dest = img_path + '_r.svg'

# output.dump(dest)
# print("write to ",  dest)





# >>> from svgutils import transform
# >>> import matplotlib.pyplot as plt
# >>> fig = plt.figure()
# >>> line, = plt.plot([1,2])
# >>> svgfig = transform.from_mpl(fig,
# ...              savefig_kw=dict(transparent=True))
# >>> svgfig.getroot()
# <svgutils.transform.GroupElement object at ...>
# %%
import svgutils

test_img = os.path.join(imagesdir, list(os.listdir(imagesdir))[0])
test_img_to = test_img + '_out.svg'

#%%
# svg = svgutils.transform.fromfile(test_img)
# w, h = svg.get_size()


# %%
# originalSVG = svgutils.compose.SVG(img_path)
# originalSVG.rotate(90, int(svg.height) / 2., int(svg.width) / 2.)
# # originalSVG.move()

# figure = svgutils.compose.Figure(originalSVG.height, originalSVG.width, originalSVG)
# figure.save(dest)

# svg.rotate(90, int())

originalSVG = svgutils.compose.SVG(test_img)
w, h = originalSVG.width, originalSVG.height
# originalSVG.rotate(90, h, w)
# originalSVG.rotate(90, h/2, w/2)
originalSVG.rotate(-90, w/2., h/2.)
# w_rot, h_rot = h, w
figure = svgutils.compose.Figure(h, w, originalSVG)
figure.save(test_img_to)

#%%
def rot(s,d, angle = 0.):
    svg = svgutils.compose.SVG(s)
    w, h = svg.width, svg.height
    # originalSVG.rotate(90, h, w)
    # originalSVG.rotate(90, h/2, w/2)
    svg.rotate(angle, w/2., h/2.)
    # w_rot, h_rot = h, w
    figure = svgutils.compose.Figure(h, w, svg)
    figure.save(d)

src = os.path.join(imagesdir, 'rot', 'to_rot')
dest = os.path.join(imagesdir, 'rot')

for name in os.listdir(src):
    if not name.endswith('svg'):
        continue

    s = os.path.join(src, name)
    d = os.path.join(dest, name)
    rot(s,d, angle = 180.)
    # rot(s,d, angle = -90.)
    # svg = Element(fname)
    # output = svg.rotate(90)
    # output.dump(os.path.join(dest, 'r_' + name))

# originalSVG.move()
# %%
# imagesdir_ = os.path.join(imagesdir, 'rot')
# src = os.path.join(imagesdir,  'l')
# dest = os.path.join(imagesdir, 'l')

# print
# for name in os.listdir(src):
#     if not name.endswith('svg'):
#         continue
#     if name.startswith('r_') or name.startswith('l_'):
#         s = os.path.join(src, name)
#         d = os.path.join(src, name[2:])
#         shutil.copyfile(s, d)
# %%
