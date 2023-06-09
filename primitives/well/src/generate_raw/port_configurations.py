#%%
# port_configurations = {
#     'single_center': [
#         {
#             "name": "inoutPort",
#             "type": ["IN", "OUT"],
#             "position": {
#                 "x": 0.5,
#                 "y": 0.5
#             }
#         }
#     ],
#     'single_top': [
#         {
#             "name": "inoutPort",
#             "type": ["IN", "OUT"],
#             "position": {
#                 "x": 0.5,
#                 "y": 1
#             }
#         }
#     ],
#     'pair_vertical': [
#         {
#             "name": "ioPortLow",
#             "type": ["IN", "OUT"],
#             "position": {
#                 "x": 0.5,
#                 "y": 0.
#             }
#         },
#         {
#             "name": "ioPortTop",
#             "type": ["IN", "OUT"],
#             "position": {
#                 "x": 0.5,
#                 "y": 1.
#             }
#         }
#     ],
#     'pair_horizontal': [
#         {
#             "name": "ioPortLeft",
#             "type": ["IN", "OUT"],
#             "position": {
#                 "x": 0.,
#                 "y": 0.5
#             }
#         },
#         {
#             "name": "ioPortRight",
#             "type": ["IN", "OUT"],
#             "position": {
#                 "x": 1.,
#                 "y": 0.5
#             }
#         }
#     ],
#     'tri_vertical': [
#         {
#             "name": "ioPortLeft",
#             "type": ["IN", "OUT"],
#             "position": {
#                 "x": 0.3,
#                 "y": 0.
#             }
#         },
#         {
#             "name": "ioPortRight",
#             "type": ["IN", "OUT"],
#             "position": {
#                 "x": 0.6,
#                 "y": 0.
#             }
#         },
#         {
#             "name": "ioPortTop",
#             "type": ["IN", "OUT"],
#             "position": {
#                 "x": 0.5,
#                 "y": 1.
#             }
#         }
#     ],
#     'tri_horizontal': [
#         {
#             "name": "ioPortLeft",
#             "type": ["IN", "OUT"],
#             "position": {
#                 "x": 0.,
#                 "y": 0.5
#             }
#         },
#         {
#             "name": "ioPortRight",
#             "type": ["IN", "OUT"],
#             "position": {
#                 "x": 1.,
#                 "y": 0.5
#             }
#         },
#         {
#             "name": "ioPortTop",
#             "type": ["IN", "OUT"],
#             "position": {
#                 "x": 0.5,
#                 "y": 1.
#             }
#         }
#     ],
#     'four_sides': [
#         {
#             "name": "ioPortLeft",
#             "type": ["IN", "OUT"],
#             "position": {
#                 "x": 0.,
#                 "y": 0.5
#             }
#         },
#         {
#             "name": "ioPortRight",
#             "type": ["IN", "OUT"],
#             "position": {
#                 "x": 1.,
#                 "y": 0.5
#             }
#         },
#         {
#             "name": "ioPortTop",
#             "type": ["IN", "OUT"],
#             "position": {
#                 "x": 0.5,
#                 "y": 1.
#             }
#         },
#         {
#             "name": "ioPortLow",
#             "type": ["IN", "OUT"],
#             "position": {
#                 "x": 0.5,
#                 "y": 0.
#             }
#         },
#     ]
# }

