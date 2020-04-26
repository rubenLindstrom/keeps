module.exports = {
	transform: {
		"^.+\\.tsx?$": "ts-jest"
	},
	// verbose: true,
	testMatch: ["**/*.test.ts?(x)"],
	modulePaths: ["<rootDir>"]
	// moduleDirectories: ["node_modules", "src"]
};
