Ce projet Spring Boot a comme mission une automatisation qui permet de transformer un export ADP ( donc un zip contenant de PDF + un index.xml) en un livrable compatible PeopleDoc (un dossier ZIP final contenant un projet.xml, une distribution "bulsal" et pour chaque employé, un XML de métadonnées et un PDF) 

### Service 

- Décomposer un Zip ADP,
- lit et valide index.xml via un XSD pays, 
- génère les fichiers PeopleDoc (projet + distribution), 
- récupère une liste d'employés via un service SOAP (ScheduleService), 
- associe chaque document à un employé et généré le XML PeopleDoc correspondant? 
-  re-zippe le tout en sortie.

### ==Stack Technique== 

- Java + Spring Boot
- JAXB (marshal/unmarshal XML) + XSD validation
- Spring OXM jaxb2Marshaller
- OpenCSV (lecture CSV employés)
- SOAP consumer (ScheduleServiceConsumer)
- Apache Commons (lang3, io)

### Structure du projet 

```
src/main/java/com/scor/peopledoc 
├─ config # Beans Spring + propriétés de configuration 
├─ exception # Exceptions métier 
├─ service # Services principaux (BulSalService, TransformService) 
│ └─ dto # DTO/Enums (CountryConst, PsEmployee) 
├─ utils # Utilitaires I/O et XML 
├─ web.rest # API REST (TransformController) 
└─ ws # Client SOAP (ScheduleServiceConsumer)
```

### Prérequis 

- Java
- Maven
- Accès réseau au service SOAP ScheduleService (bulSalServiceUrl)
- XSD présents en classpath:xsd/…

### **Configuration (application.yml / application.properties)**

Préfixe : peopletodoc


| Clé                              | Description                                          |
| -------------------------------- | ---------------------------------------------------- |
| `peopletodoc.rootPath`           | Répertoire racine (si utilisé dans le projet global) |
| `peopletodoc.outputPath`         | Répertoire de sortie (ZIP final)                     |
| `peopletodoc.docByCountryPath`   | Pattern vers les fichiers par Pays ex: .../%s/...    |
| `peopletodoc.bulSalServiceUrl`   | URL base du serveur SOAP/XMLP                        |
| `peopletodoc.userId`             | Identifiant de connexion                             |
| `peopletodoc.password`           | Mot de passe                                         |
| `peopletodoc.reportAbsolutePath` | Chemin report                                        |
| **peopletodoc.itertionCount**    | Nombre d'itérations/ polling (défaut 10)             |
###### Important: 
docByCountyPath est utilisé avec string formal(..., countryConts). il doit donc contenir un placeholder compatible.

##### Exécution 

```
mvm clean test
mvn spring-boot:run
```

Fonctionnement haut niveau 

Entrée : ADP zip(index + pdf)
```
Sortie : ndmat_scor_pro_bulsal_<date><nom>.zip (PeopleDoc ready)
```

logs 

le projet utilise slf4j : logs d'étapes (unzip, unmarshal, génération, appels WS, zip final). 


# 2) Documentation pour une meilleure compréhension  


A quoi sert ce projet ? 
	il prend un ZIP ADP et le transforme en ZIP PeopleDoc, en injectant les bonnes métadonnées employé (nom/prénom/organisation/clé) récupérées via un service SOAP. 

### ==Le Cheminement concret (le "flow")==

**A. Tu appelles le service de transformation (REST)**

Le TransformController (package web.rest) déclenche : 
-  TransformService.adpToPeopleDoc(country, filename)

**B. TransformService prépare les dossiers** 
- Vérifie que le ZIP existe dans le répertoire "pays"
- Nettoie/recrée outputPath
- Crée un dossier temporaire temp/ 
- Prépare :
```
 temp/ndmaat_scor_pro_bulsal_<filenameWithoutExt>/ (dossier de génération)
```
**C. Lecture/ validation du** 

**index.xml**
- index.xml est extrait du zip
- XmlUtils.unmarshalXml(…): 
	- valide avec le XSD du pays (CountryConst.xsdIndexFile)
	- retourne Docs (structure Java ) + une liste d'erreurs éventuelles 
Si erreurs XSD -> TransformException("Issue during index unmarshalling")

**D. Génération des fichiers "socle" PeopleDoc** 
- generateProjectFile(…) --> crée project.xml
- generateBulSal(…) --> crée un XML "distribution bulsal"

**E. Récupération des employés PeopleSoft / PS via SOAP**
- BulSalService.getBulZipFiles(): 
	- déclenche un "schedule report" via ScheduleServiceConsomer
	- récupère l'historique -> Jobld
	- récupère le document CSV -> Map 
```
	<String, PsEmployee>
```

F. Association docs <-> employés + génération XML par PDF 

