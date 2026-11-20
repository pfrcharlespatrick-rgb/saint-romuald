#!/usr/bin/env python3
# usage: python3 outils/tremblay/verser-fiches.py fiches.json   — fiches: list; each may have "imgs": [[fichier, driveid, legende?],...]
import json, sys, re
import os
R=os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','..')+os.sep
SRC="Greffe du notaire Elzéar-Hubert Tremblay (1873-1900), Saint-Romuald — microfilm"
fic=json.load(open(sys.argv[1]))
m=json.load(open(R+'documents/manifeste.json'))
D={d['id']:i for i,d in enumerate(m['documents'])}
drive=json.load(open(R+'documents/tropy/images-drive.json'))
key=[k for k,v in drive.items() if isinstance(v,dict)]
tab=drive[key[0]] if key else drive
for f in fic:
    imgs=f.pop('imgs',None)
    if imgs:
        n=len(imgs); out=[]
        for i,x in enumerate(imgs):
            out.append({"fichier":x[0],"microfilm":f"{int(x[0])+944:06d}","drive":x[1],"legende":x[2] if len(x)>2 else f"{i+1}/{n}"})
            tab[x[0]]=x[1]
        f['images']=out
    f.setdefault('type','notarie'); f.setdefault('source',SRC); f.setdefault('affirmations',[]); f.setdefault('ajoute_le','2026-11-19')
    if not any(p['role']=='notaire' for p in f['personnes']): f['personnes'].append({"role":"notaire","nom":"Elzéar-Hubert Tremblay"})
    order=['id','type','titre','date','source','cote','nature','transcription','personnes','affirmations','note','ajoute_le','images']
    f={k:f[k] for k in order if k in f} | {k:v for k,v in f.items() if k not in order}
    if f['id'] in D:
        if not f.pop('replace',False): sys.exit('existe déjà: '+f['id'])
        m['documents'][D[f['id']]]=f
    else:
        f.pop('replace',None); m['documents'].append(f)
    print('ok',f['id'])
s=json.dumps(m,ensure_ascii=False,indent=2); open(R+'documents/manifeste.json','w').write(s)
tab2=dict(sorted(tab.items()))
if key: drive[key[0]]=tab2
else: drive=tab2
open(R+'documents/tropy/images-drive.json','w').write(json.dumps(drive,ensure_ascii=False,indent=1)+'\n')
print(sum(1 for d in m['documents'] if d['id'].startswith('notarie-')),'fiches notarie')
