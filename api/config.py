import os

from .models import Config

config: Config = None

if os.getenv('DEBUG', False):
    config = Config(_env_file='.env')
else:
    config = Config()
