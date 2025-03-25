#!/usr/bin/env node

/**
 * svatky
 * .
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

	if (input.includes(`help`)) {
		console.log(
	"Example Usage:\n",
	"svatky <name>\n",
	"svatky Vojtěch");
		return;
	}


	const name = input[0];
	if (!name){
		console.log(FgRed + "Jméno nebylo načteno.");
	}
	else{
		const response = await axios.get('https://svatky.adresa.info/json?name=' + name);
		if (Array.isArray(response.data) && response.data.length!=0){
			const date = response.data[0].date;
			const day = date.slice(0,2);
			const month = date.slice(2,4);
			console.log(name, "má svátek",FgRed + day + "." + month);
		}
		else{
			console.log("Zkontrolujte zadané jméno.");
		}
	}
})();
