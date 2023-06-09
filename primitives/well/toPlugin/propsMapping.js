{
    const propsMapping = {
        "_well": {
            "Name": "",
            "res_P": "",
            "res_T": "",
            "res_Q_m3_day": "",
            "object_type": "well",
            "LiquidDebit": "",
            "LiquidDensity": "",
            "VolumeWater": "",
            "perforation": "",
            "pumpDepth": "",
            "model": "",
            "productivity": "",
            "predict_mode": "",
            "shtr_debit": "",
            "K_pump": "",
            "frequency": "",
            "node_name": "",
            "node_id": "",
            "X": "",
            "Y": "",
            "Kind": "Q",
            "Value": "this.LiquidDebit * this.LiquidDensity / 86400",
            "P": "",
            "T": "",
            "Q_m3_day": "",
            "IsSource": "true",
            "IsOutlet": "",
            "_pp_tag": ""
        },
        "_injection_well": {
            "Name": "",
            "res_P": "",
            "res_T": "",
            "res_Q_m3_day": "",
            "Q": "",
            "choke_diam": "",
            "padNum": "",
            "wellNum": "",
            "altitude": "",
            "zakachka": "",
            "object_type": "injection_well",
            "node_name": "",
            "node_id": "",
            "X": "",
            "Y": "",
            "Kind": "Q",
            "Value": "this.zakachka * 1000 / 86400",
            "P": "",
            "T": "",
            "Q_m3_day": "",
            "IsSource": "",
            "IsOutlet": "true",
            "_pp_tag": ""
        },
        "_junction": {
            "Name": "",
            "res_P": "",
            "res_T": "",
            "object_type": "junctionpoint",
            "VolumeWater": "",
            "node_name": "",
            "node_id": "",
            "X": "",
            "Y": "",
            "Kind": "",
            "Value": "",
            "P": "",
            "T": "",
            "IsSource": "",
            "IsOutlet": "",
            "_pp_tag": ""
        },
        "_junction_ppd": {
            "Name": "",
            "res_P": "",
            "res_T": "",
            "object_type": "junctionpoint",
            "node_name": "",
            "node_id": "",
            "X": "",
            "Y": "",
            "Kind": "",
            "Value": "",
            "altitude": "",
            "P": "",
            "T": "",
            "IsSource": "",
            "IsOutlet": "",
            "_pp_tag": ""
        },
        "_dns": {
            "Name": "",
            "res_P": "",
            "res_T": "",
            "res_Q_m3_day": "",
            "object_type": "dns",
            "VolumeWater": "",
            "node_name": "",
            "node_id": "",
            "X": "",
            "Y": "",
            "Kind": "P",
            "Value": "7.",
            "P": 100,
            "T": "",
            "Q_m3_day": "",
            "gas_factor_m3_m3": 39,
            "separated_water_flow_m3_day": "this.res_Q_m3_day * this.res_watercut_percent / 100",
            "production_oil_flow_m3_day": "this.res_Q_m3_day - this.separated_water_flow_m3_day",
            "separated_gas_flow_m3_day": "this.production_oil_flow_m3_day * this.gas_factor_m3_m3",
            "res_watercut_percent": "",
            "Inlet_Pressure_atm": "",
            "IsSource": "",
            "IsOutlet": "true",
            "_pp_tag": ""
        },
        "_kns": {
            "Name": "",
            "res_P": "",
            "res_T": "",
            "res_Q_m3_day": "",
            "object_type": "kns",
            "VolumeWater": "",
            "node_name": "",
            "node_id": "",
            "X": "",
            "Y": "",
            "Kind": "P",
            "Value": 117,
            "P": 100,
            "T": "",
            "Q_m3_day": "",
            "income_separated_water_flow_m3_day": "",
            "additional_income_water_flow_m3_day": 0,
            "total_value_kg_sec": "",
            "_check": "",
            "Pumps_Outlet_Pressure_atm": 117,
            "IsSource": "",
            "IsOutlet": "true",
            "_pp_tag": ""
        },
        "_pipe": {
            "Name": "",
            "res_mass_flow_kg_sec": "",
            "res_velocity_m_sec": "",
            "object_type": "pipe",
            "L": "",
            "d": "",
            "s": "",
            "uphillM": "",
            "effectiveD": "",
            "intD": "",
            "node_id_start": "",
            "node_id_end": "",
            "_pp_tag": ""
        },
        "_pipe_ppd": {
            "Name": "",
            "res_mass_flow_kg_sec": "",
            "res_velocity_m_sec": "",
            "object_type": "pipe",
            "L": "",
            "d": "",
            "s": "",
            // "uphillM": "",
            "effectiveD": "",
            "intD": "",
            "node_id_start": "",
            "node_id_end": "",
            "_pp_tag": ""
        }
    }
    // modify props.object_type by primitiveName
    const nodeName2ObjectType = {
        "oil_dns": "dns",
        "oil_pad": "pad",
        "oil_pipe": "pipe",
        "oil_junction_point": "junctionpoint",
        "oil_well": "well",
        "oil_kns": "kns",
        "oil_pipe_ppd": "pipe",
        "oil_junction_ppd": "junctionpoint",
        "oil_vrb": "pad",
        "oil_well_vodazabornaya": "injection_well"
    };

    // for propsMapping
    let graphTypesMapping = {
        "oil_dns": "_dns",
        "oil_pad": "_junction",
        "oil_pipe": "_pipe",
        "oil_junction_point": "_junction",
        "oil_well": "_well",
        "oil_kns": "_kns",
        "oil_pipe_ppd": "_pipe_ppd",
        "oil_junction_ppd": "_junction_ppd",
        "oil_vrb": "_junction_ppd",
        "oil_well_vodazabornaya": "_injection_well"
    };
}

// res mappping
{
    let graphObjectTypes = {
        "oil_kns": "inlet",
        "oil_pipe_ppd": "edge",
        "oil_junction_ppd": "junction",
        "oil_vrb": "junction",
        "oil_well_vodazabornaya": "outlet"
    };

    const nodeResParamsMapping = {
        "inlet": { // start
            "res_P": "startP",
            "res_T": "startT",
            "res_Q_m3_day": "start_Q_m3_day"
        },
        "junction": { // junction && pad| vrb 
            "res_P": "startP",
            "res_T": "startT"
            //no Q_m3_day data for this node
        },
        "outlet": { // end
            "res_P": "endP",
            "res_T": "endT",
            "res_Q_m3_day": "end_Q_m3_day"
        },
        "edge": { // pipe
            // "res_watercut_percent": "res_watercut_percent",// Обводненность,TRUE
            // "res_liquid_density_kg_m3": "res_liquid_density_kg_m3",// Плотность жидкости,
            // "res_pump_power_watt": "res_pump_power_watt",// Мощность насоса,TRUE
            "res_mass_flow_kg_sec": "X_kg_sec", // Массовый поток,
            "res_velocity_m_sec": "velocity_m_sec" // Скорость потока,TRUE
        }
    };
}
