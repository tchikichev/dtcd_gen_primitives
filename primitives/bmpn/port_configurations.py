#%%
from re import template

port_configurations = {
    'single_center': [
        {
            "name": "inoutPort",
            "type": ["IN", "OUT"],
            "position": {
                "x": 0.5,
                "y": 0.5
            }
        }
    ],
    'single_top': [
        {
            "name": "inoutPort",
            "type": ["IN", "OUT"],
            "position": {
                "x": 0.5,
                "y": 0
            }
        }
    ],
    'pair_vertical': [
        {
            "name": "ioPortLow",
            "type": ["IN", "OUT"],
            "position": {
                "x": 0.5,
                "y": 1.
            }
        },
        {
            "name": "ioPortTop",
            "type": ["IN", "OUT"],
            "position": {
                "x": 0.5,
                "y": 0.
            }
        }
    ],
    'pair_horizontal': [
        {
            "name": "ioPortLeft",
            "type": ["IN", "OUT"],
            "position": {
                "x": 0.,
                "y": 0.5
            }
        },
        {
            "name": "ioPortRight",
            "type": ["IN", "OUT"],
            "position": {
                "x": 1.,
                "y": 0.5
            }
        }
    ],
    'tri_vertical': [
        {
            "name": "ioPortLeft",
            "type": ["IN", "OUT"],
            "position": {
                "x": 0.3,
                "y": 1.
            }
        },
        {
            "name": "ioPortRight",
            "type": ["IN", "OUT"],
            "position": {
                "x": 0.6,
                "y": 1.
            }
        },
        {
            "name": "ioPortTop",
            "type": ["IN", "OUT"],
            "position": {
                "x": 0.5,
                "y": 0.
            }
        }
    ],
    'tri_horizontal': [
        {
            "name": "ioPortLeft",
            "type": ["IN", "OUT"],
            "position": {
                "x": 0.,
                "y": 0.5
            }
        },
        {
            "name": "ioPortRight",
            "type": ["IN", "OUT"],
            "position": {
                "x": 1.,
                "y": 0.5
            }
        },
        {
            "name": "ioPortTop",
            "type": ["IN", "OUT"],
            "position": {
                "x": 0.5,
                "y": 0.
            }
        }
    ],
    'four_sides': [
        {
            "name": "ioLeft",
            "type": ["IN", "OUT"],
            "position": {
                "x": 0.,
                "y": 0.5
            }
        },
        {
            "name": "ioRight",
            "type": ["IN", "OUT"],
            "position": {
                "x": 1.,
                "y": 0.5
            }
        },
        {
            "name": "ioTop",
            "type": ["IN", "OUT"],
            "position": {
                "x": 0.5,
                "y": 0.
            }
        },
        {
            "name": "ioLow",
            "type": ["IN", "OUT"],
            "position": {
                "x": 0.5,
                "y": 1.
            }
        },
    ]
}
# port_template = port_configurations

config_template = {
  "title": "Мой первый примитив",
  "layout": { "heigth": 100, "width": 150 },
  "image": "icon.svg",
  "properties": {
    "simpleProperty": {
      "expression": "123+33",
      "type": "expression"
    },
    "otlProperty": {
      "type": "datasource",
      "expression": {
        "type": "OTL",
        "tws": 1658389152,
        "twf": 1658389152,
        "cache_ttl": 60,
        "original_otl": "makeresults count = 100"
      }
    },
    "selectPropery": {
      "expression": "",
      "type": "expression",
      "input": {
        "component": "select",
        "type": "const",
        "values": ["1", "2", "3", "4"]
      }
    },
    "selectOTLPropery": {
      "expression": "",
      "type": "expression",
      "input": {
        "component": "select",
        "type": "datasource",
        "values": [],
        "datasource": { "original_otl": "makeresults count = 100" },
        "columnName": "_time"
      }
    },
    "switchProperty": {
      "expression": "",
      "type": "expression",
      "input": { "component": "switch" }
    }
  },
  "ports": [
    { "name": "outPort", "type": ["OUT"], "position": { "x": 1, "y": 1 } },
    { "name": "inPort", "type": ["IN"], "position": { "x": 0, "y": 0 } },
    { "name": "inoutPort", "type": ["IN", "OUT"], "position": { "x": 0.5, "y": 0.5 } }
  ]
}
# %%
