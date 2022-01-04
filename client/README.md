## Setup

Install dependencies from the package.json file by entering the following into the terminal.
#### `npm install`

You must then:
- Import the Front End .env file (see Section 11 of Handover)
- Download the BackEnd branch to a seperate folder
- Import the Front End .env file (see Section 11 of Handover)

## To run the software
This requires two terminals.
- From the Backend folder, run `npm run start` - this should do some work, and then display `MongoDB Connected`. If it does not, see the "If there are issues connecting to the Back End" section below.
- From the Master/PointCloud folder, run `npm start` - this should start the development server. If you receive errors, see "If there are issues running the Front End" section below.

## If there are issues connecting to the Back End
You may need to change your DNS server. How you do this depends on your computer's OS.
For more stable handling of normal DNS queries, the following sections add either CloudFlare DNS (1.1.1.1) or Google DNS (8.8.8.8) in front of the required OpenDNS (208.67.222.222).

## If there are issues running the Front End
Change `"start": "craco start",` to `"start": "SET NODE_OPTIONS=--openssl-legacy-provider && craco start",`

#### macOS
System Preferences -> Network -> Advanced -> DNS -> Add DNS Server
This will allow you to add DNS servers to be queried in order. Add:
`1.1.1.1` or `8.8.8.8`
`208.67.222.222`

#### Windows
This change is made at the interface level.
- From the Settings app: Network & Internet -> Change Adapter Options -> 
- From the Control Panel: Network & Internet -> Network and Sharing Centre -> Change Adapter Settings (Left Bar) ->

These will bring you onto the same screen. From here: 
<Your method of connecting to the internet - either your Ethernet cable or your Wifi Antenna>'s Properties -> Networking -> IPv4
<Use the following DNS Addresses> -> 1.1.1.1 or 8.8.8.8 for the preferred DNS server, 208.67.222.222 for the alternate DNS server


#### Linux (Why?)
`sudo nano /etc/resolv.conf`
`namespace 1.1.1.1` or `namespace 8.8.8.8` 
`namespace 208.67.222.222`
