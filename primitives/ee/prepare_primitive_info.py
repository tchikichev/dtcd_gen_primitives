#%%
from cmath import isnan
import json
import jsonschema

import os, sys

import numpy as np
import pandas as pd
import re

import xml.etree.ElementTree as ET
from io import BytesIO

#%%
loc = '/home/user/git/datacad-primitives/es_primitives/src'
os.chdir(loc)
iconpath = 'images'

def read_imgs_data(iconpath, imgdata):
    def eval_rot_by_name(fname):
        rotate = 'none'
        if str.endswith(fname, '_r.svg'):
            return 'right'
        if str.endswith(fname, '_l.svg'):
            return 'left'
        return rotate

    for fname in os.listdir(iconpath):
        if fname.endswith('.svg'):
            # print(os.path.join(iconpath, fname))
            rotate = eval_rot_by_name(fname)

            loc = os.path.join(iconpath, fname)
            tree = ET.parse(loc)
            width, height = tree.getroot(
            ).attrib["width"], tree.getroot().attrib["height"]

            width = re.sub("px", "", width)
            height = re.sub("px", "", height)

            # fname_ = fname
            # if fname.endswith('дублирование'):
            #     fname_ = re.sub('дублирование', '', fname)
            imgdata.append((fname, int(float(width)), int(float(height)), rotate, loc))

imgdata = []
iconpath = 'primitives_img'
read_imgs_data(iconpath, imgdata)

iconsmeta = pd.DataFrame(imgdata, columns=['iconname', 'w', 'h', 'rotate', 'path'])
iconsmeta['compname'] = iconsmeta['iconname'].map(lambda n: n[:-6])
iconsmeta

# %%
# nameref = pd.read_csv('components-list.csv', usecols=[
nameref = pd.read_csv('components-list-upd.csv', usecols=[
    'ID примитива',
    'Имя примитива',
    'PrimitiveName',
    'Номер в СТО 56947007-\n29.240.10.035-2009',
    'Название в СТО 56947007-\n29.240.10.035-2009',
    'Определение в ГОСТ Р 58651',
    'Класс CIM из IEC61970-301'
])
# nameref = pd.DataFrame(nameref)
# nameref.head
nameref.columns

pd2 = iconsmeta.loc[iconsmeta['iconname'].str.contains('дублирование')]
pd2['compname_raw'] = pd2['compname'].str.replace(r' дублирование', '', regex=True)
addicon2 = pd2.join(nameref.set_index('Имя примитива'), on='compname_raw')
addicon2['PrimitiveName'] = addicon2['PrimitiveName'] + 'Doubled'

addicon = iconsmeta.join(nameref.set_index('Имя примитива'), on='compname')
addicon.dropna(subset=['PrimitiveName'], inplace=True)
# addicon

#%%
addicon2.drop('compname_raw', axis = 1, inplace=True)
addicon = pd.concat([addicon, addicon2])
addicon

#%%
# addicon.set_index('compname')
addicon.to_csv('linked_icons.csv')
# addicon

#%%

addicon['ports_conf'] = 'pair_vertical'
# dict_keys(['single_center', 'single_top', 'pair_vertical', 'tri_vertical', 'tri_horizontal'])

addicon.loc[addicon['iconname'].str.contains("линия"), 'ports_conf'] = 'pair_horizontal'
addicon.loc[addicon['iconname'].str.contains("Отпайка"), 'ports_conf'] = 'four_sides'
addicon.loc[addicon['iconname'].str.contains("реактор сдвоенный"), 'ports_conf'] = 'tri_horizontal'
addicon.loc[addicon['iconname'].str.contains("реактор шунтирующий"), 'ports_conf'] = 'single_top'
addicon.loc[addicon['iconname'].str.contains("Двигатель"), 'ports_conf'] = 'single_top'
addicon.loc[addicon['iconname'].str.contains("Генератор"), 'ports_conf'] = 'single_top'
addicon.loc[addicon['iconname'].str.contains("3-х обмоточный"), 'ports_conf'] = 'tri_vertical'
addicon.loc[addicon['iconname'].str.contains("Автотрансформатор"), 'ports_conf'] = 'pair_vertical'
addicon.loc[addicon['PrimitiveName'].str.contains("Autotransformer"), 'ports_conf'] = 'pair_vertical'


addicon

# addicon.loc[addicon['PrimitiveName'].str.contains("KruSwitch"), 'ports_conf'] = 'pair_horizontal'


# nameref['Имя примитива'].str.slice_replace(start=-1, repl = '.svg')

# %%
base_classes = pd.read_csv('gost primitives - base core-classes.csv')
base_classes_abstract = pd.read_csv('gost primitives - base core-classes abstract.csv')

core_classes = pd.concat([base_classes, base_classes_abstract])
core_classes.to_csv('core_classes_hierarchy.csv')
core_classes.head(10)
# Method 2: Replace NaN Values with String in Specific Columns df[['col1', 'col2']] = df[['col1','col2']]. fillna('')
# %%
# nameref['Определение в ГОСТ Р 58651']
# %%
joined = addicon.join(core_classes.set_index('class name'), on='Класс CIM из IEC61970-301')
joined
# %%
joined.to_csv('joined_attributes_to_generate_from.csv')


# 4.1 В настоящем стандарте для имен классов и атрибутов, являющихся расширениями модели и отсутствующих в
# международных стандартах [1]* и [2]*, впереди добавляется префикс "rf:", определенный в ГОСТ Р 58651.1.

# rf params are not used now
base_attributes = pd.read_csv('gost-attributes.csv')
base_attributes.head(10)
# %%

def eval_class_parameters(cl, class_graph, attributes):
    # self attrs
    attrs = attributes.loc[attributes['base class'] == cl['class name']]
    parent_class_name = cl['parent class name']

    if not pd.isnull(parent_class_name):
        parent_class = class_graph.loc[class_graph['class name'] == parent_class_name]
        if parent_class.shape[0] == 1:
            parent_class = parent_class.iloc[0]
        else:
            return attrs

        parent_attrs = parent_class['attrs']
        if parent_attrs is None:
            parent_attrs = eval_class_parameters(parent_class, class_graph, attributes)
        attrs = pd.concat([parent_attrs, attrs])
    return attrs

# link attributes names to classes
def link_attributes(class_graph, attributes):
    '''expects ordered definition of classes'''
    attr_links = pd.DataFrame()
    class_graph['attrs'] = None
    for _, ci in class_graph.iterrows():

        class_params = eval_class_parameters(ci, class_graph, attributes)
        # class_params.assign(class_name = ci['class name'])
        class_params['class_name'] = ci['class name']
        # attr_links.append(class_params)
        attr_links = pd.concat([attr_links, class_params])

        # print('3', (ci['class name'], class_params))

    return attr_links


# attr_links = link_attributes(base_classes_abstract, base_attributes)

attr_links = link_attributes(core_classes, base_attributes)

# attr_links.to_csv('out-extended_attr-list.csv')
linked_attributes = attr_links[['class_name','attribure name', 'brief', 'detail', 'dtype']]
linked_attributes.to_csv('linked_attributes.csv')

#%%
pr = joined.iloc[0]
properties = linked_attributes.loc[linked_attributes['class_name'] == pr['Класс CIM из IEC61970-301']]
properties

# %%
