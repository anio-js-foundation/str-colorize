import stylesMap from "./stylesMap.mjs"

function applyStylesToString(styles, str) {
	let ret = ``

	for (const style of styles) {
		const [code] = stylesMap[style]

		ret += `\u0001`
		ret += String.fromCharCode(code)
	}

	ret += str
	ret += `\u0002`.repeat(styles.length)

	return ret
}

export default function(styles, ...args) {
	let ret = ``

	for (const arg of args) {
		ret += applyStylesToString(styles, arg)
	}

	return ret
}
