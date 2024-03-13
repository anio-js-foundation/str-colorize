import createBuffer from "./createBuffer.mjs"
import stylesMap from "./stylesMap.mjs"

function styleCodeToName(style_code) {
	for (const style in stylesMap) {
		const [code] = stylesMap[style]

		if (style_code === String.fromCharCode(code)) {
			return style
		}
	}

	throw new Error(`No matching style name for code.`)
}

export default function parse(input) {
	let buffer = createBuffer(input)
	let ret = []

	while (!buffer.end()) {
		const ch = buffer.pop(1)

		// read style
		if (ch === `\u000b`) {
			let style_code = buffer.pop(1)

			if (!style_code.length) break

			ret.push(["push", styleCodeToName(style_code)])
		}
		// pop stack
		else if (ch === `\u001b`) {
			ret.push(["pop"])
		}
		else {
			ret.push(ch)
		}
	}

	return ret
}
