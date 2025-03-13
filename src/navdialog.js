// ╔══════════════════════╗
// ║  navdialog v1.0.0    ║
// ║  Production Ready    ║
// ║  MIT Licensed        ║
// ╚══════════════════════╝

const navdialog = (function() {
	const create_dialog = (main_content, { on_save, on_attach, on_delete, label_text = 'Formulário' }, footer_content) => {
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
			textnode: label_text
		});

		header.append(back_button, label, delete_button, attach_button, save_button);

		const content = jte({
			tag: 'content'
		});
		content.append(main_content);

		const elements_to_append = [header, content];
		
		if (footer_content) {
			const footer = jte({
				tag: 'footer'
			});
			footer.append(footer_content);
			elements_to_append.push(footer);
		}

		dialog.append(...elements_to_append);
		return dialog;
	}

	const create_dialog_login = () => {
		const dialog = jte({
			tag: 'dialog'
		});

		const e_buttons = jte({ tag: 'buttons' });
		e_buttons.append(
			jte({
				tag: 'button',
				id: 'insert',
				innerhtml: 'Sign Up',
				onclick: async function () {
					speedj('js/autenticacao/cadastro.js')
				}
			}),
			jte({
				tag: 'button',
				id: 'git_login',
				innerhtml: 'Git Hub',
				onclick: () => {
					signInWithGitHub();
				}
			}),
			jte({
				tag: 'button',
				id: 'google_login',
				innerhtml: 'Google',
				onclick: () => {
					signInWithGoogle();
				}
			})
		);

		dialog.append(e_buttons);
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
		create_dialog_login,
		show_dialog,
		close_dialog
	}
})();
