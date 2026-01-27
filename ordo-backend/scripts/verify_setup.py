#!/usr/bin/env python3
"""
Setup Verification Script

Verifies that the Ordo backend is properly configured and ready to run.
"""

import sys
import os
from pathlib import Path

# Add parent directory to path
sys.path.insert(0, str(Path(__file__).parent.parent))

def check_python_version():
    """Check Python version is 3.11+."""
    version = sys.version_info
    if version.major < 3 or (version.major == 3 and version.minor < 11):
        print("❌ Python 3.11+ required")
        return False
    print(f"✅ Python {version.major}.{version.minor}.{version.micro}")
    return True


def check_dependencies():
    """Check if required packages are installed."""
    required_packages = [
        "fastapi",
        "uvicorn",
        "langchain",
        "langgraph",
        "mistralai",
        "httpx",
        "sqlalchemy",
        "pydantic",
        "slowapi",
    ]
    
    missing = []
    for package in required_packages:
        try:
            __import__(package)
            print(f"✅ {package}")
        except ImportError:
            print(f"❌ {package} (not installed)")
            missing.append(package)
    
    return len(missing) == 0


def check_env_file():
    """Check if .env file exists."""
    env_path = Path(__file__).parent.parent / ".env"
    env_example_path = Path(__file__).parent.parent / ".env.example"
    
    if env_path.exists():
        print("✅ .env file exists")
        return True
    elif env_example_path.exists():
        print("⚠️  .env file not found (copy from .env.example)")
        return False
    else:
        print("❌ .env.example file not found")
        return False


def check_project_structure():
    """Check if project structure is correct."""
    base_path = Path(__file__).parent.parent
    
    required_dirs = [
        "ordo_backend",
        "ordo_backend/routes",
        "ordo_backend/services",
        "ordo_backend/models",
        "ordo_backend/utils",
        "tests",
    ]
    
    required_files = [
        "main.py",
        "requirements.txt",
        "ordo_backend/__init__.py",
        "ordo_backend/config.py",
    ]
    
    all_good = True
    
    for dir_path in required_dirs:
        full_path = base_path / dir_path
        if full_path.exists():
            print(f"✅ {dir_path}/")
        else:
            print(f"❌ {dir_path}/ (missing)")
            all_good = False
    
    for file_path in required_files:
        full_path = base_path / file_path
        if full_path.exists():
            print(f"✅ {file_path}")
        else:
            print(f"❌ {file_path} (missing)")
            all_good = False
    
    return all_good


def check_config():
    """Check if configuration can be loaded."""
    try:
        from ordo_backend.config import settings
        print("✅ Configuration loaded")
        print(f"   Environment: {settings.ENVIRONMENT}")
        print(f"   Debug: {settings.DEBUG}")
        return True
    except Exception as e:
        print(f"❌ Configuration error: {e}")
        return False


def main():
    """Run all verification checks."""
    print("=" * 60)
    print("Ordo Backend Setup Verification")
    print("=" * 60)
    print()
    
    checks = [
        ("Python Version", check_python_version),
        ("Dependencies", check_dependencies),
        ("Environment File", check_env_file),
        ("Project Structure", check_project_structure),
        ("Configuration", check_config),
    ]
    
    results = []
    for name, check_func in checks:
        print(f"\n{name}:")
        print("-" * 40)
        result = check_func()
        results.append(result)
    
    print("\n" + "=" * 60)
    if all(results):
        print("✅ All checks passed! Backend is ready to run.")
        print("\nTo start the server:")
        print("  python main.py")
        print("\nOr with uvicorn:")
        print("  uvicorn main:app --reload")
        return 0
    else:
        print("❌ Some checks failed. Please fix the issues above.")
        return 1


if __name__ == "__main__":
    sys.exit(main())
