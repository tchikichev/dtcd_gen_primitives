
# %%
from importlib.metadata import files
import pandas as pd
import json
import jsonschema



# %%
# structure to add parameters to object


# specify each swith configuration
# link componennts to allowable_switches

reply_message_types = ['Annotation', 'Group',
                       'Data Store', 'Request Message', 'Reply Message']

data_properties = {
    # 'activity': [
    #     ('task-type', 'select', ['None', 'Send', 'Receive', 'User', 'Manual', 'Business Rule', 'Service', 'Script'], 'None'),
    #     ('ad hoc', 'switch', '', ''),
    #     ('compensation', 'switch', '', ''),
    #     ('iteration', 'select', ['None', 'Loop', 'Parallel', 'Sequential'], 'None'),
    #     ('process state', 'select', ['None', 'Open', 'Closed'], 'None'),
    # ],
    'reply-message': [
        ('type', 'select', reply_message_types, reply_message_types[-1]),
    ]

}

# based on existing icons (iconname - .svg)
activity_types = {
    'business-rule-task': 'Business Rule',
    'manual-task': 'Manual',
    'receive-task': 'Receive',
    'script-task': 'Script',
    'send-task': 'Send',
    'service-task': 'Service',
    'user-task': 'User',
    'task': 'None'
}

# fill properties for ext_data_objects
for key, val in activity_types.items():
    data_properties[key] = [
        ('task-type', 'select', list(activity_types.values()), val),
        ('ad hoc', 'switch', '', ''),
        ('compensation', 'switch', '', ''),
        ('iteration', 'select', ['None', 'Loop',
         'Parallel', 'Sequential'], 'None'),
        ('process state', 'select', ['None', 'Open', 'Closed'], 'None'),
    ]

# %%
# events parameters

# end-event-cancel
# end-event-compensation
# end-event-error
# end-event-escalation
# end-event-link
# end-event-message
# end-event-multiple
# end-event-none
# end-event-signal
# end-event-terminate
# intermediate-event-catch-cancel
# intermediate-event-catch-compensation
# intermediate-event-catch-condition
# intermediate-event-catch-error
# intermediate-event-catch-escalation
# intermediate-event-catch-link
# intermediate-event-catch-message
# intermediate-event-catch-multiple
# intermediate-event-catch-non-interrupting-condition
# intermediate-event-catch-non-interrupting-escalation
# intermediate-event-catch-non-interrupting-message
# intermediate-event-catch-non-interrupting-multiple
# intermediate-event-catch-non-interrupting-parallel-multiple
# intermediate-event-catch-non-interrupting-signal
# intermediate-event-catch-non-interrupting-timer
# intermediate-event-catch-parallel-multiple
# intermediate-event-catch-signal
# intermediate-event-catch-timer
# intermediate-event-none
# intermediate-event-throw-compensation
# intermediate-event-throw-escalation
# intermediate-event-throw-link
# intermediate-event-throw-message
# intermediate-event-throw-multiple
# intermediate-event-throw-signal
# start-event-compensation
# start-event-condition
# start-event-error
# start-event-escalation
# start-event-message
# start-event-multiple
# start-event-none
# start-event-non-interrupting-condition
# start-event-non-interrupting-escalation
# start-event-non-interrupting-message
# start-event-non-interrupting-multiple
# start-event-non-interrupting-parallel-multiple
# start-event-non-interrupting-signal
# start-event-non-interrupting-timer
# start-event-parallel-multiple
# start-event-signal
# start-event-timer


# intermediate-event-catch-cancel
# intermediate-event-catch-compensation
# intermediate-event-catch-condition
# intermediate-event-catch-error
# intermediate-event-catch-escalation
# intermediate-event-catch-link
# intermediate-event-catch-message
# intermediate-event-catch-multiple
# intermediate-event-catch-non-interrupting-condition
# intermediate-event-catch-non-interrupting-escalation
# intermediate-event-catch-non-interrupting-message
# intermediate-event-catch-non-interrupting-multiple
# intermediate-event-catch-non-interrupting-parallel-multiple
# intermediate-event-catch-non-interrupting-signal
# intermediate-event-catch-non-interrupting-timer
# intermediate-event-catch-signal
# intermediate-event-catch-timer
# intermediate-event-none
# intermediate-event-throw-compensation
# intermediate-event-throw-escalation
# intermediate-event-throw-link
# intermediate-event-throw-message

