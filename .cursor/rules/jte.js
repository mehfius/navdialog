function jte(json) {

    if (!json) {
        throw new Error('jte: No JSON object provided');
    }
    if (!json.tag) { 
        throw new Error('jte: "tag" property is required');
    }
    if (typeof json.tag !== 'string') {  
        throw new Error('jte: "tag" must be a string');       
    }

    if (typeof json !== 'object' || Array.isArray(json)) {
        throw new Error('jte: Input must be a JSON object');
    }
    if (json.innerhtml && json.textnode) {
        console.warn('jte: Both innerhtml and textnode provided - textnode will be ignored');
    }
    if (json.value && !['input', 'textarea', 'select'].includes(json.tag)) {
        console.warn(`jte: "value" property is typically used with input, textarea, or select elements, not <${json.tag}>`);
    }

    const currentScript = document.currentScript;
    if (currentScript && currentScript.getAttribute('dev') === 'true') {
        console.log('%cElement: ' + json.name,'background: grey; padding: 0 5px 0 5px;');
    }

    try {
        const field = document.createElement(json.tag);
        const specialHandlers = ['innerhtml', 'tag', 'textnode', 'value'];
        const eventHandlers = ['onclick', 'onchange', 'onkeyup', 'onkeypress', 'oninput', 'onfocus', 'onblur'];

        Object.entries(json).forEach(([key, value]) => {
            if (key === 'innerhtml') {
                if (typeof value !== 'string') {
                    console.warn('jte: innerhtml should be a string', json);
                }
                field.innerHTML = value;
            } else if (key === 'textnode') {
                if (typeof value !== 'string') {
                    console.warn('jte: textnode should be a string', json);
                }
                field.appendChild(document.createTextNode(value));
            } else if (key === 'value' && json.tag === 'textarea') {
                field.appendChild(document.createTextNode(value));
            } else if (eventHandlers.includes(key)) {
                if (typeof value !== 'function') {
                    console.warn(`jte: ${key} should be a function`);
                }
                field[key] = value;
            } else if (!specialHandlers.includes(key)) {
                field.setAttribute(key, value);
            }
        });

        return field;
    } catch (error) {
        console.error('jte: Error creating element:', error);
        throw new Error(`jte: Failed to create element: ${error.message}`);
    }
}