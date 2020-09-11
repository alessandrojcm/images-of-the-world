from pydantic import BaseSettings, SecretStr, AnyHttpUrl


class Config(BaseSettings):
    FAUNADB_SECRET_KEY: SecretStr
    DEBUG: bool = False
    FAUNA_DB_URL: AnyHttpUrl = "http://localhost:8443"
    SELLER_MAX_COUNT: int = 3
