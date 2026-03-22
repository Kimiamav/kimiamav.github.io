La figure ci-dessous décrit la structure générale d’un projet de distribution.

[![Structure générale pour un projet de distribution](https://doc.people-doc.com/client/_images/distribution-project-general-structure.png)](https://doc.people-doc.com/client/_images/distribution-project-general-structure.png)

| Note<br>                                                                                                                                     |
| -------------------------------------------------------------------------------------------------------------------------------------------- |
| Un projet de distribution peut contenir une ou plusieurs distributions, chacune d’un type différent (fiches de paie, lettre de bonus, etc.). |


Un projet est défini par des paramètres généraux, communs à toutes les distributions qu’il contient, telles que :

- Le titre du projet (visible sur le gestionnaire de documents)
    
- La configuration du papier, sélectionnée à partir d’une liste (prédéfinie lors de la phase de mise en œuvre). 
    
- Le délai de notification pour informer les employés disposant de coffres électroniques actifs qu’un nouveau document est disponible
    
- Des options comme « Groupe de distribution » pour restreindre l’accès au projet, etc.
    

Pour chaque nouveau projet, ces paramètres doivent être fixés. Les paramètres peuvent être définis manuellement, mais si la création est automatique, ces paramètres sont soit définis via un fichier de configuration XML inclus dans un fichier ZIP, soit définis par les équipes UKG et récupérés en fonction du nom du fichier de distribution.

Pour bénéficier d’une autonomie maximale, il est conseillé aux clients UKG d’utiliser le format ZIP, via un **fichier ZIP de projet**, contenant :

- Un fichier XML (project.xml) pour décrire le projet
    
- Un fichier XML pour décrire une ou plusieurs distributions
    

Deux exemples de fichiers ZIP de projet sont disponibles dans la présente documentation.

## Contenu de project.xml

Ce fichier contient les paramètres du projet :

- **titre** : Titre du projet, affiché dans l’interface et utilisé pour identifier le projet. Par exemple, « Distribution des fiches de paie janvier 2021 ». Longueur maximale : 50 caractères.`mandatory`
    
- **paper_conf_id** : Identifiant pour la configuration papier. Pendant la phase de mise en œuvre, un certain nombre de réglages de transmission sont fournis. Ces réglages peuvent être utilisés pour ajuster la qualité du papier utilisé ou même la méthode de port (postage). L’attribut sert à spécifier le type d’identifiant utilisé :`mandatory``type`
    
    > - `id`: Identifiant tel que stocké dans la base de données (par défaut)
    >     
    > - `code`: Identifiant libre utilisé pendant la phase de paramètres. Format : caractères alphanumériques minuscules avec « - » et « _ »). Cette option permet de conserver le même code pour les environnements de staging et de production.`code`
    >     
    

| Note                                                                                   |
| -------------------------------------------------------------------------------------- |
| La configuration du papier est obligatoire, même lorsque UKG ne gère pas l’impression. |




- **regroup_paper** : Paramètre utilisé pour regrouper les expéditions papier. Lors de l’envoi de plusieurs documents, l’une des bobines doit être étiquetée comme la bobine principale, les documents correspondants apparaissent alors en premier dans leurs paquets respectifs.
    
- **notification_delay** : La période, en nombre de jours après la confirmation du projet, avant que les notifications ne soient envoyées par e-mail aux employés disposant d’evaults actifs. Si elle est réglée à « 0 », les e-mails sont envoyés directement après le traitement du projet.`mandatory`
    
- **sender_technical_id** : Identifiant technique du créateur de ce projet (tel qu’il serait affiché si un utilisateur avait créé le projet depuis l’interface web).
    
- **group_code** : Identifiant de groupe de distribution. Une fois le projet établi, il est disponible pour tous les managers de ce groupe de distribution.
    
- **use_paper_conf_contact** : Disponible uniquement pour la livraison de colis envoyé à l’adresse de l’organisation des employés. Établit le contact tel que défini dans la configuration papier.
    
- **sending_address** : Adresse de livraison du colis. Si ce paramètre est défini et si les documents sont envoyés en paquets (selon la configuration papier utilisée...), alors les paquets sont envoyés à cette adresse. Sinon, les colis sont adressés aux organisations de salariés.
    
    > - **pays** : code pays à deux lettres
    >     
    > - **Contact** : E-mail ou numéro de téléphone (format international). Utilisé lorsque le colis ne peut pas être livré.
    >     
    

| Note                                                                                                                                               |
| -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Les codes/identifiants techniques, tels que « l’ID de configuration papier », sont définis par UKG et le client lors de la phase de mise en œuvre. |


### Exemple de projet de distribution envoyé directement aux employés

Dans cet exemple, comme la configuration papier est réglée sur « emp-letter », les documents sont envoyés directement aux employés.

<?xml version='1.0' encoding='UTF-8'?>
<project version='1.0' xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <title>Distribution Payslips January 2021</title>
  <paper_conf_id type='code'>emp-letter</paper_conf_id>
  <regroup_paper>true</regroup_paper>
  <notification_delay>2</notification_delay>

  <!-- (optionals) -->
  <sender_technical_id></sender_technical_id>
  <group_code>hr-group-67</group_code>
  <!-- (optionals) -->
</project>

### Exemple de projet de distribution envoyé en colis aux organisations des employés

Dans cet exemple, comme la configuration papier est réglée sur « parcel » mais aucun sending_address n’est défini, les documents sont envoyés aux organisations des employés.

> - Lorsque use_paper_conf_contact est réglé sur **true**, le champ contact (email ou numéro de téléphone utilisé lorsque le colis ne peut pas être livré) est défini comme défini dans la configuration papier.
>     

<?xml version='1.0' encoding='UTF-8'?>
<project version='1.0' xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <title>Distribution payslips January 2021</title>
  <paper_conf_id type='code'>parcel</paper_conf_id>
  <regroup_paper>true</regroup_paper>
  <notification_delay>2</notification_delay>

  <!-- (optionals) -->
  <sender_technical_id></sender_technical_id>
  <group_code>hr-group-67</group_code>
  <use_paper_conf_contact>true</use_paper_conf_contact>
  <!-- (optionals) -->
</project>

### Exemple d’un projet de distribution envoyé sous forme de parcelle vers un ensemble d’adresses dans le XML

Dans cet exemple, comme la configuration papier est réglée sur « parcel » et qu’un sending_address est défini, les documents sont envoyés à cette sending_address.

> - Si le contact est laissé vide, il est défini tel que défini dans la configuration papier.
>     

<?xml version='1.0' encoding='UTF-8'?>
<project version='1.0' xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <title>Distribution payslips January 2021</title>
  <paper_conf_id type='code'>parcel</paper_conf_id>
  <regroup_paper>true</regroup_paper>
  <notification_delay>0</notification_delay>

  <!-- (optionals) -->
  <sender_technical_id></sender_technical_id>
  <group_code>hr-group-67</group_code>
  <!-- (optionals) -->

  <sending_address>
    <recipient_firstname>Jean</recipient_firstname>
    <recipient_lastname>Dupond</recipient_lastname>
    <address1>12 rue Jean Jaurès</address1>
    <address2></address2>
    <address3></address3>
    <zip_code>75001</zip_code>
    <city>Paris</city>
    <country>FR</country>
    <contact>jean.dupond@ukg.com</contact>
  </sending_address>
</project>

## Répartition

Une distribution est définie par :

- Un titre, visible sur le Gestionnaire de documents pour les utilisateurs RH
    
- Un type de distribution (prédéfini lors de la phase de mise en œuvre), tel que des fiches de paie ou des lettres de prime
    
- Les documents à distribuer
    

Une distribution peut être créée/ajoutée manuellement ou définie dans un fichier XML dans un fichier ZIP de projet.

### Format du fichier descripteur XML pour une distribution

| Note                                                                                      |
| ----------------------------------------------------------------------------------------- |
| Ce fichier doit être présent et conforme au format suivant, quel que soit le type de lot. |


Ce fichier contient les paramètres d’une distribution :

- **titre** : Titre de la distribution, affiché dans l’interface et utilisé pour identifier le lot au sein d’un projet de distribution. Par exemple, « fiches de paie » / « Feuilles de temps ». Longueur maximale : 50 caractères`mandatory`
    
- **distribution_type_id** : Identifiant du type de distribution. Pendant la phase d’implémentation, un certain nombre de types de distribution sont fournis. Le type d’attribut est utilisé pour spécifier le type d’identifiant utilisé :`mandatory`
    
    - `id`: Identifiant tel que stocké dans la base de données (par défaut)
        
    - `code`: Identifiant libre utilisé pendant la phase de paramètres. Format : caractères alphanumériques minuscules avec « - » et « _ »). Cette option permet de conserver le même code pour les environnements de staging et de production.`code`
        
