module.exports = {
	parse: parse,
	parseHighlight: parseHighlight,
	groupHighlights: groupHighlights
};

function parse(text) {
	var chunks = text.split('==========');
	var highlights = chunks.map(parseHighlight).filter(function(highlight) {
		return highlight !== false;
	});
	var groupedByTitle = groupHighlights(highlights);
	return groupedByTitle;
}


function parseHighlight(text) {
	var trimmed = text.trim();
	var lines = trimmed.split('\n');
	var title = lines[0].trim();
	var metadata = lines[1];
	var rest = lines.slice(2);
	
	if(title.length === 0) {
		return false;
	}

	if(rest !== undefined) {
		rest = rest.join('\n').trim();
	}

	// TODO: parse metadata
	
	return {
		title: title,
		metadata: metadata,
		text: rest
	};
}


function groupHighlights(items) {
	var grouped = {};

	items.forEach(function(item) {
		var title = item.title;
		var titleHighlights;

		if(grouped[title] === undefined) {
			titleHighlights = [];
			grouped[title] = titleHighlights;
		} else {
			titleHighlights = grouped[title];
		}

		titleHighlights.push({
			metadata: item.metadata,
			text: item.text
		});
	});

	var collection = [];
	for(var title in grouped) {
		var highlights = grouped[title];
		collection.push({
			title: title,
			highlights: highlights
		});
	}

	return collection;
}

