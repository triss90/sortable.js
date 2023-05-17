(function () {
	const smartable = function (opts) {
		this.options = Object.assign(smartable.defaults, opts);
		this.selector = document.querySelector(this.options.selector);

		this.sort = this.options.sort;
		this.defaultSortColumn = this.options.defaultSortColumn;
		this.defaultSortOrder = this.options.defaultSortOrder;

		this.tableWidth = this.options.tableWidth;
		this.tableCellPadding = this.options.tableCellPadding;
		this.tableBorderColor = this.options.tableBorderColor;
		this.tableborderWidth = this.options.tableborderWidth;

		this.headColor = this.options.headColor;
		this.headTextColor = this.options.headTextColor;

		this.bodyHighlightEnabled = this.options.bodyHighlight.enabled;
		this.bodyHighlightEvenColor = this.options.bodyHighlight.evenColor;
		this.bodyHighlightEvenTextColor = this.options.bodyHighlight.evenTextColor;
		this.bodyHighlightOddColor = this.options.bodyHighlight.oddColor;
		this.bodyHighlightOddTextColor = this.options.bodyHighlight.oddTextColor;

		this.init();
	};

	// library logic
	smartable.prototype.init = function () {
		// Add styles
		let highlight;
		if (this.bodyHighlightEnabled === true) {
			highlight = `
			#${this.selector.id} tbody tr:nth-child(even) {
				background-color: ${this.bodyHighlightEvenColor};
				color: ${this.bodyHighlightEvenTextColor};
			}
			#${this.selector.id} tbody tr:nth-child(odd) {
				background-color: ${this.bodyHighlightOddColor};
				color: ${this.bodyHighlightOddTextColor};
			}
			`;
		}
		const styleTag = document.createElement("style");
		const css = `
			#${this.selector.id}  {
				border-spacing: 0;
				width: ${this.tableWidth};
				border: ${this.tableborderWidth} solid ${this.tableBorderColor};
			}
			#${this.selector.id} th {
				cursor: pointer;
				position: relative;
			}
			#${this.selector.id} th::after {
				content: attr(data-sort-icon);
				position: relative;
				top: 6px;
				right: -5px;
				font-size: 125%;
			}
			#${this.selector.id} th, 
			#${this.selector.id} td {
				text-align: left;
				padding: ${this.tableCellPadding};
			}
			#${this.selector.id} thead tr {
				background-color: ${this.headColor} !important;
				color: ${this.headTextColor};
			}
			${highlight}
		`;

		styleTag.styleTag = "text/css";
		styleTag.appendChild(document.createTextNode(css));
		document.querySelector("head").appendChild(styleTag); // Append the styles to Document head
		// this.selector.insertBefore(styleTag, this.selector.children[0]);

		// Make table sortable
		if (this.sort == true) {
			// Add interactable attributes
			const tableHeads = this.selector.querySelectorAll("th");
			for (let i = 0; i < tableHeads.length; i++) {
				tableHeads[i].setAttribute("onclick", "sort(" + i + ",this)");
				tableHeads[i].setAttribute("data-column-id", i);
				// console.log(tableHeads[i]);
			}

			// Add JS Logic
			const scriptTag = document.createElement("script");
			const js = `
				function sort(n,e) {
					let table, heads, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
					table = document.querySelector("${this.options.selector}");
					heads = table.querySelectorAll('th');
					if (e.getAttribute("data-sort") == 'asc') {
						heads.forEach(th => th.setAttribute('data-sort', ''));
						heads.forEach(th => th.setAttribute('data-sort-icon', ''));
						e.setAttribute('data-sort', 'desc');
						e.setAttribute('data-sort-icon', 'ꜛ');
					} 
					else if (e.getAttribute("data-sort") == 'desc') {
						heads.forEach(th => th.setAttribute('data-sort', ''));
						heads.forEach(th => th.setAttribute('data-sort-icon', ''));
						e.setAttribute('data-sort', 'asc');
						e.setAttribute('data-sort-icon', 'ꜜ');
					} 
					else {
						heads.forEach(th => th.setAttribute('data-sort', ''));
						heads.forEach(th => th.setAttribute('data-sort-icon', ''));
						e.setAttribute('data-sort', 'asc');
						e.setAttribute('data-sort-icon', 'ꜜ');
					}
					switching = true;
					dir = "asc";
					while (switching) {
						switching = false;
						rows = table.rows;
						for (i = 1; i < (rows.length - 1); i++) {
							shouldSwitch = false;
							x = rows[i].getElementsByTagName("TD")[n];
							y = rows[i + 1].getElementsByTagName("TD")[n];
							if (dir == "asc") {
								if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
									shouldSwitch= true;
									break;
								}
							} else if (dir == "desc") {
								if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
									shouldSwitch = true;
									break;
								}
							}
						}
						if (shouldSwitch) {
							rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
							switching = true;
							switchcount ++;
						} else {
							if (switchcount == 0 && dir == "asc") {
								dir = "desc";
								switching = true;
							}
						}
					}
				}
			`;
			scriptTag.appendChild(document.createTextNode(js));
			this.selector.appendChild(scriptTag);

			// Apply predefined sort
			if (this.defaultSortColumn != null) {
				const activeColumn = document.querySelector(
					"[data-column-id='" + this.defaultSortColumn + "']"
				);
				// console.log(this.defaultSortColumn, activeColumn);
				sort(this.defaultSortColumn, activeColumn);
				if (this.defaultSortOrder != null) {
					sort(this.defaultSortColumn, activeColumn);
				}
			}
		}
	};

	// Define default options
	smartable.defaults = {
		// Selector
		selector: "", // table selecter, can be id, class or tagname

		// Sorting
		sort: true, // true or false
		defaultSortColumn: null, // Any valid column number starting with 0
		defaultSortOrder: null, // ASC or DESC

		// Table styles
		tableWidth: "100%", // Any valid length value (px, em, rem, % and so on)
		tableCellPadding: "16px", // Any valid lenght value (px, em, rem, % and so on)
		tableBorderColor: "#dddddd", // Any valid color format(HEX, RGB, HSL and so on)
		tableborderWidth: "1px", // Any valid lenght value (px, em, rem, % and so on)

		// Table Head styles
		headColor: "#dddddd", // Any valid color format(HEX, RGB, HSL and so on)
		headTextColor: "inherit", // Any valid color format(HEX, RGB, HSL and so on)

		// Table Body styles
		bodyHighlight: {
			enabled: true,
			evenColor: "#f2f2f2", // Any valid color format(HEX, RGB, HSL and so on)
			evenTextColor: "inherit", // Any valid color format(HEX, RGB, HSL and so on)
			oddColor: "transparent", // Any valid color format(HEX, RGB, HSL and so on)
			oddTextColor: "inherit", // Any valid color format(HEX, RGB, HSL and so on)
		},
	};

	// Make accessible globally
	window.smartable = smartable;
})();
