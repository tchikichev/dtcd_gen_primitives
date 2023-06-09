#%%
import pandas as pd

df = pd.read_json('kns_prepare.json')
# df.fillna()
df.head()
# %%
df
# %%
df.to_csv("kns_prep.csv", sep=';')
# %%
