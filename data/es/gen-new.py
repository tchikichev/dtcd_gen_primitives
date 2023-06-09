#%%
from cmath import isnan
import json
import jsonschema

import os, sys

import numpy as np
import pandas as pd
import re


loc = '/home/user/git/datacad-primitives/es_primitives/src'
os.chdir(loc)


#%%
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


#%%

linked_attributes = pd.read_csv('linked_attributes.csv')
joined = pd.read_csv('joined_attributes_to_generate_from.csv')


#%%
import codecs
import json
import shutil
from port_configurations import transform_port_configuration
from port_configurations import ports_cfg as port_template

import  svgutils
template = template_json

# fLoc = "/home/user/git/dcdcompute/scheme/xml/extract/"
# raw_cim_meta_floc = os.path.join(fLoc, "rdf_classes.xml.json")

def gen_primitive(title, image, w, h, properties, ports='', rotate='none'):
    primitive = template

    primitive['title'] = title
    primitive['image'] = "icon.svg"
    primitive['properties'] = {}

    layout = {'heigth': int(h), 'width': int(w)}
    # layout = {'heigth': int(w), 'width': int(h)}
    ports_config = port_template[ports].copy()
    
    if (rotate == 'right') or (rotate == 'left'):
        # layout = {'heigth': int(h), 'width': int(w)}    
        ports_config = transform_port_configuration(ports_config, rotate)
    
    primitive['ports'] = ports_config
    primitive['layout'] = layout

    for _, pi in properties.iterrows():
        brief = pi['brief'].replace('"', '')
        primitive['properties'][pi['attribure name']] = {'expression': "//\"%s\"\n' '" % brief, 'type': 'expression'}
        # print(primitive['properties'])
    return primitive

# use rotate >> update ports profile

def generate_primitives(prefix = 'es', save_to = 'raw-primitives'):
    for _,pr in joined.iterrows():
        title, name, image, w, h, ports_conf, rot, img_path = pr['compname'], pr['PrimitiveName'], pr['iconname'], pr['w'], pr['h'], pr['ports_conf'], pr['rotate'], pr['path']
        # if name != name:
        #     print(title, image)
        # if name.startswith("Engine"):
        #     print(name, rot)
        #     pass
        
        namef = re.sub('[^a-zA-Z0-9 \n\.]', '', name)
        cl_name = pr['Класс CIM из IEC61970-301']
        properties = linked_attributes.loc[cl_name == linked_attributes['class_name']]
        # pr_json = gen_primitive(title, image, h, w, properties)
        pr_json = gen_primitive(title, image, w, h, properties, ports_conf, rot)
        # add raw json props in rdf style as meta
        # if not pd.isnull(cl_name):
        #     cim_meta_path = raw_cim_meta_floc + cl_name + '.json'
        #     print(cim_meta_path)
        #     with open(cim_meta_path, 'r', encoding='utf-8') as json_file:
        #         jsobb = json.load(json_file)
        #         pr_json['properties']["raw_CIM_props"] = {'expression': jsobb, 'type': 'expression'}

        comppath = os.path.join(save_to, prefix + namef)        
        
        if (rot != 'none'):
            if (rot == 'right'):
                comppath = os.path.join(save_to, prefix + 'r' + namef)
            if (rot == 'down'):
                comppath = os.path.join(save_to, prefix + 'd' + namef)
            if (rot == 'left'):
                comppath = os.path.join(save_to, prefix + 'l' + namef)

        os.mkdir(comppath)
        with codecs.open(os.path.join(comppath, 'primitive.json'), 'w', encoding='utf-8') as f:
            json.dump(pr_json, f, ensure_ascii=False)

        # image copy
        # src = os.path.join('primitives', image) 
        src = img_path
        dest = os.path.join(comppath, 'icon.svg')
        shutil.copyfile(src, dest)


# %%
import shutil

shutil.rmtree('raw-primitives')
os.mkdir('raw-primitives')

# %%
# gen normal primitives
generate_primitives('es', 'raw-primitives')

# %%
def indicator5(real):
    indicator = []
    res = real
    for lim in [5,5,5,2]:
        if res > lim:
            indicator.append(lim)
            res -= lim
        else:
            indicator.append(res)
            return indicator
    return indicator

# %%
