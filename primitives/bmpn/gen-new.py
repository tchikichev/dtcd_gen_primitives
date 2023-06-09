# %%
import shutil
import codecs
from port_configurations import port_configurations as port_template
from io import BytesIO
import xml.etree.ElementTree as ET
from cmath import isnan
import json
import jsonschema

import os
import sys

import numpy as np
import pandas as pd

# %%


from pathlib import Path

path = Path(__file__).parent.absolute()
os.chdir(path)
# os.chdir('/home/user/Documents/singleline-guide/src')

iconpath = 'src-images'

imgdata = []
for fname in os.listdir(iconpath):
    if fname.endswith('.svg'):
        print(os.path.join(iconpath, fname))
        tree = ET.parse(os.path.join(iconpath, fname))
        width, height = tree.getroot(
        ).attrib["width"], tree.getroot().attrib["height"]
        imgdata.append((fname, width, height))
iconsmeta = pd.DataFrame(imgdata, columns=['iconname', 'w', 'h'])
iconsmeta['compname'] = iconsmeta['iconname'].map(lambda n: n[:-4])
iconsmeta



#%%


scale_factor = 2048./100.
iconsmeta['ws'] = iconsmeta['w'].apply(lambda x: int(np.round(int(x) /  scale_factor)))
iconsmeta['hs'] = iconsmeta['h'].apply(lambda x: int(np.round(int(x) / scale_factor)))

# iconsmeta['compname'].to_csv('comp-data.csv', index=None)

# icon names, dimensions
iconsmeta.to_csv('iconsmeta.csv', index=None)
# iconsmeta.head(5)



# %%

# df = pd.read_csv('comp-data.csv')

# nameref = pd.read_csv('components-list.csv', usecols=[
#     'ID примитива',
#     'Имя примитива',
#     'Номер в СТО 56947007-\n29.240.10.035-2009',
#     'Название в СТО 56947007-\n29.240.10.035-2009',
#     'Определение в ГОСТ Р 58651',
#     'Класс CIM из IEC61970-301'
# ])
# # nameref = pd.DataFrame(nameref)
# # nameref.head
# nameref.columns

# addicon = iconsmeta.join(nameref.set_index('Имя примитива'), on='compname')
# # addicon.set_index('compname')
# addicon.to_csv('linked_icons.csv')
# addicon

# %%

# from event-config.py import data_properties

# from events_config data_properties, selectProperySchema


# template_json_file = open('template.json')
# template_json = json.load(template_json_file)
# template_json


# # port_template.keys()

# addicon['ports_conf'] = 'pair_vertical'




# dict_keys(['single_center', 'single_top', 'pair_vertical', 'tri_vertical', 'tri_horizontal'])

# addicon.loc[addicon['iconname'].str.contains(
#     "линия"), 'ports_conf'] = 'pair_horizontal'
# addicon.loc[addicon['iconname'].str.contains(
#     "Отпайка"), 'ports_conf'] = 'four_sides'
# addicon.loc[addicon['iconname'].str.contains(
#     "реактор сдвоенный"), 'ports_conf'] = 'tri_horizontal'
# addicon.loc[addicon['iconname'].str.contains(
#     "реактор шунтирующий"), 'ports_conf'] = 'single_top'
# addicon.loc[addicon['iconname'].str.contains(
#     "Двигатель"), 'ports_conf'] = 'single_top'
# addicon.loc[addicon['iconname'].str.contains(
#     "Генератор"), 'ports_conf'] = 'single_top'
# addicon.loc[addicon['iconname'].str.contains(
#     "3-х обмоточный"), 'ports_conf'] = 'tri_vertical'
# addicon.loc[addicon['iconname'].str.contains(
#     "Автотрансформатор"), 'ports_conf'] = 'pair_vertical'
# addicon



# %%
# generate object json from list of predefined params/
# linked_attributes
template_json_file = open('template.json')
template_json = json.load(template_json_file)
template_json
# %%
common_props_json = list(template_json['properties'].keys())
common_props_json
# %%
# {'simpleProperty': {'expression': '123+33', 'type': 'expression'},
#  'otlProperty': {'type': 'datasource',
#   'expression': {'type': 'OTL',
#    'tws': 1658389152,
#    'twf': 1658389152,
#    'cache_ttl': 60,
#    'original_otl': 'makeresults count = 100'}},
#  'selectPropery': {'expression': '',
#   'type': 'expression',
#   'input': {'component': 'select',
#    'type': 'const',
#    'values': ['1', '2', '3', '4']}},
#  'selectOTLPropery': {'expression': '',
#   'type': 'expression',
#   'input': {'component': 'select',
#    'type': 'datasource',
#    'values': [],
#    'datasource': {'original_otl': 'makeresults count = 100'},
#    'columnName': '_time'}},
#  'switchProperty': {'expression': '',
#   'type': 'expression',
#   'input': {'component': 'switch'}}}

# %%

template = template_json


def gen_primitive(title, image, w, h, properties, ports=''):
    primitive = template

    primitive['title'] = title
    primitive['image'] = "icon.svg"
    primitive['layout'] = {'heigth': int(w), 'width': int(h)}
    primitive['properties'] = {}
    primitive['ports'] = port_template[ports]
    for _, pi in properties.iterrows():
        primitive['properties'][pi['attribure name']] = {
            'expression': pi['brief'], 'type': 'expression'}
        # print(primitive['properties'])
    return primitive


for _, pr in joined.iterrows():
    title, image, w, h, ports_conf = pr['compname'], pr['iconname'], pr['w'], pr['h'], pr['ports_conf']
    properties = linked_attributes.loc[linked_attributes['class_name']
                                       == pr['Класс CIM из IEC61970-301']]
    # pr_json = gen_primitive(title, image, h, w, properties)
    pr_json = gen_primitive(title, image, w, h, properties, ports_conf)
    comppath = os.path.join('raw-primitives', title)
    os.mkdir(comppath)
    with codecs.open(os.path.join(comppath, 'primitive.json'), 'w', encoding='utf-8') as f:
        json.dump(pr_json, f, ensure_ascii=False)
    shutil.copyfile(os.path.join('primitives', image),
                    os.path.join(comppath, 'icon.svg'))


# %%
shutil.rmtree('raw-primitives')
os.mkdir('raw-primitives')
# %%
