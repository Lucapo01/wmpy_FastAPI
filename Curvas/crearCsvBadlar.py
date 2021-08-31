import pandas as pd
import datetime
import csv
import json
import os
from . import especies
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
    #path = module_dir
    #print(path)
    path = os.path.join(module_dir, 'Bonos ARS.xlsx')
    h = especies.badlar
    #h = ['AL29']
    xls = pd.ExcelFile(path)    
    #print(xls.sheet_names)
    for hoja in xls.sheet_names:
        if hoja in h:
            pr = pd.read_excel(path, sheet_name=hoja, header= None)
            indice = getFecha(pr)
            #print(indice)
            f = indice+ 1
            listaAux = []
            fin = str((pr[4][f]))
            while fin != "nan" and len(fin) > 8:
                listaAux.append([pr[4][f], round(pr[5][f],2),round(pr[7][f],2),round(pr[8][f],2), round(float(pr[9][f]),2)])
                f = f + 1
                fin = str((pr[4][f]))
            name = hoja.lower() + '.csv'
            p = os.path.join(module_dir, "badlar", name)
            #with open(path + hoja.lower() + '.csv', 'w', newline='') as file:
            with open(p, 'w', newline='') as file:
                writer = csv.writer(file, delimiter=';')
                writer.writerows(listaAux)
                #print('----')
    print("badlar")
    return "Se crearon los archivos BADLAR"