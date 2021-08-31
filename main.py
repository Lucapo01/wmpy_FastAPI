from os import truncate
from fastapi import FastAPI
import my_api_call
import asyncio
from Curvas import crearCsvBadlar, crearCsvCer, crearCsvHardDolar, crearCsvOn
from Curvas import onlineBadlar, onlineCer, onlineDolar, onlineOn
from funciones import api_curva_online as api_curva

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}
    

@app.get("/contador")
async def contador():
    i=0
    while i < 30:
        await asyncio.sleep(1)
        print(i)
        i+=1
    return {"message": "Termino Contador"}


@app.get("/api")
def api():
    value = my_api_call.call()
    return {"message": value}


@app.post("/api_curva")
async def api_curvas(request):
    while True:
        asyncio.sleep(60)
        api_curva.main()


@app.get("/curvas")
def curvas():
    gov, corp = api_curva.main()
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
