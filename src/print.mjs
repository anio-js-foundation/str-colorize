import parse from "./parse.mjs"
import render from "./render.mjs"

export default function(args, printer, use_colors = true) {
	for (const arg of args) {
		const tree = parse(arg)
		const str = render(tree, use_colors)

		printer(str)
	}
}
