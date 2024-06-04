//https://dl.acm.org/doi/10.1145/159544.376068
class SeededRandom {
	constructor(seed) {
		this.SetSeed(seed)
	}

	SetSeed(seed) {
		this.seed = seed
	}

	Get(maxExclusive) {
		const raw = (48271 * this.seed) % 2147483647

		this.seed += 1

		return raw % maxExclusive
	}
}
