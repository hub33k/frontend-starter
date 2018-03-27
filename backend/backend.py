#!/usr/bin/env python3

print('backend')

try:
    from notes.notes import *
except ImportError:
    pass
