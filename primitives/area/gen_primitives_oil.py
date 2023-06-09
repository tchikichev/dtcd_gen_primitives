#%%
from cmath import isnan
import json
import jsonschema

import os, sys

import numpy as np
import pandas as pd
import re

loc = '/home/user/git/datacad-primitives/area'
os.chdir(loc)


#%%
import codecs
import json
import shutil

# %%
# read conf
conf = pd.read_csv('oil_primitives.csv')
conf.head()
# %%
conf.dropna(subset=['compname','iconname'], inplace=True)

#%%
# template json
fname = '/home/user/git/datacad-primitives/well/raw_primitives/demo/primitive.json'
# template_json_file = open(os.path.join(fname,'template.json'))
template_json_file = open(fname)
template_json = json.load(template_json_file)
# template_json
# pr_json = template_json
# %%
portconfig_json_file = open("ports_configuration.json")
portconfig_json = json.load(portconfig_json_file)


#%%
import copy

shutil.rmtree('raw-primitives')
os.mkdir('raw-primitives')

def read_props(path):
    pr = pd.read_csv(path, index_col=0)
    pr['expression'] = ""
    pr1 = pr[['type', 'expression']]
    # pr1.fillna(" ")
    # pr1.drop(['status', 'value', 'input'], axis=1, inplace=True)
    result = pr1.to_json(orient="index")

    parsed = json.loads(result)
    # pr1_f = json.dumps(parsed, indent=4)  
    # print(pr1_f)
    return parsed

for _,pr in conf.iterrows():
    pr_json = copy.deepcopy(template_json)

    props_source = pr['props_source']
    fname = os.path.join("./props", props_source)
    props = read_props(fname)

    pr_json['properties'] = props
    layout = {'heigth': int(pr['h']), 'width': int(pr['w'])}
    pr_json['layout'] = layout
    # pr_json['title'] = pr['Node']
    pr_json['title'] = pr['classname']
    pr_json['ports'] = portconfig_json[pr['ports']].copy()

    compname = "ups_" + pr['compname']
    img_path = os.path.join(loc, 'img', pr['iconname'] + ".svg")
    comppath = os.path.join(loc, 'raw-primitives', compname)

    # compname = "oil_" + pr['compname']
    # img_path = os.path.join(loc, 'img', pr['iconname'] + '.svg')
    # comppath = os.path.join(loc, 'raw-primitives', compname)

    os.mkdir(comppath)
    with codecs.open(os.path.join(comppath, 'primitive.json'), 'w', encoding='utf-8') as f:
        json.dump(pr_json, f, ensure_ascii=False)
    # image copy
    # src = os.path.join('primitives', image) 
    src = img_path
    dest = os.path.join(comppath, 'icon.svg')
    shutil.copyfile(src, dest)
# %%
