import os

from dotenv import load_dotenv


load_dotenv()


# Gemini API Key
GEMINI_API_KEY = os.getenv(
    "GEMINI_API_KEY",
    ""
).strip()


# Gemini model
GEMINI_MODEL = os.getenv(
    "GEMINI_MODEL",
    "gemini-3.8-flash"
).strip()


# Optional local explanation model
USE_LOCAL_EXPLANATION = os.getenv(
    "USE_LOCAL_EXPLANATION",
    "false"
).lower() == "true"


LOCAL_EXPLANATION_MODEL = os.getenv(
    "LOCAL_EXPLANATION_MODEL",
    "MBZUAI/LaMini-Flan-T5-783M"
).strip()