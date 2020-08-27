from pydantic import BaseConfig, SecretStr


class Config(BaseConfig):
    FAUNADB_SECRET_KEY: SecretStr
    DEBUG: bool = False
