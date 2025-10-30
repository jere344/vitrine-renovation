import sys
import os

# Add your project directory to the sys.path
INTERP = os.path.expanduser("~/virtualenv/campilongo_api/3.12/bin/python3")
if sys.executable != INTERP:
    os.execl(INTERP, INTERP, *sys.argv)

# Set up paths
project_home = os.path.expanduser('~/campilongo_api')
if project_home not in sys.path:
    sys.path.insert(0, project_home)

# Set Django settings module
os.environ['DJANGO_SETTINGS_MODULE'] = 'backend.settings'

# Set environment to production
os.environ.setdefault('DJANGO_ENV', 'production')

# Import Django WSGI application
try:
    from django.core.wsgi import get_wsgi_application
    application = get_wsgi_application()
except Exception as e:
    # Log the error for debugging
    import traceback
    with open(os.path.join(project_home, 'passenger_error.log'), 'w') as f:
        f.write(f"Error loading Django application:\n")
        f.write(traceback.format_exc())
    raise
