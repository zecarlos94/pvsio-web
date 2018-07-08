# Arcade Simulator JavaScript Library
The PVSio-web Library for rendering 2D arcade simulations

Related papers are available ( <http://www.pvsioweb.org/> ).

Further documentation can be found at ( <https://github.com/zecarlos94/pvsio-web/blob/gamingDev/src/client/app/widgets/car/documentation/car_docs/index.html/> )

## How to Try

### Initial setup required to run pvsio-web widgets
	1. cd Desktop/
	2. git clone "https://github.com/zecarlos94/pvsio-web.git"
	3. cd pvsio-web/
	4. git checkout gamingDev
	5. Open browser "http://pvs.csl.sri.com/download.shtml" to download latest version of PVS Binaries according to your OS
	6. Copy/Paste and replace all files inside the downloaded folder to pvsio-web/PVS. (By default the provided binaries are for MacOS, and when running the demos on other OS those will not work)
	7. Run command: sh start.sh ( MacOS ) or ./start.sh ( Linux )

### Running Demos on the browser
Open <http://localhost:8082/demos/arcade_game_simulator/> with your browser to test the demo for the more conscious user, i.e. that sets all opt fields manually in index.js file.

Or

Open <http://localhost:8082/demos/driving_simulator/> with your browser to test the demo for the less conscious user, i.e. that fills all customization menus to customize the simulation without setting opt fields manually. An example of possible values to fill those customization menus is presented in <https://github.com/zecarlos94/pvsio-web/blob/gamingDev/src/client/app/widgets/car/configurations/CustomizationFieldsPossibleValues_Demo_Driving_Simulator.txt>

Only tested with Google Chrome.
