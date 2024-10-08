[
    {
        "id": "a384b234f2e176db",
        "type": "debug",
        "z": "427da6dc73857e3a",
        "name": "Serial_COM_After",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "payload",
        "targetType": "msg",
        "statusVal": "",
        "statusType": "auto",
        "x": 490,
        "y": 260,
        "wires": []
    },
    {
        "id": "6a0d2dc5d38d29e1",
        "type": "function",
        "z": "427da6dc73857e3a",
        "name": "DP_CH_AB==>PM_200, PM_220 (watt_hour)",
        "func": "\nvar panel = msg.payload[1]\nvar power_meter = msg.payload[2]\nvar total_watt_hour = msg.payload[3]\n\n\nif (panel === \"DPCH\" && power_meter === \"PM-200V\") {\n    msg.topic = \"INSERT INTO table_pm200_data_watt_hour (id, power_meter, total_watt_hour) values(null, '\" + power_meter + \"','\" + total_watt_hour + \"');\"\n    return msg;\n}\nif (panel === \"DPCH\" && power_meter === \"PM-220V\") {\n    msg.topic = \"INSERT INTO table_pm220_data_watt_hour (id, power_meter, total_watt_hour) values(null, '\" + power_meter + \"','\" + total_watt_hour + \"');\"\n    return msg;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 340,
        "y": 560,
        "wires": [
            [
                "6e5ed6867e2bfbb1",
                "22f74e082f5d01f2",
                "210213dfdc29a172"
            ]
        ]
    },
    {
        "id": "978fc3b11947812c",
        "type": "function",
        "z": "427da6dc73857e3a",
        "name": "DP_CH_CD==>PM_200, PM_220 (watt_hour)",
        "func": "\nvar panel = msg.payload[1]\nvar power_meter = msg.payload[2]\nvar total_watt_hour = msg.payload[3]\n\n\nif (panel === \"DPCH-CD\" && power_meter === \"PM-3F\") {\n    msg.topic = \"INSERT INTO table_pm200_data_watt_hour (id, power_meter, total_watt_hour) values(null, '\" + power_meter + \"','\" + total_watt_hour + \"');\"\n    return msg;\n}\nif (panel === \"DPCH-CD\" && power_meter === \"PM-1F\") {\n    msg.topic = \"INSERT INTO table_pm220_data_watt_hour (id, power_meter, total_watt_hour) values(null, '\" + power_meter + \"','\" + total_watt_hour + \"');\"\n    return msg;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 340,
        "y": 600,
        "wires": [
            [
                "0da1769fb9ac5d62"
            ]
        ]
    },
    {
        "id": "87abe587fd9e5a7c",
        "type": "inject",
        "z": "427da6dc73857e3a",
        "name": "Serial_In",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "*data#",
        "payloadType": "str",
        "x": 120,
        "y": 280,
        "wires": [
            []
        ]
    },
    {
        "id": "628ea0b01550ac90",
        "type": "string",
        "z": "427da6dc73857e3a",
        "name": "filter",
        "methods": [
            {
                "name": "between",
                "params": [
                    {
                        "type": "str",
                        "value": "*"
                    },
                    {
                        "type": "str",
                        "value": "#"
                    }
                ]
            },
            {
                "name": "split",
                "params": [
                    {
                        "type": "str",
                        "value": ","
                    },
                    {
                        "type": "num",
                        "value": "30"
                    }
                ]
            }
        ],
        "prop": "payload",
        "propout": "payload",
        "object": "msg",
        "objectout": "msg",
        "x": 330,
        "y": 300,
        "wires": [
            [
                "6a0d2dc5d38d29e1",
                "978fc3b11947812c",
                "78165f9f6c62a027",
                "850b731e5e95c637",
                "ee64f448cb692077",
                "a384b234f2e176db",
                "bbd28d90439e5130",
                "c376986a0a3d234d",
                "4bbd44a0eff51d66",
                "c3231627f34840b5"
            ]
        ]
    },
    {
        "id": "6e5ed6867e2bfbb1",
        "type": "mysql",
        "z": "427da6dc73857e3a",
        "mydb": "c71a6b8879d1e5c0",
        "name": "",
        "x": 860,
        "y": 260,
        "wires": [
            []
        ]
    },
    {
        "id": "0da1769fb9ac5d62",
        "type": "mysql",
        "z": "427da6dc73857e3a",
        "mydb": "bebd24bb4fd34e2f",
        "name": "",
        "x": 860,
        "y": 300,
        "wires": [
            []
        ]
    },
    {
        "id": "c3db30588b1c3275",
        "type": "serial in",
        "z": "427da6dc73857e3a",
        "name": "",
        "serial": "3dd901a47a1781df",
        "x": 130,
        "y": 220,
        "wires": [
            [
                "628ea0b01550ac90",
                "943645d57e0542cf",
                "e01c8d7302bfa3ca"
            ]
        ]
    },
    {
        "id": "943645d57e0542cf",
        "type": "string",
        "z": "427da6dc73857e3a",
        "name": "filter_first",
        "methods": [
            {
                "name": "between",
                "params": [
                    {
                        "type": "str",
                        "value": "*"
                    },
                    {
                        "type": "str",
                        "value": "#"
                    }
                ]
            },
            {
                "name": "split",
                "params": [
                    {
                        "type": "str",
                        "value": ","
                    },
                    {
                        "type": "num",
                        "value": "30"
                    }
                ]
            }
        ],
        "prop": "payload",
        "propout": "payload",
        "object": "msg",
        "objectout": "msg",
        "x": 580,
        "y": 80,
        "wires": [
            [
                "95042d19d0254d6f"
            ]
        ]
    },
    {
        "id": "95042d19d0254d6f",
        "type": "function",
        "z": "427da6dc73857e3a",
        "name": "query_sql_energy",
        "func": "var name_panel\nvar name_power_meter\nvar data_kwh_meter\n\nname_panel = msg.payload[1]\nname_power_meter = msg.payload[2]\ndata_kwh_meter = msg.payload[3]\n\n\nif (name_panel == \"DPCH\" && name_power_meter == \"PM-220V\") {\n    var name_panel_database = \"DISTRIBUTION PANEL CAMP HOUSING\";\n    var name_power_meter_database = \"POWER METER 220V\"\n    msg.topic = \"INSERT INTO table_all_energy (id, name_panel, name_power_meter, data_kwh_meter) values (null, '\" + name_panel_database + \"','\" + name_power_meter_database + \"', '\" + data_kwh_meter + \"');\"\n} else if (name_panel == \"DPCH\" && name_power_meter == \"PM-200V\") {\n    var name_panel_database = \"DISTRIBUTION PANEL CAMP HOUSING\";\n    var name_power_meter_database = \"POWER METER 200V\"\n    msg.topic = \"INSERT INTO table_all_energy (id, name_panel, name_power_meter, data_kwh_meter) values (null, '\" + name_panel_database + \"','\" + name_power_meter_database + \"', '\" + data_kwh_meter + \"');\"\n} else if (name_panel == \"DPCH-CD\" && name_power_meter == \"PM-3F\") {\n    var name_panel_database = \"DISTRIBUTION PANEL CAMP HOUSING C & D\";\n    var name_power_meter_database = \"POWER METER 3F\"\n    msg.topic = \"INSERT INTO table_all_energy (id, name_panel, name_power_meter, data_kwh_meter) values (null, '\" + name_panel_database + \"','\" + name_power_meter_database + \"', '\" + data_kwh_meter + \"');\"\n} else if (name_panel == \"DPCH-CD\" && name_power_meter == \"PM-1F\") {\n    var name_panel_database = \"DISTRIBUTION PANEL CAMP HOUSING C & D\";\n    var name_power_meter_database = \"POWER METER 1F\"\n    msg.topic = \"INSERT INTO table_all_energy (id, name_panel, name_power_meter, data_kwh_meter) values (null, '\" + name_panel_database + \"','\" + name_power_meter_database + \"', '\" + data_kwh_meter + \"');\"\n} else {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}\n\nreturn msg;\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 610,
        "y": 120,
        "wires": [
            [
                "54197214b4a68a7c"
            ]
        ]
    },
    {
        "id": "54197214b4a68a7c",
        "type": "mysql",
        "z": "427da6dc73857e3a",
        "mydb": "de33f8dbe22463fe",
        "name": "",
        "x": 820,
        "y": 80,
        "wires": [
            []
        ]
    },
    {
        "id": "78165f9f6c62a027",
        "type": "function",
        "z": "427da6dc73857e3a",
        "name": "DP_CH_SAA==>PM_200, PM_220 (watt_hour)",
        "func": "// PM_1200_DP_CH_AB\nvar panel = msg.payload[1]\nvar power_meter = msg.payload[2]\nvar total_watt_hour = msg.payload[3]\n\nif (panel === \"CH_SAA\" && power_meter === \"PM_200V\") {\n    msg.topic = \"INSERT INTO table_pm200_data_watt_hour (id, power_meter, total_watt_hour) values(null, '\" + power_meter + \"','\" + total_watt_hour + \"');\"\n    return msg;\n}\nif (panel === \"CH_SAA\" && power_meter === \"PM_220V\") {\n    msg.topic = \"INSERT INTO table_pm220_data_watt_hour (id, power_meter, total_watt_hour) values(null, '\" + power_meter + \"','\" + total_watt_hour + \"');\"\n    return msg;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 340,
        "y": 680,
        "wires": [
            [
                "62c946b3a71bb31c"
            ]
        ]
    },
    {
        "id": "850b731e5e95c637",
        "type": "function",
        "z": "427da6dc73857e3a",
        "name": "DP_CH_SAB==>PM_200, PM_220 (watt_hour)",
        "func": "// PM_1200_DP_CH_AB\nvar panel = msg.payload[1]\nvar power_meter = msg.payload[2]\nvar total_watt_hour = msg.payload[3]\n\nif (panel === \"CH_SAB\" && power_meter === \"PM_200V\") {\n    msg.topic = \"INSERT INTO table_pm200_data_watt_hour (id, power_meter, total_watt_hour) values(null, '\" + power_meter + \"','\" + total_watt_hour + \"');\"\n    return msg;\n}\nif (panel === \"CH_SAB\" && power_meter === \"PM_220V\") {\n    msg.topic = \"INSERT INTO table_pm220_data_watt_hour (id, power_meter, total_watt_hour) values(null, '\" + power_meter + \"','\" + total_watt_hour + \"');\"\n    return msg;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 340,
        "y": 720,
        "wires": [
            [
                "210737aa3524f259"
            ]
        ]
    },
    {
        "id": "ee64f448cb692077",
        "type": "function",
        "z": "427da6dc73857e3a",
        "name": "DP_CH_EF==>PM_200, PM_220 (watt_hour)",
        "func": "// PM_1200_DP_CH_AB\nvar panel = msg.payload[1]\nvar power_meter = msg.payload[2]\nvar total_watt_hour = msg.payload[3]\n\nif (panel === \"CH_EF\" && power_meter === \"PM_200V\") {\n    msg.topic = \"INSERT INTO table_pm200_data_watt_hour (id, power_meter, total_watt_hour) values(null, '\" + power_meter + \"','\" + total_watt_hour + \"');\"\n    return msg;\n}\nif (panel === \"CH_EF\" && power_meter === \"PM_220V\") {\n    msg.topic = \"INSERT INTO table_pm220_data_watt_hour (id, power_meter, total_watt_hour) values(null, '\" + power_meter + \"','\" + total_watt_hour + \"');\"\n    return msg;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 340,
        "y": 640,
        "wires": [
            [
                "de1378c183e84493"
            ]
        ]
    },
    {
        "id": "bbd28d90439e5130",
        "type": "function",
        "z": "427da6dc73857e3a",
        "name": "DP_CH_SAC==>PM_200, PM_220 (watt_hour)",
        "func": "// PM_1200_DP_CH_AB\nvar panel = msg.payload[1]\nvar power_meter = msg.payload[2]\nvar total_watt_hour = msg.payload[3]\n\nif (panel === \"CH_SAC\" && power_meter === \"PM_200V\") {\n    msg.topic = \"INSERT INTO table_pm200_data_watt_hour (id, power_meter, total_watt_hour) values(null, '\" + power_meter + \"','\" + total_watt_hour + \"');\"\n    return msg;\n}\nif (panel === \"CH_SAC\" && power_meter === \"PM_220V\") {\n    msg.topic = \"INSERT INTO table_pm220_data_watt_hour (id, power_meter, total_watt_hour) values(null, '\" + power_meter + \"','\" + total_watt_hour + \"');\"\n    return msg;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 340,
        "y": 760,
        "wires": [
            [
                "c3262f3db76b6dd3"
            ]
        ]
    },
    {
        "id": "c376986a0a3d234d",
        "type": "function",
        "z": "427da6dc73857e3a",
        "name": "DP_CC_234==>PM_200, PM_220 (watt_hour)",
        "func": "// PM_1200_DP_CH_AB\nvar panel = msg.payload[1]\nvar power_meter = msg.payload[2]\nvar total_watt_hour = msg.payload[3]\n\nif (panel === \"CC_234\" && power_meter === \"PM_200V\") {\n    msg.topic = \"INSERT INTO table_pm200_data_watt_hour (id, power_meter, total_watt_hour) values(null, '\" + power_meter + \"','\" + total_watt_hour + \"');\"\n    return msg;\n}\nif (panel === \"CC_234\" && power_meter === \"PM_220V\") {\n    msg.topic = \"INSERT INTO table_pm220_data_watt_hour (id, power_meter, total_watt_hour) values(null, '\" + power_meter + \"','\" + total_watt_hour + \"');\"\n    return msg;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 340,
        "y": 800,
        "wires": [
            [
                "7b31e7a231372a41"
            ]
        ]
    },
    {
        "id": "de1378c183e84493",
        "type": "mysql",
        "z": "427da6dc73857e3a",
        "mydb": "257c55675ac7787d",
        "name": "",
        "x": 860,
        "y": 340,
        "wires": [
            []
        ]
    },
    {
        "id": "e01c8d7302bfa3ca",
        "type": "debug",
        "z": "427da6dc73857e3a",
        "name": "Serial_COM",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "payload",
        "targetType": "msg",
        "statusVal": "",
        "statusType": "auto",
        "x": 230,
        "y": 160,
        "wires": []
    },
    {
        "id": "62c946b3a71bb31c",
        "type": "mysql",
        "z": "427da6dc73857e3a",
        "mydb": "42a2103475722fa2",
        "name": "",
        "x": 870,
        "y": 380,
        "wires": [
            []
        ]
    },
    {
        "id": "210737aa3524f259",
        "type": "mysql",
        "z": "427da6dc73857e3a",
        "mydb": "43a8f81ce7e2d29c",
        "name": "",
        "x": 870,
        "y": 420,
        "wires": [
            []
        ]
    },
    {
        "id": "7b31e7a231372a41",
        "type": "mysql",
        "z": "427da6dc73857e3a",
        "mydb": "456d059a55d7408f",
        "name": "",
        "x": 850,
        "y": 500,
        "wires": [
            []
        ]
    },
    {
        "id": "c3262f3db76b6dd3",
        "type": "mysql",
        "z": "427da6dc73857e3a",
        "mydb": "6c729da0af6f0887",
        "name": "",
        "x": 870,
        "y": 460,
        "wires": [
            []
        ]
    },
    {
        "id": "4bbd44a0eff51d66",
        "type": "function",
        "z": "427da6dc73857e3a",
        "name": "DP_RET==>PM_200, PM_220 (watt_hour)",
        "func": "// PM_1200_DP_CH_AB\nvar panel = msg.payload[1]\nvar power_meter = msg.payload[2]\nvar total_watt_hour = msg.payload[3]\n\nif (panel === \"RET\" && power_meter === \"PM_200V\") {\n    msg.topic = \"INSERT INTO table_pm200_data_watt_hour (id, power_meter, total_watt_hour) values(null, '\" + power_meter + \"','\" + total_watt_hour + \"');\"\n    return msg;\n}\nif (panel === \"RET\" && power_meter === \"PM_220V\") {\n    msg.topic = \"INSERT INTO table_pm220_data_watt_hour (id, power_meter, total_watt_hour) values(null, '\" + power_meter + \"','\" + total_watt_hour + \"');\"\n    return msg;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 330,
        "y": 840,
        "wires": [
            [
                "1f2c35f1e29a5cee"
            ]
        ]
    },
    {
        "id": "1f2c35f1e29a5cee",
        "type": "mysql",
        "z": "427da6dc73857e3a",
        "mydb": "9303153eac5cda13",
        "name": "",
        "x": 820,
        "y": 540,
        "wires": [
            []
        ]
    },
    {
        "id": "c3231627f34840b5",
        "type": "function",
        "z": "427da6dc73857e3a",
        "name": "KUBIKAL==>(watt_hour)",
        "func": "// PM_KUBIKAL\nvar panel = msg.payload[1]\nvar total_watt_hour = msg.payload[2]\n\nif (panel === \"data_kubikal\") {\n    msg.topic = \"INSERT INTO table_data_watt_hour (id, total_watt_hour) values(null,'\" + total_watt_hour + \"');\"\n    return msg;\n}\n\n//*,data_kubikal,9105173246,#",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 270,
        "y": 500,
        "wires": [
            [
                "1fc5a503b16bb696"
            ]
        ]
    },
    {
        "id": "1fc5a503b16bb696",
        "type": "mysql",
        "z": "427da6dc73857e3a",
        "mydb": "b2fb125af19ea97c",
        "name": "",
        "x": 830,
        "y": 220,
        "wires": [
            []
        ]
    },
    {
        "id": "22f74e082f5d01f2",
        "type": "debug",
        "z": "427da6dc73857e3a",
        "name": "debug 1",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 840,
        "y": 680,
        "wires": []
    },
    {
        "id": "210213dfdc29a172",
        "type": "function",
        "z": "427da6dc73857e3a",
        "name": "get_kubikal[0]",
        "func": "msg.payload = msg.payload[3];\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 720,
        "y": 740,
        "wires": [
            []
        ]
    },
    {
        "id": "0577771d3a75844c",
        "type": "function",
        "z": "427da6dc73857e3a",
        "name": "get_CHAB[0]",
        "func": "msg.payload = msg.payload[3];\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 710,
        "y": 780,
        "wires": [
            []
        ]
    },
    {
        "id": "1cd50f9f380738f1",
        "type": "inject",
        "z": "427da6dc73857e3a",
        "name": "Get Data",
        "props": [],
        "repeat": "3",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "x": 1170,
        "y": 160,
        "wires": [
            [
                "974cf1d2930906ed",
                "6310be97577dc608"
            ]
        ]
    },
    {
        "id": "974cf1d2930906ed",
        "type": "function",
        "z": "427da6dc73857e3a",
        "name": "SQL Query",
        "func": "msg.topic = \"SELECT * FROM table_pm220_data_watt_hour ORDER BY data_date DESC, data_time DESC LIMIT 3\";\nreturn msg;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1350,
        "y": 220,
        "wires": [
            [
                "f7b9dbf8a68b67be"
            ]
        ]
    },
    {
        "id": "66223819dcd32b3d",
        "type": "mysql",
        "z": "427da6dc73857e3a",
        "mydb": "c71a6b8879d1e5c0",
        "name": "",
        "x": 1480,
        "y": 100,
        "wires": [
            [
                "cc0a0809a865ada8",
                "ce6ea9bba6259be5",
                "13e445834e154a89"
            ]
        ]
    },
    {
        "id": "f7b9dbf8a68b67be",
        "type": "mysql",
        "z": "427da6dc73857e3a",
        "mydb": "c71a6b8879d1e5c0",
        "name": "",
        "x": 1480,
        "y": 280,
        "wires": [
            [
                "c0802c059df21c84",
                "936872e09c322be1"
            ]
        ]
    },
    {
        "id": "6310be97577dc608",
        "type": "function",
        "z": "427da6dc73857e3a",
        "name": "SQL Query",
        "func": "msg.topic = \"SELECT * FROM table_pm200_data_watt_hour ORDER BY data_date DESC, data_time DESC LIMIT 3\";\nreturn msg;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1350,
        "y": 160,
        "wires": [
            [
                "66223819dcd32b3d"
            ]
        ]
    },
    {
        "id": "cc0a0809a865ada8",
        "type": "ui_table",
        "z": "427da6dc73857e3a",
        "group": "86da505569962ede",
        "name": "",
        "order": 1,
        "width": 10,
        "height": 2,
        "columns": [
            {
                "field": "id",
                "title": "ID",
                "width": "50",
                "align": "left",
                "formatter": "plaintext",
                "formatterParams": {
                    "target": "_blank"
                }
            },
            {
                "field": "data_date",
                "title": "Data Date",
                "width": "100",
                "align": "left",
                "formatter": "plaintext",
                "formatterParams": {
                    "target": "_blank"
                }
            },
            {
                "field": "data_time",
                "title": "Data Time",
                "width": "100",
                "align": "left",
                "formatter": "plaintext",
                "formatterParams": {
                    "target": "_blank"
                }
            },
            {
                "field": "power_meter",
                "title": "Power Meter",
                "width": "100",
                "align": "left",
                "formatter": "plaintext",
                "formatterParams": {
                    "target": "_blank"
                }
            },
            {
                "field": "total_watt_hour",
                "title": "Total Watt Hour",
                "width": "100",
                "align": "left",
                "formatter": "plaintext",
                "formatterParams": {
                    "target": "_blank"
                }
            }
        ],
        "outputs": 0,
        "cts": false,
        "x": 1590,
        "y": 160,
        "wires": []
    },
    {
        "id": "c0802c059df21c84",
        "type": "ui_table",
        "z": "427da6dc73857e3a",
        "group": "86da505569962ede",
        "name": "",
        "order": 5,
        "width": 10,
        "height": 2,
        "columns": [
            {
                "field": "id",
                "title": "ID",
                "width": "50",
                "align": "left",
                "formatter": "plaintext",
                "formatterParams": {
                    "target": "_blank"
                }
            },
            {
                "field": "data_date",
                "title": "Data Date",
                "width": "100",
                "align": "left",
                "formatter": "plaintext",
                "formatterParams": {
                    "target": "_blank"
                }
            },
            {
                "field": "data_time",
                "title": "Data Time",
                "width": "100",
                "align": "left",
                "formatter": "plaintext",
                "formatterParams": {
                    "target": "_blank"
                }
            },
            {
                "field": "power_meter",
                "title": "Power Meter",
                "width": "100",
                "align": "left",
                "formatter": "plaintext",
                "formatterParams": {
                    "target": "_blank"
                }
            },
            {
                "field": "total_watt_hour",
                "title": "Total Watt Hour",
                "width": "100",
                "align": "left",
                "formatter": "plaintext",
                "formatterParams": {
                    "target": "_blank"
                }
            }
        ],
        "outputs": 0,
        "cts": false,
        "x": 1590,
        "y": 220,
        "wires": []
    },
    {
        "id": "6e66817dab60050d",
        "type": "ui_chart",
        "z": "427da6dc73857e3a",
        "name": "",
        "group": "7ff420e18936a07d",
        "order": 1,
        "width": 14,
        "height": 8,
        "label": "Realtime Monitoring kWh Meter Camhousing AB",
        "chartType": "line",
        "legend": "true",
        "xformat": "auto",
        "interpolate": "bezier",
        "nodata": "",
        "dot": true,
        "ymin": "0",
        "ymax": "600000000",
        "removeOlder": "30",
        "removeOlderPoints": "",
        "removeOlderUnit": "1",
        "cutout": 0,
        "useOneColor": false,
        "useUTC": false,
        "colors": [
            "#003c66",
            "#00996b",
            "#ff7f0e",
            "#2ca02c",
            "#98df8a",
            "#d62728",
            "#ff9896",
            "#9467bd",
            "#c5b0d5"
        ],
        "outputs": 1,
        "useDifferentColor": false,
        "className": "",
        "x": 2080,
        "y": 180,
        "wires": [
            []
        ]
    },
    {
        "id": "ce6ea9bba6259be5",
        "type": "function",
        "z": "427da6dc73857e3a",
        "name": "kWh PM220",
        "func": "msg.payload = parseFloat(msg.payload[0].total_watt_hour);\nmsg.topic = \"kWh PM220\";\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1750,
        "y": 160,
        "wires": [
            [
                "6e66817dab60050d",
                "e0dae1a1a7c8ec48"
            ]
        ]
    },
    {
        "id": "936872e09c322be1",
        "type": "function",
        "z": "427da6dc73857e3a",
        "name": "kWh PM200",
        "func": "msg.payload = parseFloat(msg.payload[0].total_watt_hour);\nmsg.topic = \"kWh PM200\";\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1750,
        "y": 220,
        "wires": [
            [
                "6e66817dab60050d"
            ]
        ]
    },
    {
        "id": "13e445834e154a89",
        "type": "debug",
        "z": "427da6dc73857e3a",
        "name": "debug 3",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "payload.0.total_watt_hour",
        "targetType": "msg",
        "statusVal": "",
        "statusType": "auto",
        "x": 1720,
        "y": 100,
        "wires": []
    },
    {
        "id": "e0dae1a1a7c8ec48",
        "type": "debug",
        "z": "427da6dc73857e3a",
        "name": "debug 4",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 1960,
        "y": 120,
        "wires": []
    },
    {
        "id": "7dfe5e9228b868d7",
        "type": "ui_button",
        "z": "427da6dc73857e3a",
        "name": "",
        "group": "7ff420e18936a07d",
        "order": 10,
        "width": 2,
        "height": 1,
        "passthru": false,
        "label": "Clear",
        "tooltip": "",
        "color": "",
        "bgcolor": "",
        "className": "",
        "icon": "",
        "payload": "[]",
        "payloadType": "json",
        "topic": "topic",
        "topicType": "msg",
        "x": 1730,
        "y": 280,
        "wires": [
            [
                "6e66817dab60050d"
            ]
        ]
    },
    {
        "id": "c58b52e928787036",
        "type": "ui_template",
        "z": "427da6dc73857e3a",
        "group": "86da505569962ede",
        "name": "",
        "order": 12,
        "width": 4,
        "height": 2,
        "format": "<div style=\"text-align: center; padding: 10px; background-color: #f2f2f2;\">\n    <a href=\"http://localhost/Project_Monitoring_Utility/Electrical_Power/main.html\" style=\"text-decoration: none;\">\n        <button style=\"padding: 3px 3px; \n                       background-color: #003366; /* Biru tua */\n                       color: white; \n                       border: none; \n                       border-radius: 4px; \n                       font-size: 20px; \n                       cursor: pointer; \n                       transition: background-color 0.3s, transform 0.3s, box-shadow 0.3s;\">\n            Home\n        </button>\n    </a>\n</div>\n\n<style>\n    button {\n        box-shadow: 0 0px 0px rgba(0, 0, 0, 0.1);\n        /* Bayangan tombol */\n    }\n\n    button:hover {\n        background-color: #005b99;\n        /* Warna saat hover */\n        transform: translateY(-2px);\n        /* Efek mengangkat saat hover */\n        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);\n        /* Bayangan lebih gelap saat hover */\n    }\n</style>",
        "storeOutMessages": true,
        "fwdInMessages": true,
        "resendOnRefresh": true,
        "templateScope": "local",
        "className": "",
        "x": 1960,
        "y": 220,
        "wires": [
            []
        ]
    },
    {
        "id": "902eaac2d8595b8c",
        "type": "inject",
        "z": "427da6dc73857e3a",
        "name": "Get Data",
        "props": [],
        "repeat": "3",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "x": 1170,
        "y": 480,
        "wires": [
            [
                "bdd55434219110af",
                "30418157eaf70655"
            ]
        ]
    },
    {
        "id": "bdd55434219110af",
        "type": "function",
        "z": "427da6dc73857e3a",
        "name": "SQL Query",
        "func": "msg.topic = \"SELECT * FROM table_pm220_data_watt_hour ORDER BY data_date DESC, data_time DESC LIMIT 10\";\nreturn msg;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1350,
        "y": 540,
        "wires": [
            [
                "f2a982dbb3cc3632"
            ]
        ]
    },
    {
        "id": "93ea106aa8b62fde",
        "type": "mysql",
        "z": "427da6dc73857e3a",
        "mydb": "bebd24bb4fd34e2f",
        "name": "",
        "x": 1480,
        "y": 420,
        "wires": [
            [
                "dfb349e62dc636fe",
                "8f4347e3acbe7276",
                "04e39db24b21f302"
            ]
        ]
    },
    {
        "id": "f2a982dbb3cc3632",
        "type": "mysql",
        "z": "427da6dc73857e3a",
        "mydb": "bebd24bb4fd34e2f",
        "name": "",
        "x": 1480,
        "y": 600,
        "wires": [
            [
                "9f4499098c05a512",
                "0ba2cd3ae75a7bf7"
            ]
        ]
    },
    {
        "id": "30418157eaf70655",
        "type": "function",
        "z": "427da6dc73857e3a",
        "name": "SQL Query",
        "func": "msg.topic = \"SELECT * FROM table_pm200_data_watt_hour ORDER BY data_date DESC, data_time DESC LIMIT 10\";\nreturn msg;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1350,
        "y": 480,
        "wires": [
            [
                "93ea106aa8b62fde"
            ]
        ]
    },
    {
        "id": "dfb349e62dc636fe",
        "type": "ui_table",
        "z": "427da6dc73857e3a",
        "group": "924762faefd48f29",
        "name": "",
        "order": 2,
        "width": 13,
        "height": 5,
        "columns": [
            {
                "field": "id",
                "title": "ID",
                "width": "50",
                "align": "left",
                "formatter": "plaintext",
                "formatterParams": {
                    "target": "_blank"
                }
            },
            {
                "field": "data_date",
                "title": "Data Date",
                "width": "110",
                "align": "left",
                "formatter": "plaintext",
                "formatterParams": {
                    "target": "_blank"
                }
            },
            {
                "field": "data_time",
                "title": "Data Time",
                "width": "150",
                "align": "left",
                "formatter": "plaintext",
                "formatterParams": {
                    "target": "_blank"
                }
            },
            {
                "field": "power_meter",
                "title": "Power Meter",
                "width": "150",
                "align": "left",
                "formatter": "plaintext",
                "formatterParams": {
                    "target": "_blank"
                }
            },
            {
                "field": "total_watt_hour",
                "title": "Total Watt Hour",
                "width": "150",
                "align": "left",
                "formatter": "plaintext",
                "formatterParams": {
                    "target": "_blank"
                }
            }
        ],
        "outputs": 0,
        "cts": false,
        "x": 1590,
        "y": 480,
        "wires": []
    },
    {
        "id": "9f4499098c05a512",
        "type": "ui_table",
        "z": "427da6dc73857e3a",
        "group": "924762faefd48f29",
        "name": "",
        "order": 14,
        "width": 13,
        "height": 5,
        "columns": [
            {
                "field": "id",
                "title": "ID",
                "width": "50",
                "align": "left",
                "formatter": "plaintext",
                "formatterParams": {
                    "target": "_blank"
                }
            },
            {
                "field": "data_date",
                "title": "Data Date",
                "width": "110",
                "align": "left",
                "formatter": "plaintext",
                "formatterParams": {
                    "target": "_blank"
                }
            },
            {
                "field": "data_time",
                "title": "Data Time",
                "width": "150",
                "align": "left",
                "formatter": "plaintext",
                "formatterParams": {
                    "target": "_blank"
                }
            },
            {
                "field": "power_meter",
                "title": "Power Meter",
                "width": "150",
                "align": "left",
                "formatter": "plaintext",
                "formatterParams": {
                    "target": "_blank"
                }
            },
            {
                "field": "total_watt_hour",
                "title": "Total Watt Hour",
                "width": "150",
                "align": "left",
                "formatter": "plaintext",
                "formatterParams": {
                    "target": "_blank"
                }
            }
        ],
        "outputs": 0,
        "cts": false,
        "x": 1590,
        "y": 540,
        "wires": []
    },
    {
        "id": "1da81549d8c67e6b",
        "type": "ui_chart",
        "z": "427da6dc73857e3a",
        "name": "",
        "group": "1fec67f0c31e5f85",
        "order": 1,
        "width": 15,
        "height": 11,
        "label": "Realtime Monitoring kWh Meter Camhousing CD",
        "chartType": "line",
        "legend": "true",
        "xformat": "auto",
        "interpolate": "bezier",
        "nodata": "",
        "dot": true,
        "ymin": "391500000",
        "ymax": "391750000",
        "removeOlder": "1",
        "removeOlderPoints": "",
        "removeOlderUnit": "60",
        "cutout": 0,
        "useOneColor": false,
        "useUTC": false,
        "colors": [
            "#003c66",
            "#00996b",
            "#ff7f0e",
            "#2ca02c",
            "#98df8a",
            "#d62728",
            "#ff9896",
            "#9467bd",
            "#c5b0d5"
        ],
        "outputs": 1,
        "useDifferentColor": false,
        "className": "",
        "x": 2100,
        "y": 460,
        "wires": [
            []
        ]
    },
    {
        "id": "8f4347e3acbe7276",
        "type": "function",
        "z": "427da6dc73857e3a",
        "name": "kWh PM220",
        "func": "msg.payload = parseFloat(msg.payload[0].total_watt_hour);\nmsg.topic = \"kWh PM220\";\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1750,
        "y": 480,
        "wires": [
            [
                "1da81549d8c67e6b",
                "dac0c695d6e4d201"
            ]
        ]
    },
    {
        "id": "0ba2cd3ae75a7bf7",
        "type": "function",
        "z": "427da6dc73857e3a",
        "name": "kWh PM200",
        "func": "msg.payload = parseFloat(msg.payload[0].total_watt_hour);\nmsg.topic = \"kWh PM200\";\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1750,
        "y": 540,
        "wires": [
            [
                "eeab6c01d3dc2d81"
            ]
        ]
    },
    {
        "id": "04e39db24b21f302",
        "type": "debug",
        "z": "427da6dc73857e3a",
        "name": "debug 5",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "payload.0.total_watt_hour",
        "targetType": "msg",
        "statusVal": "",
        "statusType": "auto",
        "x": 1720,
        "y": 420,
        "wires": []
    },
    {
        "id": "dac0c695d6e4d201",
        "type": "debug",
        "z": "427da6dc73857e3a",
        "name": "debug 6",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 1960,
        "y": 340,
        "wires": []
    },
    {
        "id": "96558ba6f543a0f7",
        "type": "ui_template",
        "z": "427da6dc73857e3a",
        "group": "924762faefd48f29",
        "name": "",
        "order": 29,
        "width": 5,
        "height": 2,
        "format": "<div style=\"text-align: center; padding: 10px; background-color: #f2f2f2;\">\n    <a href=\"http://localhost/Project_Monitoring_Utility/Electrical_Power/main.html\" style=\"text-decoration: none;\">\n        <button style=\"padding: 5px 5px; \n                       background-color: #003366; /* Biru tua */\n                       color: white; \n                       border: none; \n                       border-radius: 4px; \n                       font-size: 20px; \n                       cursor: pointer; \n                       transition: background-color 0.3s, transform 0.3s, box-shadow 0.3s;\">\n            Home\n        </button>\n    </a>\n</div>\n\n<style>\n    button {\n        box-shadow: 0 0px 0px rgba(0, 0, 0, 0.1);\n        /* Bayangan tombol */\n    }\n\n    button:hover {\n        background-color: #005b99;\n        /* Warna saat hover */\n        transform: translateY(-2px);\n        /* Efek mengangkat saat hover */\n        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);\n        /* Bayangan lebih gelap saat hover */\n    }\n</style>",
        "storeOutMessages": true,
        "fwdInMessages": true,
        "resendOnRefresh": true,
        "templateScope": "local",
        "className": "",
        "x": 1960,
        "y": 620,
        "wires": [
            []
        ]
    },
    {
        "id": "5af8a0e740727d41",
        "type": "inject",
        "z": "427da6dc73857e3a",
        "name": "Get Data",
        "props": [],
        "repeat": "3",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "x": 1170,
        "y": 820,
        "wires": [
            [
                "cdaf262e14452d45",
                "f1f01186431570b3"
            ]
        ]
    },
    {
        "id": "cdaf262e14452d45",
        "type": "function",
        "z": "427da6dc73857e3a",
        "name": "SQL Query",
        "func": "msg.topic = \"SELECT * FROM table_pm220_data_watt_hour ORDER BY data_date DESC, data_time DESC LIMIT 3\";\nreturn msg;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1350,
        "y": 880,
        "wires": [
            [
                "0537b268678118f0"
            ]
        ]
    },
    {
        "id": "8cedee34d0ffd9d1",
        "type": "mysql",
        "z": "427da6dc73857e3a",
        "mydb": "42a2103475722fa2",
        "name": "",
        "x": 1490,
        "y": 760,
        "wires": [
            [
                "9da0c88fdca5892d",
                "bc9d09d7214ba569",
                "6d44d6e23491a839"
            ]
        ]
    },
    {
        "id": "0537b268678118f0",
        "type": "mysql",
        "z": "427da6dc73857e3a",
        "mydb": "42a2103475722fa2",
        "name": "",
        "x": 1490,
        "y": 940,
        "wires": [
            [
                "e5236bfa5c452fbe",
                "37848db49e4e2dd8"
            ]
        ]
    },
    {
        "id": "f1f01186431570b3",
        "type": "function",
        "z": "427da6dc73857e3a",
        "name": "SQL Query",
        "func": "msg.topic = \"SELECT * FROM table_pm200_data_watt_hour ORDER BY data_date DESC, data_time DESC LIMIT 3\";\nreturn msg;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1350,
        "y": 820,
        "wires": [
            [
                "8cedee34d0ffd9d1"
            ]
        ]
    },
    {
        "id": "9da0c88fdca5892d",
        "type": "ui_table",
        "z": "427da6dc73857e3a",
        "group": "4f86cf63e75e2d13",
        "name": "",
        "order": 1,
        "width": 11,
        "height": 2,
        "columns": [
            {
                "field": "id",
                "title": "ID",
                "width": "50",
                "align": "left",
                "formatter": "plaintext",
                "formatterParams": {
                    "target": "_blank"
                }
            },
            {
                "field": "data_date",
                "title": "Data Date",
                "width": "100",
                "align": "left",
                "formatter": "plaintext",
                "formatterParams": {
                    "target": "_blank"
                }
            },
            {
                "field": "data_time",
                "title": "Data Time",
                "width": "100",
                "align": "left",
                "formatter": "plaintext",
                "formatterParams": {
                    "target": "_blank"
                }
            },
            {
                "field": "power_meter",
                "title": "Power Meter",
                "width": "100",
                "align": "left",
                "formatter": "plaintext",
                "formatterParams": {
                    "target": "_blank"
                }
            },
            {
                "field": "total_watt_hour",
                "title": "Total Watt Hour",
                "width": "100",
                "align": "left",
                "formatter": "plaintext",
                "formatterParams": {
                    "target": "_blank"
                }
            }
        ],
        "outputs": 0,
        "cts": false,
        "x": 1590,
        "y": 820,
        "wires": []
    },
    {
        "id": "e5236bfa5c452fbe",
        "type": "ui_table",
        "z": "427da6dc73857e3a",
        "group": "4f86cf63e75e2d13",
        "name": "",
        "order": 5,
        "width": 11,
        "height": 2,
        "columns": [
            {
                "field": "id",
                "title": "ID",
                "width": "50",
                "align": "left",
                "formatter": "plaintext",
                "formatterParams": {
                    "target": "_blank"
                }
            },
            {
                "field": "data_date",
                "title": "Data Date",
                "width": "100",
                "align": "left",
                "formatter": "plaintext",
                "formatterParams": {
                    "target": "_blank"
                }
            },
            {
                "field": "data_time",
                "title": "Data Time",
                "width": "100",
                "align": "left",
                "formatter": "plaintext",
                "formatterParams": {
                    "target": "_blank"
                }
            },
            {
                "field": "power_meter",
                "title": "Power Meter",
                "width": "100",
                "align": "left",
                "formatter": "plaintext",
                "formatterParams": {
                    "target": "_blank"
                }
            },
            {
                "field": "total_watt_hour",
                "title": "Total Watt Hour",
                "width": "100",
                "align": "left",
                "formatter": "plaintext",
                "formatterParams": {
                    "target": "_blank"
                }
            }
        ],
        "outputs": 0,
        "cts": false,
        "x": 1590,
        "y": 880,
        "wires": []
    },
    {
        "id": "62bc943a56f23e1a",
        "type": "ui_chart",
        "z": "427da6dc73857e3a",
        "name": "",
        "group": "01022f5b7f18f68d",
        "order": 1,
        "width": 13,
        "height": 9,
        "label": "Realtime Monitoring kWh Meter Camhousing Sub Assy A",
        "chartType": "line",
        "legend": "true",
        "xformat": "auto",
        "interpolate": "bezier",
        "nodata": "",
        "dot": true,
        "ymin": "0",
        "ymax": "600000000",
        "removeOlder": "30",
        "removeOlderPoints": "",
        "removeOlderUnit": "1",
        "cutout": 0,
        "useOneColor": false,
        "useUTC": false,
        "colors": [
            "#003c66",
            "#00996b",
            "#ff7f0e",
            "#2ca02c",
            "#98df8a",
            "#d62728",
            "#ff9896",
            "#9467bd",
            "#c5b0d5"
        ],
        "outputs": 1,
        "useDifferentColor": false,
        "className": "",
        "x": 2110,
        "y": 840,
        "wires": [
            []
        ]
    },
    {
        "id": "bc9d09d7214ba569",
        "type": "function",
        "z": "427da6dc73857e3a",
        "name": "kWh PM220",
        "func": "msg.payload = parseFloat(msg.payload[0].total_watt_hour);\nmsg.topic = \"kWh PM220\";\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1750,
        "y": 820,
        "wires": [
            [
                "62bc943a56f23e1a",
                "792da5c366ba1158"
            ]
        ]
    },
    {
        "id": "37848db49e4e2dd8",
        "type": "function",
        "z": "427da6dc73857e3a",
        "name": "kWh PM200",
        "func": "msg.payload = parseFloat(msg.payload[0].total_watt_hour);\nmsg.topic = \"kWh PM200\";\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1750,
        "y": 880,
        "wires": [
            [
                "62bc943a56f23e1a"
            ]
        ]
    },
    {
        "id": "6d44d6e23491a839",
        "type": "debug",
        "z": "427da6dc73857e3a",
        "name": "debug 7",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "payload.0.total_watt_hour",
        "targetType": "msg",
        "statusVal": "",
        "statusType": "auto",
        "x": 1720,
        "y": 760,
        "wires": []
    },
    {
        "id": "792da5c366ba1158",
        "type": "debug",
        "z": "427da6dc73857e3a",
        "name": "debug 8",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 1960,
        "y": 780,
        "wires": []
    },
    {
        "id": "2ecdc9eb859dde7c",
        "type": "ui_button",
        "z": "427da6dc73857e3a",
        "name": "",
        "group": "01022f5b7f18f68d",
        "order": 2,
        "width": 2,
        "height": 1,
        "passthru": false,
        "label": "Clear",
        "tooltip": "",
        "color": "",
        "bgcolor": "",
        "className": "",
        "icon": "",
        "payload": "[]",
        "payloadType": "json",
        "topic": "topic",
        "topicType": "msg",
        "x": 1730,
        "y": 940,
        "wires": [
            [
                "62bc943a56f23e1a"
            ]
        ]
    },
    {
        "id": "ad6452892f1eb49f",
        "type": "ui_template",
        "z": "427da6dc73857e3a",
        "group": "4f86cf63e75e2d13",
        "name": "",
        "order": 12,
        "width": 5,
        "height": 2,
        "format": "<div style=\"text-align: center; padding: 10px; background-color: #f2f2f2;\">\n    <a href=\"http://localhost/Project_Monitoring_Utility/Electrical_Power/main.html\" style=\"text-decoration: none;\">\n        <button style=\"padding: 3px 3px; \n                       background-color: #003366; /* Biru tua */\n                       color: white; \n                       border: none; \n                       border-radius: 4px; \n                       font-size: 20px; \n                       cursor: pointer; \n                       transition: background-color 0.3s, transform 0.3s, box-shadow 0.3s;\">\n            Home\n        </button>\n    </a>\n</div>\n\n<style>\n    button {\n        box-shadow: 0 0px 0px rgba(0, 0, 0, 0.1);\n        /* Bayangan tombol */\n    }\n\n    button:hover {\n        background-color: #005b99;\n        /* Warna saat hover */\n        transform: translateY(-2px);\n        /* Efek mengangkat saat hover */\n        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);\n        /* Bayangan lebih gelap saat hover */\n    }\n</style>",
        "storeOutMessages": true,
        "fwdInMessages": true,
        "resendOnRefresh": true,
        "templateScope": "local",
        "className": "",
        "x": 1960,
        "y": 880,
        "wires": [
            []
        ]
    },
    {
        "id": "6c829807627bea35",
        "type": "inject",
        "z": "427da6dc73857e3a",
        "name": "Get Data",
        "props": [],
        "repeat": "3",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "x": 2510,
        "y": 200,
        "wires": [
            [
                "3ee97d19f168c48e",
                "2d0076938fa98098"
            ]
        ]
    },
    {
        "id": "3ee97d19f168c48e",
        "type": "function",
        "z": "427da6dc73857e3a",
        "name": "SQL Query",
        "func": "msg.topic = \"SELECT * FROM table_data_watt_hour ORDER BY data_date DESC, data_time DESC LIMIT 3\";\nreturn msg;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2690,
        "y": 260,
        "wires": [
            [
                "188a3a06450c7160"
            ]
        ]
    },
    {
        "id": "60cb8aadc0a3fc18",
        "type": "mysql",
        "z": "427da6dc73857e3a",
        "mydb": "b2fb125af19ea97c",
        "name": "",
        "x": 2790,
        "y": 140,
        "wires": [
            [
                "2db3f5d2fa237ea1",
                "ae6093787c2ee9ea",
                "6be94cecf1568767"
            ]
        ]
    },
    {
        "id": "188a3a06450c7160",
        "type": "mysql",
        "z": "427da6dc73857e3a",
        "mydb": "b2fb125af19ea97c",
        "name": "",
        "x": 2790,
        "y": 320,
        "wires": [
            [
                "53f8a8dd8835e8a9",
                "93f0396c612f7ff4"
            ]
        ]
    },
    {
        "id": "2d0076938fa98098",
        "type": "function",
        "z": "427da6dc73857e3a",
        "name": "SQL Query",
        "func": "msg.topic = \"SELECT * FROM \ttable_data_watt_hour ORDER BY data_date DESC, data_time DESC LIMIT 3\";\nreturn msg;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2690,
        "y": 200,
        "wires": [
            [
                "60cb8aadc0a3fc18"
            ]
        ]
    },
    {
        "id": "2db3f5d2fa237ea1",
        "type": "ui_table",
        "z": "427da6dc73857e3a",
        "group": "13e9402f6b278106",
        "name": "",
        "order": 1,
        "width": 12,
        "height": 2,
        "columns": [
            {
                "field": "id",
                "title": "ID",
                "width": "50",
                "align": "left",
                "formatter": "plaintext",
                "formatterParams": {
                    "target": "_blank"
                }
            },
            {
                "field": "data_date",
                "title": "Data Date",
                "width": "100",
                "align": "left",
                "formatter": "plaintext",
                "formatterParams": {
                    "target": "_blank"
                }
            },
            {
                "field": "data_time",
                "title": "Data Time",
                "width": "100",
                "align": "left",
                "formatter": "plaintext",
                "formatterParams": {
                    "target": "_blank"
                }
            },
            {
                "field": "power_meter",
                "title": "Power Meter",
                "width": "100",
                "align": "left",
                "formatter": "plaintext",
                "formatterParams": {
                    "target": "_blank"
                }
            },
            {
                "field": "total_watt_hour",
                "title": "Total Watt Hour",
                "width": "100",
                "align": "left",
                "formatter": "plaintext",
                "formatterParams": {
                    "target": "_blank"
                }
            }
        ],
        "outputs": 0,
        "cts": false,
        "x": 2930,
        "y": 200,
        "wires": []
    },
    {
        "id": "53f8a8dd8835e8a9",
        "type": "ui_table",
        "z": "427da6dc73857e3a",
        "group": "13e9402f6b278106",
        "name": "",
        "order": 4,
        "width": 12,
        "height": 2,
        "columns": [
            {
                "field": "id",
                "title": "ID",
                "width": "50",
                "align": "left",
                "formatter": "plaintext",
                "formatterParams": {
                    "target": "_blank"
                }
            },
            {
                "field": "data_date",
                "title": "Data Date",
                "width": "100",
                "align": "left",
                "formatter": "plaintext",
                "formatterParams": {
                    "target": "_blank"
                }
            },
            {
                "field": "data_time",
                "title": "Data Time",
                "width": "100",
                "align": "left",
                "formatter": "plaintext",
                "formatterParams": {
                    "target": "_blank"
                }
            },
            {
                "field": "power_meter",
                "title": "Power Meter",
                "width": "100",
                "align": "left",
                "formatter": "plaintext",
                "formatterParams": {
                    "target": "_blank"
                }
            },
            {
                "field": "total_watt_hour",
                "title": "Total Watt Hour",
                "width": "100",
                "align": "left",
                "formatter": "plaintext",
                "formatterParams": {
                    "target": "_blank"
                }
            }
        ],
        "outputs": 0,
        "cts": false,
        "x": 2930,
        "y": 260,
        "wires": []
    },
    {
        "id": "a9da040f7517db1b",
        "type": "ui_chart",
        "z": "427da6dc73857e3a",
        "name": "",
        "group": "9bcde0ac72f7fada",
        "order": 1,
        "width": 0,
        "height": 0,
        "label": "Realtime Monitoring kWh Meter Area Pusat",
        "chartType": "line",
        "legend": "true",
        "xformat": "auto",
        "interpolate": "bezier",
        "nodata": "",
        "dot": true,
        "ymin": "0",
        "ymax": "600000000",
        "removeOlder": "30",
        "removeOlderPoints": "",
        "removeOlderUnit": "1",
        "cutout": 0,
        "useOneColor": false,
        "useUTC": false,
        "colors": [
            "#003c66",
            "#00996b",
            "#ff7f0e",
            "#2ca02c",
            "#98df8a",
            "#d62728",
            "#ff9896",
            "#9467bd",
            "#c5b0d5"
        ],
        "outputs": 1,
        "useDifferentColor": false,
        "className": "",
        "x": 3410,
        "y": 220,
        "wires": [
            []
        ]
    },
    {
        "id": "ae6093787c2ee9ea",
        "type": "function",
        "z": "427da6dc73857e3a",
        "name": "kWh PM220",
        "func": "msg.payload = parseFloat(msg.payload[0].total_watt_hour);\nmsg.topic = \"kWh PM220\";\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 3090,
        "y": 200,
        "wires": [
            [
                "a9da040f7517db1b",
                "a17473354bd05839"
            ]
        ]
    },
    {
        "id": "93f0396c612f7ff4",
        "type": "function",
        "z": "427da6dc73857e3a",
        "name": "kWh PM200",
        "func": "msg.payload = parseFloat(msg.payload[0].total_watt_hour);\nmsg.topic = \"kWh PM200\";\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 3090,
        "y": 260,
        "wires": [
            [
                "a9da040f7517db1b"
            ]
        ]
    },
    {
        "id": "6be94cecf1568767",
        "type": "debug",
        "z": "427da6dc73857e3a",
        "name": "debug 9",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "payload.0.total_watt_hour",
        "targetType": "msg",
        "statusVal": "",
        "statusType": "auto",
        "x": 3060,
        "y": 140,
        "wires": []
    },
    {
        "id": "a17473354bd05839",
        "type": "debug",
        "z": "427da6dc73857e3a",
        "name": "debug 10",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 3300,
        "y": 160,
        "wires": []
    },
    {
        "id": "2a6d3b3a2d37ac6d",
        "type": "ui_button",
        "z": "427da6dc73857e3a",
        "name": "",
        "group": "9bcde0ac72f7fada",
        "order": 2,
        "width": 2,
        "height": 1,
        "passthru": false,
        "label": "Clear",
        "tooltip": "",
        "color": "",
        "bgcolor": "",
        "className": "",
        "icon": "",
        "payload": "[]",
        "payloadType": "json",
        "topic": "topic",
        "topicType": "msg",
        "x": 3070,
        "y": 320,
        "wires": [
            [
                "a9da040f7517db1b"
            ]
        ]
    },
    {
        "id": "6f5d1433650a8bcc",
        "type": "ui_template",
        "z": "427da6dc73857e3a",
        "group": "13e9402f6b278106",
        "name": "",
        "order": 11,
        "width": 4,
        "height": 2,
        "format": "<div style=\"text-align: center; padding: 10px; background-color: #f2f2f2;\">\n    <a href=\"http://localhost/Project_Monitoring_Utility/Electrical_Power/main.html\" style=\"text-decoration: none;\">\n        <button style=\"padding: 3px 3px; \n                       background-color: #003366; /* Biru tua */\n                       color: white; \n                       border: none; \n                       border-radius: 4px; \n                       font-size: 20px; \n                       cursor: pointer; \n                       transition: background-color 0.3s, transform 0.3s, box-shadow 0.3s;\">\n            Home\n        </button>\n    </a>\n</div>\n\n<style>\n    button {\n        box-shadow: 0 0px 0px rgba(0, 0, 0, 0.1);\n        /* Bayangan tombol */\n    }\n\n    button:hover {\n        background-color: #005b99;\n        /* Warna saat hover */\n        transform: translateY(-2px);\n        /* Efek mengangkat saat hover */\n        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);\n        /* Bayangan lebih gelap saat hover */\n    }\n</style>",
        "storeOutMessages": true,
        "fwdInMessages": true,
        "resendOnRefresh": true,
        "templateScope": "local",
        "className": "",
        "x": 3300,
        "y": 260,
        "wires": [
            []
        ]
    },
    {
        "id": "eeab6c01d3dc2d81",
        "type": "ui_chart",
        "z": "427da6dc73857e3a",
        "name": "",
        "group": "1fec67f0c31e5f85",
        "order": 1,
        "width": 15,
        "height": 11,
        "label": "Realtime Monitoring kWh Meter Camhousing CD",
        "chartType": "line",
        "legend": "true",
        "xformat": "auto",
        "interpolate": "bezier",
        "nodata": "",
        "dot": true,
        "ymin": "0",
        "ymax": "600000000",
        "removeOlder": "30",
        "removeOlderPoints": "",
        "removeOlderUnit": "1",
        "cutout": 0,
        "useOneColor": false,
        "useUTC": false,
        "colors": [
            "#003c66",
            "#00996b",
            "#ff7f0e",
            "#2ca02c",
            "#98df8a",
            "#d62728",
            "#ff9896",
            "#9467bd",
            "#c5b0d5"
        ],
        "outputs": 1,
        "useDifferentColor": false,
        "className": "",
        "x": 2100,
        "y": 520,
        "wires": [
            []
        ]
    },
    {
        "id": "c71a6b8879d1e5c0",
        "type": "MySQLdatabase",
        "name": "",
        "host": "127.0.0.1",
        "port": "3306",
        "db": "db_energy_listrik_camphousing_ab",
        "tz": "",
        "charset": "UTF8"
    },
    {
        "id": "bebd24bb4fd34e2f",
        "type": "MySQLdatabase",
        "name": "",
        "host": "127.0.0.1",
        "port": "3306",
        "db": "db_energy_listrik_camphousing_cd",
        "tz": "",
        "charset": "UTF8"
    },
    {
        "id": "3dd901a47a1781df",
        "type": "serial-port",
        "name": "",
        "serialport": "/dev/ttyUSB0",
        "serialbaud": "9600",
        "databits": "8",
        "parity": "none",
        "stopbits": "1",
        "waitfor": "",
        "dtr": "none",
        "rts": "none",
        "cts": "none",
        "dsr": "none",
        "newline": "\\n",
        "bin": "false",
        "out": "char",
        "addchar": "",
        "responsetimeout": "10000"
    },
    {
        "id": "de33f8dbe22463fe",
        "type": "MySQLdatabase",
        "name": "",
        "host": "127.0.0.1",
        "port": "3306",
        "db": "database_tps_energy",
        "tz": "",
        "charset": "UTF8"
    },
    {
        "id": "257c55675ac7787d",
        "type": "MySQLdatabase",
        "name": "",
        "host": "127.0.0.1",
        "port": "3306",
        "db": "db_energy_listrik_camphousing_ef",
        "tz": "",
        "charset": "UTF8"
    },
    {
        "id": "42a2103475722fa2",
        "type": "MySQLdatabase",
        "name": "",
        "host": "127.0.0.1",
        "port": "3306",
        "db": "db_energy_listrik_camphousing_saa",
        "tz": "",
        "charset": "UTF8"
    },
    {
        "id": "43a8f81ce7e2d29c",
        "type": "MySQLdatabase",
        "name": "",
        "host": "127.0.0.1",
        "port": "3306",
        "db": "db_energy_listrik_camphousing_sab",
        "tz": "",
        "charset": "UTF8"
    },
    {
        "id": "456d059a55d7408f",
        "type": "MySQLdatabase",
        "name": "",
        "host": "127.0.0.1",
        "port": "3306",
        "db": "db_energy_listrik_cam_cap_234",
        "tz": "",
        "charset": "UTF8"
    },
    {
        "id": "6c729da0af6f0887",
        "type": "MySQLdatabase",
        "name": "",
        "host": "127.0.0.1",
        "port": "3306",
        "db": "db_energy_listrik_camphousing_sac",
        "tz": "",
        "charset": "UTF8"
    },
    {
        "id": "9303153eac5cda13",
        "type": "MySQLdatabase",
        "name": "",
        "host": "127.0.0.1",
        "port": "3306",
        "db": "db_energy_listrik_ret",
        "tz": "",
        "charset": "UTF8"
    },
    {
        "id": "b2fb125af19ea97c",
        "type": "MySQLdatabase",
        "name": "",
        "host": "127.0.0.1",
        "port": "3306",
        "db": "db_energy_listrik_kubikal",
        "tz": "",
        "charset": "UTF8"
    },
    {
        "id": "86da505569962ede",
        "type": "ui_group",
        "name": "TABLE DATA TERAKHIR",
        "tab": "0f1b10b25382f7cb",
        "order": 2,
        "disp": true,
        "width": 15,
        "collapse": false,
        "className": ""
    },
    {
        "id": "7ff420e18936a07d",
        "type": "ui_group",
        "name": "GRAFIK REALTIME",
        "tab": "0f1b10b25382f7cb",
        "order": 1,
        "disp": true,
        "width": 17,
        "collapse": false,
        "className": ""
    },
    {
        "id": "924762faefd48f29",
        "type": "ui_group",
        "name": "TABLE DATA TERAKHIR",
        "tab": "5268280d6b0c7c29",
        "order": 2,
        "disp": true,
        "width": 15,
        "collapse": false,
        "className": ""
    },
    {
        "id": "1fec67f0c31e5f85",
        "type": "ui_group",
        "name": "GRAFIK REALTIME",
        "tab": "5268280d6b0c7c29",
        "order": 1,
        "disp": true,
        "width": 17,
        "collapse": false,
        "className": ""
    },
    {
        "id": "4f86cf63e75e2d13",
        "type": "ui_group",
        "name": "TABEL DATA TERAKHIR",
        "tab": "d1ec90892ca3887a",
        "order": 2,
        "disp": true,
        "width": "14",
        "collapse": false,
        "className": ""
    },
    {
        "id": "01022f5b7f18f68d",
        "type": "ui_group",
        "name": "GRAFIK REALTIME",
        "tab": "d1ec90892ca3887a",
        "order": 1,
        "disp": true,
        "width": "13",
        "collapse": false,
        "className": ""
    },
    {
        "id": "13e9402f6b278106",
        "type": "ui_group",
        "name": "TABEL REALTIME",
        "tab": "eea18f7316197cd0",
        "order": 2,
        "disp": true,
        "width": "14",
        "collapse": false,
        "className": ""
    },
    {
        "id": "9bcde0ac72f7fada",
        "type": "ui_group",
        "name": "GRAFIK REALTIME",
        "tab": "eea18f7316197cd0",
        "order": 1,
        "disp": true,
        "width": 13,
        "collapse": false,
        "className": ""
    },
    {
        "id": "0f1b10b25382f7cb",
        "type": "ui_tab",
        "name": "LINE CAMHOUSING AB",
        "icon": "dashboard",
        "order": 1,
        "disabled": false,
        "hidden": false
    },
    {
        "id": "5268280d6b0c7c29",
        "type": "ui_tab",
        "name": "LINE CAMHOUSING CD",
        "icon": "dashboard",
        "order": 2,
        "disabled": false,
        "hidden": false
    },
    {
        "id": "d1ec90892ca3887a",
        "type": "ui_tab",
        "name": "LINE CAMHOUSING SUB ASSY A",
        "icon": "dashboard",
        "order": 3,
        "disabled": false,
        "hidden": false
    },
    {
        "id": "eea18f7316197cd0",
        "type": "ui_tab",
        "name": "SUMBER UTAMA",
        "icon": "dashboard",
        "order": 4,
        "disabled": false,
        "hidden": false
    }
]
