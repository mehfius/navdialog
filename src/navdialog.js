// ╔══════════════════════╗
// ║  navdialog v1.0.0    ║
// ║  Production Ready    ║
// ║  MIT Licensed        ║
// ╚══════════════════════╝

const navdialog = (function() {
	const create_dialog = (main_content, { on_save, on_attach, on_delete }) => {
		const dialog = jte({
			tag: 'dialog'
		});

		const header = jte({
			tag: 'header'
		});

		const back_button = jte({
			tag: 'button',
			type: 'back',
			textnode: 'voltar',
			onclick: function() { navdialog.close_dialog(this.parentElement.parentElement) }
		});

		const delete_button = jte({
			tag: 'button',
			type: 'delete',
			onclick: on_delete || function() { navdialog.close_dialog(this.parentElement.parentElement) }
		});

		const attach_button = jte({
			tag: 'button',
			type: 'attach',
			onclick: on_attach || function() { navdialog.close_dialog(this.parentElement.parentElement) }
		});

		const save_button = jte({
			tag: 'button',
			type: 'save',
			textnode: 'salvar',
			onclick: on_save || function() { navdialog.close_dialog(this.parentElement.parentElement) }
		});

		const label = jte({
			tag: 'label',
			textnode: 'Agendamento de consultas'
		});

		header.append(back_button, label, delete_button, attach_button, save_button);

		const content = jte({
			tag: 'content'
		});
		content.append(main_content);

		const footer = jte({
			tag: 'footer'
		});

		const close_button = jte({
			tag: 'button',
			textnode: 'Close',
			onclick: function() { navdialog.close_dialog(this.parentElement.parentElement.parentElement) }
		});

		footer.append(close_button);

		dialog.append(header, content, footer);
		return dialog;
	}

	const show_dialog = (dialog) => {
		document.body.appendChild(dialog);
		dialog.showModal();
	}

	const close_dialog = (dialog) => {
		dialog.close();
		dialog.remove();
	}

	return {
		create_dialog,
		show_dialog,
		close_dialog
	}
})();
