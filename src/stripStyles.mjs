import parse from "./parse.mjs"

export default function stripStyles(str) {
	const sequence = parse(str)
	let ret = ``

	for (const entry of sequence) {
		if (typeof entry === "string") {
			ret += entry
		}
	}

	return ret
}
