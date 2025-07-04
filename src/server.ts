import "dotenv/config";
import app from "./app";
import { AppDataSource } from "./data-source";
import { createServer } from "http";
import { WebSocketService } from "./services/WebSocketService";
import { BackupService } from "./services/BackupService";

const PORT = process.env.PORT || 3005;

const server = createServer(app);

AppDataSource.initialize()
  .then(() => {
    console.log("🔥  Banco conectado");
    
    // Initialize WebSocket
    new WebSocketService(server);
    console.log("🔌  WebSocket inicializado");
    
    // Initialize auto backup
    const backupService = new BackupService();
    backupService.scheduleAutoBackup();
    console.log("💾  Backup automático configurado");
    
    server.listen(PORT, () =>
      console.log(`🚀  Server rodando em http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error("❌  Falha ao inicializar DataSource", err);
  });
