port_indication = {
    "primitiveID": "oil_well_1594_outPort1",
    "primitiveName": "outPort1",
    "isAddedManually": "true",
    "portLocation": "right",
    "type": [
        "OUT"
    ],
    "properties": {
        "status": {
            "type": "expression",
            "expression": "let res_props_ = {\n    \"P\": this.P,\n    \"T\": this.T,\n    \"Q_m3_day\": this.Q_m3_day\n};\nres_props_",
            "input": {
                "component": "textarea"
            },
            "status": "complete",
            "value": ""
        }
    },
    "initPosition": {
        "x": 1,
        "y": 0.5
    },
    "location": {
        "x": 8923.07380952381,
        "y": 147.625
    }
}
pad_indication_outPort = port_indication
dns_indication_outPort = port_indication