| Note                                                              |
| ----------------------------------------------------------------- |
| Ce code/id est partagé par UKG lors de la phase de mise en œuvre. |


<?xml version='1.0' encoding='UTF-8'?>
<distribution version='1.0' xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
<title>Bulletins de Paie</title>
<distribution_type_id type='code'>bulsal-employee-only</distribution_type_id>
</distribution>

Pour compléter la structure ZIP du projet, vous devez ajouter le fichier à distribuer : il y a 3 façons de le faire.

## Structure du projet ZIP

Le lot peut exister sous de nombreuses formes, les formats standards acceptés par UKG sont les suivants :

- « ZIP meta » : n fichiers PDF accompagnés de n fichiers de métadonnées XML dans un fichier ZIP (**par défaut**)
    
- « ZIP pilot » : 1 fichier PDF unique (= 1 spool PDF), contenant tous les documents à distribuer, accompagné d’un fichier descripteur XML unique, dans un fichier ZIP
    
- « PDF spool » : 1 fichier PDF unique contenant tous les documents à distribuer.
    

La figure ci-dessous montre les 3 solutions pour définir un fichier ZIP de projet, pour une seule distribution.

> Note
> 
> Les solutions ZIP pilot et ZIP meta permettent d’être autonome sur les paramètres envoyés à UKG, et de changer le format du document sans impact. **ZIP meta est la solution standard recommandée par UKG.**
> 
> En revanche, les bobines PDF avec cartes d’extraction doivent être évitées autant que possible, surtout lorsque les cartes d’extraction ne contiennent pas de barres d’identification : **tout changement du format du document pourrait casser la configuration des bobines PDF.**

