# sortable.js

sortable.js is a powerful, lightweight JS framework used for adding simple sorting controls to HTML tables. The plugin provides various functionalities that can be used to manage and sort data in tables. Clicking the header of a column sorts the table based on that column's data.

## Usage

```HTML
<table id="myTable">
    <thead>
        <tr>
            <th>Name</th>
            <th>Favourite Food</th>
            <th>Country</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Berglunds snabbkop</td>
            <td>Pizza</td>
            <td>Sweden</td>
        </tr>
        [...]
    </tbody>
</table>

<script src="sortable.js"></script>
<script>
    var instance = new smartable({
        selector: "#myTable",
    });
</script>
```

## Options

The following are the default options:

```JS
var instance = new smartable({
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
});
```
