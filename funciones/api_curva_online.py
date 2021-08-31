from datetime import datetime
from glob import escape
from pyhomebroker import HomeBroker
import pandas
import numpy as np
import os

def main():
        broker = '12'
        dni = '29463928'
        user = 'juankbyte'
        password = 'elosoPIPO159'
        account_id = 'pass'

        hb = HomeBroker(int(broker))
        hb.auth.login(dni=dni, user=user, password=password, raise_exception=True)

        # Get the market snapshot
        snapshot = hb.online.get_market_snapshot()

        #Save each board with its settlements to a CSV file
        #date = '{}'.format(datetime.now().strftime('%Y%m%d'))
        
        snapshot["government_bonds"].to_csv('{}'.format("funciones/government_bonds.csv"))
        snapshot["corporate_bonds"].to_csv('{}'.format("funciones/corporate_bonds.csv"))



        '''
        Snapshot Keys

        dict_keys(['bluechips', 'general_board', 'cedears', 'government_bonds',
         'short_term_government_bonds', 'corporate_bonds', 'options'])

        		        last	change	open	high	low	previous_close	turnover	volume	operations	datetime
        symbol	settlement
        AA22	spot	NaN	NaN	NaN	NaN	NaN	101.800	NaN	NaN	NaN	NaT
                24hs	101.7	8.42	101.7	101.7	101.7	93.799	101700000.0	100000000.0	2.0	2021-08-12 12:58:12
                48hs	102.2	0.39	101.8	102.2	101.8	101.800	428871.0	420342.0	22.0	2021-08-12 15:54:36
        AA25	spot	NaN	NaN	NaN	NaN	NaN	5200.000	NaN	NaN	NaN	NaT
                24hs	NaN	NaN	NaN	NaN	NaN	6200.000	NaN	NaN	NaN	NaT
        ...	...	...	...	...	...	...	...	...	...	...	...
        XL2C	24hs	NaN	NaN	NaN	NaN	NaN	NaN	NaN	NaN	NaN	NaT
                48hs	NaN	NaN	NaN	NaN	NaN	NaN	NaN	NaN	NaN	NaT
        XL2D	spot	NaN	NaN	NaN	NaN	NaN	NaN	NaN	NaN	NaN	NaT
                24hs	NaN	NaN	NaN	NaN	NaN	NaN	NaN	NaN	NaN	NaT
                48hs	NaN	NaN	NaN	NaN	NaN	NaN	NaN	NaN	NaN	NaT

        '''

        government_bonds = snapshot['government_bonds']
        corporate_bonds = snapshot['corporate_bonds']

        print("ACTUALIZANDO CURVA")

        # try:
        #         modul_dir = os.path.dirname(__file__)
        #         government_bonds.to_csv(os.path.join(modul_dir,r"government_bonds.csv"), na_rep = np.nan, index_label=None)
        #         corporate_bonds.to_csv(os.path.join(modul_dir,r"corporate_bonds.csv"), na_rep = np.nan, index_label=None)
        # except Exception as e:
        #        print("Error creating CSV: ", e)
        # finally:
        return government_bonds, corporate_bonds


#pandas.set_option('display.max_rows', None)
# government_bonds, corporate_bonds = main()
# print(government_bonds)
# print("---------------------------------------------------------------------")
# print(corporate_bonds)