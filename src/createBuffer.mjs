export default function createBuffer(input) {
	let instance = {
		position: 0,

		peek(n_bytes) {
			return input.slice(
				instance.position ,
				instance.position + n_bytes
			)
		},

		pop(n_bytes) {
			let tmp = instance.peek(n_bytes)

			instance.position += n_bytes

			return tmp
		},

		end() {
			return instance.position >= input.length
		}
	}

	return instance
}
