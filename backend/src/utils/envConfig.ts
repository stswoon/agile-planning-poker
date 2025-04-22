import dotenv from "dotenv";

dotenv.config();

interface EnvConfig {
    port: number;
    nodeEnv: string;
}

const envConfig: EnvConfig = {
    port: Number(process.env.PORT) || 3000,
    nodeEnv: process.env.NODE_ENV || "development",
};

export { envConfig };
