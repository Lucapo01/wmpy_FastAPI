import datetime
import glob
import csv
import os
import json
from time import sleep
import numpy as np
import pandas as pd
from numpy import random
from . import especies

module_dir = os.path.dirname(__file__)

def calcularTIR(dicF, dicP):
    
    mat = []
    listaN=[]
    listaF=[]
    listaP=[]

    for i in dicF.keys():
        listaN.append(i)

    #revisar logica para el recalculo

    for nombre in listaN:

        listaF = dicF[nombre]
        listaP = dicP[nombre]

        detalles = nombres(nombre)

        try:                                                #DETALLE
            tir = TIR(listaF, listaP)                          #|
            dm = dur(listaF, listaP, tir)                      #v
            mat.append([nombre,round(tir*100,3), round(dm,3), detalles, str(listaF[0]), listaP[0]*-1])
        except Exception as e:
            print("TIR Exception: ", e, " in Badlar at ", nombre)
    
    return mat

def dur(fecha, flujo, tir):
    sum1 = sum2 = sum3 = 0.0
    f0 = fecha[0]
    t2 = 1.0 + tir
    for i in range(1,len(flujo), 1):
        dif = (fecha[i] - f0)
        aux = round(flujo[i]/(t2**(dif.days/365)),4)
        sum1 += aux
        sum2 += round(aux*dif.days/365,4)
        sum3 += 1
    
    x1 = sum2/sum1
    x2 = (sum2/sum1)/(1+(tir/2))
    return round(x2,2)

def VAN(fecha, flujo, tasa):
	sum = flujo[0] #inversion inicial, valor en negativo!
	f0= fecha[0]
	t = 1.0 + tasa
	for i in range( 1 , len(flujo), 1):
		dif = (fecha[i] - f0)#las resta me da una cierta cantidad de dias.
		sum += flujo[i]*(t**(-dif.days*0.0027397)) #0.0027397=1/365.0
	return round(sum,3)
#TIR => busco hacer VAN=0 por dicotomias
def TIR(fecha, flujo):
	tasaMin = -0.9999
	tasaMax = 0.9999
	VanAnt = 999999999.9 #VAN(fecha, flujo, tasaMin)
	k=0
	while ( abs(VanAnt) > - 0.0001 and k < 100):
		k= k + 1
		tasa = (tasaMax+tasaMin)*0.5
		VanAct =VAN(fecha, flujo, tasa)
		sign = (VanAct * VanAnt)
		if sign < 0.0:
			if VanAct > VanAnt:
				tasaMin = tasa
			else:
				tasaMax = tasa
		else:
			if VanAct < VanAnt:
				tasaMin = tasa
			else:
				tasaMax = tasa

		VanAnt = VanAct

	return (tasaMax+tasaMin)*0.5

def nombres(ticker):
    nombre = especies.badlarNombres

    for i in nombre:
        if i[1] == ticker.upper():
            return i[0]
    # print(ticker.upper())
    return "sin nombre"

def cargarCSV(todos):

    dicF = {}
    dicP = {}

    path = os.path.join(module_dir, "badlar", "*.csv")
    for f in glob.glob(path):
        nameArchivo = os.path.basename(f)
        if nameArchivo in todos:
            #print(len(f))
            with open(f) as file:

                #lee los archivos y saca el path y el .csv sin importal el largo del nombre del CSV

                path = path.strip('*.csv')
                f = f.rstrip(".csv")
                nombre = f[len(path)::]

                reader = csv.reader(file, delimiter=';')
                listaF = []
                listaP = []

                hoy = datetime.datetime.today()
                p=0

                for row in reader:

                    dia = int(row[0][8:10])
                    mes =int(row[0][5:7])
                    anio = int(row[0][:4])
                    dia = datetime.datetime(anio,mes,dia)

                    #esta serie de IFS agregan el primer ITEM a la lista, mientras que en el segundo se agregan todo los demas
                    #items que tengan fecha actualizada, explcuyendolos junto con el primer ITEM (el cual agregamos en el primer IF)

                    if p == 0:
                        listaF.append(datetime.datetime.today())
                        listaP.append("")
                        p=1

                    if dia > hoy and dia not in listaF:
                        total = float(row[4])
                        listaF.append(dia)
                        listaP.append(total)

            dicF[nombre.strip("\\")] = listaF
            dicP[nombre.strip("\\")] = listaP

    return dicF, dicP

