// Menu Items
export const items = [
  {label: 'Home', icon:'home', link: 'home.html'},
  {label: 'Network Interfaces', icon:'network', submenu: [
    {label: 'Wi-Fi', link: 'wifi.html'}, 
    {label: 'Cellular Data', link: 'cellular.html'},
    {label: 'Ethernet', link: 'ethernet.html'} ,
    {label: 'VPN', link: 'vpn.html'}
    ]
  },
  {label: 'Serial Ports', icon:'serial', link: 'serial.html'},
  {label: 'Protocols', icon:'protocols', submenu: [
    {label: 'CAN', link: 'can.html'}, 
    {label: 'MODBUS', link: 'modbus.html'}, 
    {label: 'OPC UA', link: 'opcua.html'}, 
    {label: 'DLMS', link: 'dlms.html'}]
  },
  {label: 'Telemetry', icon:'telemetry', link: 'telemetry.html'},
  {label: 'Internet of Things', icon:'iot', submenu: [
    {label: 'MQTT/s', link: 'mqtt.html'}, 
    {label: 'HTTP/s', link: 'http.html'}]
  },
  {label: 'Manage Device', icon:'manage', submenu: [
    {label: 'Reset Credentials', link: 'reset_cred.html'}, 
    {label: 'Firmware Update', link: 'update.html'},
    {label: 'File Explorer', link: 'file_explorer.html'}
    ]
  },
];