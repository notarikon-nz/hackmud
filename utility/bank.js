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
    // alternatively, use caller.calling_script and implement security on that end
		return (username == "your_username_here" || username == "your_alts_username_here") // this should be a database implementation
	}

	function withdraw(amount) {
		if (isNaN(amount)) return;
		return JSON.stringify( #ms.accts.xfer_gc_to({to:username,amount:amount}) )
	}

}