#%%
ports_cfg = {
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
                "y": 0.0
            }
        }
    ],
    'pair_vertical': [
        {
            "name": "ioPortLow",
            "type": ["IN", "OUT"],
            "position": {
                "x": 0.5,
                "y": 1.0
            }
        },
        {
            "name": "ioPortTop",
            "type": ["IN", "OUT"],
            "position": {
                "x": 0.5,
                "y": 0.0
            }
        }
    ],
    'pair_vertical_directed': [
        {
            "name": "outPort1",
            "type": "OUT",
            "position": {
                "x": 0.5,
                "y": 1.0
            }
        },
        {
            "name": "inPort1",
            "type": "IN",
            "position": {
                "x": 0.5,
                "y": 0.0
            }
        }
    ],
    'pair_vertical_directed_indication': [
        {
            "name": "outPort1",
            "type": "OUT",
            "position": {
                "x": 0.5,
                "y": 1.0
            }
        },
        {
            "name": "outPortIndication",
            "type": "OUT",
            "position": {
                "x": 0.75,
                "y": 1.0
            }
        },
        {
            "name": "inPort1",
            "type": "IN",
            "position": {
                "x": 0.5,
                "y": 0.0
            }
        }
    ],
    'pair_horizontal': [
        {
            "name": "ioPortLeft",
            "type": ["IN", "OUT"],
            "position": {
                "x": 0.0,
                "y": 0.5
            }
        },
        {
            "name": "ioPortRight",
            "type": ["IN", "OUT"],
            "position": {
                "x": 1.0,
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
                "y": 1.0
            }
        },
        {
            "name": "ioPortRight",
            "type": ["IN", "OUT"],
            "position": {
                "x": 0.6,
                "y": 1.0
            }
        },
        {
            "name": "ioPortTop",
            "type": ["IN", "OUT"],
            "position": {
                "x": 0.5,
                "y": 0.0
            }
        }
    ],
    'tri_horizontal': [
        {
            "name": "ioPortLeft",
            "type": ["IN", "OUT"],
            "position": {
                "x": 0.0,
                "y": 0.5
            }
        },
        {
            "name": "ioPortRight",
            "type": ["IN", "OUT"],
            "position": {
                "x": 1.0,
                "y": 0.5
            }
        },
        {
            "name": "ioPortTop",
            "type": ["IN", "OUT"],
            "position": {
                "x": 0.5,
                "y": 0.0
            }
        }
    ],
    'four_sides': [
        {
            "name": "ioPortLeft",
            "type": ["IN", "OUT"],
            "position": {
                "x": 0.0,
                "y": 0.5
            }
        },
        {
            "name": "ioPortRight",
            "type": ["IN", "OUT"],
            "position": {
                "x": 1.0,
                "y": 0.5
            }
        },
        {
            "name": "ioPortTop",
            "type": ["IN", "OUT"],
            "position": {
                "x": 0.5,
                "y": 0.0
            }
        },
        {
            "name": "ioPortLow",
            "type": ["IN", "OUT"],
            "position": {
                "x": 0.5,
                "y": 1.0
            }
        },
    ],
    '1c_2cl': [
        {
            "name": "iPortLeft",
            "type": "IN",
            "position": {
                "x": 0.0,
                "y": 0.5
            }
        },
        {
            "name": "oPortRight1",
            "type": "OUT",
            "position": {
                "x": 1.0,
                "y": 0.5
            }
        },
        {
            "name": "oPortRight2",
            "type": "OUT",
            "position": {
                "x": 1.0,
                "y": 0.77
            }
        },
        # {
        #     "name": "ioPortTop",
        #     "type": ["IN", "OUT"],
        #     "position": {
        #         "x": 0.5,
        #         "y": 0.0
        #     }
        # },
        # {
        #     "name": "ioPortLow",
        #     "type": ["IN", "OUT"],
        #     "position": {
        #         "x": 0.5,
        #         "y": 1.0
        #     }
        # },
    ],
    '1c_2ul': [
        {
            "name": "iPortLeft",
            "type": "IN",
            "position": {
                "x": 0.0,
                "y": 0.5
            }
        },
        {
            "name": "oPortRight1",
            "type": "OUT",
            "position": {
                "x": 1.0,
                "y": 0.33
            }
        },
        {
            "name": "oPortRight2",
            "type": "OUT",
            "position": {
                "x": 1.0,
                "y": 0.77
            }
        },
        # {
        #     "name": "ioPortTop",
        #     "type": ["IN", "OUT"],
        #     "position": {
        #         "x": 0.5,
        #         "y": 0.0
        #     }
        # },
        # {
        #     "name": "ioPortLow",
        #     "type": ["IN", "OUT"],
        #     "position": {
        #         "x": 0.5,
        #         "y": 1.0
        #     }
        # },
    ],
    'lr': [
        {
            "name": "iPortLeft",
            "type": "IN",
            "position": {
                "x": 0.0,
                "y": 0.5
            }
        },
        {
            "name": "oPortRight",
            "type": "OUT",
            "position": {
                "x": 1.0,
                "y": 0.5
            }
        },
    ],
    'lr08': [
        {
            "name": "iPortLeft",
            "type": "IN",
            "position": {
                "x": 0.0,
                "y": 0.77
            }
        },
        {
            "name": "oPortRight",
            "type": "OUT",
            "position": {
                "x": 1.0,
                "y": 0.77
            }
        },
    ],
    'l08cr': [
        {
            "name": "iPortLeft",
            "type": "IN",
            "position": {
                "x": 0.0,
                "y": 0.77
            }
        },
        {
            "name": "oPortRight1",
            "type": "OUT",
            "position": {
                "x": 1.0,
                "y": 0.5
            }
        },
        {
            "name": "oPortRight2",
            "type": "OUT",
            "position": {
                "x": 1.0,
                "y": 0.8
            }
        },
    ]
}

