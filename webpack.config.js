module.exports = {
	mode: "development",
	entry: ["@babel/polyfill", "./client/index.js"],
	output: { path: __dirname, filename: "./public/bundle.js" },
	resolve: { extensions: [".js", ".jsx"] },
	devtool: "source-map",
	watchOptions: { ignored: /node_modules/ },
	module: {
		rules: [
			{ test: /\.jsx?$/, exclude: /node_modules/, loader: "babel-loader" },
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"],
			},
		],
	},
};
