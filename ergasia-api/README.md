ΔΗΜΟΠΡΑΣΙΕΣ CORE API

Structure
.
├── ΔΗΜΟΠΡΑΣΙΕΣ-api      # "app" is a Python package
│   ├── __init__.py      # this file makes "app" a "Python package"
│   ├── main.py          # "main" module, e.g. import app.main
│   └── src          # "routers" is a "Python subpackage"
│   │   ├── __init__.py  # makes "routers" a "Python subpackage"
│   │   ├── dependencies.py  # "dependencies" module, e.g. import app.dependencies
│   │   └── user     # "users" router
│   │   |   ├── items.py     # "items" submodule, e.g. import app.routers.items


uvicorn --port 5000 --host 0.0.0.0 main:app --reload