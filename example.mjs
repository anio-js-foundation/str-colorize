import {c, print, stripStyles} from "./src/index.mjs"

print(c.green("This is a green text\n"))
print(c.red("This is a green text\n"))
print(c.gray("This is gray text\n"))

print(
	c.green(
		`This is green text with ${c.yellow(`yellow in between`)}\n`
	)
)

print(
	c.green(
		`This is green text with ${c.yellow(`yellow and ${c.bold("bold")} in between`)}\n`
	)
)

const styled = c.green(
	`This is green text with ${c.yellow(`yellow and ${c.bold("bold")} in between`)}\n`
)

print(stripStyles(styled))
