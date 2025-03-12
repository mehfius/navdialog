# navdialog

A lightweight dialog creation library using jte

## Installation
```html
<script src="path/to/navdialog.js"></script>
```

## Usage

### Creating a Dialog
```javascript
const my_dialog = navdialog.create_dialog('<p>This is dialog content</p>')
```

### Showing a Dialog
```javascript
navdialog.show_dialog(my_dialog)
```

### Closing a Dialog
```javascript
navdialog.close_dialog(my_dialog)
```

### Example
```javascript
const content = `
    <h2>Dialog Title</h2>
    <p>This is some dialog content</p>
    <button onclick="navdialog.close_dialog(this.parentElement.parentElement)">Close</button>
`

const dialog = navdialog.create_dialog(content)
navdialog.show_dialog(dialog)
```

## API

### `create_dialog(content)`
Creates a new dialog element with the provided HTML content

### `show_dialog(dialog)`
Displays the created dialog

### `close_dialog(dialog)`
Closes and removes the dialog from the DOM
