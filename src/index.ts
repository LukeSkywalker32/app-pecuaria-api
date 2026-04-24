import app from "./app";
import { connectDataBase } from "./config/database";
import { PORT } from "./config/env";

async function bootStrap() {
	try {
		//Conectar ao banco de dados
		await connectDataBase();
		console.log("🚀 banco de dados conectado com sucesso");

		//iniciar o servidor
		app.listen(PORT, () => {
			console.log(`🚀 Server rodando na porta ${PORT}`);
			console.log(` Ambiente ${process.env.NODE_ENV}`);
		});
	} catch (error) {
		console.error(`Bootstrap error:`, error);
		process.exit(1);
	}
}

bootStrap();
