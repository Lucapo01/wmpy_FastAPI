from fastapi import FastAPI
import my_api_call
import asyncio
from Curvas import crearCsvBadlar, crearCsvCer, crearCsvHardDolar, crearCsvOn

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/contador")
async def contador():
    i=0
    while i < 20:
        await asyncio.sleep(1)
        print(i)
        i+=1
    return {"message": "Termino Contador"}


@app.get("/api")
def api():
    value = my_api_call.call()
    return {"message": value}


@app.get("/actualizar")
def actualizar():
    dic={}
    dic["Status Badlar"] = crearCsvBadlar.main()
    dic["Status Cer"] = crearCsvCer.main()
    dic["Status Dolar"] = crearCsvHardDolar.main()
    dic["Status On"] = crearCsvOn.main()
    return dic
