module.exports ={
    entry: './src/app/index.jsx',
    output: {
        path: __dirname + "/src/public",
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                use:'babel-loader',
                test: /\.(js|jsx)$/,
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|jpg|jpeg)$/,
                use: [
                {
                    loader: 'url-loader',
                    options: {
                      limit: 8192, // Convierte las imágenes en base64 si son más pequeñas que 8KB
                      name: 'images/[name].[ext]', // Ruta de salida y nombre del archivo
                    },
                },
                ],
            }
        ]
    }
}