def actualizarCambios(dicP,dicAPI):
    actualizados=[]
    for i in dicAPI.keys():
        if i in dicP.keys() and dicP[i][0] != dicAPI[i]:
            dicP[i][0] = dicAPI[i]
            actualizados.append(i)

    return dicP, actualizados

def graficar(mat):
    mat1 = sorted( mat, key=lambda mat: mat[2]) #sort by DM  
    diquiFinal = {}
    diquiFinal["titulo"] = "BADLAR"
    diquiFinal["nombre"] = "Curva Badlar"
    listaPuntos = []

    
    for i in mat1:
        d = {}
        d["dm"] = i[2]
        d["ticker"] = i[0]
        d["tir"] = i[1]
        d["detalle"] = i[3]
        d["fecactual"] = i[4][:10]
        d["pactual"] = i[5]
        listaPuntos.append(d)
    
    diquiFinal["puntos"] = listaPuntos


    listaBar = []
    listaBar.append(diquiFinal) 

    return listaBar

def iniciarTabla():
    todos= especies.csvBadlar
    aux=[]
    dicAPI={}

    module_dir = os.path.dirname(__file__)
    module_dir = os.path.join(module_dir, r"..",r"funciones",r"government_bonds.csv")

    bonds = pd.read_csv(module_dir)
    
    dicF, dicP =cargarCSV(todos)

    for u in todos:
        u = u.rstrip(".csv")
        aux.append(u)
    
    todos=aux

    for i in todos:
        try:
            loc = float(bonds.loc[(bonds["symbol"] == i.upper()) & (bonds["settlement"] == "48hs"),"last"])
        except:
            loc = np.nan
        
        try:
            locPrev = float(bonds.loc[(bonds["symbol"] == i.upper()) & (bonds["settlement"] == "48hs"),"previous_close"])

            if np.isnan(loc) == False:
                dicAPI[i] = float(loc)*-1
                #print("LAST---------------------- in", i)
            elif np.isnan(locPrev) == False:
                dicAPI[i] = float(locPrev)*-1
                #print("PREVIOUS---------------------- in", i)
            else:
                todos.remove(i)
        except Exception as e:
            print("Error descargando ", i, " en Badlar desde la API: ", e)
            todos.remove(i)
    
    for i in dicAPI.keys():
        if i in dicP.keys():
            dicP[i][0] = dicAPI[i]

    try:
        mat = calcularTIR(dicF, dicP)
        graficoInicial = graficar(mat)
    except:
        print("PROBLEMAS EN TIR O GRAFICAR")

    # print("MAT INICIAL ",mat)

    print("Badlar Actualizado")

    return graficoInicial


# def main(dicP, dicF):   #toma de entrada las listas, las actualiza con los valores nuevos y la retorna junto con la tabla actualizada

    #print("API inicial-----------", dicAPI)
    # for i in mat:
    #     print("Datos iniciales TIR----------------------",i[0],i[1])

    #de aca para abajo trendría que ser asyncIO
    #dicAPI = randNum()

    #print("API final-----------", dicAPI)

    dicP, actualizados = actualizarCambios(dicP, dicAPI)
   
    actualizadosP={}
    actualizadosF={}

    for i in actualizados:
        auxP = dicP[i]
        auxF = dicF[i]

        actualizadosP[i] = auxP
        actualizadosF[i] = auxF

        mat = calcularTIR(actualizadosF, actualizadosP)

    # print("ActualizadosP-------------", actualizadosP)
    # print("\n")

    graficoFinal = graficar(mat)
    
    return graficoFinal, dicF, dicP