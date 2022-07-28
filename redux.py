import os
folder_path=input('Please give me the folder path: ')
redux=input("please give me the name of new reducer: ")
dir=folder_path+'\\'+redux
os.mkdir(dir)
with open(dir+"\\"+redux+".reducer.jsx","w") as fp:
  pass
with open(dir+"\\"+redux+".action.js","w") as fp:
  pass
with open(dir+"\\"+redux+".types.js","w") as fp:
  pass