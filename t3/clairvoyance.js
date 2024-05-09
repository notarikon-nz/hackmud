
function(context, args) //t:#s.context.internal
{
    var caller = context.caller
    var l = #fs.scripts.lib(),
	response, 
	username, 
	call_count = 0,
	target_name = "",
	current_date,
	state_info

    if (!args || !args.t) {
        return "Provide a target with t:#s.corp.private, then repeatedly run until prompted to enter the provided backup server as a scriptor.\nNow run it again with the scriptor until process is complete."
    }

	let usernames = #fs.notarikon.lib( {get:"usernames"} )

	initialise_state(context, args);

    while (!check_timeout() && call_count < 222) {
        switch (state_info.stage) {
            case 0:
                handle_find_username();
                break;
            case 1:
                handle_find_pin();
                break;
            case 2:
                gather_calendar_ids();
                break;
            case 3:
                collect_info_from_calendar();
                break;
            case 4:
                find_backup_server();
                break;
            case 5:
                output_backup_server_name();
                break;
            case 6:
                scrape_backup_server_for_key();
                break;
            case 7:
                decrypt_calendar_info();
                break;
            case 8:
                final_processing();
                break;
            default:
                throw new Error("Invalid state");
        }
    }

    return finalise_state();

}

function initialise_state(context, args) {

	state_info = #db.f({script:context.this_script, caller}).first()
	current_date = Date.now()
	
	if (!state_info || current_date - state_info.lastRunDate > 144e5 || args.reset === true) {
		state_info = {
			script: context.this_script,
			caller,
			last_run_date: current_date,
			stage: 0,
			username: 0,
			pin: 0,
			calendar_ids: [],
			enumeration: -8,
			enumeration2: 0,
			id_content: [],
			data_object: {}
		}
	}
	target_name = args.t.name.split(".")[0]
}  


// ------------------------------------------------------------------------------------------
// determine a valid username from the username list
// ------------------------------------------------------------------------------------------
function handle_find_username() {
	username = usernames[state_info.username];
	state_info.data_object = { username };
	tc();
	if (!/employee /.test(response) && !/not exist/.test(response)) {
		return state_info.stage++;
	} else {
		si.username = (si.username + 1) % usernames.length;
	}
}
