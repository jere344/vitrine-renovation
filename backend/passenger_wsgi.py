import sys
import os

# Add your project directory to the sys.path
INTERP = os.path.expanduser("~/virtualenv/campilongo_api/3.12/bin/python3")
if sys.executable != INTERP:
    os.execl(INTERP, INTERP, *sys.argv)

# Set up paths
sys.path.insert(0, os.path.expanduser('~/campilongo_api'))
sys.path.insert(0, os.path.expanduser('~/campilongo_api/backend'))

# Set Django settings module
os.environ['DJANGO_SETTINGS_MODULE'] = 'backend.settings'

# Import Django WSGI application
from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()
