const AhoCorasick = (function () {
	"use strict"

	class ACNode {
		constructor(out, i) {
			this.go = {}
			this.fail = null
			this.out = out
			this.index = i
		}
		findall(s) {
			let i
			let c
			let q = this
			const e = s.length
			const out = []
			function mapout(o) {
				const len = o.len, start = i - len + 1
				return {
					start,
					len,
					key: s.substr(start, len),
					value: o.value
				}
			}
			for (i = 0; i < e; i++) {
				c = s[i]
				while (!q.go.hasOwnProperty(c) && q !== this)
					q = q.fail
				q = q.go[c] || this;
				[].push.apply(out, q.out.map(mapout))
			}
			return out
		}
	}

	BuildACTable = keys => {
		let r
		let idx = 0
		const root = new ACNode([], 0)

		root.fail = root

		// Phase 1: build a trie
		keys.forEach(key => {
			let i
			let c
			let str
			let val

			if (typeof key === `object`) {
				str = key.key
				val = key.value
			} else
				str = key + ``

			const q = root
			const e = str.length

			for (i = 0; i < e; i++) {
				c = str[i]
				if (!q.go.hasOwnProperty(c))
					q.go[c] = new ACNode([], ++idx)

				q = q.go[c]
			}

			q.out.push({ len: e, value: val })
		})

		// Phase 2: add failure links

		// Set failure links for depth-1 states to root
		const queue = Object.keys(root.go).map((c) => {
			return root.go[c]
		})

		queue.forEach((r) => {
			r.fail = root
		})

		// Compute states of depth d+1 from states of depth d

		updateQueue = a => {
			let state
			const s = r.go[a]
			queue.push(s)
			state = r.fail
			while (!state.go.hasOwnProperty(a) && state !== root)
				state = state.fail

			s.fail = state.go[a] || root;
			[].push.apply(s.out, s.fail.out)
		}

		while (queue.length > 0) {
			r = queue.shift()
			Object.keys(r.go).forEach(updateQueue)
		}

		return root
	}

	return {
		buildTable: BuildACTable
	}
}())

export default AhoCorasick
