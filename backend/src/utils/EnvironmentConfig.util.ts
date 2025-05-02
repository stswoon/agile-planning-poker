import dotenv from "dotenv";

dotenv.config();

interface EnvironmentConfigUtil {
    port: number;
    nodeEnv: string;
}

const envConfig: EnvironmentConfigUtil = {
    port: Number(process.env.PORT) || 3000,
    nodeEnv: process.env.NODE_ENV || "development",
};

export { envConfig };
