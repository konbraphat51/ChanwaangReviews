//https://sbfl.net/blog/2017/06/01/javascript-reproducible-random/
class SeededRandom {
	constructor(seed) {
		this.x = 123456789
		this.y = 362436069
		this.z = 521288629
		this.w = seed
	}

	// XorShift
	Get(maxExclusive) {
		let t

		t = this.x ^ (this.x << 11)
		this.x = this.y
		this.y = this.z
		this.z = this.w
		this.w = this.w ^ (this.w >>> 19) ^ (t ^ (t >>> 8))

		return Math.abs(this.w) % maxExclusive
	}
}
