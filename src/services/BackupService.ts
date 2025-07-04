import { exec } from "child_process";
import { promisify } from "util";
import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import { join } from "path";
import { AppDataSource } from "../data-source";

const execAsync = promisify(exec);

export class BackupService {
  private backupDir = join(process.cwd(), "backups");

  constructor() {
    this.ensureBackupDir();
  }

  private async ensureBackupDir() {
    if (!existsSync(this.backupDir)) {
      await mkdir(this.backupDir, { recursive: true });
    }
  }

  async createDatabaseBackup(): Promise<string> {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const filename = `backup_${timestamp}.sql`;
    const filepath = join(this.backupDir, filename);

    const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE } = process.env;

    try {
      const command = `mysqldump -h ${DB_HOST} -P ${DB_PORT} -u ${DB_USERNAME} -p${DB_PASSWORD} ${DB_DATABASE}`;
      const { stdout } = await execAsync(command);
      
      await writeFile(filepath, stdout);
      console.log(`Database backup created: ${filename}`);
      
      return filepath;
    } catch (error) {
      console.error("Backup failed:", error);
      throw new Error("Database backup failed");
    }
  }

  async exportUserData(userId: string): Promise<any> {
    const userRepo = AppDataSource.getRepository("User");
    const fileRepo = AppDataSource.getRepository("File");
    const ticketRepo = AppDataSource.getRepository("SupportTicket");
    const notificationRepo = AppDataSource.getRepository("Notification");

    const userData = await userRepo.findOne({
      where: { id: userId },
      relations: ["role"]
    });

    const userFiles = await fileRepo.find({
      where: { userId }
    });

    const userTickets = await ticketRepo.find({
      where: { userId },
      relations: ["messages"]
    });

    const userNotifications = await notificationRepo.find({
      where: { userId }
    });

    return {
      user: userData,
      files: userFiles,
      tickets: userTickets,
      notifications: userNotifications,
      exportedAt: new Date().toISOString()
    };
  }

  async exportAllData(): Promise<string> {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const filename = `data_export_${timestamp}.json`;
    const filepath = join(this.backupDir, filename);

    try {
      const entities = AppDataSource.entityMetadatas;
      const exportData: any = {};

      for (const entity of entities) {
        const repository = AppDataSource.getRepository(entity.name);
        const data = await repository.find();
        exportData[entity.tableName] = data;
      }

      exportData.exportedAt = new Date().toISOString();
      
      await writeFile(filepath, JSON.stringify(exportData, null, 2));
      console.log(`Data export created: ${filename}`);
      
      return filepath;
    } catch (error) {
      console.error("Data export failed:", error);
      throw new Error("Data export failed");
    }
  }

  async scheduleAutoBackup() {
    // Run backup every 24 hours
    setInterval(async () => {
      try {
        await this.createDatabaseBackup();
        console.log("Automatic backup completed");
      } catch (error) {
        console.error("Automatic backup failed:", error);
      }
    }, 24 * 60 * 60 * 1000);
  }
}