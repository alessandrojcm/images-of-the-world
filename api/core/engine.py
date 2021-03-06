from faunadb.client import FaunaClient

_session = None


def session():
    """
    Helper function to get faunadb session, if there is one already it just returns
    """
    from .config import config

    global _session
    if _session is None and config.DEBUG:
        # We only need the Fauna Host if we are running from other server that's not the faunadb.com official server
        _session = FaunaClient(
            secret=config.FAUNADB_SECRET_KEY.get_secret_value(),
            domain=config.FAUNA_DB_URL.host,
            port=config.FAUNA_DB_URL.port,
            scheme=config.FAUNA_DB_URL.scheme,
        )
    elif _session is None:
        _session = FaunaClient(secret=config.FAUNADB_SECRET_KEY.get_secret_value())
    return _session
