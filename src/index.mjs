import createModifierFunction from "@anio-js-foundation/create-modifier-function"
import isNode from "@anio-js-foundation/is-node"

import stylesMap from "./stylesMap.mjs"
import applyStyle from "./applyStyle.mjs"

import parse_impl from "./parse.mjs"
import render_impl from "./render.mjs"
import print_impl from "./print.mjs"

const colorize = function(str) { return str; }

const styles = Object.keys(stylesMap)

for (const style in stylesMap) {
	colorize[style] = createModifierFunction((modifiers, ...args) => {
		return applyStyle([
			...modifiers,
			style
		], ...args)
	}, styles)
}

export const c      = colorize
export const render = render_impl
export const parse  = parse_impl

let force_colors = false

export function forceColors() {
	force_colors = true
}

let node_modules = {}

if (isNode()) {
	node_modules.process = (await import("node:process")).default
	node_modules.tty = (await import("node:tty")).default
}

export const print = (...args) => {
	if (!isNode()) {
		print_impl(args, (str) => console.log(str), true)

		return
	}

	const {tty, process} = node_modules

	let use_colors = force_colors

	if (tty.isatty(process.stdout.fd)) {
		use_colors = true
	}

	if ("FORCE_COLORS" in process.env) {
		use_colors = true
	}

	print_impl(args, (str) => process.stdout.write(str), use_colors)
}

print.stderr = (...args) => {
	if (!isNode()) {
		print_impl(args, (str) => console.log(str), true)

		return
	}

	const {tty, process} = node_modules

	let use_colors = force_colors

	if (tty.isatty(process.stderr.fd)) {
		use_colors = true
	}

	if ("FORCE_COLORS" in process.env) {
		use_colors = true
	}

	print_impl(args, (str) => process.stderr.write(str), use_colors)
}

export {
	default as stripStyles
} from "./stripStyles.mjs"
