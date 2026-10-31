import re,sys
src=open(sys.argv[1],encoding='utf-8').read()
body,notes=src.split('=== NOTES ===')
nd={}
for line in notes.strip().splitlines():
    m=re.match(r'@([\w-]+): (.*)',line)
    if m: nd[m.group(1)]=m.group(2)
order=[];num={}
def rep(m):
    k=m.group(1)
    if k not in nd: raise SystemExit('note manquante: '+k)
    if k not in num:
        order.append(k); num[k]=len(order)
    return '^%d^'%num[k]
body=re.sub(r'\{\{([\w-]+)\}\}',rep,body)
while re.search(r'\^([\d, ]+)\^\^(\d+)\^',body):
    body=re.sub(r'\^([\d, ]+)\^\^(\d+)\^',r'^\1,\2^',body)
body=body.replace(',','\u202f,') if False else body
unused=[k for k in nd if k not in num]
if unused: print('inutilisees:',unused,file=sys.stderr)
out=body.rstrip()+'\n\n# Notes et sources\n\n'
for k in order:
    out+='%d. %s\n'%(num[k],nd[k])
open(sys.argv[2],'w',encoding='utf-8').write(out)
print(len(order),'notes')
