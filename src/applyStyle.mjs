import stylesMap from "./stylesMap.mjs"

function applyStylesToString(styles, str) {
	let ret = ``

	for (const style of styles) {
		const [code] = stylesMap[style]

		ret += `\u000b`
		ret += String.fromCharCode(code)
	}

	ret += str
	ret += `\u001b`.repeat(styles.length)

	return ret
}

export default function(styles, ...args) {
	let ret = ``

	for (const arg of args) {
		ret += applyStylesToString(styles, arg)
	}

	return ret
}
