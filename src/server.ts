import "dotenv/config";
import app from "./app";
import { AppDataSource } from "./data-source";

const PORT = process.env.PORT || 3005;

AppDataSource.initialize()
  .then(() => {
    console.log("🔥  Banco conectado");
    app.listen(PORT, () =>
      console.log(`🚀  Server rodando em http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error("❌  Falha ao inicializar DataSource", err);
  });
