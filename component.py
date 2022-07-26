#!/usr/bin/env/ python3

import os
component_folder=input("Component Folder Path: ")
component_name=input("Component Name: ")
dir=component_folder+"\\"+component_name
os.mkdir(dir)
with open(dir+"\\"+component_name+".component.jsx","w") as fp:
  pass
with open(dir+"\\"+component_name+".styles.scss","w") as fp:
  pass
  
