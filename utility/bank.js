function (context, args, username){

	username = context.caller; // get username of person calling script

	if (!args) return; // if no args, silently return

	if (!authorise())  // if not an authorised user, return
		return 	"`DError 403``1 : Forbidden`\n`1You don't have permission to access this server`"

	if (args.withdraw) {
		return withdraw(args.withdraw)
	}
	
	return;

  // 
	function authorise() {
		return (context.calling_script.includes("your_username_here") || context.calling_script.includes("your_alts_username_here")) // this should be a database implementation
	}

	function withdraw(amount) {
		if (isNaN(amount)) return;
		// ---
	}

}

