// ╔══════════════════════╗
// ║  navdialog v1.0.0    ║
// ║  Production Ready    ║
// ║  MIT Licensed        ║
// ╚══════════════════════╝

const navdialog = (function() {
	const create_dialog = (content) => {
		const dialog = jte({
			tag: 'dialog',
			innerhtml: `<div class="dialog-content">${content}</div>`
		})
		return dialog
	}

	const show_dialog = (dialog) => {
		document.body.appendChild(dialog)
		dialog.showModal()
	}

	const close_dialog = (dialog) => {
		dialog.close()
		dialog.remove()
	}

	return {
		create_dialog,
		show_dialog,
		close_dialog
	}
})()
