import pandas as pd
import datetime
import csv
import json
from . import especies
import os
module_dir = os.path.dirname(__file__)

def getFecha(pr):
    fila = 0
    while fila < 16:
        col = 0
        while col < len(pr.columns):
            #print(pr[fila][col])

            if pr[col][fila] == "Fecha":
                #print(fila, col)
                return fila
            col = col + 1
        fila = fila + 1
    return "error"

def main():      
    #path = module_dir + "\\" + 'Bonos ARS.xlsx'
    #print(path)
    #path = module_dir + "\\" + 'Bonos ARS.xlsx'
    #print(path)
    path = os.path.join(module_dir, 'Bonos ARS.xlsx')
    h = especies.cer
    #h = ['TX26','TX28', 'DICP','PARP','CUAP']
    xls = pd.ExcelFile(path)    
    #print(xls.sheet_names)
    for hoja in xls.sheet_names:
        if hoja in h:
            pr = pd.read_excel(path, sheet_name=hoja, header= None)
            indice = getFecha(pr)
            #print(indice)
            f = indice + 1
            listaAux = []
            fin = str((pr[4][f]))
            col = 0
            #print(pr[5][f-1])
            if pr[5][f-1] != "VR":
                col = 1
            #print(col)
            while fin != "nan" and len(fin) > 8:
                fecha = 4
                vr = 5 + col
                int = 6 + col
                amort = 7 + col
                total =  8 + col
                listaAux.append([pr[fecha][f], round(pr[vr][f],2) , round(pr[int][f],2), round(pr[amort][f],2), round(float(pr[total][f]),2)])
                f = f + 1
                fin = str((pr[4][f]))
            name = hoja.lower() + '.csv'
            p = os.path.join(module_dir, "cer", name)
            with open(p, 'w', newline='') as file:
                writer = csv.writer(file, delimiter=';')
                writer.writerows(listaAux)
                #print('----')
    return "Se crearon los archivos CER"