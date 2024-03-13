import stylesMap from "./stylesMap.mjs"

function styleNameToAnsiEscapeSequence(style_name, use_colors) {
	if (!use_colors) return ""

	for (const style in stylesMap) {
		const [code, ansi_escape_sequence] = stylesMap[style]

		if (style_name === style) {
			return `\u001b[${ansi_escape_sequence}m`
		}
	}
}

export default function render(tree, use_colors = true) {
	let stack = []
	let ret = ``

	for (const entry of tree) {
		if (typeof entry === "string") {
			ret += entry
		}
		// push to stack
		else if (entry[0] === "push") {
			const style = entry[1]

			stack.push(style)

			ret += styleNameToAnsiEscapeSequence(style, use_colors)
		}
		// pop stack
		else if (entry[0] === "pop") {
			stack.pop()

			if (use_colors) ret += `\u001b[0;0m`

			for (const style of stack) {
				ret += styleNameToAnsiEscapeSequence(style, use_colors)
			}
		}
	}

	return ret
}
