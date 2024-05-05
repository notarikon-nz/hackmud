function(context, args){

	// prevent other users from calling this lib directly
	if (!context.calling_script.includes("notarikon"))
		return;
	
	if(!args) {
		return JSON.stringify(context);
	}

	if (!args) return;

	switch(args.get) {

		case 'l0c': return "".split(',') // l0ck3t & l0ckbox keys
		case 'prj' : return "".split(",") // known project names
		case 'usr' : return "".split(",") // known usernames
		case 'phr' : return "".split(",") // known passphrases
		case 'pub' : return "amal_robo,aon,archaic,bluebun,bunnybat_hut,context,core,cyberdine,empty_nest,etceteraco,futuretech,goodfellow,halperyon,kill_9_1,kill_bio,legion_bible,legion_intl,light,lowell_extermination,marco_polo,merrymoor_pharma,nation_of_wales,nogrub,nuutec,pica,protein_prevention,ros_13_update_checker,ros13,setec_gas,skimmerite,sn_w,soylentbean,subject_object,suborbital_airlines,tandoori,the_holy_checksum,turing_testing,tyrell,vacuum_rescue,weathernet,welsh_measles_info,weyland,world_pop".split(",")
		case 't2s' : return "".split(",")

	}
	
	return { ok:false };

}
