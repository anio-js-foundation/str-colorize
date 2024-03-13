# @anio-js-foundation/str-colorize

Colorize a string.

```js
import {c, print} from "@anio-js-foundation/str-colorize"

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
```