names_to_rot = ['Тележка выключателя КРУ в рабочем положении выключатель отключен.svg',
 'Кабельная линия 35 кВ.svg',
 'Кабельная линия 6 кВ.svg',
 'Выключатель нагрузки отключен.svg',
 'Кабельная линия 330 кВ.svg',
 'Фильтр присоединения.svg',
 'Трансформатор силовой 2-х обмоточный.svg',
 'Трансформатор тока.svg',
 'Токоограничивающий реактор сдвоенный.svg',
 'Короткозамыкатель отключен.svg',
 'Высокочастотный заградитель линии электропередачи.svg',
 'Кабельная линия 500 кВ.svg',
 'Заземляющий нож включен.svg',
 'Кабельная линия 400 кВ.svg',
 'Тележка разъединителя КРУ в рабочем положении.svg',
 'Дугогасящие реакторы.svg',
 'Отделитель включен.svg',
 'Двигатель.svg',
 'Автотрансформатор 3-х обмоточный с РПН.svg',
 'Отпайка.svg',
 'Трансформатор силовой 3-х обмоточный.svg',
 'Кабельная линия 220 кВ.svg',
 'Выключатель включен.svg',
 'Заземляющий нож отключен.svg',
 'Токоограничивающий реактор одинарный.svg',
 'Разъединитель включен.svg',
 'Воздушная линия 330 кВ.svg',
 'Автотрансформатор 3-х обмоточный.svg',
 'Воздушная линия 6 кВ.svg',
 'Трансформатор напряжения 2-х обмоточный.svg',
 'Кабельная линия 110 кВ.svg',
 'Тележка выключателя КРУ в рабочем положении выключатель включен.svg',
 'Выключатель отключен.svg',
 'Отделитель отключен.svg',
 'Воздушная линия 0,4 кВ.svg',
 'Дугогасящие реакторы с возможностью плавного регулирования.svg',
 'Синхронный компенсатор.svg',
 'Разрядник.svg',
 'Тележка выключателя КРУ в ремонтном положении выключатель отключен.svg',
 'Воздушная линия 400 кВ.svg',
 'Воздушная линия 220 кВ.svg',
 'Воздушная линия 35 кВ.svg',
 'Автоматический выключатель отключен.svg',
 'Трансформатор силовой 2-х обмоточный с РПН.svg',
 'Выключатель нагрузки включен.svg',
 'Тележка разъединителя КРУ в ремонтном положении.svg',
 'Предохранитель с плавкой вставкой.svg',
 'Разъединитель отключен.svg',
 'Реактор шунтирующий с возможностью регулирования.svg',
 'Трансформатор напряжения 3-х обмоточный.svg',
 'Реактор шунтирующий.svg',
 'Кабельная линия 0,4 кВ.svg',
 'Автоматический выключатель включен.svg',
 'Тележка разъединителя КРУ  в контрольном положении.svg',
 'Короткозамыкатель включен.svg',
 'Конденсатор.svg',
 'Ограничитель перенапряжений.svg',
 'Генератор.svg',
 'Тележка выключателя КРУ в контрольном положении выключатель отключен.svg',
 'Трансформатор силовой 3-х обмоточный с РПН.svg']

#%%
import numpy as np
import copy

def rot_port_position(pos = {'x': 0.5, 'y': 0.5}, rot = 'front'):
    x = pos['x']
    y = pos['y']
    # use inverse y axis coordivates

    T = np.array([0.5, 0.5])
    v = np.array([x, y])
    if rot == 'right':
        R = np.array([[0., -1.], [1., 0.]])
        v = np.dot(R, v - T) + T

    if rot == 'left':
        R = np.array([[0., 1.], [-1., 0.]])
        v = np.dot(R, v - T) + T
    return {'x': v[0], 'y': v[1]}

def transform_port_configuration(port_configuration, rot = 'front'):
    pcu = copy.deepcopy(port_configuration)
    for pc in pcu:
        pc['position'] = rot_port_position(pc['position'], rot)
    return pcu


#%%
# for pc in ports_cfg['four_sides']:
#     pos = pc['position']
#     pr = PortConfigurations.rot_port_position(pos, 'right')
#     print(pos, pr)

# test single rotation
# pc = ports_cfg['single_top']
# pcu = PortConfigurations.transform_port_configuration(pc, 'right')
# print(pcu)

#%%
# copy all files, rotate all images


# src, dest, names

# def gen_rot_primitives(src, dest, names):



        
# %%
