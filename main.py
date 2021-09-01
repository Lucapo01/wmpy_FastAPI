from fastapi import FastAPI, Request, WebSocket
import asyncio
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
import subprocess

from time import sleep

from Curvas import crearCsvBadlar, crearCsvCer, crearCsvHardDolar, crearCsvOn
from Curvas import onlineBadlar, onlineCer, onlineDolar, onlineOn
#from funciones import api_curva_online as api_curva

app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    while True:
        data = await websocket.receive_text()
        await websocket.send_text(f"Message text was: {data}")


@app.get("/", response_class=HTMLResponse)
def root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})


@app.get("/panel", response_class=HTMLResponse)
def root(request: Request):
    return templates.TemplateResponse("panel.html", {"request": request})


@app.get("/contador")
async def contador():
    i=0
    while i < 30:
        await asyncio.sleep(1)
        print(i)
        i+=1
    return {"message": "Termino Contador"}
    

@app.get("/pyhomebroker")
def api_curvas():
    while True:
        print("ACTIALIZA CURVA EN MAIN")
        #api_curva.main()
        sleep(5)


@app.post("/getDatosCurvas")
def curvas():
    gov, corp = []#api_curva.main()
    dic={}
    lista=[]
    lista.append(onlineBadlar.iniciarTabla(gov))
    lista.append(onlineCer.iniciarTabla(gov))
    lista.append(onlineDolar.iniciarTabla(gov))
    lista.append(onlineOn.iniciarTabla(corp))
    dic["Graficos"] = lista
    return dic


@app.get("/actualizar")
def actualizar():
    dic={}
    dic["Status Badlar"] = crearCsvBadlar.main()
    dic["Status Cer"] = crearCsvCer.main()
    dic["Status Dolar"] = crearCsvHardDolar.main()
    dic["Status On"] = crearCsvOn.main()
    return dic


# EJEMPLO DE TEMPLATES Y STATICS

# @app.get("/test/{id}", response_class=HTMLResponse)
# async def test(request: Request, id: str):
#     return templates.TemplateResponse("test.html", {"request": request, "id": id})