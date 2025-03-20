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
			tag: 'dialog',
			type: 'auth'
		});

		const label = jte({
			tag: 'label',
			textnode: 'Authentication'
		});

		const e_buttons = jte({ tag: 'buttons' });
		
		// Check if auth.SSO_PROVIDERS exists and is valid
		const valid_providers = ['email', 'google', 'github'];
		
		if (!globalThis.auth?.SSO_PROVIDERS || !Array.isArray(globalThis.auth.SSO_PROVIDERS)) {
			console.error('navdialog: SSO_PROVIDERS not configured. Set globalThis.auth.SSO_PROVIDERS as an array with one or more of: email,google,github');
			return dialog;
		}

		// Validate provider values
		const invalid_providers = globalThis.auth.SSO_PROVIDERS.filter(provider => !valid_providers.includes(provider));
		if (invalid_providers.length > 0) {
			console.error(`navdialog: Invalid SSO providers found: ${invalid_providers.join(', ')}. Valid options are: email,google,github`);
			return dialog;
		}

		// Add provider buttons based on SSO_PROVIDERS
		if (globalThis.auth.SSO_PROVIDERS.includes('email')) {
			e_buttons.append(
				jte({
					tag: 'button',
					id: 'auth_login_email',
					innerhtml: 'Email',
					onclick: () => {
						signInWithEmail();
					}
				})
			);
		}

		if (globalThis.auth.SSO_PROVIDERS.includes('github')) {
			e_buttons.append(
				jte({
					tag: 'button',
					id: 'auth_login_git',
					innerhtml: 'Git Hub',
					onclick: () => {
						signInWithGitHub();
					}
				})
			);
		}

		if (globalThis.auth.SSO_PROVIDERS.includes('google')) {
			e_buttons.append(
				jte({
					tag: 'button',
					id: 'auth_login_google',
					innerhtml: 'Google',
					onclick: () => {
						signInWithGoogle();
					}
				})
			);
		}

		dialog.append(label, e_buttons);
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
