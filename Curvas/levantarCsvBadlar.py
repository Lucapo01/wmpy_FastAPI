
import datetime
import glob
import csv
import json
from . import especies
import os
module_dir = os.path.dirname(__file__)

def nombres(ticker):
    nombre = especies.badlarNombres
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

def main():

    #todos= [module_dir + "\\" + 'aa22.csv', module_dir + "\\" + 'bay23.csv', module_dir + "\\" + 'bny22.csv', module_dir + "\\" + 'pba25.csv',module_dir + "\\" + 'pby22.csv',module_dir + "\\" + 'pr15.csv',module_dir + "\\" + 'tb21.csv', module_dir + "\\" + 'bdc28.csv', module_dir + "\\" + 'bdc24.csv', module_dir + "\\" + 'bdc22.csv' ]
    todos= especies.csvBadlar
    
    tires = []
    dures = []
    listaCurva = []
    mat = []
    path = os.path.join(module_dir, "*.csv")
    for f in glob.glob(path):
        nameArchivo = os.path.basename(f)
        if nameArchivo in todos:
            #print(len(f))
            with open(f) as file:

                #lee los archivos y saca el path y el .csv sin importal el largo del nombre del CSV

                path = path.strip('*.csv')
                f = f.rstrip(".csv")
                nombre = f[len(path)::]

                detalle = nombres(nombre)

                # nombre = ""
                # if len(nameArchivo) == 8:
                #     nombre = f[-8:-4]
                #     detalle = nombres(nombre)
                # else:
                #     nombre = f[-9:-4]
                #     detalle = nombres(nombre)

                # print("MINE BADLAR: "+nombre)

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
                    print("Exception: ", e, " in Badlar at ", nombre)
    #print(listaCurva)
    
 
    #print(mat[0], mat[1], mat[2])
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

    