function (c,a) {

  // takes no arguments
  // generates a table of active t3 corps and time since last active
  // allows user to target fresh domains
  // works in conjunction with bot_brain.js
  
    const group = "activeDomains",
    	existingEntries = #db.f({group}).array(),
		header = `\n\n\`HAPERTURE SCIENCE :: T3 LIFESPAN\`\n\n`,
		tableColumns = ['domain','age'];

	let t3Array = []

	existingEntries.forEach(f =>
		t3Array.push({
			domain: f.domain.padEnd(26,' '),
			age: timeSince(f.timestamp),
		})
	);

	return header + createTable(t3Array,tableColumns);

	function createTable(data, columns) {
		if (!data.length) return 'No data available';

		const decolor = val => String(val).replaceAll(/`\w(.*?)`/g, '$1')

		// Use the provided columns or get all keys from the first object
		columns = columns || Object.keys(data[0]);
	
		// Calculate the width for each column
		const colWidths = columns.map(key => Math.max(key.length, ...data.map(row => decolor(String(row[key] || '')).length)));
	
		// Padding function
		const pad = (str, length) => String(str).padEnd(length, ' ');
	
		// Function to create the border
		const border = (left, mid, right, horizontal) => 
			left + colWidths.map(width => horizontal.repeat(width + 2)).join(mid) + right;
	
		// Create the header row
		const header = "┃" + columns.map((key, i) => `\`1 ${pad(key.toUpperCase(), colWidths[i])} \``).join('┃') + "┃";
	
		// Create the data rows
		const rows = data.map(row => 
			"┃" + columns.map((key, i) => ` ${pad(row[key] || '', colWidths[i])} `).join('┃') + "┃"
		);
	
		// Create the borders
        const topBorder = border('┏', '┳', '┓', '━');
        const midBorder = border('┣', '╋', '┫', '━');
        const bottomBorder = border('┗', '┻', '┛', '━');
	
		// Combine all parts to create the table
		return [
			topBorder,
			header,
			midBorder,
			...rows,
			bottomBorder
		].join('\n');
	}		

	function timeSince(date) {

		var seconds = Math.floor((new Date() - date) / 1000);

		var interval = seconds / 31536000;

		if (interval > 1) {
			return Math.floor(interval) + " years";
		}
		interval = seconds / 2592000;
		if (interval > 1) {
			return Math.floor(interval) + " months";
		}
		interval = seconds / 86400;
		if (interval > 1) {
			return Math.floor(interval) + " days";
		}
		interval = seconds / 3600;
		if (interval > 1) {
			return Math.floor(interval) + " hours";
		}
		interval = seconds / 60;
		if (interval > 1) {
			return Math.floor(interval) + " minutes";
		}
		return Math.floor(seconds) + " seconds";
	}		
}
