# !ChatGPT - security.py
# Basic rate limiting to prevent spam

from collections import defaultdict
import time

rate_limit = defaultdict(list)

def check_rate(user_id, limit=20, window=5):
    now = time.time()
    rate_limit[user_id] = [
        t for t in rate_limit[user_id]
        if now - t < window
    ]

    if len(rate_limit[user_id]) >= limit:
        return False

    rate_limit[user_id].append(now)
    return True