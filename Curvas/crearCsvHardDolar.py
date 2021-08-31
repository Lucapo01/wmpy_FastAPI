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
        while col < 16:
            #print(pr[fila][col])
            if pr[col][fila] == "Fecha":
                #print(fila, col)
                return fila
            col = col + 1
        fila = fila + 1
    return "error"

def main():
    path = os.path.join(module_dir, 'Planilla bonos en dolares.xlsx')
    h = especies.dolar
    #h = ['AL29']
    xls = pd.ExcelFile(path)    
    #print(xls.sheet_names)
    for hoja in xls.sheet_names:
        if hoja in h:
            pr = pd.read_excel(path, sheet_name=hoja, header= None)
            indice = getFecha(pr)
            f = indice + 1
            listaAux = []
            fin = str((pr[4][f]))
            while fin != "nan" and len(fin) > 8:
                listaAux.append([pr[4][f], round(pr[5][f],2),round(pr[6][f],2),round(pr[7][f],2), round(float(pr[8][f]),2)])
                f = f + 1
                fin = str((pr[4][f]))
            name = hoja.lower() + '.csv'
            p = os.path.join(module_dir, "dolar", name)
            with open(p, 'w', newline='') as file:
                writer = csv.writer(file, delimiter=';')
                writer.writerows(listaAux)
                #print('----')
    return "Se crearon los archivos DOLAR"