# intermediate-event-catch-compensation
# intermediate-event-catch-parallel-multiple
# intermediate-event-throw-signal

# possible char for each type
# characteristic_types = {
#     'top-level start event': ['none', 'message', 'timer', 'conditional', 'signal', 'multiple', 'parallel multiple'],
#     'event sub-process interrupting start event': ['message', 'timer', 'escalation', 'conditional', 'error', 'compensation', 'signal', 'multiple', 'parallel multiple'],
#     'event sub-process non-interrupting start event': ['message', 'timer', 'escalation', 'conditional', 'signal', 'multiple', 'parallel multiple'],
#     'catching intermediate event': ['message', 'timer', 'conditional', 'link', 'signal', 'multiple', 'parallel multiple'],
#     'boundary interrupting intermediate event': ['message', 'timer', 'escalation', 'conditional', 'error', 'cancel', 'compensation', 'signal', 'multiple', 'parallel multiple'],
#     'boundary non-interrupting intermediate event': ['message', 'timer', 'escalation', 'conditional', 'signal', 'multiple', 'parallel multiple', 'terminate'],
#     'throwing intermediate event': ['none', 'message', 'escalation', 'link', 'compensation', 'signal', 'multiple', 'parallel multiple'],
#     'end event': ['none', 'message', 'escalation', 'error', 'cancel', 'compensation', 'signal', 'multiple', 'terminate']
# }

# types by yed classification
characteristic_types_raw = [
    'Top-Level Start Event',
    'Event Sub-Process Interrupting Start Event',
    'Event Sub-Process Non-Interrupting Start Event',
    'Catching Intermediate Event',
    'Boundary Interrupting Intermediate Event',
    'Boundary Non-Interrupting Intermediate Event',
    'Throwing Intermediate Event',
    'End Event'
]

event_all_characteristic_types = ['Cancel', 'Compensation', 'Conditional', 'Error', 'Escalation',
                                  'Link', 'Message', 'Multiple', 'None', 'Parallel Multiple', 'Signal', 'Terminate', 'Timer']

# link image & type & default val - which elements are in panel
# yet no icons for boundary (non)interrupting s/i/e event
event_properties = {
    "start-event-none": ["Top-Level Start Event", "None"],
    "intermediate-event-none": ["Catching Intermediate Event", "None"],
    "end-event-none": ["End Event", "None"],
    "start-event-parallel-multiple": ["Event Sub-Process Interrupting Start Event", "Parallel Multiple"],
    "intermediate-event-catch-non-interrupting-parallel-multiple": ["Catching Intermediate Event", "Parallel Multiple"],
    "intermediate-event-catch-parallel-multiple": ["Catching Intermediate Event", "Parallel Multiple"],
    "intermediate-event-catch-compensation": ["Catching Intermediate Event", "Compensation"],
    "intermediate-event-throw-signal": ["Throwing Intermediate Event", "Signal"],
}


# how to replace all comp model when switch
# how to replace image, set of other props when switch

# set switch initial values
for key, [char, def_type] in event_properties.items():
    data_properties[key] = [
        ('characteristic', 'select', characteristic_types_raw, char),
        ('type', 'select', event_all_characteristic_types, def_type),
    ]

# %%
# gateway parameters

gateway_types = ['Exclusive', 'Complex', 'Eventbased', 'OR', 'Parallel', 'XOR']
gateway_def_types = {
    'gateway-none': 'Exclusive',
    'gateway-complex': 'Complex',
    'gateway-eventbased': 'Eventbased',
    'gateway-or': 'OR',
    'gateway-parallel': 'Parallel',
    'gateway-xor': 'XOR'
}

