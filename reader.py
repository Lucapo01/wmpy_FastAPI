import pandas as pd
import os

modul_dir = os.path.dirname(__file__)
modul_dir = os.path.join(modul_dir,r"funciones",r"government_bonds.csv")

bonds = pd.read_csv(modul_dir)

# bonds.set_index("symbol",inplace=True)
# aux = bonds.loc["AA22",["settlement","last"]]
# aux.set_index("settlement",inplace=True)
# aux = aux.loc["48hs","last"]


#bonds.set_index("symbol",inplace=True)
aux = float(bonds.loc[(bonds["symbol"] == "AA22") & (bonds["settlement"] == "48hs"),"last"])



print(bonds)
print(aux)
print(type(aux))