[![three ways to define a distribution project](https://doc.people-doc.com/client/_images/project-zip-solutions.png)](https://doc.people-doc.com/client/_images/project-zip-solutions.png)

### Description et dénomination

Chaque fichier ZIP du projet doit être envoyé via SFTP et doit contenir :

- Un fichier descripteur de projet `project.xml`
    
- Un fichier ZIP (« meta » ou « pilote ») ou une bobine PDF par lot de distribution, accompagné d’un fichier XML descriptif par lot de distribution. Les fichiers ZIP/PDF et XML du même lot doivent porter le même nom (sauf leur extension).
    
| Note                                                                                                                                                                            |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Une bonne pratique est d’utiliser l’identifiant technique ou le numéro d’enregistrement + le code d’organisation dans le nom du fichier afin d’éviter tout problème d’homonymes |

Le fichier ZIP du projet doit être :

- Téléchargé sur le dépôt in/pro du serveur SFTP
    
- Nommé selon le format décrit dans [les conventions de nommage de fichiers](https://doc.people-doc.com/client/guides/synchronization/exchange_protocole.html#sftp-file-naming)
    

Tous les noms de fichiers doivent ne contenir que des caractères alphanumériques (a, b, c... Z, 0... 9) avec le caractère _ autorisé comme séparateur.

| Note                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| L’adresse serveur SFTP ainsi que le nom du répertoire pour le téléchargement sont indiqués pendant la phase de configuration. Pour plus d’informations. |

Exemple de projet contenant 2 lots de distribution :

ndmat_partenairex_clientx_pro_456789067546.zip
-- project.xml
-- ndmat_macrosoft_macrosoft_dis_bulsal_hra_v7_2345678906767.zip
-- ndmat_macrosoft_macrosoft_dis_bulsal_hra_v7_2345678906767.xml
-- ndmat_macrosoft_macrosoft_dis_annexe_hra_v7_456T654578978.zip
-- ndmat_macrosoft_macrosoft_dis_annexe_hra_v7_456T654578978.xml

