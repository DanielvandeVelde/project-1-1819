# oba trophy

## Summary

This tool allows people to make their own 3D model of a trophy with their name, a booktitle and the current date on it.  
The idea was to reward children for finishing a book while simultaneously introducing them to 3D printing.  

## Table of Contents

1. [Demo](#1-Demo)
2. [Install](#2-Install)
3. [Features](#3-Features)
4. [API](#4-API)
5. [TODO](#5-TODO)  

[Sources](#Sources)

## 1. Demo

The demo can be found [here at this link.](https://danielvandevelde.github.io/project-1-1819/)  
Please use Google Chrome to view it.

## 2. Install

There are no dependencies, everything is covered by the files in this project.   
You can download this and run it on a server yourself using your method of choice.   
I recommend forking this repository and using bash to git clone it to your machine.

## 3. Features

- ISBN and title look-up from the oba API
- In browser 3D model creation
- In browser 3D model (.stl) exporter
- 3D Print-ready!

## 4. API

The [Openbare Bibliotheek van Amsterdam or Amsterdam Public LIbrary (oba)](https://www.oba.nl/oba/english.html) has it's own API in which you can search for different books, magazines, CDs, audiobooks etc.  
I use this API to turn the entered ISBN/Barcodes/values in the 'boek' inputfield into a search for the right booktitle.

## 5. TODO

- [x] Intro/Home screen
- [x] Test with 3D cube
- [x] Coloring and putting text on the cube
- [x] Getting said text from the API
- [x] Add a little loading-screen
- [x] Make it fun to wait
- [x] Replace cube with a trophy (add colors etc. as well)
- [x] Make exporting possible in a ready-to-print format (.stl)
- [x] Fix the printing proportions (probably a .obj error)
- [x] Extruding text so it's print-ready even without texture.
- [ ] ISBN/Barcode search is broken due to a .map function in the OBA-Wrapper
- [ ] Test the printing process, there are probably some ~~minor~~ major flaws.
- [ ] Speed up the process by creating objects and importing them instead of letter the browser create them

## Sources
[OBA-API](https://zoeken.oba.nl/?uilang=en)   
[OBA-Wrapper](https://github.com/maanlamp/OBA-wrapper)   
[THREE.js](https://github.com/mrdoob/three.js/)   
[Trophy Cup 5 - Updated 8.4.2014](https://www.thingiverse.com/thing:245340)
