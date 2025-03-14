# navdialog

A lightweight dialog creation library using jte

## Installation
```html
<script src="path/to/navdialog.js"></script>
```

## Usage

### Creating a Dialog
```javascript
const my_dialog = navdialog.create_dialog(main_content, {
    on_save: function() {
        // Custom save logic
    },
    on_attach: function() {
        // Custom attach logic
    },
    on_delete: function() {
        // Custom delete logic
    },
    label_text: 'Custom Label' // Optional
}, footer_content);
```

### Showing a Dialog
```javascript
navdialog.show_dialog(my_dialog);
```

### Closing a Dialog
```javascript
navdialog.close_dialog(my_dialog);
```

### Example
```javascript
const content = jte({
    tag: 'p',
    textnode: 'This is some dialog content'
});

const footer_content = jte({
    tag: 'button',
    textnode: 'Close',
    onclick: function() { navdialog.close_dialog(this.parentElement.parentElement.parentElement) }
});

const dialog = navdialog.create_dialog(content, {
    on_save: function() {
        console.log('Save button clicked');
        navdialog.close_dialog(this.parentElement.parentElement);
    },
    on_attach: function() {
        console.log('Attach button clicked');
        navdialog.close_dialog(this.parentElement.parentElement);
    },
    on_delete: function() {
        console.log('Delete button clicked');
        navdialog.close_dialog(this.parentElement.parentElement);
    },
    label_text: 'Agendamento de consultas'
}, footer_content);

navdialog.show_dialog(dialog);
```

## API

### `create_dialog(content, options, footer_content)`
Creates a new dialog element with the provided content, options, and footer content

#### Parameters
- `content`: HTMLElement - The main content of the dialog
- `options`: Object - Optional configuration
  - `on_save`: Function - Callback for save button
  - `on_attach`: Function - Callback for attach button
  - `on_delete`: Function - Callback for delete button
  - `label_text`: String - Custom label text (default: 'Formulário')
- `footer_content`: HTMLElement - The footer content of the dialog

### `show_dialog(dialog)`
Displays the created dialog

### `close_dialog(dialog)`
Closes and removes the dialog from the DOM