for key, val in gateway_def_types.items():
    data_properties[key] = [
        # ('name', 'select', [vals], ,default)
        ('type', 'select', gateway_types, val),
    ]

# %%

ext_data_object_types = ['Annotation', 'Group',
                         'Data Store', 'Request Message', 'Reply Message']

ext_data_objects = {
    'data-store': 'Data Store',
    'recieve': 'Request Message',
    'send': 'Reply Message',
    'text-annotation': 'Annotation'
}

# fill properties for ext_data_objects
for key, val in ext_data_objects.items():
    data_properties[key] = [
        ('type', 'select', ext_data_object_types, ext_data_objects[key]),
    ]


# %%

data_obj_types = ["Data Object (Input)", "Data Object", "Data Object (Output)"]

for key, val in zip(['data-input', 'data-object', 'data-output'], data_obj_types):
    data_properties[key] = [
        ('type', 'select', data_obj_types, val),
        ('collection', 'switch', '', ''),
    ]


# %%

template_json_file = open('template.json')
template_json = json.load(template_json_file)
template_json

#%%
from port_configurations import port_configurations as port_template
import codecs
import json
import shutil
import os

# write props to json files

# icon names, dimensions
dims = pd.read_csv('iconsmeta.csv')
dims['ports_conf'] = 'four_sides'
# dims

#%

# %%
template_json['image'] = "icon.svg"
template_json['properties'] = {}
template_json['ports'] = port_template['four_sides']


# {
#   "sel1": {
#     "type": "expression",
#     "expression": "'a'",
#     "status": "complete",
#     "value": "a",
#     "input": {
#       "component": "select",
#       "type": "const",
#       "values": [
#         "a",
#         "b",
#         "c",
#         "d"
#       ]
#     }
#   }
# }


def selectProperySchema(proptype, values='', def_val=''):
    '''values: list'''
    if proptype == 'select':
        return {
            "type": "expression",
            # "expression": "",
            "expression": "\'" + def_val + "\'",
            "status": "new",
            # "value": "",
            "value": def_val,
            "input": {
                "component": "select",
                "type": "const",
                "values": values
            }
        }
    if proptype == 'switch':
        return {
            "expression": "",
            "type": "expression",
            "input": {"component": "switch"}
        }
    if proptype == 'simple':
        return {
            "expression": values,
            "type": "expression"
        }


def gen_p_json(title, image, w, h, properties, ports=''):
    p_json = template_json

    p_json['title'] = title
    p_json['layout'] = {'heigth': int(w), 'width': int(h)}
    p_json['properties'] = {}
    p_json['ports'] = port_template[ports]
    for name, proptype, values, def_val in properties:
        # construct json props
        p_json['properties'][name] = selectProperySchema(proptype, values, def_val)
        # print(p_json['properties'])
    return p_json



# add image info to known params & objects
with_props = pd.DataFrame(data_properties.keys(), columns=['compname'])
joined = with_props.join(dims.set_index('compname'), on = 'compname').dropna()

# for comp, props in data_properties.items():
#     # iconsrc = comp + '.svg'

from re import sub

# use format without special symbols for the component name
def camel_case(s):
  s = sub(r"(_|-)+", " ", s).title().replace(" ", "")
  return s


for _,pr in joined.iterrows():
    # name = re.sub('[^a-zA-Z0-9]', '', pr['compname'])
    # pr['compname']
    name = str(camel_case(pr['compname']))
    image = pr['iconname']
    # print(pr['compname'], name)

    properties = data_properties[pr['compname']]
    pr_json = gen_p_json(name, image, pr['ws'], pr['hs'], properties, pr['ports_conf'])
    comppath = os.path.join('raw-primitives', name)
    os.mkdir(comppath)
    with codecs.open(os.path.join(comppath, 'primitive.json'), 'w', encoding='utf-8') as f:
        json.dump(pr_json, f, ensure_ascii=False)
    shutil.copyfile(os.path.join('src-images', image), os.path.join(comppath, 'icon.svg'))



# %%
shutil.rmtree('raw-primitives')
os.mkdir('raw-primitives')

# %%
