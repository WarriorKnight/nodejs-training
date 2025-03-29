#!/usr/bin/env node

/**
 * svatky
 * CLI tool to check name days in the Czech Republic.
 *
 * @author darkk <..>
 */

import cli from './utils/cli.js';
import init from './utils/init.js';
import log from './utils/log.js';
import axios from 'axios';

const { flags, input, showHelp } = cli;
const { clear, debug } = flags;
const FgRed = "\x1b[31m";
(async () => {
	await init({ clear });
	debug && log(flags);

	// Show help message if the user includes 'help' in input
	if (input.includes(`help`)) {
		console.log(
		"Example Usage:\n",
		"svatky <name>\n",
		"svatky Vojtěch");
			return;
		}

	// Get the name from the CLI input
	const name = input[0];

	//Check if name was provided
	if (!name){
		console.log(FgRed + "Jméno nebylo načteno.");
	}

	else{
		//Make an API request to retrieve the name day for the name
		const response = await axios.get('https://svatky.adresa.info/json?name=' + name);
		if (Array.isArray(response.data) && response.data.length!=0){
			const date = response.data[0].date;
			const day = date.slice(0,2);
			const month = date.slice(2,4);
			console.log(name, "má svátek",FgRed + day + "." + month);
		}

		//Name wasn't found
		else{
			console.log("Zkontrolujte zadané jméno.");
		}
	}
})();
