
L'objectif de cette semaine est de comprendre le projet de façon globale 

Ce projet fait une seule chose: 
- lire des fichiers 
- transformer des données 
- produire des XML conformes à des XSD 
- empaqueter le tout 
# A) TransformController -> l'entrée Actuelle du projet

```java
com.scor.peopledoc.web.rest.TransformController
```
 il s'agit d'un point d'entrée API actuel 

# Méthode Clé 

```java
@GetMapping("/bulletin/{country}/{filename}")
public ResponseEntity<String> transformBulletin(...)
```
	ce que ça fait concrètement

1. reçoit : 
- un pays (FRA, CHE)
- un nom de fichier 
1. retourne : 
```java
transformService.adpToPeopleDoc(country, filename)
```
 

- OK si ça fonctionne sinon une erreur de 500 
# B) TransformService -> le cœur du moteur 
```java
com.scor.peopledoc.service.TransformService
```

	il s'agit de la classe la plus importante du projet  

``` java 
public Path adpToPeopleDoc(CountryConst country, String filename)
```

Toute la conversion se trouve dans cette endroit 

1) Vérifications

- Vérifie que le fichier existe, que les chemins sont bons et nettoie les anciens fichiers, ce qui renforce la sécurité de manière robuste 
2) Préparation des dossiers 
- crée un dossier temp 
- crée un dossier de génération 
- prépare la sortie ce qui évite les conflits de fichiers 
3) Décompression ADP 

``` java
FileUtils.unzipFile(...)
```

	le fichier ADP est un fichier zip 
	il contient des fichiers PDF et un index. XML 

4) Lecture de Index.xml
```java 
XmlUtils.unmarshalXml(...)
```

Le index.xml dit : 
quels sont les fichiers appartenant  à quels salariés avec leurs périodes et les identifiants ADP

Si le XML n'est pas conforme -> ERREUR 

5) Génération PeopleDoc 
	il génère un projet.xml, distributions.xml, un XML par salarié et remet les PDF au bon moment et endroit

6) Mapping salariés 
```
Map<String, PsEmployee> PsEmployee= bulSalService.getBulzipFiles();
```

le problème réel et que ADP et PeopleDoc ne sont pas compatible car les Identifiant ne pas les même. 

7) Création du Zip final
```
FileUtils.zipFiles(...)
```
le Zip PeopleDoc prêt à être importé 

# C) PsEmployee -> Données Salarié

```
	service.dto.PsEmployee
```
	Represente un salarié PeopleDoc: 
	- id 
	- prenom
	- nom
	- établissement 
	utlisé pour rattacher chaque bulletin au bon salariés 

# D) CountryConst ->Règles par Pays 

```
service.dto.CountryConst
```

	FRA(...)
	CHE(...)
Chaque pays a des des règles, des XSD différents, un groupCode, un nom de document 

# E) Application.yml-> Environnement 

```
spring:  
  profiles:  
    active:  
      - ${SCORAPP_ENV:DEV_FRA_WIN}  
      - dev
```

Ce code explique pourquoi il y-a plusieurs fichiers YAML et pourquoi les chemins changent selon l'environnement 