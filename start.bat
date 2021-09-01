@echo off
call funciones/api_curva_online.py
uvicorn main:app