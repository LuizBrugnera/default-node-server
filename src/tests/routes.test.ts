import request from "supertest";
import app from "../app";
import path from "path";
import fs from "fs";

// ⏱️ Arquivos realmente são gravados em disco; aumente o timeout global
jest.setTimeout(15_000);

/* -------------------------------------------------------------------------- */
/*                    Prepara diretórios de upload usados no app               */
/* -------------------------------------------------------------------------- */

beforeAll(() => {
  // Os middlewares usam path.resolve("images") e path.resolve("videos")
  // Cria-os recursivamente para evitar erros ENOENT em ambiente de teste.
  ["uploads", "images", "videos"].forEach((dir) => {
    fs.mkdirSync(path.resolve(dir), { recursive: true });
  });
});

/* -------------------------------------------------------------------------- */
/*                          Mocks de Controllers                               */
/* -------------------------------------------------------------------------- */

jest.mock("../controllers/AuthController", () => {
  return jest.fn().mockImplementation(() => ({
    login: (_req: any, res: any) => res.status(200).json({ ok: "login" }),
    register: (_req: any, res: any) => res.status(201).json({ ok: "register" }),
    generateCode: (_req: any, res: any) =>
      res.status(200).json({ ok: "generate" }),
    verifyCode: (_req: any, res: any) => res.status(200).json({ ok: "verify" }),
    resetPassword: (_req: any, res: any) =>
      res.status(200).json({ ok: "reset" }),
    updatePasswordWithPassword: (_req: any, res: any) =>
      res.status(200).json({ ok: "update" }),
  }));
});

jest.mock("../controllers/UserController", () => {
  return jest.fn().mockImplementation(() => ({
    update: (_req: any, res: any) => res.sendStatus(204),
    getMe: (_req: any, res: any) => res.status(200).json({ ok: "me" }),
  }));
});

jest.mock("../controllers/FileController", () => {
  return jest.fn().mockImplementation(() => ({
    upload: (_req: any, res: any) =>
      res.status(201).json({ ok: "file-upload" }),
    download: (_req: any, res: any) => res.status(200).send("file"),
    delete: (_req: any, res: any) => res.sendStatus(204),
  }));
});

jest.mock("../controllers/PhotoController", () => {
  return jest.fn().mockImplementation(() => ({
    upload: (_req: any, res: any) =>
      res.status(201).json({ ok: "photo-upload" }),
    getOne: (_req: any, res: any) => res.status(200).send("photo"),
    delete: (_req: any, res: any) => res.sendStatus(204),
  }));
});

jest.mock("../controllers/VideoController", () => {
  return jest.fn().mockImplementation(() => ({
    upload: (_req: any, res: any) =>
      res.status(201).json({ ok: "video-upload" }),
    getOne: (_req: any, res: any) => res.status(200).send("video"),
    delete: (_req: any, res: any) => res.sendStatus(204),
  }));
});

/* -------------------------------------------------------------------------- */
/*                          Mock do AuthMiddleware                             */
/* -------------------------------------------------------------------------- */

jest.mock("../middlewares/authMiddleware", () => ({
  authMiddleware: (req: any, _res: any, next: any) => {
    req.user = { id: 1 };
    next();
  },
}));

// ⚠️ Não mockamos os middlewares de upload para testar o fluxo completo.

/* -------------------------------------------------------------------------- */
/*                                Testes                                       */
/* -------------------------------------------------------------------------- */

describe("Routes", () => {
  const assetsDir = path.join(__dirname, "assets");

  it("health check", async () => {
    const res = await request(app).get("/api/v1/health-check");
    expect(res.status).toBe(200);
  });

  it("auth routes", async () => {
    await request(app).post("/api/v1/auth/login").send({}).expect(200);
    await request(app).post("/api/v1/auth/register").send({}).expect(201);
    await request(app).post("/api/v1/auth/generate-code").send({}).expect(200);
    await request(app).post("/api/v1/auth/verify-code").send({}).expect(200);
    await request(app).post("/api/v1/auth/reset-password").send({}).expect(200);
    await request(app)
      .post("/api/v1/auth/update-password")
      .send({})
      .expect(200);
  });

  it("user routes", async () => {
    await request(app).put("/api/v1/users/update").send({}).expect(204);
    await request(app).get("/api/v1/users/me").expect(200);
  });

  it("file routes", async () => {
    await request(app)
      .post("/api/v1/files/upload")
      .attach("file", path.join(assetsDir, "document.pdf"))
      .expect(201);

    await request(app).get("/api/v1/files/1/download").expect(200);
    await request(app).delete("/api/v1/files/1").expect(204);
  });

  it("photo routes", async () => {
    await request(app)
      .post("/api/v1/photos/upload")
      .attach("photo", path.join(assetsDir, "photo.jpg"))
      .expect(201);

    await request(app).get("/api/v1/photos/1").expect(200);
    await request(app).delete("/api/v1/photos/1").expect(204);
  });

  it("video routes", async () => {
    await request(app)
      .post("/api/v1/videos/upload")
      .attach("video", path.join(assetsDir, "video.mp4"))
      .expect(201);

    await request(app).get("/api/v1/videos/1").expect(200);
    await request(app).delete("/api/v1/videos/1").expect(204);
  });
});
