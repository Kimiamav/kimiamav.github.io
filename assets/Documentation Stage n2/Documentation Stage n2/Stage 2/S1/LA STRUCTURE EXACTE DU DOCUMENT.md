
# 1) Le Contexte du Projet 

Le projet Adp2PeopleDoc a pour objectif de convertir des bulletins de paie fournis par ADP vers un format compatible avec la plateforme PeopleDoc. 
La conversion repose sur un moteur Java existant, déjà utilisé en production pour la France. Pour certains pays (Suisse, Singapour), l'automatisation complète n'est pas possible, ce qui nécessite actuellement un intervention humaine. 

# 2) Problématique Actuelle

Aujourd'hui, le moteur de conversion est déclenché via une API technique et suppose que les fichiers ADP soient déjà présents sue le serveur. 
Pour les pays non automatisés, le processus repose sur une intervention manuelle, ce qui pose des problèmes de scalabilité, de dépendance aux personnes et de sécurité, notamment compte tenu de la sensibilité des bulletins de paie. 

# 3) Objectif du Projet 

L'objectif du projet est de faire évoluer l'application existante afin de permettre à des utilisateurs métiers (RH) de déclencher manuellement la conversion via une interface sécurisée, sans modifier le moteur de conversion existant. 

# 4) Vue d'ensemble de  l'architecture existante 

L'application Adp2PeopleDoc est une application Spring Boot organisée autour d'un moteur de transformation central. 
Le flux actuel est le suivant: 
- dépôt d'un fichier ADP sur le serveur 
- appel de l'API REST TransformController 
- exécution de la conversion par TransformService 
- génération d'une archive conforme au format PeopleDoc 

# 5) Analyse de composants principaux 

5.1) TransformController 

	TransformController 
est le point d'entrée REST actuel de l'application. Il expose des endpoints permettant de déclencher la transformation d'un fichier ADP pour un pays donné. 

Ce contrôleur est destiné à un usage technique et non à une interaction directe avec des utilisateurs finaux. 

5.2) TransformService

	TransformService 
    contient la logique métier principale de l'application. il gère la lecture des fichiers ADP, leur transformation selon des schémas XDS spécifiques, l'association des bulletins aux salariés et la génération finale des archives PeopleDoc. 

Ce service constitue le cœur du monteur de conversion et doit pas être modifié dans le cadre du projet. 

5.3) Gestion des pays 
	Les règles spécifique à chaque pays sont centralisées dans l'énumération **CountryConst**, qui définit notamment les schémas XML utilisés et certaines règles fonctionnelles. 
 Cette distribution est essentielle pour la lise en place de restrictions d'accès par pays dans la future interface Utilisateur

# 6) Limites identifiées 

L'application actuelle ne propose pas de mécanisme d'authentification Utilisateurs
 ni d'interface permettant un déclenchement manuel sécurisé des conversions

  La gestion des droits d'accès et la traçabilité des actions utilisateurs ne sont pas couvertes  par la version actuelle. 

# 7) Piste d'évolution envisagées 

les évolution envisagées consistent à ajouter une couche applicative autour du moteur existant afin de: 
- permettre l'authentification des utilisateurs (idéalement via SSO),
- gérer les droits d'accès par pays, 
- proposer une interface simple permettant le changement des fichiers ADP et déclenchement de la conversion, 
- améliorer la couverture de tests unitaires sur les nouvelles fonctionnalités développées. 
# 8) Conclusion 

Cette phase d'analyse permet de confirmer que le moteur de conversion existant est fonctionnel et stable. Le travail à réaliser consiste principalement à enrichir l'application avec des fonctionnalités orientées utilisateur, tout en garantissant la sécurité et la fiabilité du processus.  