from pydantic import BaseConfig, SecretStr, AnyHttpUrl


class Config(BaseConfig):
    FAUNADB_SECRET_KEY: SecretStr
    DEBUG: bool = False
    FAUNA_DB_URL: AnyHttpUrl = "http://localhost:8443"
