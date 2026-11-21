#!/usr/bin/env python3
# cens.py NOM [PRENOM_REGEX] : cherche dans les 6 recensements et le manifeste
import re,sys,json,glob
import os
R=os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','..')+os.sep
nom=sys.argv[1]; pre=sys.argv[2] if len(sys.argv)>2 else '.*'
for f in sorted(glob.glob(R+'data/recensement-18*-data.js')):
    s=open(f).read()
    for mm in re.finditer(r'\{"id":"([^"]+)","nom":"([^"]*)","prenom":"([^"]*)","sexe":"([^"]*)","age":"([^"]*)"(.{0,400}?)\}',s):
        i,n,p,sx,a,rest=mm.groups()
        if re.fullmatch(nom,n,re.I) and re.search(pre,p,re.I):
            prof=re.search(r'"profession":"([^"]*)"',rest); em=re.search(r'"etat_matrimonial":"([^"]*)"',rest)
            print(i,n,p,sx,a,em.group(1) if em else '',prof.group(1) if prof else '')
m=json.load(open(R+'documents/manifeste.json'))
seen=set()
for d in m['documents']:
    for q in d.get('personnes',[]):
        if re.search(nom,q['nom'],re.I) and re.search(pre,q['nom'],re.I):
            k=(q['nom'],q.get('ref_personne'))
            if k in seen: continue
            seen.add(k); print('  M:',d['id'],'|',q['nom'],'|',q.get('ref_personne'),'|',q.get('note','')[:140])
