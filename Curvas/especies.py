badlar = ['BNY22','BAY23','AA22','TB21','PR15','PBY22','PBA25','BDC28','BDC24','BDC22']

cer = ['TC21','TX21','TX22','T2X2','TC23','TX23','T2X3','TX24','T2X4','TC25P','TX26','TX28', 'DICP','PARP','CUAP']

dolar = ['AL29', 'AL30','AE38', 'AL35', 'AL41', 'GD29','GD30','GD35','GD41','GD46','GD38']

on1 = ['CAC2O','CSDOO', 'CP17O', 'GNCWO', 'GNCLO', 'JHCEO','LMS1O','MTCFO','PNC9O','PQCDO',
    'PTSTO','RCC9O','RPC2O','TCL5O','TTC1O','TTC4O','VSC1O','VSC2D','VSC3O','YCA6P','YPCUD']

on2 = ['IRC1O','IRC8O','IRC9O','PNDCO']

#--------------------------------------------------------------------------------------------------------------------#

badlarNombres = [["Bonos de deuda proveedores 2020 - Municipalidad de Córdoba","BAY23"],
    ["Bono en pesos BADLAR + 200bps Vto. 2021", "AA22"],
    ["Bono en pesos BADLAR + 200bps Vto. 2021", "TB21"],
    ["Bono de Consolidación - Serie 8", "PR15"],
    ["PBA25 - PCIA. BS. AS. 2025 $ 2025 BADLAR + 375pb", "PBA25"],
    ["PBY22 - PCIA. BS. AS. 2022 $ BADLAR + 383pb", "PBY22"],
    ["Bono en pesos BADLAR + 375bps Vto. 2028", "BDC28"],
    ["BDC24 - CDAD. BS. AS. 2024 $ BADLAR + 325pb", "BDC24"],
    ["BDC22 - CDAD. BS. AS. 2022 $ BADLAR + 500pb", "BDC22"],
    ["Bonos de deuda proveedores 2022 Neuquen", "BNY22"]]

cerNombres = [["Bono en pesos CER al 2% Vto. 2026",	"TX26"],["Bono en pesos CER al 2,25% Vto. 2028","TX28"],
    ["Bono Discount en pesos Vto 2033",	"DICP"],["Bono Cuasipar en pesos Vto 2045","PARP"],
    ["Bono Cuasipar en pesos Vto 2045",	"CUAP"],["BONCER 2025", "TC25P"],["Bono en pesos CER al 1,55% Vto. 2024", "T2X4"],
    ["Bono en pesos CER al 1,40% Vto. 2024", "TX24"],["Bono en pesos CER al 1,45% Vto. 2023", "T2X3"],
    ["Bono en pesos CER al 1,40% Vto. 2023", "TX23"],["BONCER 2023", "TC23"],
    ["Bono en pesos CER al 1,30% Vto. 2022", "T2X2"],["Bono en pesos CER al 1,20% Vto. 2022", "TX22"],
    ["Bono en pesos CER al 1% Vto. 2021", "TX21"],["BONCER 2021", "TC21"]]

dolarNombres = [["Bonar USD 2029 1%","AL29"],
    ["Bonar USD 2030", "AL30"],
    ["Bonar USD 2038", "AE38"],["Bonar USD 2035", "AL35"],["Bonar USD 2041", "AL41"],
    ["New USD 2029 1%", "GD29"],["New USD 2030", "GD30"],["New USD 2035", "GD35"],
    ["New USD 2038", "GD38"],["New USD 2041", "GD41"], ["New USD 2046", "GD46"]]

onNombres = [["Aluar",	"LMS1O"],["Arcor",	"RCC9O"],["Capex",	"CAC2O"],["Celulosa","CRCEO"],["CGC",	"CP17O"],
["Cresud","CSFQO"],["Cresud",	"CSJYO"],["Cresud",	"CSDOO"],["Edenor",	"ODNY9"],["Genneia","GNCLO"],["Genneia","GNCWO"],
["IRCP","RPC2O"], ["IRSA SA",	"IRC1O"],["IRSA SA",	"IRC8O"],["IRSA SA",	"IRC9O"],["Mastellone",	"MTCFO"],
["PAE",	"PNC9O"],["PAE","PNDCO"],["Pampa Energía",	"PTSTO"],["PCR",	"PQCDO"],["Tecpetrol",	"TTC1O"],
["Tecpetrol",	"TTC4O"],["Telecom",	"LCCAO"],["Telecom",	"TLC5O"],["Telecom",	"TLC1O"],["Transener",	"OTRX9"],
["Vista Oil & Gas",	"VSC1O"],["Vista Oil & Gas",	"VSC2O"],["Vista Oil & Gas",	"VSC3O"],["YPF",	"YPCUO"],
["YPF",	"YCA6O"],["YPF",	"YMCHO"],["YPF",	"YMCIO"],["YPF",	"YMCJO"],["Raghsa",	"RAC4O"],["Vista Oil & Gas","VSC2D"],["YPF","YCA6P"], ["YPF","YPCUD"],["John Deere","JHCEO"]]

#--------------------------------------------------------------------------------------------------------------------#

#lo logico sería hacerlo con las listas de arriba con un append y un upper

csvBadlar = ['aa22.csv','bay23.csv','bny22.csv', 'pba25.csv','pby22.csv', 'pr15.csv', 'bdc28.csv', 'bdc24.csv', 'bdc22.csv']

csvCer = ['t2x2.csv', 't2x3.csv','t2x4.csv','tc21.csv','tc23.csv','tc25p.csv','tx21.csv','tx22.csv','tx23.csv','tx24.csv','tx26.csv','tx28.csv','dicp.csv','parp.csv', 'cuap.csv']

csvDolar = ['al30.csv', 'al29.csv', 'al35.csv', 'al41.csv','ae38.csv','gd29.csv','gd30.csv', 'gd35.csv','gd41.csv','gd46.csv','gd38.csv']

csvOn = ['cac2o.csv', 'csdoo.csv', 'cp17o.csv','gnclo.csv','gncwo.csv', 'irc1o.csv', 'irc8o.csv', 'irc9o.csv','jhceo.csv','lms1o.csv','mtcfo.csv','pnc9o.csv','pndco.csv','pqcdo.csv','ptsto.csv', 'rcc9o.csv','rpc2o.csv', 'tlc5o.csv','ttc1o.csv','ttc4o.csv','vsc2d.csv','vsc1o.csv','vsc3o.csv', 'yca6p.csv', 'ypcud.csv']