import numpy as np

def main(bonds):
    final = {}  #lo que se retorna al front

    al = {"AL35": {}, "AL38": {}, "AL29": {}, "AL30": {}, "AL41": {}}
    gd = {"GD35": {}, "GD38": {}, "GD29": {}, "GD30": {}, "GD41": {}}
    gd      
    al48 = load(bonds, al, plazo="48hs")
    gd48 = load(bonds, gd, plazo="48hs")

    alSpot = load(bonds, al, plazo="spot")
    gdSpot = load(bonds, gd, plazo="spot")

    al = {}
    al["spot"] = alSpot
    al["48hs"] = al48

    gd = {}
    gd["spot"] = gdSpot
    gd["48hs"] = gd48

    al = mep(al)
    gd = mep(gd)

    al = ccl(al)
    gd = ccl(gd)

    al = difDC(al)
    gd = difDC(gd)

    al = difMC(al)
    gd = difMC(gd)
    
    final["al"] = al
    final["gd"] = gd

    return final
    

def mep(dic):
    for plazo in dic.keys():
        for bono in dic[plazo].keys():
            if dic[plazo][bono] != {}:
                divisor=dic[plazo][bono]["dolar"]
                dividendo = dic[plazo][bono]["pesos"]

                dic[plazo][bono]["mep"] = round(dividendo/divisor, 2)
        
    return dic
        

def ccl(dic):
    
    for plazo in dic.keys():
        for bono in dic[plazo].keys():
            if dic[plazo][bono] != {}:
                divisor=dic[plazo][bono]["cable"]
                dividendo = dic[plazo][bono]["pesos"]
                dic[plazo][bono]["ccl"] = round(dividendo/divisor, 2)
          
    return dic

def difDC(dic):
    for plazo in dic.keys():
        for bono in dic[plazo].keys():
            if dic[plazo][bono] != {}:
                divisor=dic[plazo][bono]["cable"]
                dividendo = dic[plazo][bono]["dolar"]
                dic[plazo][bono]["DOLAR/CABLE"] = round(((dividendo/divisor)-1)*100, 2)
          
    return dic

def difMC(dic):
    for plazo in dic.keys():
        for bono in dic[plazo].keys():
            if dic[plazo][bono] != {}:
                divisor=dic[plazo][bono]["ccl"]
                dividendo = dic[plazo][bono]["mep"]
                dic[plazo][bono]["MEP/CCL"] = round(((dividendo/divisor)-1)*100, 2)
          
    return dic

def load(bonds, lista, plazo):
    
    try:
        
        for bond in lista.keys():
            
            try:
                locP = bonds.loc[(bond.upper(),plazo),'last']
                locD = bonds.loc[(bond+"D".upper(),plazo),'last']
                locC = bonds.loc[(bond+"C".upper(),plazo),'last']
            except:
                pass
            try: 
                locPrevP = bonds.loc[(bond.upper(),plazo),'previous_close']
                locPrevD = bonds.loc[(bond+"D".upper(),plazo),'previous_close']
                locPrevC = bonds.loc[(bond+"C".upper(),plazo),'previous_close']
            except:
                continue
            #======================================================

            if np.isnan(locP) == False:
                lista[bond]["pesos"] = float(locP)
            elif np.isnan(locPrevP) == False:
                lista[bond]["pesos"] = float(locPrevP)
            #------------------------------------------------------
            if np.isnan(locD) == False:
                lista[bond]["dolar"] = float(locD)
            elif np.isnan(locPrevD) == False:
                lista[bond]["dolar"] = float(locPrevD)
            #------------------------------------------------------
            if np.isnan(locC) == False:
                lista[bond]["cable"] = float(locC)
            elif np.isnan(locPrevC) == False:
                lista[bond]["cable"] = float(locPrevC)

    except Exception as e:
        print("ERROR LOADING MEPCCL: ", e)
    return lista