- Pour chaque document listé dans le index.xml 
	- retrouve le PDF dans le zip 
	- déplace le PDF dans le dossier final 
	- cherche l'employé (clé = matricule selon son pays )
	- génère un XML PeopleDoc Document (métadonnées)
	- écrit le XML à coté du PDF 
	
Si employé introuvable -> log d'erreur et création d'un employé "fallback" (avec valeurs par défaut FR/CH)

**G. Zippage final** 
- Zippe les fichiers générés dans outputPath
- Nettoie les dossiers temporaires 
- Retourne le Path du ZIP final

# 3) Documentation technique par package

##### **com.scor.peopledoc.config**

**ApplicationProperties**

Rôle : centralise la configuration via 
```java
@ConfigurationProperties(prex="peopletodoc")
```

Points clés: 
- champs obligatoires (NotNull/ NotBlank) : rootPath, outputPath, docByCountryPath, bulSalServiceUrl, uerId, password, reportAbsolutPath
- iterationCount = 10 par défaut (utile si le consuler WS poll un job)

**ApplicationConfiguation**

Rôle : déclare les beans Spring nécessaires au projet. 
- TransformService : dépend de ApplicationProperties + BulSalService
- Jaxb2Marshaller : scanne com.scor.peopledoc.wsdl (classe JAXB générées)
- ScheduleServiceConsumer : client SOAP configuré avec defaultUri =
bulSalServiceUrl + "`/xmlpserver/services/v2/ScheduleService`"
-  BulSalService : dépend du consumer

Remarque pro : Spring peut aussi auto-découvrir `@Service` mais ici vous avez fait le choix "bean explicite" (clean en projet d'intégration)

### **com.scor.peopledoc.exception**

`ScheduleException` (abstraite)

Base checked exception pour tout ce qui concerne l'exécution d'un Schedule / récupération de documents. 

Spécialisations: 
- `ScheduleReportException` : échec scheduleReport()
- `GetAllScheduledReportHistoryException` : échec lecture historique
- `GetScheduledReportOutputInfoException` : échec lecture output info
- `GetDocumentDataException` : échec récupération document (CSV)


##### **TransformException** 
(runtime)

Erreur de transformation (XML, zip, validation, marshalling, etc).
- Constructeurs : message / cause / message + Cause

### com.scor.peopledoc.service

**BulSalService**

Responsabilité : récupérer et parser le CSV des employés via SOAP 

Méthode clé: 
- `getBulZipFiles()` : Map`<String, PsEmployee>`
	- appelle 4 Endpoints via ScheduleServiceConsumer
	- récupère un CSV en bytes, le convertir en String UTF-8 
	- parse via `FileUtils.readEmployeesCsv`(…)

Erreurs: 
- lance des `ScheduleException` (checked) selon l'étape qui échoue 
- peut lancer `UrsupportedEncodingException` (même si tu utilises StandardCharsets.UTF_8, donc dans l'idéal cette exception peut être supprimée si le code est homogénéisé)

##### `TransformService`

Responsabilité : transformation ADP -> PeopleDoc 

Méthode principale :
- `adpToPeopleDoc(CountryConst countryConst, String filename)`

Etapes principales : 

1) validation existence fichier
2) création des dossiers (outputPath, temp, destDir, generationPath)
3) unzip + extraction index.xml
4) unmarshal index + validation XSD
5) génération project.xml, distribution bulsal
6) appel API employés (SOAP) -> Map employés
7) génération XML + déplacement PDFs
8) zip final + nettoyage 

Points importants pour maintenance :

- ADP_INDEX_XML_NAME = "index.xml"
- TARGET_PPDOC_NAME1_PREFIX = "ndmat_scor_pro_bulsal"
- Pays : 
	- FRA utilise doc.getIDMATRRH()
	- CHE utilise doc.getIDMATRIC()

## **com.scor.peopledoc.service.dto**

**CountryConst**

Enum pays (FRA/CHE) qui porte toute la config "pays":
	- `confid` : id de config papier
	- `groupCode` : code de groupe PeopleDoc
	- `docName` : nom affiché  ("Bulletin", "Payslip")
	- `xsdIndexFile` : XSD utilisé pour valider index.xml

PsEmployee

DTO CSV (OpenCSV @CsvBindByPosition)
- id/ employeeId / establd / lastName /firstName

Inclut un post-traitement:
- transform(PsEmployee) : normalise le prénom selon le pays/ état
- removeDiacritc : mapping custom FR (avec exceptions de caractères non modifiables)

### **com.scor.peopledoc.utils**

**FileUtils**

- unzipFile(File, Path) :unzip + Map {filenameLowercase -> Path} 
- zipFiles(Path directory, String filename, List`<Path>` files, boolean delete) : zippe une liste de fichiers en mettant uniquement le nom (pas l'arborescence)
- readEmployeesCsv(String) : parse CSV ; Map par employeeId (avec merge (first, last)->first)
- delete(Path) / delete directory en utilisant Apache Commons FileUtils

XmlUtils



