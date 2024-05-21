function(context, args) { // amount:24, limit:10000
    args = args || {}

    const MIN_SLOTS_FREE = 16; // minimum number of upgrade slots to leave free
    const MAX_SNAX_PURCHASED = args.amount || 24;	// maximum number of snax to purchase, can be set via argument amount:##
    const MAX_SNACK_COST = args.limit || 10000;	// 10KGC

    const decolor = val => val.replace(/`\w(.*?)`/g, '$1');
    const sysSpecs = decolor(#hs.sys.specs());
    const regexSlots = /slots:\s*(\d+)\/(\d+)/;
    const matches = sysSpecs.match(regexSlots);

    if (!matches) {
        return "Error: slots information not found.";
    }

    const usedSlots = parseInt(matches[1]);
    const totalSlots = parseInt(matches[2]);
    const availableSlots = totalSlots - usedSlots;

    let snax = #fs.market.browse({rarity:0, tier:1}),
        purchased = 0;

    // Filter snax based on the first letter of the name <= 'k'
    snax = snax.filter(item => /^[a-k]/i.test(item.name));

    // Pre-determine how many items we can purchase
    const itemsToPurchase = Math.min(MAX_SNAX_PURCHASED, availableSlots - MIN_SLOTS_FREE, snax.length);

    for (let i = 0; i < itemsToPurchase; i++) {
        if (snax[i].cost < MAX_SNACK_COST) {
            #ms.market.buy({i: snax[i].i, count: 1, confirm: 1});
            purchased++;
        }
		if (Date.now() - _START > 4500) break;
    }

    return `Available Slots: ${availableSlots} -> ${availableSlots-purchased}\nPurchased ${purchased} Snax\n`;
}
