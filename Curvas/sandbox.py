todos=['cac2o.csv', 'csdoo.csv', 'cp17o.csv','gnclo.csv','gncwo.csv', 'irc1o.csv', 'irc8o.csv', 'irc9o.csv','jhceo.csv','lms1o.csv','mtcfo.csv','pnc9o.csv','pndco.csv','pqcdo.csv','ptsto.csv', 'rcc9o.csv','rpc2o.csv', 'tlc5o.csv','ttc1o.csv','ttc4o.csv','vsc2d.csv','vsc1o.csv','vsc3o.csv', 'yca6p.csv', 'ypcud.csv']
aux=[]

for u in todos:
    u = u.rstrip(".csv")
    u = u[:-1]
    aux.append(u)

print(aux)