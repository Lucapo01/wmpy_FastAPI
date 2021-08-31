import datetime
import glob
import os
import csv
import json
from . import especies

module_dir = os.path.dirname(__file__)
#file_path = os.path.join(module_dir, 'config')

def nombres(ticker):
    nombre = especies.dolarNombres
    for i in nombre:
        if i[1] == ticker.upper():
            return i[0]
    # print(ticker.upper())
    return "sin nombre"

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
	tasaMin = 0.0001
	tasaMax = 0.9999
	VanAnt = 999999999.9 #VAN(fecha, flujo, tasaMin)
	k=0
	while ( abs(VanAnt) > 0.0001 and k < 100):
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

def main():
    todos= especies.csvDolar

    mat = []
    # print(module_dir)
    path = os.path.join(module_dir, "a*.csv")
    for f in glob.glob(path):
        # print(f[-8:])
        if f[-8:] in todos:
            tik = f[-8:]
            with open(f) as file:

                #lee los archivos y saca el path y el .csv sin importal el largo del nombre del CSV

                path = path.strip('a*.csv')
                f = f.rstrip(".csv")
                nombre = f[len(path)::]

                detalle = nombres(nombre)

                # print("MINE DOLAR: "+nombre)


                # nombre = ""
                # if len(tik) == 8:
                #     nombre = tik[0:4]
                #     detalle = nombres(nombre)
                # else:
                #     nombre = tik[0:5]
                #     detalle = nombres(nombre)

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
                    total = float(row[4])

                    #esta serie de IFS agregan el primer ITEM a la lista, mientras que en el segundo se agregan todo los demas
                    #items que tengan fecha actualizada, explcuyendolos junto con el primer ITEM (el cual agregamos en el primer IF)

                    if p == 0:
                        total = float(row[4])
                        listaF.append(dia)
                        listaP.append(total)
                        p=1

                    if dia > hoy and dia not in listaF:
                        total = float(row[4])
                        listaF.append(dia)
                        listaP.append(total)
                        
                try:
                    tir = TIR(listaF, listaP)
                    dm = dur(listaF, listaP, tir)
                    mat.append([nombre,round(tir*100,3), round(dm,3), detalle, str(listaF[0]), listaP[0]*-1])
                except Exception as e:
                    print("Exception: ", e, " in Dolar at ", nombre)
      
    #print(mat[0], mat[1], mat[2])
    mat1 = sorted( mat, key=lambda mat: mat[2]) #sort by DM  

    jsond = {}
    jsond["titulo"] = "DOLAR"
    jsond["nombre"] = "Curva Ley Nacional"
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
    
    jsond["puntos"] = listaPuntos

    listaBar = []
    listaBar.append(jsond)

    mat = []
    path = os.path.join(module_dir, "g*.csv")
    for f in glob.glob(path):
        tik = f[-8:]
        if f[-8:] in todos:
            with open(f) as file:
                
                path = path.strip('g*.csv')
                f = f.rstrip(".csv")
                nombre = f[len(path)::]

                detalle = nombres(nombre)
                
                # nombre = ""
                # if len(tik) == 8:
                #     nombre = tik[0:4]
                #     detalle = nombres(nombre)
                # else:
                #     detalle = nombres(nombre)
                #     nombre = tik[0:5]
                
                reader = csv.reader(file, delimiter=';')
                listaF = []
                listaP = []
                for row in reader:
                    dia = int(row[0][8:10])
                    mes =int(row[0][5:7])
                    anio = int(row[0][:4])
                    dia = datetime.datetime(anio,mes,dia)
                    total = float(row[4])
                    listaF.append(dia)
                    listaP.append(total)
                tir = TIR(listaF, listaP)
                dm = dur(listaF, listaP, tir)
                mat.append([nombre,round(tir*100,3), round(dm,3),detalle, str(listaF[0]), listaP[0]*-1])
    
    jsondE = {}
    jsondE["titulo"] = "DOLAR"
    jsondE["nombre"] = "Curva Ley Extranjera"
    listaPuntos = []

    mat1 = sorted( mat, key=lambda mat: mat[2]) #sort by DM  
    
    for i in mat1:
        d = {}
        d["dm"] = i[2]
        d["ticker"] = i[0]
        d["tir"] = i[1]
        d["detalle"] = i[3]
        d["fecactual"] = i[4][:10]
        d["pactual"] = i[5]
        listaPuntos.append(d)
    
    jsondE["puntos"] = listaPuntos

    listaBar.append(jsondE)

    return listaBar 
    