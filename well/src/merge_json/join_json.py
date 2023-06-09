# %%
import codecs
import json
import os
import re
import shutil
import sys
from cmath import isnan

import jsonschema
import numpy as np
import pandas as pd
#%%
loc = "/home/user/git/datacad-primitives/well/merge_json"
os.chdir(loc)

f1 = "/home/user/git/datacad-primitives/well/merge_json/demo4_dns.json"
f2 = "/home/user/git/datacad-primitives/well/merge_json/demo4_kns1.json"

out = "/home/user/git/datacad-primitives/well/merge_json/demo4_merge.json"
#%%
def read_graph(f):
    fread = open(f)
    fjson = json.load(fread)
    graph = fjson['graph']

    nodes = graph['nodes']
    edges = graph['edges']
    groups = graph['groups']
    return nodes, edges, groups

n1, e1, g1 = read_graph(f1)
n1

#%%
def join_graphs(f1, f2, out):


    n1, e1, g1 = read_graph(f1)
    n2, e2, g2 = read_graph(f2)
    
    fread = open(out)
    fjson = json.load(fread)
    outgraph = fjson['graph']


join_graphs(f1, f2, out)
with codecs.open(out + "mod.json", 'w', encoding='utf-8') as outfdjson:
    json.dump(fdjson, outfdjson, ensure_ascii=False)
# %%
